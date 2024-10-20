import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import IUIBreadcrumb from "../../common/shared/IUIBreadcrumb";
import IUIViewWorkFlow from "../../common/IUIViewWorkflow"

const CreateWorkflow = () => {
    const [dependencyArr, setDependencyArr] = useState([]);
    const parentRef = React.createRef()
    const [length, setLength] = useState(100)
    useEffect(() => {
        const parent = parentRef.current.offsetWidth
        setLength(parent);
    }, [parentRef])

    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading"> Activity Dependency</div>
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card card">
                                <div className="card-body">
                                    <div>
                                        <Row>
                                            <Col md={12}>
                                                <IUIBreadcrumb schema={{ type: 'view', module: 'Activity Dependency' }} />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Row>
                <Col>
                    <div className="main-card mb-3 card">
                        <div className="card-body" ref={parentRef} style={{ height: '450px', width: '100%' }}>
                            <div className='position-absolute'
                                style={{ width: `${length - 35}px` }}>
                                {(dependencyArr.length > 0) &&
                                    <IUIViewWorkFlow schema={dependencyArr}></IUIViewWorkFlow>
                                }
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>

    )
}

export default CreateWorkflow;