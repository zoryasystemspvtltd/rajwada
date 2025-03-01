import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { format, isSameDay, startOfToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Modal, ProgressBar } from 'react-bootstrap';
import { FaRegCommentDots } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setSave } from '../../store/api-db';
import api from '../../store/api-service';
import { getFormattedDate } from '../../store/datetime-formatter';
import { notify } from "../../store/notification";
import IUIImageGallery from './shared/IUIImageGallery';
import ILab from '../canvas-helper/Ilab-Canvas';



const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [checkboxes, setCheckboxes] = useState({
        isCuringDone: false,
        isCompleted: false
    });
    const [progress, setProgress] = useState(0);
    // const [previousProgress, setPreviousProgress] = useState(0);
    const [blueprint, setBlueprint] = useState([]);
    const [actualCost, setActualCost] = useState(0);
    const [manPower, setManPower] = useState(0);
    const [privileges, setPrivileges] = useState({});
    const [isCompletionConfirmed, setIsCompletionConfirmed] = useState(false);
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [error, setError] = useState(null);
    const [canvasSchema, setCanvasSchema] = useState({
        text: 'Activity Blueprint', field: 'photoUrl', placeholder: 'Flat Blueprint here...', type: 'ilab-canvas', shape: 'rect',
        schema: {
            readonly: true,
            upload: false,
            save: true,
            parentId: -1,
            goBack: true,
            parent: {
                module: 'activity',
                filter: 'activityId',
                path: 'activities'
            },
            controls: {
                balloon: false,
                rectangle: false,
                pencil: false,
                camera: false,
                delete: false,
                reset: false
            },
            module: 'unitOfWork'
        }
    });
    const dispatch = useDispatch();
    const [taskStatus, setTaskStatus] = useState('');

    useEffect(() => {
        const commentPrivileges = loggedInUser?.privileges?.filter(p => p.module === "comment")?.map(p => p.name);
        const imagePrivileges = loggedInUser?.privileges?.filter(p => p.module === "attachment")?.map(p => p.name);
        let access = {};
        commentPrivileges.forEach(p => {
            access["comment"] = { ...access["comment"], ...{ [p]: true } }
        })
        imagePrivileges.forEach(p => {
            access["image"] = { ...access["image"], ...{ [p]: true } }
        })
        setPrivileges(access)
    }, [loggedInUser]);

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
            let tempComments = response?.data?.items;
            const sortedComments = tempComments.sort((a, b) => new Date(a.date) - new Date(b.date));
            setComments(sortedComments);
        } catch (error) {
            notify("error", "Failed to fetch comments!");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Handle date clicks in FullCalendar
    const handleDateClick = async (info) => {
        const clickedDate = new Date(info.date);
        setSelectedDate(clickedDate);

        const timeStamp = clickedDate.getTime();
        const trackingDateStart = new Date(timeStamp);
        const trackingDateEnd = new Date(timeStamp + 86400000);

        const newBaseFilter = {
            name: 'date',
            value: trackingDateStart,
            operator: 'greaterThan',
            and: {
                name: 'date',
                value: trackingDateEnd,
                operator: 'lessThan'
            }
        }

        const pageOptions = {
            recordPerPage: 0,
            searchCondition: newBaseFilter
        }
        const response = await api.getData({ module: 'activitytracking', options: pageOptions });
        // console.log(response?.data);

        let trackingData = response?.data?.items;

        // Filter tasks for the clicked date
        const filteredTasks = tasks.filter((task) => {
            const taskStartDate = new Date(task.startDate);
            const endDate = new Date(task.endDate);
            endDate.setDate(endDate.getDate() + 365);
            const taskEndDate = task.actualEndDate ? new Date(task.actualEndDate) : endDate;
            return clickedDate >= taskStartDate && clickedDate <= taskEndDate;
        }).map(task => {
            const taskTrackingInfo = trackingData.find(t => t.activityId === task.id);
            return {
                ...task,
                curingStatus: taskTrackingInfo ? taskTrackingInfo.isCuringDone ? true : false : false
            }
        });

        if (isSameDay(clickedDate, startOfToday())) {
            setCanvasSchema(
                {
                    ...canvasSchema,
                    schema: {
                        ...canvasSchema.schema,
                        readonly: false,
                        controls: {
                            ...canvasSchema.schema.controls,
                            balloon: true,
                            rectangle: true,
                            pencil: true,
                            camera: true,
                            delete: true,
                            reset: true
                        }
                    }
                }
            );
        }

        setSelectedTasks(filteredTasks);
        setModalOpen(true); // Open the modal for the date

    };

    const handleProgressSliderChange = (event) => {
        setProgress(parseInt(event.target.value, 10));
    };

    const handleBlueprintChange = (event) => {
        event.preventDefault();
        setBlueprint(event.target.value);
    }

    // Handle task clicks in the date modal
    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setProgress(parseInt(task.progressPercentage, 10));
        setBlueprint(task?.photoUrl);
        setCanvasSchema({ ...canvasSchema, schema: { ...canvasSchema.schema, parentId: parseInt(task.id) } });
        // setPreviousProgress(parseInt(task.progressPercentage, 10));
        setActualCost(parseFloat(task.actualCost));
        setTaskModalOpen(true); // Open the modal for the task
    };

    // Handle comment button click
    const handleCommentClick = async (task) => {
        setSelectedTask(task);
        await fetchComments(task.id);
        setCommentsModalOpen(true); // Open the modal for comments
    };

    const handleGalleryClick = async (task) => {
        setSelectedTask(task);
        setShowGalleryModal(true);
    };

    const handleCloseGalleryModal = () => {
        setShowGalleryModal(false);
        setSelectedTask(null);
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
        setComments([]);
    };

    const handleCompletionConfirmationClose = () => {
        setCheckboxes({ ...checkboxes, isCompleted: false });
        setIsCompletionConfirmed(false);
    };

    const handleCompletionConfirmation = async () => {
        try {
            setIsCompletionConfirmed(true);

            // Fetch List of users who are assigned that activity
            let allUsersResponse = await api.assignedUsers({ module: "activity", id: selectedTask?.id });

            // Filter users with Role QC Engineer
            let userList = allUsersResponse?.data?.filter(item => `${item?.member}`.toLowerCase().includes("qc"));

            for (let user of userList) {
                const action = { module: "activity", data: { id: selectedTask?.id, member: user?.member, status: 2 } }
                try {
                    await api.editPartialData(action);
                    dispatch(setSave({ module: module }))
                    //navigate(-1);
                } catch (e) {
                    // TODO
                }
            }
            notify("success", "Assignment to QC Successful");

            // Update Activity Details
            const updatedActivityData = {
                id: selectedTask?.id,
                progressPercentage: progress,
                actualCost: parseFloat(actualCost),
                photoUrl: blueprint,
            };
            await api.editData({ module: 'activity', data: updatedActivityData });
        }
        catch (error) {

        } finally {
            setProgress('');
            setActualCost(0);
            setBlueprint([]);
            setCheckboxes({
                isOnHold: false,
                isCancelled: false,
                isAbandoned: false,
                isCuringDone: false,
                isCompleted: false
            });
            closeTaskModal();
            closeModal();
            await fetchData();
        }
    }

    // Save task changes
    const handleSave = async () => {
        const updatedData_a = {
            ...selectedTask,
            progressPercentage: progress
        };

        const updateData_b = {
            activityId: selectedTask.id,
            manPower: parseInt(manPower),
            cost: parseFloat(actualCost),
            isOnHold: taskStatus === 'onHold',
            isCancelled: taskStatus === 'Cancelled',
            isCuringDone: checkboxes.isCuringDone,
            name: selectedTask.name
        };

        try {
            const response_a = await api.editData({ module: 'activity', data: updatedData_a });
            const response_b = await api.addData({ module: 'activitytracking', data: updateData_b });
        } catch (error) {
            // console.error('Error saving data:', error);
        } finally {
            setProgress('');
            setActualCost(0);
            setManPower(0);
            setTaskStatus('');
            setBlueprint([]);
            setCheckboxes({
                isCuringDone: false,
                isCompleted: false
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
                    notify("success", 'Photo saved successfully!');
                } else {
                    notify("error", 'Failed to save photo!');
                }
            } catch (error) {
                console.error('Error saving photo:', error);
            }

        } else {
            notify("error", 'Please upload a valid image file!');
        }
    };

    const renderDateCell = (cellInfo) => {
        const cellDate = new Date(cellInfo.date);
        const taskCount = tasks.filter((task) => {
            const taskStartDate = new Date(task.startDate);
            const endDate = new Date(task.endDate);
            endDate.setDate(endDate.getDate() + 365);
            const taskEndDate = task.actualEndDate ? new Date(task.actualEndDate) : endDate;
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

    const handleStatusChange = (status) => {
        setTaskStatus(status);
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
                                        <div className="col-8">
                                            <Button
                                                variant="contained"
                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-lg btn-primary'
                                                onClick={() => handleTaskClick(task)}
                                                style={{ width: '100%' }}
                                            >
                                                {task.name}
                                                {task.curingStatus && <span className="badge badge-warning" >C</span>}
                                                {/* {console.log(task)}  */}
                                            </Button>
                                        </div>
                                        <div className="col-2 d-flex align-items-center">
                                            <Button
                                                title='Comments'
                                                variant="contained"
                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary'
                                                onClick={() => handleCommentClick(task)}
                                                style={{ width: '100%' }}
                                            >
                                                <FaRegCommentDots size={15} />
                                            </Button>
                                        </div>
                                        <div className="col-2 d-flex align-items-center">
                                            <Button
                                                title='Image Gallery'
                                                variant="contained"
                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-info'
                                                onClick={() => handleGalleryClick(task)}
                                                style={{ width: '100%' }}
                                            >
                                                <FaImage size={14} />
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
                <Modal show={taskModalOpen && selectedTask} onHide={closeTaskModal} size='xl'>
                    <Modal.Header>
                        <Modal.Title>Task Update Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black", maxHeight: '60vh', overflowY: 'auto' }}>
                        <div className="row mb-2">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <span><strong>Date: </strong>{format(selectedDate, 'dd-MM-yyyy')}</span>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-">
                                <span><strong>Task: </strong>{selectedTask.name}</span>
                            </div>
                        </div>
                        <Form>
                            <div className="row">
                                <div className="col">
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
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Form.Group className="position-relative form-group">
                                        <Form.Label>Man Power</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={manPower}
                                            disabled={!isSameDay(selectedDate, startOfToday())}
                                            onChange={(e) => setManPower(e.target.value)}
                                            placeholder="Man Power here......"
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            <Form.Label className='font-weight-bold'>Task Status:</Form.Label>
                            <div className="row">
                                <div className="col-sm-12 col-md-3">
                                    <Form.Group className="position-relative form-group">
                                        <InputGroup>
                                            <Form.Check
                                                type="radio"
                                                name="taskStatus"
                                                disabled={!isSameDay(selectedDate, startOfToday())}
                                                label="In Progress"
                                                className="d-flex align-items-center mr-2"
                                                onChange={() => handleStatusChange('inProgress')}
                                                checked={taskStatus === 'inProgress'}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                                <div className="col-sm-12 col-md-3">
                                    <Form.Group className="position-relative form-group">
                                        <InputGroup>
                                            <Form.Check
                                                type="radio"
                                                name="taskStatus"
                                                disabled={!isSameDay(selectedDate, startOfToday())}
                                                label="On Hold"
                                                className="d-flex align-items-center mr-2"
                                                onChange={() => handleStatusChange('onHold')}
                                                checked={taskStatus === 'onHold'}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                                <div className="col-sm-12 col-md-3">
                                    <Form.Group className="position-relative form-group">
                                        <InputGroup>
                                            <Form.Check
                                                type="radio"
                                                name="taskStatus"
                                                disabled={!isSameDay(selectedDate, startOfToday())}
                                                label="Cancelled"
                                                className="d-flex align-items-center mr-2"
                                                onChange={() => handleStatusChange('Cancelled')}
                                                checked={taskStatus === 'Cancelled'}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                                <div className="col-sm-12 col-md-3">
                                    <Form.Group className="position-relative form-group">
                                        <InputGroup>
                                            <Form.Check
                                                type="radio"
                                                name="taskStatus"
                                                disabled={!isSameDay(selectedDate, startOfToday())}
                                                label="Abandoned"
                                                className="d-flex align-items-center mr-2"
                                                onChange={() => handleStatusChange('Abandoned')}
                                                checked={taskStatus === 'Abandoned'}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                            </div>
                            <div className='row'>
                                <div className="col-sm-12 col-md-3">
                                    <Form.Group className="position-relative form-group">
                                        <InputGroup>
                                            <Form.Check
                                                type="checkbox"
                                                disabled={!isSameDay(selectedDate, startOfToday())}
                                                label="Curing"
                                                className="d-flex align-items-center"
                                                onChange={(e) => setCheckboxes({ ...checkboxes, isCuringDone: e.target.checked })}
                                                checked={checkboxes.isCuringDone}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col">
                                    {/* <Form.Group className="position-relative form-group">
                                        <Form.Label>Progress</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={progress}
                                            disabled={!isSameDay(selectedDate, startOfToday())}
                                            onChange={(e) => setProgress(e.target.value)}
                                            placeholder="00.00%"
                                        />
                                    </Form.Group> */}
                                    <Form.Group className="position-relative form-group">
                                        <Form.Label>Progress</Form.Label>
                                        <Form.Range
                                            min="0"
                                            max="100"
                                            value={progress}
                                            disabled={!isSameDay(selectedDate, startOfToday())}
                                            onChange={handleProgressSliderChange}
                                        />
                                    </Form.Group>


                                    <div className="my-2">
                                        <ProgressBar
                                            now={progress}
                                            label={`${progress}%`}
                                            variant="info"
                                            style={{ height: '20px' }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row my-2">
                                <div className="col-sm-12">
                                    <Form.Group className="position-relative form-group">
                                        <InputGroup>
                                            <Form.Check
                                                type="checkbox"
                                                disabled={!isSameDay(selectedDate, startOfToday()) || progress !== 100}
                                                label="Assign to QC"
                                                className="d-flex align-items-center mr-2"
                                                onChange={(e) => setCheckboxes({ ...checkboxes, isCompleted: e.target.checked })}
                                                checked={checkboxes.isCompleted}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </div>
                            </div>
                            <div>
                                {

                                }
                            </div>

                            {/* Balloon Marker Input */}
                            <div className="row">
                                <div className="col-sm-12">
                                    <Form.Label htmlFor={canvasSchema.field} className='fw-bold'>{canvasSchema.text}
                                        {canvasSchema.required &&
                                            <span className="text-danger">*</span>
                                        }
                                    </Form.Label>

                                    <ILab.MarkerCanvas
                                        id={canvasSchema.field}
                                        value={blueprint || []}
                                        schema={canvasSchema.schema}
                                        onChange={handleBlueprintChange}
                                        readonly={canvasSchema.readonly || !isSameDay(selectedDate, startOfToday())}
                                    />
                                </div>
                            </div>
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
                    <Modal.Body style={{ color: "black", maxHeight: '60vh', overflowY: 'auto' }}>
                        <div className="comments-section">
                            {comments?.length > 0 ? (
                                comments?.map((comment, index) => (
                                    <div
                                        key={index}
                                        className={`d-flex ${comment.member === loggedInUser?.user ? 'justify-content-end' : 'justify-content-start'} mb-2`}>
                                        <div
                                            className={`p-2 ${comment.member === loggedInUser?.user ? 'bg-light' : 'bg-secondary text-white'} rounded-4`}
                                            style={{ maxWidth: '70%' }}>
                                            <div className={`text-left ${comment.member === loggedInUser?.user ? 'text-muted' : 'bg-secondary text-white'} rounded-4`}
                                                style={{ fontWeight: 'bold', fontSize: '0.60rem' }}>
                                                {comment?.member}
                                            </div>
                                            <div className="text-break">{comment?.remarks}</div>
                                            <div className={`text-left ${comment.member === loggedInUser?.user ? 'text-muted' : 'bg-secondary text-white'} rounded-4`}
                                                style={{ fontSize: '0.60rem' }}>
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
                        {
                            privileges?.comment?.add && (
                                <Button
                                    variant="contained"
                                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                                    onClick={handleCommentSubmit}
                                >
                                    Post Comment
                                </Button>
                            )
                        }
                        {
                            privileges?.image?.add && (
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
                            )
                        }
                    </Modal.Footer>
                </Modal>
            )}
            {
                showGalleryModal && <IUIImageGallery
                    show={showGalleryModal}
                    searchKey="parentId"
                    searchId={selectedTask?.id}
                    module="attachment"
                    handleClose={handleCloseGalleryModal}
                    title={`Image Gallery: ${selectedTask?.name}`}
                />
            }
            {
                (checkboxes.isCompleted) && (
                    <Modal show={checkboxes.isCompleted} onHide={handleCompletionConfirmationClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>QC Assignment Confirmation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>
                                Are you sure to assign the task <strong>{selectedTask?.name}</strong> to QC?
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCompletionConfirmationClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleCompletionConfirmation}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </div>
    );
};

export default Calendar;