
import { Col, Row } from "react-bootstrap";
import "gantt-task-react/dist/index.css";
import SampleWorkflow from "../Workflow";
import React, { useEffect,useState } from "react";

export const WorkflowCreate = () => {
    const planSchema = {
        module: 'Workflow',
        title: 'Plan',
        relationKey: "parentId",
        path: 'plans',
        paging: false,
        searching: false,
        editing: true,
        assign: true,
        adding: false,
        startField: 'WorkflowStartDate',
        endField: 'WorkflowEndDate',
        fields: [
            { field: 'name', type: 'link', searching: true, width: 2, },
            { field: 'description', type: 'text', searching: false, width: 4, },
        ],
    }

    const schema = {
        module: 'Workflow',
        title: 'Dpendency',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        adding: true,
        startField: 'WorkflowStartDate',
        endField: 'WorkflowEndDate',
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
            <Row>
                <Col>
                    <div className="main-card mb-3 card">
                        <div className="card-body" ref={parentRef} style={{ height: '450px', width: '100%' }}>
                            <div  className='position-absolute'
                            style={{ width: `${length-35}px` }}>
                                <SampleWorkflow></SampleWorkflow>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        </>
    )
}
