
import { Col, Row, Table } from "react-bootstrap";
import IUITree from "../../common/IUITree";
import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import SamplePlan from "../Plan";
import React, { useEffect,useState } from "react";

export const PlanCreate = () => {
    const flatSchema = {
        module: 'plan',
        title: 'Flat',
        relationKey: "parentId",
        path: 'flats',
        paging: false,
        searching: false,
        editing: true,
        assign: true,
        adding: false,
        startField: 'planStartDate',
        endField: 'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
    }

    const floorSchema = {
        module: 'plan',
        title: 'Floor',
        relationKey: "parentId",
        path: 'floors',
        paging: false,
        searching: false,
        editing: true,
        assign: true,
        adding: false,
        startField: 'planStartDate',
        endField: 'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
        schema: flatSchema
    }
    const towerSchema = {
        module: 'plan',
        title: 'Tower',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        adding: true,
        startField: 'planStartDate',
        endField: 'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
        schema: floorSchema
    }

    const schema = {
        module: 'plan',
        title: 'Tower',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        adding: true,
        startField: 'planStartDate',
        endField: 'planEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
        schema: towerSchema
    }

    let tasks = [
        {
            type: "project",
            id: "ProjectSample",
            name: "1.Project",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 9, 30),
            progress: 25,
            hideChildren: false,
        },
        {
            type: "task",
            id: "Task 0",
            name: "1.1 Task",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 6, 30),
            progress: 45,
            project: "ProjectSample",
        },
        {
            type: "task",
            id: "Task 1",
            name: "1.2 Task",
            start: new Date(2021, 7, 1),
            end: new Date(2021, 7, 30),
            progress: 25,
            dependencies: ["Task 0"],
            project: "ProjectSample",
        },
        {
            type: "task",
            id: "Task 2",
            name: "1.3 Task",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 7, 30),
            progress: 10,
            dependencies: ["Task 1"],
            project: "ProjectSample",
        },
        {
            type: "milestone",
            id: "Task 6",
            name: "1.3.1 MileStone (KT)",
            start: new Date(2021, 6, 1),
            end: new Date(2021, 6, 30),
            progress: 100,
            dependencies: ["Task 2"],
            project: "ProjectSample",
        },
    ];

    const parentRef = React.createRef()
    const [length, setLength] = useState(100)
    useEffect(() => {
        const parent = parentRef.current.offsetWidth
        setLength(parent);
    },[parentRef])
    return (
        <>
            <IUITree schema={schema} />
            {/* <Row>
                <Col>
                <div className="main-card mb-3 card">
                <div className="card-body">
                    <div style={{border:'1px solid red',width:'100%',height:'100%'}}>
                    <Gantt 
                        tasks={tasks}
                        viewMode={ViewMode.Month}
                        columnWidth={200}
                        ganttHeight={200} />
                    </div>
                </div>
            </div>
                </Col>
            </Row> */}
            <Row>
                <Col>
                    <div className="main-card mb-3 card">
                        <div className="card-body" ref={parentRef} style={{ height: '450px', width: '100%' }}>
                            <div  className='position-absolute'
                            style={{ width: `${length-35}px` }}>
                                <SamplePlan></SamplePlan>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    )
}
