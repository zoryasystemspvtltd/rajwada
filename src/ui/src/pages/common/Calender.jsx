import { format, isSameDay, startOfToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, InputGroup } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../../store/api-service';
// import './Calendar.css'; // Assuming you have a CSS file for styling

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [checkboxes, setCheckboxes] = useState({
        hold: false,
        change: false,
        eng: false,
        curing: false,
    });
    const [progress, setProgress] = useState('');
    const [actualCost, setActualCost] = useState(0);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    // Fetch tasks from the API
    async function fetchData() {
        // setLoading(true);
        // setError(null);
        try {
            const pageOptions = {
                recordPerPage: 0,
            };

            const response = await api.getData({ module: 'activity', options: pageOptions });
            setTasks(response.data.items);
        } catch (error) {
            setError('Failed to fetch tasks');
        } finally {
            // setLoading(false);
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

    // Close the date modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Close the task modal
    const closeTaskModal = () => {
        setTaskModalOpen(false);
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

    // if (loading) {
    //   return <div>Loading...</div>;
    // }

    // if (error) {
    //   return <div>Error: {error}</div>;
    // }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={handleDateClick}
                dayCellContent={renderDateCell}
            />

            {
                (modalOpen) && <Modal show={modalOpen} onHide={closeModal}>
                    <Modal.Header>
                        <Modal.Title>Tasks For Date: {format(selectedDate, 'dd-MM-yyyy')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ color: "black" }}>
                        {
                            (selectedTasks.length > 0) ?
                                (
                                    selectedTasks.map((task) => (
                                        <div className='d-grid gap-2' key={`Task-${task.id}`}>
                                            <Button
                                                variant="contained"
                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-lg btn-primary'
                                                onClick={() => handleTaskClick(task)}
                                            >
                                                {task.name}
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p>No task assigned</p>
                                )
                        }
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
            }


            {
                (taskModalOpen && selectedTask) && (
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
                )
            }
        </div>
    );
};

export default Calendar;
