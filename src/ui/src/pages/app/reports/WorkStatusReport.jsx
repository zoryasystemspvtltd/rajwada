import { Box } from "@mui/material";
import React, { useState } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { parse, isBefore, isAfter, startOfDay, isEqual } from 'date-fns';
import { Col, Row, Button } from "react-bootstrap";
import IUITrackBox from '../../common/shared/IUITrackBox';
import IUIPageElement from "../../common/shared/IUIPageElement";

const WorkStatusReport = () => {
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
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 3,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'projectId',
                        field: 'towerId',
                        text: 'Tower',
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

    const dateFormat = 'yyyy-MM-dd';
    const today = startOfDay(new Date());
    const initialParams = { projectId: null, towerId: null, floorId: null, flatId: null, dependencyId: null, photoUrl: null };

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

    const handleFetchReport = async (e) => {
        e.preventDefault();
        setIsSetupComplete(true);
    }

    const sampleData = [
        // Site-01 All Activities
        {
            "id": 1,
            "roomName": "Bedroom-01",
            "activities": [
                {
                    "activity": "Hacking",
                    "expectedStartDate": parse("2025-01-01", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-04", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": true,
                    "progress": 0
                },
                {
                    "activity": "Brick Work",
                    "expectedStartDate": parse("2025-01-05", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-09", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Cement Work",
                    "expectedStartDate": parse("2025-01-10", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-12", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": true,
                    "progress": 0
                },
                {
                    "activity": "Tiles Work",
                    "expectedStartDate": parse("2025-01-14", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-19", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": true,
                    "progress": 0
                }
            ]
        },
        // Site-02 All Activities
        {
            "id": 2,
            "roomName": "Bedroom-02",
            "activities": [
                {
                    "activity": "Hacking",
                    "expectedStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-05", dateFormat, new Date()),
                    "actualStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "actualEndDate": null,
                    "status": "In Progress",
                    "approvalStatus": true,
                    "progress": 10
                },
                {
                    "activity": "Brick Work",
                    "expectedStartDate": parse("2025-01-06", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-10", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": true,
                    "progress": 0
                },
                {
                    "activity": "Cement Work",
                    "expectedStartDate": parse("2025-01-11", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-13", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": true,
                    "progress": 0
                },
                {
                    "activity": "Tiles Work",
                    "expectedStartDate": parse("2025-01-14", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-19", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                }
            ]
        },
        {
            "id": 3,
            "roomName": "Bedroom-03",
            "activities": [
                {
                    "activity": "Hacking",
                    "expectedStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-05", dateFormat, new Date()),
                    "actualStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Brick Work",
                    "expectedStartDate": parse("2025-01-06", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-10", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Cement Work",
                    "expectedStartDate": parse("2025-01-11", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-13", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Tiles Work",
                    "expectedStartDate": parse("2025-01-14", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-19", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                }
            ]
        },
        {
            "id": 4,
            "roomName": "Hallroom-01",
            "activities": [
                {
                    "activity": "Hacking",
                    "expectedStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-05", dateFormat, new Date()),
                    "actualStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Brick Work",
                    "expectedStartDate": parse("2025-01-06", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-10", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Cement Work",
                    "expectedStartDate": parse("2025-01-11", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-13", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Tiles Work",
                    "expectedStartDate": parse("2025-01-14", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-19", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                }
            ]
        },
        {
            "id": 5,
            "roomName": "Kitchen-01",
            "activities": [
                {
                    "activity": "Hacking",
                    "expectedStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-05", dateFormat, new Date()),
                    "actualStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Brick Work",
                    "expectedStartDate": parse("2025-01-06", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-10", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Cement Work",
                    "expectedStartDate": parse("2025-01-11", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-13", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Tiles Work",
                    "expectedStartDate": parse("2025-01-14", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-19", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                }
            ]
        },
        {
            "id": 6,
            "roomName": "Bathroom-01",
            "activities": [
                {
                    "activity": "Hacking",
                    "expectedStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-05", dateFormat, new Date()),
                    "actualStartDate": parse("2025-01-02", dateFormat, new Date()),
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Brick Work",
                    "expectedStartDate": parse("2025-01-06", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-10", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Cement Work",
                    "expectedStartDate": parse("2025-01-11", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-13", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                },
                {
                    "activity": "Tiles Work",
                    "expectedStartDate": parse("2025-01-14", dateFormat, new Date()),
                    "expectedEndDate": parse("2025-01-19", dateFormat, new Date()),
                    "actualStartDate": null,
                    "actualEndDate": null,
                    "status": "New",
                    "approvalStatus": false,
                    "progress": 0
                }
            ]
        }
    ];

    const computeActivityStatus = (activity) => {
        let result = {
            text: "",
            imageIcon: "",
            arrowDirection: "",
            arrowColor: "",
            progress: 0,
            cardColor: ""
        };

        if (activity?.status === "New" && !activity?.approvalStatus) {
            result.text = "Pending Approval";
            result.imageIcon = "HourGlass";
            if (isAfter(activity?.expectedStartDate, today)) {
                result.arrowDirection = "up";
                result.arrowColor = "#11823b";
            }
            else {
                result.arrowDirection = "down";
                result.arrowColor = "#e30202";
            }
            result.progress = activity?.progress;
            result.cardColor = "#ffa700"; // orange
        }
        else if (activity?.status === "New" && activity?.approvalStatus) {
            if ((isAfter(activity?.expectedStartDate, today) || isEqual(activity?.expectedStartDate, today)) && activity?.actualStartDate === null) {
                result.arrowDirection = "up";
                result.arrowColor = "#11823b";
                result.text = "Pending Start";
                result.imageIcon = "Correct";
                result.progress = activity?.progress;
                result.cardColor = "#83f3b4"; // green
            }
            else if (isAfter(today, activity?.expectedStartDate) && activity?.actualStartDate === null) {
                result.arrowDirection = "down";
                result.arrowColor = "#e30202";
                result.text = "Start Delayed";
                result.imageIcon = "Wrong";
                result.progress = activity?.progress;
                result.cardColor = "#ea5252"; // red
            }
        }
        else if (activity?.status === "In Progress" && (isAfter(today, activity?.expectedStartDate) || isEqual(today, activity?.expectedStartDate)) && isAfter(activity?.expectedEndDate, today) && activity?.actualStartDate !== null) {
            result.arrowDirection = "up";
            result.arrowColor = "#11823b";
            result.text = "In Progress";
            result.imageIcon = "InProgress";
            result.progress = activity?.progress;
            result.cardColor = "#83f3b4";
        }
        else if (activity?.status === "In Progress" && isAfter(today, activity?.expectedEndDate) && activity?.actualEndDate === null) {
            result.text = "Completion Delayed";
            result.imageIcon = "InProgress";
            result.arrowDirection = "down";
            result.arrowColor = "#e30202";
            result.progress = activity?.progress;
            result.cardColor = "#ffa700"; // orange
        }
        else if (activity?.status === "Completed" && activity?.actualEndDate && (isBefore(activity?.actualEndDate, activity?.expectedEndDate) || isEqual(activity?.actualEndDate, activity?.expectedEndDate))) {
            result.arrowDirection = "up";
            result.arrowColor = "#11823b";
            result.text = "Completed";
            result.imageIcon = "Correct";
            result.progress = activity?.progress;
            result.cardColor = "#83f3b4"; // green
        }
        else if (activity?.status === "Completed" && activity?.actualEndDate && isAfter(activity?.actualEndDate, activity?.expectedEndDate)) {
            result.arrowDirection = "down";
            result.arrowColor = "#e30202";
            result.text = "Delayed Completion";
            result.imageIcon = "Wrong";
            result.progress = activity?.progress;
            result.cardColor = "#ea5252"; // red
        }
        else {
            result.text = "Not Applicable";
            result.imageIcon = "Wrong";
            result.arrowDirection = null;
            result.arrowColor = "#e30202";
            result.progress = null;
            result.cardColor = "#ffa700"; // orange
        }
        return result;
    }

    let columns = [
        {
            field: "id",
            headerName: "Sl. No",
            align: "center",
            headerAlign: "center",
            width: 60
        },
        {
            field: "roomName",
            headerName: "Room",
            align: "center",
            headerAlign: "center",
            width: 120
        },
        {
            field: 'activity1',
            headerName: 'Hacking',
            align: "center",
            headerAlign: "center",
            width: 280,
            renderCell: (params) => {
                const row = params.row;
                const hackingActivity = row?.activities?.find(activity => activity?.activity === "Hacking");
                return (
                    <IUITrackBox schema={computeActivityStatus(hackingActivity)} />
                )
            },
        },
        {
            field: 'activity2',
            headerName: 'Brick Work',
            align: "center",
            headerAlign: "center",
            width: 280,
            renderCell: (params) => {
                const row = params.row;
                const brickWork = row?.activities?.find(activity => activity?.activity === "Brick Work");
                return (
                    <IUITrackBox schema={computeActivityStatus(brickWork)} />
                )
            },
        },
        {
            field: 'activity3',
            headerName: 'Cement Work',
            align: "center",
            headerAlign: "center",
            width: 280,
            renderCell: (params) => {
                const row = params.row;
                const cementWork = row?.activities?.find(activity => activity?.activity === "Cement Work");
                return (
                    <IUITrackBox schema={computeActivityStatus(cementWork)} />
                )
            },
        },
        {
            field: 'activity4',
            headerName: 'Tiles Work',
            align: "center",
            headerAlign: "center",
            width: 280,
            renderCell: (params) => {
                const row = params.row;
                const tilesWork = row?.activities?.find(activity => activity?.activity === "Tiles Work");
                return (
                    <IUITrackBox schema={computeActivityStatus(tilesWork)} />
                )
            },
        }
    ];

    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'striped-row-data-grid' : '';
    };

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
                                        <Col>
                                            <Button variant="contained"
                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success btn-md mr-2"
                                                onClick={handleFetchReport}>Fetch Report</Button>
                                        </Col>
                                    </Row>
                                    {(isSetupComplete) &&
                                        <hr />
                                    }
                                    <Row className={!isSetupComplete ? "d-none" : ""}>
                                        <Col>
                                            <Box
                                                m="0 0 0 0"
                                                height="75vh"
                                                sx={{
                                                    "& .MuiDataGrid-root": {
                                                        border: "none",
                                                        "& .MuiDataGrid-row": {
                                                            '&.Mui-selected': {
                                                                backgroundColor: '#4FC44B !important',
                                                                '&:hover': {
                                                                    backgroundColor: '#4FC44B !important',
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "& .name-column--cell": {
                                                        color: "#2e7c67",
                                                    },
                                                    '& .MuiDataGrid-cell': {
                                                        borderRight: '1px solid #c4bebe', // Add right border to cells
                                                    },
                                                    "& .MuiDataGrid-columnHeaders": {
                                                        backgroundColor: "#009EF7",
                                                        borderBottom: "none",
                                                        color: "white",
                                                        fontWeight: "bold",
                                                        height: "30px !important",
                                                    },
                                                    '& .MuiDataGrid-columnHeader': {
                                                        borderRight: '1px solid white', // Optional: border under the header
                                                        backgroundColor: "#009EF7",
                                                        height: "30px !important",
                                                    },
                                                    "& .MuiIconButton-root": {
                                                        color: "white",
                                                    },
                                                    "& .MuiDataGrid-columnHeaderTitle": {
                                                        fontWeight: "bold"
                                                    },
                                                    "& .MuiDataGrid-virtualScroller": {
                                                        backgroundColor: "#f2f0f0",
                                                    },
                                                    "& .MuiDataGrid-footerContainer": {
                                                        borderTop: "none",
                                                        backgroundColor: "#009EF7",
                                                        height: "45px !important"
                                                    },
                                                    "& .MuiCheckbox-root": {
                                                        color: `#1e5245 !important`,
                                                    },
                                                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                                        color: `#141414 !important`,
                                                    },
                                                    "& .MuiTablePagination-selectLabel": {
                                                        marginBottom: 0,
                                                        color: "white"
                                                    },
                                                    "& .MuiTablePagination-select": {
                                                        color: "white"
                                                    },
                                                    "& .MuiDataGrid-selectedRowCount": {
                                                        color: "white"
                                                    },
                                                    "& .MuiTablePagination-displayedRows": {
                                                        marginBottom: 0,
                                                        color: "white"
                                                    }
                                                }}
                                            >
                                                <DataGrid
                                                    rowHeight={120}
                                                    rows={sampleData}
                                                    columns={columns}
                                                    pageSizeOptions={[25, 50, 100]}
                                                    columnHeaderHeight={35}
                                                    getRowClassName={getRowClassName}
                                                />
                                            </Box>
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