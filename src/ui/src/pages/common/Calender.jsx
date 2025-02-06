import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, InputGroup } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../../store/api-service';
import { format, isSameDay, startOfToday } from 'date-fns';
import { FaRegCommentDots } from "react-icons/fa";

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
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
    const handleCommentClick = (task) => {
        setSelectedTask(task);
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
                console.log('Data saved successfully!');
            } else {
                console.log('Failed to save data.');
            }
        } catch (error) {
            console.error('Error saving data:', error);
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

    // Handle comment submission
    // const handleCommentSubmit = () => {
    //     if (newComment.trim()) {
    //         setComments((prevComments) => ({
    //             ...prevComments,
    //             [selectedTask.id]: [...(prevComments[selectedTask.id] || []), newComment],
    //         }));
    //         setNewComment('');
    //     }
    // };
    // Handle comment submission
    const handleCommentSubmit = async () => {
        if (newComment.trim()) {
            const commentData = {
                activityId: selectedTask.id,
                remarks: newComment,
                timestamp: new Date(),
            };

            try {
                // Assuming you have an API endpoint to save comments
                const response = await api.addData({ module: 'comment', data: commentData });
                if (response.status === 200) {
                    console.log('Comment saved successfully!');
                    setComments((prevComments) => ({
                        ...prevComments,
                        [selectedTask.id]: [...(prevComments[selectedTask.id] || []), newComment],
                    }));
                    setNewComment('');
                } else {
                    console.log('Failed to save comment.');
                }
            } catch (error) {
                console.error('Error saving comment:', error);
            }
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
                                                variant="contained"
                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-lg btn-secondary pr-5'
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
                        <Modal.Title>Comments for Task: {selectedTask.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        <div className="comments-section">
                            {comments[selectedTask.id] && comments[selectedTask.id].length > 0 ? (
                                comments[selectedTask.id].map((comment, index) => (
                                    <div key={index} className="d-flex justify-content-end mb-2">
                                        <div className="p-2 bg-light rounded-pill" style={{ maxWidth: '70%' }}>
                                            <div className="text-break">{comment}</div>
                                            <div className="text-left text-muted" style={{ fontSize: '0.60rem' }}>
                                                {format(new Date(), 'dd/mm/yyyy HH:mm')}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="">No comments yet.</p>
                            )}
                        </div>
                        <Form.Group className="position-relative form-group">
                            <Form.Label>New Comment</Form.Label>
                            <Form.Control
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Type your comment here..."
                            />
                        </Form.Group>
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
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Calendar;
