import { startOfDay } from 'date-fns';
import React, { useState } from 'react';
import { Button, Col, Row } from "react-bootstrap";
import IUIPageElement from "../../common/shared/IUIPageElement";
import IUITrackBox from '../../common/shared/IUITrackBox';
import { bfsTraversal } from '../../flowchart-helper/GraphHelper';
import api from '../../../store/api-service';
import { notify } from "../../../store/notification";

const WorkStatusReport = () => {
    const [resetProject, setResetProject] = useState(false);
    const setupSchema = {
        module: 'activity',
        title: 'Activity',
        path: 'activities',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 3, reset: resetProject,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'projectId',
                        field: 'towerId',
                        text: 'Tower',
                        required: true,
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "projectId",
                            path: 'towers'
                        },
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'towerId',
                        field: 'floorId',
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
                        text: 'Flat',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'flats'
                        },
                    }
                ]
            },
        ]
    };

    const [activities, setActivities] = useState([]);
    const [dependencyDetails, setDependencyDetails] = useState({});
    const [workItems, setWorkItems] = useState([]);
    const [activityRows, setActivityRows] = useState({});
    const [mainActivityDetails, setMainActivityDetails] = useState([]);
    const [subActivityDetails, setSubActivityDetails] = useState([]);
    const [dirty, setDirty] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
        // setDependencySelectParams({ ...dependencySelectParams, ...e.target.value });
    };

    const baseQueryConstructor = () => {
        let baseQuery = {};
        if (data?.projectId && !data?.towerId && !data?.floorId && !data?.flatId) {
            baseQuery = {
                name: 'projectId',
                value: parseInt(data?.projectId),
            }
        }
        else if (data?.projectId && data?.towerId && !data?.floorId && !data?.flatId) {
            baseQuery = {
                name: 'projectId',
                value: parseInt(data?.projectId),
                and: {
                    name: 'towerId',
                    value: parseInt(data?.towerId)
                }
            }
        }
        else if (data?.projectId && data?.towerId && data?.floorId && !data?.flatId) {
            baseQuery = {
                name: 'projectId',
                value: parseInt(data?.projectId),
                and: {
                    name: 'towerId',
                    value: parseInt(data?.towerId),
                    and: {
                        name: 'floorId',
                        value: parseInt(data?.floorId)
                    }
                }
            }
        }
        else if (data?.projectId && data?.towerId && data?.floorId && data?.flatId) {
            baseQuery = {
                name: 'projectId',
                value: parseInt(data?.projectId),
                and: {
                    name: 'towerId',
                    value: parseInt(data?.towerId),
                    and: {
                        name: 'floorId',
                        value: parseInt(data?.floorId),
                        and: {
                            name: 'flatId',
                            value: parseInt(data?.flatId),
                        }
                    }
                }
            };
        }
        return baseQuery;
    }

    const fetchActivityDetails = async () => {
        try {
            if (!data?.flatId) {
                notify('error', 'Provide complete project, tower, floor and flat details to fetch report!');
                return;
            }
            const res = await api.workerReport({ data: data });
            console.log(res.data[0]);

            const newBaseFilter = baseQueryConstructor();

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: newBaseFilter
            }
            const response = await api.getData({ module: 'activity', options: pageOptions });
            let tempActivities = response?.data?.items;

            if (!tempActivities || tempActivities?.length === 0) {
                notify('info', 'No Activities available for the given project details!');
                return;
            }
            // setActivities(tempActivities);


            let tempMainActivities = tempActivities?.filter((activity) => activity?.type === 'Main Task')
            // setMainActivityDetails(tempMainActivities);


            let tempSubActivities = tempActivities?.filter((activity) => activity?.type === 'Sub Task')?.sort((a, b) => {
                const nameA = a.name.toLowerCase(); // Case-insensitive comparison
                const nameB = b.name.toLowerCase(); // Case-insensitive comparison
                if (nameA < nameB) return -1; // If a comes before b
                if (nameA > nameB) return 1; // If a comes after b
                return 0; // If they are equal
            })
            // setSubActivityDetails(tempSubActivities);

            const dependencyItem = await api.getSingleData({ module: 'workflow', id: parseInt(tempActivities[0]?.dependencyId) });
            // setDependencyDetails(dependencyItem?.data);
            const dependencyGraph = JSON.parse(dependencyItem?.data?.data);
            const result = bfsTraversal(dependencyGraph?.nodes, dependencyGraph?.edges, 'node_0');
            let tempWorkItems = result.map(node => node.data.label)?.sort((a, b) => {
                const nameA = a.toLowerCase(); // Case-insensitive comparison
                const nameB = b.toLowerCase(); // Case-insensitive comparison
                if (nameA < nameB) return -1; // If a comes before b
                if (nameA > nameB) return 1; // If a comes after b
                return 0; // If they are equal
            });
            setWorkItems(tempWorkItems); // Columns ready for Table

            const roomsBaseFilter = {
                name: 'planId',
                value: parseInt(data?.flatId),
            }

            const roomsPageOptions = {
                recordPerPage: 0,
                searchCondition: roomsBaseFilter
            }

            // Prepare Rows
            const resourceResponse = await api.getData({ module: 'resource', options: roomsPageOptions });
            let resources = resourceResponse?.data?.items;
            let tempRows = {};
            for (let resource of resources) {
                const roomItem = await api.getSingleData({ module: 'room', id: parseInt(resource?.roomId) }); // Ex- Bedroom

                for (let index = 1; index <= resource?.quantity; index++) {
                    let roomName = `${roomItem?.data?.name}-${index}`; // Ex: Bedroom-1
                    const filteredActivites = tempSubActivities?.filter((activity) => activity?.name?.includes(roomName)); // Ex: All activities of Bedroom-1
                    tempRows[roomName] = filteredActivites;
                }

            }
            setActivityRows(tempRows);
            setResetProject(false);
            setIsSetupComplete(true);
        } catch (error) {
            console.log(error)
            notify("error", "Failed to fetch activity details!");
        }
    }

    const handleResetFields = (e) => {
        e.preventDefault();
        setData({});
        setResetProject(true);
        setActivityRows({});
        setWorkItems([]);
        setIsSetupComplete(false);
    }

    const computeActivityStatus = (activity) => {
        const colors = {
            "Not Started": "#4c4c4c",
            "In Progress": "#1e009f",
            "Delayed": "#ff6700",
            "On Hold": "#f6de4b",
            "Closed": "#1fc600",
            "Cancelled": "#ff3d41",
            "Pending QC Approval": "#660094",
            "Pending HOD Approval": "#59d4ff",
            "Inspection Passed": "#034007",
            "Inspection Failed/Rework Required": "#b10000",
            "Short Closed/Abandoned": "#0e1111"
        };

        let result = {
            text: "",
            imageIcon: "",
            arrowDirection: "",
            arrowColor: "",
            progress: 0,
            cardColor: ""
        };

        switch (activity?.activityStatus) {
            case "Not Started":
                result.arrowDirection = "down";
                result.arrowColor = "#e30202"; // red
                result.text = activity?.activityStatus;
                result.imageIcon = "Wrong";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "In Progress":
                result.arrowDirection = "up";
                result.arrowColor = "#11823b"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "InProgress";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Delayed":
                result.arrowDirection = "down";
                result.arrowColor = "#e30202"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "InProgress";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "On Hold":
                result.arrowDirection = "down";
                result.arrowColor = "#e30202"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "HourGlass";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Closed":
                result.arrowDirection = "up";
                result.arrowColor = "#11823b"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "Correct";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Cancelled":
                result.arrowDirection = "down";
                result.arrowColor = "#e30202"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "Wrong";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Pending QC Approval":
                result.arrowDirection = "up";
                result.arrowColor = "#11823b"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "HourGlass";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Pending HOD Approval":
                result.arrowDirection = "up";
                result.arrowColor = "#11823b"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "HourGlass";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Inspection Passed":
                result.arrowDirection = "up";
                result.arrowColor = "#11823b"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "InProgress";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Inspection Failed/Rework Required":
                result.arrowDirection = "down";
                result.arrowColor = "#e30202"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "Wrong";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            case "Short Closed/Abandoned":
                result.arrowDirection = "down";
                result.arrowColor = "#e30202"; // green
                result.text = activity?.activityStatus;
                result.imageIcon = "Wrong";
                result.progress = activity?.progress;
                result.cardColor = colors[activity?.activityStatus];
                break;
            default:
                result.arrowDirection = null;
                result.arrowColor = "#e30202"; // green
                result.text = "Status Not Available";
                result.imageIcon = "Wrong";
                result.progress = 0;
                result.cardColor = "grey";
                break;
        }

        return result;
    }

    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading text-uppercase">Work Status Report</div>
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <Row>
                                        {setupSchema?.fields?.map((fld, f) => (
                                            <Col md={fld.width || 6} key={f}>
                                                {fld.type === 'area' &&
                                                    <>
                                                        <IUIPageElement
                                                            id={setupSchema.module}
                                                            schema={fld.fields}
                                                            value={data}
                                                            errors={errors}
                                                            readonly={setupSchema.readonly}
                                                            onChange={handleChange}
                                                            dirty={dirty}
                                                        />
                                                        {/* <br /> */}
                                                    </>
                                                }
                                                {fld.type !== 'area' &&
                                                    <>
                                                        <IUIPageElement
                                                            id={setupSchema.module}
                                                            schema={[fld]}
                                                            value={data}
                                                            errors={errors}
                                                            onChange={handleChange}
                                                            readonly={setupSchema.readonly}
                                                        />
                                                        {/* <br /> */}
                                                    </>
                                                }
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row>
                                        <div className="col-sm-12">
                                            <Button variant="contained"
                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success btn-md mr-2"
                                                onClick={fetchActivityDetails}
                                                disabled={Object.keys(data).length === 0}
                                            >
                                                Fetch Report
                                            </Button>
                                            <Button variant="contained"
                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                onClick={handleResetFields}>Reset
                                            </Button>
                                        </div>
                                    </Row>
                                    {(isSetupComplete) &&
                                        <hr />
                                    }
                                    <Row className={!isSetupComplete ? "d-none" : ""}>
                                        <Col>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className=" table-responsive">
                                                        <table style={{ width: "100%" }} id="workStatusReport" className="w-100 table table-hover table-striped table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Room Name</th>
                                                                    {
                                                                        workItems?.map((item, index) => (
                                                                            <th key={`${item}-${index}`}>{item}</th>
                                                                        ))
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    Object.keys(activityRows)?.map((room, index) => (
                                                                        <tr key={`${room}-${index}`}>
                                                                            <td className='fw-bold text-uppercase'>{room}</td>
                                                                            {
                                                                                activityRows[room]?.map((activityDetails) => (
                                                                                    <td key={activityDetails?.name}>
                                                                                        <IUITrackBox schema={computeActivityStatus(activityDetails)} />
                                                                                    </td>
                                                                                ))
                                                                            }
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkStatusReport;