import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, InputGroup } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../../store/api-service';
import { format, isSameDay, startOfToday } from 'date-fns';
import { enIN, de, fr } from 'date-fns/locale';
import { utcToZonedTime } from 'date-fns-tz';
import { FaRegCommentDots } from "react-icons/fa";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [checkboxes, setCheckboxes] = useState({
        hold: false,
        change: false,
        eng: false,
        curing: false,
    });
    const [progress, setProgress] = useState('');
    const [actualCost, setActualCost] = useState(0);
    const [error, setError] = useState(null);

    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    const getFormattedDate = (date) => {
        const locale = navigator.language || 'en-US'; // Default to 'en-US' if unavailable

        let localeObj;
        switch (locale) {
            case 'de-DE':
                localeObj = de;
                break;
            case 'fr-FR':
                localeObj = fr;
                break;
            default:
                localeObj = enIN;
                break;
        }

        // Define IST time zone
        const IST = 'Asia/Kolkata';

        // Convert the UTC date to IST
        const zonedDate = utcToZonedTime(date, IST);

        // Format the IST date using date-fns with the system locale
        const formattedDate = format(zonedDate, 'dd/MM/yyyy HH:mm', { locale: localeObj });

        return formattedDate;
    }

    // Fetch tasks from the API
    async function fetchData() {
        try {
            const pageOptions = {
                recordPerPage: 0,
            };

            const response = await api.getData({ module: 'activity', options: pageOptions });
            setTasks(response.data.items);
        } catch (error) {
            setError('Failed to fetch tasks');
        }
    }

    async function fetchComments(selectedId) {
        try {
            const newBaseFilter = {
                name: 'activityId',
                value: parseInt(selectedId),
            }

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: newBaseFilter
            }
            const response = await api.getData({ module: 'comment', options: pageOptions });
            setComments(response?.data?.items);
        } catch (error) {
            // console.error('Failed to fetch comments:', error);
        }
    }

    // async function handleImageUpload(selectedId) {
    //     try {
    //         const newBaseFilter = {
    //             name: 'activityId',
    //             value: parseInt(selectedId),
    //         }

    //         setBaseFilter(newBaseFilter)

    //         const pageOptions = {
    //             recordPerPage: 0
    //         }
    //         const response = await api.getData({ module: 'attachment', options: pageOptions });
    //         setComments(response?.data?.items);
    //     } catch (error) {
    //         console.error('Failed to fetch comments:', error);
    //     }
    // }

    useEffect(() => {
        fetchData();
    }, []);

    // Handle date clicks in FullCalendar
    const handleDateClick = (info) => {
        const clickedDate = new Date(info.date);
        setSelectedDate(clickedDate);

        // Filter tasks for the clicked date
        const filteredTasks = tasks.filter((task) => {
            const taskStartDate = new Date(task.startDate);
            const taskEndDate = new Date(task.endDate);
            return clickedDate >= taskStartDate && clickedDate <= taskEndDate;
        });

        setSelectedTasks(filteredTasks);
        setModalOpen(true); // Open the modal for the date
    };

    // Handle task clicks in the date modal
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setProgress(parseFloat(task.progressPercentage));
        setActualCost(parseFloat(task.actualCost));
        setTaskModalOpen(true); // Open the modal for the task
    };

    // Handle comment button click
    const handleCommentClick = async (task) => {
        setSelectedTask(task);
        await fetchComments(task.id);
        setCommentsModalOpen(true); // Open the modal for comments
    };

    // Close the date modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Close the task modal
    const closeTaskModal = () => {
        setTaskModalOpen(false);
    };

    // Close the comments modal
    const closeCommentsModal = () => {
        setCommentsModalOpen(false);
        setNewComment('');
        setImageFile(null);
        setImagePreview(null);
        setComments([]);
    };

    // Save task changes
    const handleSave = async () => {
        const updatedData = {
            ...selectedTask,
            progressPercentage: progress,
            actualCost: parseFloat(actualCost),
        };

        try {
            const response = await api.editData({ module: 'activity', data: updatedData });
            if (response.status === 200) {
                // console.log('Data saved successfully!');
            } else {
                // console.log('Failed to save data.');
            }
        } catch (error) {
            // console.error('Error saving data:', error);
        } finally {
            setProgress('');
            setActualCost(0);
            setCheckboxes({
                hold: false,
                change: false,
                eng: false,
                curing: false,
            });
            closeTaskModal();
            closeModal();
            await fetchData();
        }
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            if (newComment.trim()) {
                // Save text comment
                const commentData = {
                    activityId: selectedTask.id,
                    remarks: newComment,
                    date: new Date(),
                };

                try {
                    const response = await api.addData({ module: 'comment', data: commentData });
                    if (response.status === 200) {
                        console.log('Comment saved successfully!');
                        setNewComment('');
                    } else {
                        console.log('Failed to save comment.');
                    }
                } catch (error) {
                    console.error('Error saving comment:', error);
                }
            }



            // Fetch comments again to update the list
            await fetchComments(selectedTask.id);
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));

            // Convert image to Base64
            const base64Image = await convertImageToBase64(file);

            // Save photo
            const photoData = {
                parentId: selectedTask.id,
                module: 'activity',
                file: base64Image,
            };

            try {
                const response = await api.addData({ module: 'attachment', data: photoData });
                if (response.status === 200) {
                    console.log('Photo saved successfully!');
                    setImageFile(null);
                    setImagePreview(null);
                } else {
                    console.log('Failed to save photo.');
                }
            } catch (error) {
                console.error('Error saving photo:', error);
            }

        } else {
            alert('Please upload a valid image file.');
        }
    };

    // Custom render function for date cells
    const renderDateCell = (cellInfo) => {
        const cellDate = new Date(cellInfo.date);
        const taskCount = tasks.filter((task) => {
            const taskStartDate = new Date(task.startDate);
            const taskEndDate = new Date(task.endDate);
            return cellDate >= taskStartDate && cellDate <= taskEndDate;
        }).length;

        return (
            <div className='d-flex'>
                {cellInfo.dayNumberText}
                {taskCount > 0 && (
                    <div className="task-count-badge bg-primary">{taskCount}</div>
                )}
            </div>
        );
    };

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                dayCellContent={renderDateCell}
            />

            {modalOpen && (
                <Modal show={modalOpen} onHide={closeModal} size='md'>
                    <Modal.Header>
                        <Modal.Title>Tasks For Date: {format(selectedDate, 'dd-MM-yyyy')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        {console.log(selectedTasks)}
                        {selectedTasks.length > 0 ? (
                            selectedTasks.map((task) => (
                                <div className='d-grid gap-2 mb-2' key={`Task-${task.id}`}>
                                    <div className="row">
                                        <div className="col-10">
                                            <Button
                                                variant="contained"
                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-lg btn-primary'
                                                onClick={() => handleTaskClick(task)}
                                                style={{ width: '100%' }}
                                            >
                                                {task.name}
                                            </Button>
                                        </div>
                                        <div className="col-2">
                                            <Button
                                                title='Comments'
                                                variant="contained"
                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary'
                                                onClick={() => handleCommentClick(task)}
                                                style={{ width: '100%' }}
                                            >
                                                <FaRegCommentDots size={25} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No task assigned</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="contained"
                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                            onClick={closeModal}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {taskModalOpen && selectedTask && (
                <Modal show={taskModalOpen && selectedTask} onHide={closeTaskModal}>
                    <Modal.Header>
                        <Modal.Title>Task Update Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        <div className="row mb-2">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <span><strong>Date: </strong>{format(selectedDate, 'dd-MM-yyyy')}</span>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-">
                                <span><strong>Task: </strong>{selectedTask.name}</span>
                            </div>
                        </div>
                        <Form>
                            <Form.Group className="position-relative form-group">
                                <Form.Label>Cost</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={actualCost}
                                    disabled={!isSameDay(selectedDate, startOfToday())}
                                    onChange={(e) => setActualCost(e.target.value)}
                                    placeholder="Cost here......"
                                />
                            </Form.Group>

                            <Form.Group className="position-relative form-group">
                                <InputGroup>
                                    <Form.Check
                                        type="checkbox"
                                        disabled={!isSameDay(selectedDate, startOfToday())}
                                        label="Hold"
                                        className="d-flex align-items-center mr-2"
                                        onChange={(e) => setCheckboxes({ ...checkboxes, hold: e.target.checked })}
                                        checked={checkboxes.hold}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        disabled={!isSameDay(selectedDate, startOfToday())}
                                        label="Change"
                                        className="d-flex align-items-center mr-2"
                                        onChange={(e) => setCheckboxes({ ...checkboxes, change: e.target.checked })}
                                        checked={checkboxes.change}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        disabled={!isSameDay(selectedDate, startOfToday())}
                                        label="Eng"
                                        className="d-flex align-items-center mr-2"
                                        onChange={(e) => setCheckboxes({ ...checkboxes, eng: e.target.checked })}
                                        checked={checkboxes.eng}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        disabled={!isSameDay(selectedDate, startOfToday())}
                                        label="Curing"
                                        className="d-flex align-items-center"
                                        onChange={(e) => setCheckboxes({ ...checkboxes, curing: e.target.checked })}
                                        checked={checkboxes.curing}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="position-relative form-group">
                                <Form.Label>Progress</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={progress}
                                    disabled={!isSameDay(selectedDate, startOfToday())}
                                    onChange={(e) => setProgress(e.target.value)}
                                    placeholder="00.00%"
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="contained"
                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                            onClick={closeTaskModal}
                        >
                            Close
                        </Button>
                        <Button
                            disabled={!isSameDay(selectedDate, startOfToday())}
                            variant="contained"
                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                            onClick={handleSave}
                        >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
            {commentsModalOpen && selectedTask && (
                <Modal show={commentsModalOpen} onHide={closeCommentsModal}>
                    <Modal.Header>
                        <Modal.Title>Task Comments: {selectedTask.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        <div className="comments-section">
                            {comments?.length > 0 ? (
                                comments?.map((comment, index) => (
                                    <div key={index} className="d-flex justify-content-end mb-2">
                                        <div className="p-2 bg-light rounded-pill" style={{ maxWidth: '70%' }}>
                                            {comment.image && (
                                                <img
                                                    src={comment?.image}
                                                    alt="Comment"
                                                    style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }}
                                                />
                                            )}
                                            <div className="text-break">{comment?.remarks}</div>
                                            <div className="text-left text-muted" style={{ fontSize: '0.60rem' }}>
                                                {/* {format(new Date(comment?.date), 'dd/MM/yyyy HH:mm')} */}
                                                {getFormattedDate(new Date(comment?.date))}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="">No comments yet.</p>
                            )}
                        </div>
                        <div className="d-flex">
                            <Form.Group className="position-relative form-group flex-grow-1 mr-2" style={{ flex: 6 }}>
                                <Form.Label>New Comment</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Type your comment here..."
                                />
                            </Form.Group>
                            {/* <Form.Group className="position-relative form-group flex-grow-1" style={{ flex: 4 }}>
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '8px' }}
                                    />
                                )}
                            </Form.Group> */}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="contained"
                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                            onClick={closeCommentsModal}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                            onClick={handleCommentSubmit}
                        >
                            Post Comment
                        </Button>
                        <Button
                            variant="contained"
                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                            onClick={() => document.getElementById('upload-photo-btn').click()}
                        >
                            <input id='upload-photo-btn'
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                            Upload Photo
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Calendar;
