import { format, isSameDay, startOfToday } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import api from '../../store/api-service';

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
    curing: false
  });
  const [progress, setProgress] = useState("");
  const [actualCost, setActualCost] = useState(0);




  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  async function fetchData() {
    const pageOptions = {
      recordPerPage: 0
    }

    const response = await api.getData({ module: "activity", options: pageOptions });

    setTasks(response.data.items);

  }

  useEffect(() => {
    // async function fetchData() {
    //   const pageOptions = {
    //     recordPerPage: 0
    //   }

    //   const response = await api.getData({ module: "activity", options: pageOptions });

    //   setTasks(response.data.items);

    // }

    fetchData();
  }, [module]);

  const handleMonthChange = (event) => {
    const newDate = new Date(date);
    newDate.setMonth(event.target.value);
    setDate(newDate);
  };

  const handleYearChange = (event) => {
    const newDate = new Date(date);
    newDate.setFullYear(event.target.value);
    setDate(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  const handleToday = () => {
    setDate(new Date());
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
    console.log(day);
    const filteredTasks = tasks.filter(task => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      const selectedDateObj = new Date(date.getFullYear(), date.getMonth(), day);
      return selectedDateObj >= taskStartDate && selectedDateObj <= taskEndDate;
    });
    setSelectedTasks(filteredTasks);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTaskClick = (task) => {
    // navigate(`/activities/${task.id}/edit`);
    setSelectedTask(task);
    setProgress(parseFloat(task.progressPercentage));
    setActualCost(parseFloat(task.actualCost));
    setTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setTaskModalOpen(false);
  };

  const handleSave = async () => {
    const updatedData = {
      ...selectedTask,
      // checkboxes,
      progressPercentage: progress,
      actualCost: parseFloat(actualCost)
    };

    try {
      const response = api.editData({ module: 'activity', data: updatedData });
      if (response.status === 200) {
        console.log('Data saved successfully!');
        closeTaskModal();


      } else {
        console.log('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      console.log('An error occurred while saving data.');
    } finally {
      setProgress("");
      setActualCost("");
      setCheckboxes({
        hold: false,
        change: false,
        eng: false,
        curing: false
      });
      closeTaskModal();
      closeModal();
      await fetchData();    
    }
};

const renderCalendar = () => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const lastDay = new Date(year, month, lastDate).getDay();
  const todayDate = startOfToday();

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let day = 1; day <= lastDate; day++) {
    days.push(day);
  }
  for (let i = 0; i < 6 - lastDay; i++) {
    days.push(null);
  }

  return days.map((day, index) => {
    const isToday = day === todayDate.getDate() && month === todayDate.getMonth() && year === todayDate.getFullYear();
    const isSelected = selectedDate === day;
    const taskCount = day ? tasks.filter(task => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      const currentDate = new Date(year, month, day);
      return currentDate >= taskStartDate && currentDate <= taskEndDate;
    }).length : 0;

    return (
      <button
        key={index}
        className={`cal-calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
        onClick={() => day && handleDateClick(day)}
        disabled={day === null} // Disable empty cells
      >
        {day || ''}
        {taskCount > 0 && <span className="cal-task-count">{taskCount}</span>}
      </button>
    );
  });
};

return (
  <div className="cal-calendar">
    <div className="cal-calendar-header">
      <button onClick={handleToday}>Today</button>
      <button onClick={handlePrevMonth}>Prev</button>
      <select value={date.getMonth()} onChange={handleMonthChange}>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select value={date.getFullYear()} onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <button onClick={handleNextMonth}>Next</button>
    </div>
    <div className="cal-calendar-weekdays">
      {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day, index) => (
        <div key={index} className="cal-calendar-weekday">
          {day}
        </div>
      ))}
    </div>
    <div className="cal-calendar-grid">
      {renderCalendar()}
    </div>
    {modalOpen && (
      <div className="cal-modal">
        <div className="cal-modal-content">
          <span className="cal-close" onClick={closeModal}>&times;</span>
          <h2>Tasks For Date: {format(new Date(date.getFullYear(), date.getMonth(), selectedDate), 'dd-MM-yyyy')}</h2>
          {selectedTasks.length > 0 ? (
            selectedTasks.map(task => (
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
          <span className="cal-close" onClick={closeTaskModal}>&times;</span>
          <h2>{format(new Date(date.getFullYear(), date.getMonth(), selectedDate), 'dd-MM-yyyy')}</h2>
          <h3>{selectedTask.name}</h3>
          <Form className='cal-form'>
            <Form.Label>Contractor Name</Form.Label>
            <Form.Control type="text" disabled={true} value={selectedTask.member} />
            {/* {console.log(selectedTask.startDate)}
              {console.log(startOfToday())} */}
            {console.log(selectedTask)}

            {/* <Form.Label>Location</Form.Label>
              <Form.Control type="text" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} /> */}

            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" disabled={true} value={new Date(selectedTask.startDate).toISOString().substring(0, 10)} />
            {console.log(format(new Date(selectedTask.startDate), 'dd-MM-yyyy'))}

            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" disabled={true} value={new Date(selectedTask.endDate).toISOString().substring(0, 10)} />

            <Form.Label>Actual Start Date</Form.Label>
            <Form.Control type="date" disabled={true} value={selectedTask.actualStartDate ? new Date(selectedTask.actualStartDate).toISOString().substring(0, 10) : ""} placeholder="dd-mm-yyyy" />

            <Form.Label>Actual End Date</Form.Label>
            <Form.Control type="date" disabled={true} value={selectedTask.actualEndDate ? new Date(selectedTask.actualEndDate).toISOString().substring(0, 10) : ""} placeholder="dd-mm-yyyy" />

            <div>

              <Form.Check type="checkbox" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} label="Hold" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, hold: e.target.checked })} checked={checkboxes.hold} />

              <Form.Check type="checkbox" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} label="Change" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, change: e.target.checked })} checked={checkboxes.change} />

              <Form.Check type="checkbox" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} label="Eng" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, eng: e.target.checked })} checked={checkboxes.eng} />

              <Form.Check type="checkbox" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} label="Curing" className="d-flex align-items-center" onChange={(e) => setCheckboxes({ ...checkboxes, curing: e.target.checked })} checked={checkboxes.curing} />

            </div>

            <Form.Label>Cost</Form.Label>
            <Form.Control type="text" disabled={true} value={selectedTask.costEstimate} />

            <Form.Label>Actual Cost</Form.Label>
            <Form.Control type="number" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} value={actualCost}
              onChange={(e) => setActualCost(e.target.value)} />

            {/* <Form.Label>Work Tag on</Form.Label>
              <Form.Control type="text" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} />

              <Form.Label>Watcher</Form.Label>
              <Form.Control type="text" disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())} /> */}

            <Form.Label >Progress</Form.Label>
            <Form.Control type="text"
              disabled={!isSameDay(new Date(date.getFullYear(), date.getMonth(), selectedDate), startOfToday())}
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              placeholder="00.00%" />
          </Form>
          <br />
          <button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
        </div>
      </div>
    )}
  </div>
);
};

export default Calendar;
