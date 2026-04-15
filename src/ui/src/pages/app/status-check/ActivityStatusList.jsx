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
                        text: 'Work Type', field: 'type', type: 'lookup', required: true, width: 3,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'inside' },
                                { name: 'outside' }
                            ]
                        }
                    },
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
        linkField: "activityId",
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Expected Start Date', field: 'expectedStartDate', type: 'date', sorting: true, searching: true },
            { text: 'Expected End Date', field: 'expectedEndDate', type: 'date', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false }
        ]
    }

    const module = "activity";

    const loggedInUser = useSelector((state) => state.api.loggedInUser);

    const initialParams = {
        type: "inside",
        projectId: null,
        towerId: null,
        floorId: null,
        flatId: null,
        roomId: null,
        userId: loggedInUser?.email
    };

    const [data, setData] = useState({});
    const [userList, setUserList] = useState([]);
    const [errors, setErrors] = useState({});
    const [activities, setActivities] = useState([]);
    const [rawResponse, setRawResponse] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [counts, setCounts] = useState({
        notStarted: 0,
        hold: 0,
        inProgress: 0,
        delayed: 0,
        closed: 0,
        rework: 0
    });

    const [selectedStatus, setSelectedStatus] = useState("notStarted");
    const [dependencySelectParams, setDependencySelectParams] = useState(initialParams);
    const [isLoading, setIsLoading] = useState(false);
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

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
            setDependencySelectParams({ ...initialParams, userId: userId });
        }

        updateCurrentUserStatus();

        return () => {
            isMounted = false;
        };
    }, [loggedInUser]);

    //  API CALL
    const fetchActivities = async (params) => {
        try {
            setIsLoading(true);

            const response = await api.workStatusCheck({
                data: params
            });

            const res = response?.data || {};

            setRawResponse(res);

            //  Extract counts
            const newCounts = {
                notStarted: res?.notStarted?.count || 0,
                hold: res?.hold?.count || 0,
                inProgress: res?.inProgress?.count || 0,
                delayed: res?.delayed?.count || 0,
                closed: res?.closed?.count || 0,
                rework: res?.rework?.count || 0
            };

            setCounts(newCounts);

            //  Default activities (based on selected status)
            const defaultStatus = selectedStatus || "notStarted";
            setActivities(res?.[defaultStatus]?.activities || []);

        } catch (error) {
            console.error("Error fetching activities:", error);
        } finally {
            setIsLoading(false);
        }
    };

    //  Initial + Filter-based Fetch
    useEffect(() => {
        if (dependencySelectParams?.userId) {
            fetchActivities(dependencySelectParams);
        }
    }, [dependencySelectParams]);

    // useEffect(() => {
    //     if (
    //         dependencySelectParams.projectId !== null &&
    //         dependencySelectParams.towerId !== null &&
    //         dependencySelectParams.floorId !== null &&
    //         dependencySelectParams.flatId !== null
    //     ) {
    //         setIsSetupComplete(true);
    //     }
    // }, [dependencySelectParams]);

    //  Handle Status Change (NO API CALL)
    useEffect(() => {
        if (selectedStatus && rawResponse) {
            setActivities(rawResponse?.[selectedStatus]?.activities || []);
        }
    }, [selectedStatus, rawResponse]);

    //  Handle Filter Change
    const handleChange = (e) => {
        e.preventDefault();

        const updatedValues = e.target.value;

        console.log(updatedValues);

        setData(prev => ({ ...prev, ...updatedValues }));

        setDependencySelectParams(prev => ({
            ...prev,
            ...updatedValues
        }));
    };

    const handleUserSelection = (e) => {
        e.preventDefault();
        setDependencySelectParams({ ...dependencySelectParams, userId: e.target.value });
    }

    const clearSelection = () => {
        window.location.reload();
    };

    return (
        <>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row my-3">

                        {/*  STATUS DASHBOARD */}
                        <div className="col-md-12 mb-3">
                            <ActivityStatusDashboard
                                counts={counts}
                                selected={selectedStatus}
                                onStatusChange={setSelectedStatus}
                            />
                        </div>

                        {/*  FILTER SECTION */}
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">

                                    {setupSchema?.fields?.map((fld, f) => (
                                        <Row key={f}>
                                            <Col>
                                                <IUIPageElement
                                                    id={setupSchema.module}
                                                    schema={fld.type === 'area' ? fld.fields : [fld]}
                                                    value={data}
                                                    errors={errors}
                                                    onChange={handleChange}
                                                />
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
                                                                    <option key={i} value={item.email}>{item.name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {/* <Button
                                        disabled={!isSetupComplete}
                                        className="btn btn-pill btn-primary mr-2"
                                        onClick={() => fetchActivities(dependencySelectParams)}
                                    >
                                        Search
                                    </Button> */}

                                    <Button
                                        className="btn btn-pill btn-secondary"
                                        onClick={clearSelection}
                                    >
                                        Clear
                                    </Button>

                                </div>
                            </div>
                        </div>

                        {/* 🔥 TABLE SECTION */}
                        <div className="col-md-12">
                            {(!isLoading) && (
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
                                                                                <Link to={`${item?.id ? item.id : item[schema?.linkField]}`}>
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
