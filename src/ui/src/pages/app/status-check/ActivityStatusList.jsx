import { useEffect, useState } from 'react';
import { Button, Col, Row, Form } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import statusList from '../../../store/activity-status-check';
import api from '../../../store/api-service';
import { formatStringDate } from '../../../store/datetime-formatter';
import { notify } from '../../../store/notification';
import IUILookUp from '../../common/shared/IUILookUp';
import IUIPageElement from '../../common/shared/IUIPageElement';
import ActivityStatusDashboard from './ActivityDashboard';

const ActivityListByStatus = () => {
    // Properties
    const setupSchema = {
        module: 'activity',
        title: 'Work Planning',
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
                        text: 'Tower', field: 'towerId', parent: 'projectId', type: 'lookup-filter', required: true, width: 3,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'towerId',
                        field: 'floorId',
                        required: true,
                        text: 'Floor',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'floors'
                        },
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'floorId',
                        field: 'flatId',
                        required: true,
                        text: 'Flat',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'flats'
                        },
                    },
                ]
            },
        ]
    }

    const schema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        paging: true,
        searching: true,
        editing: false,
        adding: false,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Expected Start', field: 'startDate', type: 'date', sorting: true, searching: true },
            { text: 'Expected End', field: 'endDate', type: 'date', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Dependency', field: 'workflowId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'workflow' }
            }
        ]
    }

    const module = "activity";

    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const initialParams = { projectId: null, towerId: null, floorId: null, flatId: null, roomId: null, userId: loggedInUser?.id };

    // Local State
    const [dirty, setDirty] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [dependencySelectParams, setDependencySelectParams] = useState(initialParams);
    const [userList, setUserList] = useState([]);
    const [activities, setActivities] = useState([]);
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

    // 🔥 NEW STATE
    const [counts, setCounts] = useState({
        notStarted: 0,
        hold: 0,
        inprogress: 0,
        delayed: 0,
        closed: 0,
        rework: 0
    });
    const [countsByFilter, setCountsByFilter] = useState({
        notStarted: 0,
        hold: 0,
        inprogress: 0,
        delayed: 0,
        closed: 0,
        rework: 0
    });

    const [selectedStatus, setSelectedStatus] = useState(null);
    const navigate = useNavigate();

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
            console.log(response)
            const userId = response?.data?.items[0]?.id;
            setDependencySelectParams({ ...initialParams, userId: parseInt(userId) });
        }

        updateCurrentUserStatus();

        return () => {
            isMounted = false;
        };
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

    // Privileges
    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges
            ?.filter(p => p.module === module)
            ?.map(p => p.name);


        let access = {};
        modulePrivileges?.forEach(p => {
            access = { ...access, [p]: true };
        });

        setPrivileges(access);

        if (module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, module]);


    const fetchStatusCount = async (status) => {
        try {
            if (Object.keys(status.query).includes("nullValue")) {
                const activitiesByNullValue = await api.getAmendmentsByNullValue({ model: 'activity' });
                return activitiesByNullValue?.data?.length;
            }
            else if (Object.keys(status.query).includes("module")) {
                const pageOptions = {
                    recordPerPage: 0,
                }

                const response = await api.getData({ module: status.query.module, options: pageOptions });
                return response?.data?.items?.length;
            }
            else {
                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: status.query
                }

                const response = await api.getData({ module: 'activity', options: pageOptions });
                return response?.data?.items?.length;
            }
        } catch (error) {
            console.error(`Error fetching ${status.key} count`, error);
            return 0;
        }
    };

    const fetchStatusCountByFilter = async (baseFilter, status, selectedMemberActivityIds = null) => {
        try {
            if (Object.keys(status.query).includes("nullValue")) {
                const activitiesByNullValue = await api.getAmendmentsByNullValue({ model: 'activity' });
                const nullValueActivityIds = activitiesByNullValue?.data?.map(activity => activity.id);

                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: baseFilter
                }

                const response = await api.getData({ module: 'activity', options: pageOptions });
                const allActivites = response?.data?.items;

                let count = (selectedMemberActivityIds) ?
                    filterActivitiesBasedOnUser(selectedMemberActivityIds, allActivites?.filter(activity => nullValueActivityIds?.includes(activity.id)))?.length :
                    allActivites?.filter(activity => nullValueActivityIds?.includes(activity.id))?.length;

                return count;
            }
            else if (Object.keys(status.query).includes("module")) {
                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: baseFilter
                }

                const response = await api.getData({ module: status.query.module, options: pageOptions });

                let count = (selectedMemberActivityIds) ? filterActivitiesBasedOnUser(selectedMemberActivityIds, response?.data?.items)?.length : response?.data?.items?.length;

                return count;
            }
            else {
                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: {
                        ...baseFilter,
                        and: status.query
                    }
                }

                const response = await api.getData({ module: 'activity', options: pageOptions });

                let count = (selectedMemberActivityIds) ? filterActivitiesBasedOnUser(selectedMemberActivityIds, response?.data?.items)?.length : response?.data?.items?.length;

                return count;
            }
        } catch (error) {
            console.error(`Error fetching ${status.key} count`, error);
            return 0;
        }
    };

    useEffect(() => {
        const fetchAllCounts = async () => {
            try {
                const promises = statusList.map(status =>
                    fetchStatusCount(status)
                );

                const results = await Promise.all(promises);

                const countsObject = statusList.reduce((acc, status, index) => {
                    acc[status.key] = results[index];
                    return acc;
                }, {});

                setCounts(countsObject);
            } catch (error) {
                console.error("Error fetching counts", error);
            }
        };

        fetchAllCounts();
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value };
        setData(newData);
        setDependencySelectParams({ ...dependencySelectParams, ...e.target.value });
    };

    const handleUserSelection = (e) => {
        e.preventDefault();
        setDependencySelectParams({ ...dependencySelectParams, userId: e.target.value });
    }

    useEffect(() => {
        if (
            dependencySelectParams.projectId !== null &&
            dependencySelectParams.towerId !== null &&
            dependencySelectParams.floorId !== null &&
            dependencySelectParams.flatId !== null
        ) {
            setIsSetupComplete(true);
        }
    }, [dependencySelectParams]);

    const clearSelection = () => {
        window.location.reload();
    }

    const filterActivitiesBasedOnUser = (userActivityIds, originalActivityList) => {
        return originalActivityList?.filter(activity => userActivityIds?.includes(activity?.id));
    }

    const prepareActivityCreation = async () => {
        if (!selectedStatus) {
            notify("info", "Please select an activity status!");
            return;
        }

        try {
            if (dependencySelectParams.userId && dependencySelectParams?.userId !== "Select") {
                const user = await api.getSingleData({ module: 'user', id: parseInt(dependencySelectParams.userId) });
                const member = user.data?.email;

                const userActivities = await api.getActivitiesByMember({
                    data: {
                        member: member,
                        projectId: parseInt(dependencySelectParams.projectId),
                        towerId: parseInt(dependencySelectParams.towerId),
                        floorId: parseInt(dependencySelectParams.floorId),
                        flatId: parseInt(dependencySelectParams.flatId)
                    }
                });

                let selectedMemberActivityIds = userActivities?.data?.map(activity => activity?.id);

                const baseSelectQuery = {
                    name: "projectId",
                    value: parseInt(dependencySelectParams.projectId),
                    and: {
                        name: "towerId",
                        value: parseInt(dependencySelectParams.towerId),
                        and: {
                            name: "floorId",
                            value: parseInt(dependencySelectParams.floorId),
                            and: {
                                name: "flatId",
                                value: parseInt(dependencySelectParams.flatId)
                            }
                        }
                    }
                };

                // const pageOptions = {
                //     recordPerPage: 0,
                //     searchCondition: baseSelectQuery
                // }

                // const response = await api.getData({ module: 'activity', options: pageOptions });
                // setActivities(response?.data?.items);

                const selectedStatusObj = statusList.find(status => status.key === selectedStatus);

                if (!Object.keys(selectedStatusObj.query).includes("nullValue")) {
                    const pageOptions = {
                        recordPerPage: 0,
                        searchCondition: { ...selectedStatusObj.query, and: baseSelectQuery }
                    }

                    const response = await api.getData({ module: 'activity', options: pageOptions });
                    setActivities(filterActivitiesBasedOnUser(selectedMemberActivityIds, response?.data?.items));
                }
                else {
                    const activitiesByNullValue = await api.getAmendmentsByNullValue({ model: 'activity' });
                    const nullValueActivityIds = activitiesByNullValue?.data?.map(activity => activity.id);

                    const pageOptions = {
                        recordPerPage: 0,
                        searchCondition: baseSelectQuery
                    }

                    const response = await api.getData({ module: 'activity', options: pageOptions });
                    const allActivites = response?.data?.items;

                    setActivities(filterActivitiesBasedOnUser(selectedMemberActivityIds, allActivites?.filter(activity => nullValueActivityIds?.includes(activity.id))));
                }

                const promises = statusList.map(status =>
                    fetchStatusCountByFilter(baseSelectQuery, status, selectedMemberActivityIds)
                );

                const results = await Promise.all(promises);

                const countsObject = statusList.reduce((acc, status, index) => {
                    acc[status.key] = results[index];
                    return acc;
                }, {});

                setCountsByFilter(countsObject);
            }
            else {
                const baseSelectQuery = {
                    name: "projectId",
                    value: parseInt(dependencySelectParams.projectId),
                    and: {
                        name: "towerId",
                        value: parseInt(dependencySelectParams.towerId),
                        and: {
                            name: "floorId",
                            value: parseInt(dependencySelectParams.floorId),
                            and: {
                                name: "flatId",
                                value: parseInt(dependencySelectParams.flatId)
                            }
                        }
                    }
                };

                const selectedStatusObj = statusList.find(status => status.key === selectedStatus);

                if (!Object.keys(selectedStatusObj.query).includes("nullValue")) {
                    const pageOptions = {
                        recordPerPage: 0,
                        searchCondition: { ...selectedStatusObj.query, and: baseSelectQuery }
                    }

                    const response = await api.getData({ module: 'activity', options: pageOptions });
                    setActivities(response?.data?.items);
                }
                else {
                    const activitiesByNullValue = await api.getAmendmentsByNullValue({ model: 'activity' });
                    const nullValueActivityIds = activitiesByNullValue?.data?.map(activity => activity.id);

                    const pageOptions = {
                        recordPerPage: 0,
                        searchCondition: baseSelectQuery
                    }

                    const response = await api.getData({ module: 'activity', options: pageOptions });
                    const allActivites = response?.data?.items;

                    setActivities(allActivites?.filter(activity => nullValueActivityIds?.includes(activity.id)));
                }

                const promises = statusList.map(status =>
                    fetchStatusCountByFilter(baseSelectQuery, status)
                );

                const results = await Promise.all(promises);

                const countsObject = statusList.reduce((acc, status, index) => {
                    acc[status.key] = results[index];
                    return acc;
                }, {});

                setCountsByFilter(countsObject);
            }
        }
        catch (e) {
            console.error(e);
            notify("error", "Error in processing the request");
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row my-3">

                        {/* 🔥 STATUS CARDS */}
                        <div className="col-md-12 mb-3">
                            <ActivityStatusDashboard
                                counts={isSetupComplete ? countsByFilter : counts}
                                selected={selectedStatus}
                                onStatusChange={setSelectedStatus}
                            />
                        </div>

                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            {setupSchema?.fields?.map((fld, f) => (
                                                <Row key={f}>
                                                    <Col>
                                                        {fld.type === 'area' ? (
                                                            <IUIPageElement
                                                                id={setupSchema.module}
                                                                schema={fld.fields}
                                                                value={data}
                                                                errors={errors}
                                                                readonly={setupSchema.readonly}
                                                                onChange={handleChange}
                                                                dirty={dirty}
                                                            />
                                                        ) : (
                                                            <IUIPageElement
                                                                id={setupSchema.module}
                                                                schema={[fld]}
                                                                value={data}
                                                                errors={errors}
                                                                onChange={handleChange}
                                                                readonly={setupSchema.readonly}
                                                            />
                                                        )}
                                                    </Col>
                                                </Row>
                                            ))}
                                            {
                                                (isCurrentUserAdmin) && (
                                                    <div className="row">
                                                        <div className="col-md-3">
                                                            <Form.Group className="position-relative form-group">
                                                                <Form.Label className='mb-2'>
                                                                    Engineer
                                                                </Form.Label>
                                                                <div>
                                                                    < select
                                                                        aria-label={`select-dependency-for-user`}
                                                                        id={`select-dependency-for-user`}
                                                                        value={dependencySelectParams.userId}
                                                                        data-name={"userId"}
                                                                        name='select'
                                                                        className={`form-control`}
                                                                        disabled={false}
                                                                        onChange={handleUserSelection}>
                                                                        <option>--Select--</option>
                                                                        {userList?.map((item, i) => (
                                                                            <option key={i} value={item.id}>{item.name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            <Row>
                                                <Col>
                                                    <Button
                                                        variant="contained"
                                                        disabled={!isSetupComplete}
                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                        onClick={prepareActivityCreation}
                                                    >
                                                        Search
                                                    </Button>


                                                    <Button
                                                        variant="contained"
                                                        disabled={!isSetupComplete}
                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                        onClick={clearSelection}
                                                    >
                                                        Clear
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>

                        {/* 🔥 TABLE SECTION */}
                        <div className="col-md-12">
                            {(isSetupComplete && !isLoading) && (
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <Row>
                                            <Col>
                                                {activities.length > 0 ? (
                                                    <Table responsive>
                                                        <thead>
                                                            <tr>
                                                                {schema?.editing && (
                                                                    <th>
                                                                        {privileges.edit && (
                                                                            <button type="submit" className="btn btn-link text-white p-0">#</button>
                                                                        )}
                                                                    </th>
                                                                )}
                                                                {schema?.fields?.map((fld, f) => (
                                                                    <th key={f} width={fld.width}>
                                                                        <button type="submit" className="btn btn-link text-white p-0">
                                                                            {fld.text}
                                                                        </button>
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {activities.map((item, i) => (
                                                                <tr key={i}>
                                                                    {schema?.editing && (
                                                                        <td width={10}>
                                                                            {privileges.edit && (
                                                                                <Link to={`${item.id}/edit`} title='Edit'>
                                                                                    <i className="fa-solid fa-pencil"></i>
                                                                                </Link>
                                                                            )}
                                                                        </td>
                                                                    )}
                                                                    {schema?.fields?.map((fld, f) => (
                                                                        <td key={f}>
                                                                            {fld.type === 'link' && (
                                                                                <Link to={`${item.id}`}>
                                                                                    {item[fld.field]}
                                                                                </Link>
                                                                            )}
                                                                            {(!fld.type || fld.type === 'text') && item[fld.field]}
                                                                            {fld.type === 'date' && item[fld.field] && formatStringDate(item[fld.field])}
                                                                            {fld.type === 'date' && !item[fld.field] && 'Not Provided'}
                                                                            {fld.type === 'lookup' && (
                                                                                <IUILookUp
                                                                                    value={item[fld.field]}
                                                                                    schema={fld.schema}
                                                                                    readonly={true}
                                                                                    textonly={true}
                                                                                />
                                                                            )}
                                                                        </td>
                                                                    ))}
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                ) : <strong>No Activities found based on the given condition</strong>}
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ActivityListByStatus;
