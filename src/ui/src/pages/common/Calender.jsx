import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { format, isSameDay, startOfToday } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { FaRegCommentDots } from "react-icons/fa";
import { FaImage, FaTrashCan, FaTable } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setSave } from '../../store/api-db';
import api from '../../store/api-service';
import { notify } from "../../store/notification";
import CommentsModal from '../app/status-check/CommentsModal';
import ReportModal from '../app/status-check/ReportModal';
import IUIImageGallery from './shared/IUIImageGallery';
import IUITableInput from './shared/IUITableInput';
import IUIStatusBadge from './shared/IUIStatusBadge';
import IUIPageElement from './shared/IUIPageElement';


const Calendar = () => {
    const [workType, setWorkType] = useState("Inside");
    const [selectedDate, setSelectedDate] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [dailyActivityTrackingData, setDailyActivityTrackingData] = useState([]);
    const [dayData, setDayData] = useState({});
    const [mainModalOpen, setMainModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMainTasks, setSelectedMainTasks] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [showGalleryModal, setShowGalleryModal] = useState(false);
    const [checkboxes, setCheckboxes] = useState({
        isCuringDone: false,
        isCompleted: false
    });
    const [progress, setProgress] = useState(0);
    // const [previousProgress, setPreviousProgress] = useState(0);
    const [blueprint, setBlueprint] = useState("");
    const [itemList, setItemList] = useState('');
    const [actualCost, setActualCost] = useState(0);
    const [manPower, setManPower] = useState(0);
    const [privileges, setPrivileges] = useState({});
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [error, setError] = useState(null);
    const [canvasSchema, setCanvasSchema] = useState({
        text: 'Activity Blueprint', field: 'photoUrl', placeholder: 'Flat Blueprint here...', type: 'ilab-canvas', shape: 'rect',
        imageModule: 'plan',
        schema: {
            readonly: true,
            upload: false,
            save: false,
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
    const [itemListSchema, setItemListSchema] = useState(
        {
            text: 'Item List', field: 'item', width: 12, type: 'table-input', required: false, readonly: true,
            schema: {
                title: 'Item',
                module: 'activitytracking',
                readonly: true,
                paging: true,
                searching: true,
                editing: true,
                adding: true,
                fields: [
                    {
                        text: 'Item', field: 'itemId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'asset' }
                    },
                    { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
                    {
                        text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'uom' }
                    },
                ]
            }
        }
    );
    const dispatch = useDispatch();
    const [taskStatus, setTaskStatus] = useState('');
    const [deleteWorkItems, setDeleteWorkItems] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [monthData, setMonthData] = useState({});
    const [currentViewDate, setCurrentViewDate] = useState(null);
    const currentViewDateRef = useRef(null);
    const [errors, setErrors] = useState({});

    // Simple inline styles
    const deleteCardStyles = {
        card: {
            position: 'relative',
            width: '280px',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            margin: '10px'
        },
        deleteButton: {
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#cc0000',
            fontSize: '16px'
        },
        info: {
            marginTop: '8px'
        }
    };

    // For Searching based on Project And Tower
    const initialParams = {
        projectId: null,
        towerId: null,
        userId: loggedInUser?.email
    };
    const [searchParams, setSearchParams] = useState(initialParams);
    const [userList, setUserList] = useState([]);
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

    const searchSchema = {
        module: 'activity',
        title: 'Work Reporting',
        path: 'works',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 3,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-tower',
                        parent: 'projectId',
                        field: 'towerId',
                        required: true,
                        text: 'Tower',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "projectId",
                            path: 'towers'
                        },
                    }
                ]
            },
        ]
    }

    //  Handle Filter Change
    const handleChange = (e) => {
        e.preventDefault();

        const updatedValues = e.target.value;

        setSearchParams(prev => ({
            ...prev,
            ...updatedValues
        }));
    };

    const handleUserSelection = (e) => {
        e.preventDefault();
        setSearchParams({ ...searchParams, userId: e.target.value });
    }

    const handleApplyFilters = async () => {
        await fetchMonthData(
            currentViewDateRef.current,
            workType,
            searchParams.projectId,
            searchParams.towerId,
            searchParams.userId
        );
    };

    useEffect(() => {
        const imagePrivileges = loggedInUser?.privileges?.filter(p => p.module === "attachment")?.map(p => p.name);
        const activityTrackingPrivileges = loggedInUser?.privileges?.filter(p => p.module === "activityTracking")?.map(p => p.name);
        let access = {};

        imagePrivileges.forEach(p => {
            access["image"] = { ...access["image"], ...{ [p]: true } }
        })
        activityTrackingPrivileges.forEach(p => {
            access["activitytracking"] = { ...access["activitytracking"], ...{ [p]: true } }
        })
        setPrivileges(access)
    }, [loggedInUser]);

    useEffect(() => {
        let isMounted = true;

        const fetchUserList = async () => {
            try {
                const pageOptions = {
                    recordPerPage: 0,
                };

                const response = await api.getData({
                    module: "user",
                    options: pageOptions
                });


                if (isMounted) {
                    setUserList(response?.data?.items);
                }
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        };

        if (
            loggedInUser?.roles?.some(role => role?.includes("Head")) ||
            loggedInUser?.roles?.some(role => role?.includes("Admin"))
        ) {
            fetchUserList();
        }

        return () => {
            isMounted = false;
        };
    }, [loggedInUser, api]);

    useEffect(() => {
        let isMounted = true;

        const updateCurrentUserStatus = async () => {
            let isAdmin = false;
            loggedInUser?.roles?.forEach((role) => {
                if (role?.includes("Head") || role?.includes("Admin")) {
                    isAdmin = true;
                }
            });
            setIsCurrentUserAdmin(isAdmin);

            const baseFilter = {
                name: 'email',
                value: loggedInUser?.email
            }

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: baseFilter
            };

            const response = await api.getData({
                module: "user",
                options: pageOptions
            });

            const userId = response?.data?.items[0]?.email;
            setSearchParams({ ...initialParams, userId: userId });
        }

        updateCurrentUserStatus();

        return () => {
            isMounted = false;
        };
    }, [loggedInUser]);

    const fetchMonthData = async (viewDate, type, projectId = null, towerId = null, userId = null) => {
        if (!viewDate || !type) return;

        const response = await api.getWorkCountByMonth({
            data: {
                type,
                month: viewDate.getMonth() + 1,
                year: viewDate.getFullYear(),
                projectId,
                towerId,
                userId
            }
        });

        const dataMap = {};

        response.data.forEach(item => {
            const [day, month, year] = item.date.split('-');
            dataMap[`${year}-${month}-${day}`] = item.count;
        });

        setMonthData(dataMap);
    };

    const handleDatesSet = async (info) => {
        currentViewDateRef.current = info.view.currentStart;

        await fetchMonthData(
            info.view.currentStart,
            workType,
            searchParams.projectId,
            searchParams.towerId,
            searchParams.userId
        );
    };

    function getPreviousDay(dateString) {
        // Convert the string to a Date object
        let date = new Date(dateString);

        // Subtract one day
        date.setDate(date.getDate() - 1);

        // Return the date in "YYYY-MM-DD" format
        return date.toISOString().split('T')[0];
    }

    // This function will fetch data for a specific day activity tracking
    const fetchTrackingDataForDate = async (date) => {
        // Simulating a fetch request for data based on the date (e.g., from an API)
        const timeStamp = new Date(date).getTime(); // check if new Date() is required
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
        return trackingData;
    };

    useEffect(() => {
        if (currentViewDateRef.current) {
            fetchMonthData(
                currentViewDateRef.current,
                workType,
                searchParams.projectId,
                searchParams.towerId,
                searchParams.userId
            );
        }
    }, [workType]);


    // Handle date clicks in FullCalendar
    const handleDateClick = async (info) => {
        const clickedDate = new Date(info.date);

        setSelectedDate(clickedDate);

        const activeWorksResponse = await api.getActiveWorksByDay({
            data: {
                type: workType,
                day: clickedDate.getDate(),
                month: clickedDate.getMonth() + 1,
                year: clickedDate.getFullYear(),
                projectId: searchParams.projectId,
                towerId: searchParams.towerId
            }
        });

        const activeWorks = activeWorksResponse?.data || [];

        // Enable editing only for today
        if (isSameDay(clickedDate, startOfToday())) {
            setCanvasSchema({
                ...canvasSchema,
                schema: {
                    ...canvasSchema.schema,
                    readonly: false,
                    save: true,
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
            });

            setItemListSchema({
                ...itemListSchema,
                readonly: false,
                schema: {
                    ...itemListSchema.schema,
                    readonly: false
                }
            });
        }

        setSelectedMainTasks(activeWorks);
        setMainModalOpen(true);
    };

    const handleProgressSliderChange = (event) => {
        setProgress(parseInt(event.target.value, 10));
    };

    const handleBlueprintChange = (event) => {
        event.preventDefault();
        setBlueprint(event.target.value);
    }

    const handleItemListChange = (event) => {
        event.preventDefault();
        setItemList(event.target.value);
    }

    // Handle task clicks in the date modal
    const handleTaskClick = async (task) => {
        const today = new Date();
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        const todayEnd = new Date(today.setHours(23, 59, 59, 999));

        const baseFilter = {
            name: 'activityId',
            value: parseInt(task.id),
            and: {
                name: 'date',
                value: todayStart,
                operator: 'greaterThan',
                and: {
                    name: 'date',
                    value: todayEnd,
                    operator: 'lessThan'
                }
            }
        };

        const pageOptions = {
            recordPerPage: 0,
            searchCondition: baseFilter
        };

        const response = await api.getData({ module: 'activitytracking', options: pageOptions });
        const trackingData = response?.data?.items?.sort((t1, t2) => new Date(t2.date) - new Date(t1.date));

        if (trackingData?.length > 0) {
            const latestTrackingData = trackingData[0];

            setActualCost(parseFloat(latestTrackingData.cost));
            setManPower(latestTrackingData.manPower);
            setItemList(latestTrackingData?.item);
        }
        else {
            setActualCost(task?.actualCost);
            setManPower(0);
        }

        //console.log(trackingData);

        const latestTaskItem = await api.getSingleData({ module: 'activity', id: parseInt(task.id) });
        const taskDetails = latestTaskItem.data;

        setSelectedTask(taskDetails);
        setProgress(parseInt(taskDetails.progressPercentage, 10));
        if (taskDetails?.isOnHold) {
            setTaskStatus('onHold');
        }
        else if (taskDetails?.isCancelled) {
            setTaskStatus('Cancelled');
        }
        else if (taskDetails?.isAbandoned) {
            setTaskStatus('Abandoned');
        }

        setBlueprint(taskDetails?.photoUrl);
        if (!isSameDay(selectedDate, startOfToday()) || taskDetails?.isCompleted) {
            setCanvasSchema(
                {
                    ...canvasSchema,
                    schema: {
                        ...canvasSchema.schema,
                        // parentId: parseInt(task?.parentId ? task.parentId : task.id),
                        parentId: -1,
                        readonly: true,
                        save: false,
                        controls: {
                            ...canvasSchema.schema.controls,
                            balloon: false,
                            rectangle: false,
                            pencil: false,
                            camera: false,
                            delete: false,
                            reset: false
                        }
                    }
                }
            );
            setItemListSchema(
                {
                    ...itemListSchema,
                    readonly: true,
                    schema: {
                        ...itemListSchema.schema,
                        readonly: true
                    }
                }
            );
        }
        else {
            setCanvasSchema(
                {
                    ...canvasSchema,
                    schema: {
                        ...canvasSchema.schema,
                        // parentId: parseInt(task?.parentId ? task.parentId : task.id),
                        parentId: -1,
                        readonly: false,
                        save: true,
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
            setItemListSchema(
                {
                    ...itemListSchema,
                    readonly: false,
                    schema: {
                        ...itemListSchema.schema,
                        readonly: false
                    }
                }
            );
        }
        // setPreviousProgress(parseInt(task.progressPercentage, 10));
        setActualCost(parseFloat(taskDetails.actualCost));
        setSelectedActivityId(task.id);
        setTaskModalOpen(true); // Open the modal for the task
    };

    const handleGalleryClick = async (task) => {
        setSelectedTask(task);
        setShowGalleryModal(true);
    };

    const handleDeleteWork = async (task) => {
        const today = new Date(selectedDate);
        const todayStart = new Date(today.setHours(0, 0, 0, 0));
        const todayEnd = new Date(today.setHours(23, 59, 59, 999));

        const baseFilter = {
            name: 'activityId',
            value: parseInt(task.id),
            and: {
                name: 'date',
                value: todayStart,
                operator: 'greaterThan',
                and: {
                    name: 'date',
                    value: todayEnd,
                    operator: 'lessThan'
                }
            }
        };

        const pageOptions = {
            recordPerPage: 0,
            searchCondition: baseFilter
        };

        const response = await api.getData({ module: 'activitytracking', options: pageOptions });
        const trackingData = response?.data?.items?.sort((t1, t2) => new Date(t2.date) - new Date(t1.date));
        setDeleteWorkItems(trackingData);
        setShowDeleteModal(true);
    }

    const handleCloseGalleryModal = () => {
        setShowGalleryModal(false);
        setSelectedTask(null);
    };

    // Close the date modal
    const closeModal = () => {
        setModalOpen(false);
        // window.location.reload();
    };

    const closeMainModal = () => {
        setMainModalOpen(false);
    }
    // Close the task modal
    const closeTaskModal = () => {
        setTaskModalOpen(false);
    };

    const handleCompletionConfirmationClose = () => {
        setCheckboxes({ ...checkboxes, isCompleted: false });
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setDeleteWorkItems([]);
    }

    const onDeleteWorkItem = (e, workItem) => {
        e.preventDefault();

        api.deleteData({ module: 'activitytracking', id: workItem.id });
        dispatch(setSave({ module: 'activitytracking' }));

        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            notify("success", "Work item deletion successful");
            setShowDeleteModal(false);
            setDeleteWorkItems([]);
        }, 1000)

        return () => {
            clearTimeout(timeId)
        }
    }

    const handleCompletionConfirmation = async () => {
        try {
            // Fetch List of users who are assigned that activity
            let allUsersResponse = await api.assignedUsers({ module: "activity", id: selectedTask?.id });

            // Filter users with Role QC Engineer
            let userList = allUsersResponse?.data?.filter(item => `${item?.member}`.toLowerCase().includes("qc"));

            const updatedData_a = {
                ...selectedTask,
                actualCost: parseFloat(actualCost),
                progressPercentage: progress,
                status: 2,
                isCompleted: userList?.length > 0 ? true : false
            };

            const updateData_b = {
                activityId: selectedTask.id,
                manPower: parseInt(manPower),
                item: itemList,
                cost: parseFloat(actualCost),
                isOnHold: taskStatus === 'onHold',
                isCancelled: taskStatus === 'Cancelled',
                isCuringDone: checkboxes.isCuringDone,
                name: selectedTask.name
            };

            await api.editData({ module: 'activity', data: updatedData_a });
            await api.addData({ module: 'activitytracking', data: updateData_b });

            if (userList?.length > 0) {
                for (let user of userList) {
                    const action = { module: "activity", data: { id: selectedTask?.id, member: user?.member, status: 2, modifiedBy: loggedInUser?.email } }
                    try {
                        await api.editPartialData(action);
                        dispatch(setSave({ module: "activity" }))
                        //navigate(-1);
                    } catch (e) {
                        // TODO
                    }
                }
                notify("success", "Assignment to QC Successful");
            }
            else {
                notify("info", "No QC Engineer has been assigned for this work till now. Contact your HOD");
            }
        }
        catch (error) {

        } finally {
            setProgress('');
            setActualCost(0);
            setBlueprint([]);
            setItemList('');
            setCheckboxes({
                isOnHold: false,
                isCancelled: false,
                isAbandoned: false,
                isCuringDone: false,
                isCompleted: false
            });
            closeTaskModal();
            // closeModal();
            // await fetchData(workType);
        }
    }

    const handleCommentClick = (id) => {
        setSelectedActivityId(id);
        setCommentsModalOpen(true);
    };

    const closeCommentsModal = () => {
        setCommentsModalOpen(false);
        setSelectedActivityId(null);
    };

    const renderDateCell = (cellInfo) => {
        const cellDate = cellInfo.date;

        const dateStr =
            cellDate.getFullYear() +
            '-' +
            String(cellDate.getMonth() + 1).padStart(2, '0') +
            '-' +
            String(cellDate.getDate()).padStart(2, '0');

        const taskCount = monthData[dateStr] || 0;

        return (
            <div className="day-cell-content">
                <span className="day-number">
                    {cellInfo.dayNumberText}
                </span>

                {taskCount > 0 && (
                    <div className="task-count-badge bg-primary">
                        {taskCount}
                    </div>
                )}
            </div>
        );
    };

    const handleStatusChange = (status) => {
        setTaskStatus(status);
    };

    return (
        <>
            <div className='mb-2'>
                {/* <div className="app-page-title">
                    <div className="page-title-heading"> {props?.setupSchema?.title}</div>
                </div> */}
                <div>
                    <div className="card shadow-sm p-2">
                        <div className="d-flex flex-column flex-md-row gap-3">
                            <strong className="mb-0">Select Work Type:</strong>
                            <div className="d-flex gap-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        id="inside"
                                        value="Inside"
                                        checked={workType === "Inside"}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setWorkType(value);
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="inside">
                                        Inside
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        id="outside"
                                        value="Outside"
                                        checked={workType === "Outside"}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setWorkType(value);
                                        }}
                                    />
                                    <label className="form-check-label" htmlFor="outside">
                                        Outside
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  FILTER SECTION */}
                <div>
                    <div className="card shadow-sm">
                        <div className="card-body">

                            {searchSchema?.fields?.map((fld, f) => (
                                <Row key={f}>
                                    <Col>
                                        <IUIPageElement
                                            id={searchSchema.module}
                                            schema={fld.type === 'area' ? fld.fields : [fld]}
                                            value={searchParams}
                                            errors={errors}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Row>
                            ))}

                            {
                                (isCurrentUserAdmin) && (
                                    <div className="col-md-3">
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label>
                                                Engineer
                                            </Form.Label>
                                            <div>
                                                < select
                                                    aria-label={`select-user`}
                                                    id={`select-user`}
                                                    value={searchParams.userId}
                                                    data-name={"userId"}
                                                    name='select'
                                                    className={`form-control`}
                                                    disabled={false}
                                                    onChange={handleUserSelection}>
                                                    <option>--Select--</option>
                                                    {userList?.map((item, i) => (
                                                        <option key={i} value={item.email}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </Form.Group>
                                    </div>
                                )
                            }

                            <Button
                                className="btn btn-pill btn-primary mr-2"
                                onClick={handleApplyFilters}
                            >
                                Apply Filters
                            </Button>

                            <Button
                                className="btn btn-pill btn-secondary"
                                onClick={() => window.location.reload()}
                            >
                                Clear
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
            <div >
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    dateClick={handleDateClick}
                    dayCellContent={renderDateCell}
                    datesSet={handleDatesSet}
                />
                {mainModalOpen && (
                    <Modal show={mainModalOpen} onHide={closeMainModal} >
                        <Modal.Header>
                            <Modal.Title>Tasks For Date: {format(selectedDate, 'dd-MM-yyyy')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body size='md' style={{ color: "black", maxHeight: '80vh', overflowY: 'auto' }}>
                            {selectedMainTasks?.length > 0 ? (
                                selectedMainTasks.map((task) => (
                                    <div className='d-grid gap-2 mb-2' key={`Task-${task.id}`}>
                                        <div className="row">
                                            <div className="col-6">
                                                <Button
                                                    variant="contained"
                                                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-md btn-primary'
                                                    onClick={() => handleTaskClick(task)}
                                                    style={{ width: '100%' }}
                                                >
                                                    {task.name}
                                                    {task.curingStatus && <span className="badge badge-warning" >C</span>}
                                                    <IUIStatusBadge
                                                        value={task.status}
                                                    />
                                                </Button>
                                            </div>
                                            <div className="col-2 d-flex align-items-center">
                                                <Button
                                                    title='Comments'
                                                    variant="contained"
                                                    className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary'
                                                    onClick={() => handleCommentClick(task.id)}
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
                                            {
                                                (privileges?.activitytracking?.delete) && (
                                                    <div className="col-2 d-flex align-items-center">
                                                        <Button
                                                            title='Report List'
                                                            variant="contained"
                                                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success'
                                                            onClick={() => handleDeleteWork(task)}
                                                            style={{ width: '100%' }}
                                                        >
                                                            <FaTable size={14} className='text-center' />
                                                        </Button>
                                                    </div>
                                                )
                                            }
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
                                onClick={closeMainModal}
                            >
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
                <ReportModal
                    activityId={selectedActivityId}
                    show={taskModalOpen}
                    reportDate={selectedDate}
                    submitDisabled={!isSameDay(selectedDate, startOfToday()) || selectedTask?.isCompleted || [5, 12].includes(selectedTask?.status)}
                    onClose={() => {
                        setTaskModalOpen(false);
                    }}
                />
                <CommentsModal
                    show={commentsModalOpen}
                    onClose={closeCommentsModal}
                    activityId={selectedActivityId}
                />
                {
                    showGalleryModal && <IUIImageGallery
                        show={showGalleryModal}
                        searchKey="parentId"
                        searchId={selectedTask?.id}
                        searchModule="activity"
                        handleClose={handleCloseGalleryModal}
                        title={`Image Gallery: ${selectedTask?.name}`}
                    />
                }
                {
                    (showDeleteModal) && (
                        <Modal show={showDeleteModal} onHide={handleDeleteModalClose} size='lg'>
                            <Modal.Header closeButton>
                                <Modal.Title>Work Reports For Date: {format(selectedDate, 'dd-MM-yyyy')}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>
                                    {
                                        (deleteWorkItems.length > 0) && (
                                            deleteWorkItems?.map((workItem, index) => (

                                                <Card key={`tracking_${index}`}>
                                                    <button onClick={(e) => onDeleteWorkItem(e, workItem)} style={deleteCardStyles.deleteButton}>
                                                        <FaTrashCan />
                                                    </button>
                                                    <Card.Body>
                                                        <p><strong>Cost:</strong> Rs.{workItem.cost}</p>
                                                        <p><strong>Manpower:</strong> {workItem.manPower}</p>
                                                        <p><strong>Progress:</strong> {workItem.progressPercentage}</p>
                                                        <div>
                                                            <strong>Items:</strong>
                                                            <IUITableInput
                                                                id={itemListSchema.field}
                                                                value={workItem.item}
                                                                schema={itemListSchema.schema}
                                                                onChange={handleItemListChange}
                                                                readonly={true}
                                                            />
                                                        </div>
                                                    </Card.Body>
                                                </Card>

                                            ))
                                        )
                                    }
                                </p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleDeleteModalClose}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )
                }
            </div>
        </>
    );
};

export default Calendar;