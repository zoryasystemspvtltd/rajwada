import { format, isSameDay, startOfToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
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
      <div>
        {cellInfo.dayNumberText}
        {taskCount > 0 && (
          <span style={{ marginLeft: '5px', color: 'red', fontWeight: 'bold' }}>
            {taskCount}
          </span>
        )}
      </div>
      // <div style={{ position: 'relative', height: '100%' }}>
      //   <div style={{ position: 'absolute', top: 0, left: 0 }}>
      //     {cellInfo.dayNumberText}
      //   </div>
      //   {taskCount > 0 && (
      //     <div
      //       style={{
      //         position: 'absolute',
      //         bottom: 0,
      //         left: 0,
      //         backgroundColor: 'red',
      //         color: 'white',
      //         borderRadius: '50%',
      //         width: '20px',
      //         height: '20px',
      //         display: 'flex',
      //         alignItems: 'center',
      //         justifyContent: 'center',
      //         fontSize: '12px',
      //       }}
      //     >
      //       {taskCount}
      //     </div>
      //   )}
      // </div>
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

      {modalOpen && (
        <div className="cal-modal">
          <div className="cal-modal-content">
            <span className="cal-close" onClick={closeModal}>
              &times;
            </span>
            <h2>Tasks For Date: {format(selectedDate, 'dd-MM-yyyy')}</h2>
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task) => (
                <button key={task.id} className="cal-task-button" onClick={() => handleTaskClick(task)}>
                  {task.name}
                </button>
              ))
            ) : (
              <p>No task assigned</p>
            )}
          </div>
        </div>
      )}

      {taskModalOpen && selectedTask && (
        <div className="cal-modal">
          <div className="cal-modal-content">
            <span className="cal-close" onClick={closeTaskModal}>
              &times;
            </span>
            <h2>{format(selectedDate, 'dd-MM-yyyy')}</h2>
            <h3>{selectedTask.name}</h3>
            <Form className="cal-form">
              <Form.Label>Contractor Name</Form.Label>
              <Form.Control type="text" disabled={true} value={selectedTask.member} />
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" disabled={true} value={new Date(selectedTask.startDate).toISOString().substring(0, 10)} />
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" disabled={true} value={new Date(selectedTask.endDate).toISOString().substring(0, 10)} />
              <Form.Label>Actual Start Date</Form.Label>
              <Form.Control type="date" disabled={true} value={selectedTask.actualStartDate ? new Date(selectedTask.actualStartDate).toISOString().substring(0, 10) : ''} placeholder="dd-mm-yyyy" />
              <Form.Label>Actual End Date</Form.Label>
              <Form.Control type="date" disabled={true} value={selectedTask.actualEndDate ? new Date(selectedTask.actualEndDate).toISOString().substring(0, 10) : ''} placeholder="dd-mm-yyyy" />
              <div>
                <Form.Check type="checkbox" disabled={!isSameDay(selectedDate, startOfToday())} label="Hold" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, hold: e.target.checked })} checked={checkboxes.hold} />
                <Form.Check type="checkbox" disabled={!isSameDay(selectedDate, startOfToday())} label="Change" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, change: e.target.checked })} checked={checkboxes.change} />
                <Form.Check type="checkbox" disabled={!isSameDay(selectedDate, startOfToday())} label="Eng" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, eng: e.target.checked })} checked={checkboxes.eng} />
                <Form.Check type="checkbox" disabled={!isSameDay(selectedDate, startOfToday())} label="Curing" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, curing: e.target.checked })} checked={checkboxes.curing} />
              </div>
              <Form.Label>Cost</Form.Label>
              <Form.Control type="text" disabled={true} value={selectedTask.costEstimate} />
              <Form.Label>Actual Cost</Form.Label>
              <Form.Control type="number" disabled={!isSameDay(selectedDate, startOfToday())} value={actualCost} onChange={(e) => setActualCost(e.target.value)} />
              <Form.Label>Progress</Form.Label>
              <Form.Control type="text" disabled={!isSameDay(selectedDate, startOfToday())} value={progress} onChange={(e) => setProgress(e.target.value)} placeholder="00.00%" />
            </Form>
            <br />
            <button type="button" onClick={handleSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
