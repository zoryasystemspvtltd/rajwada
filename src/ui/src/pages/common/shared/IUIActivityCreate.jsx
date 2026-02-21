import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../../store/api-service';
import FlowchartInit from '../../flowchart-helper/FlowchartInit';
import { bfsTraversal, findSourceNodes } from '../../flowchart-helper/GraphHelper';
import IUIActivityWizard from './IUIActivityWizard';
import IUIBreadcrumb from './IUIBreadcrumb';
import IUIModuleMessage from './IUIModuleMessage';
import IUIPageElement from './IUIPageElement';

const IUIActivityCreate = (props) => {
    // Properties
    const setupSchema = props?.setupSchema;
    const creationSchema = props?.creationSchema;
    const module = setupSchema?.module;
    const dependencyModule = 'workflow';
    const initialParams = { projectId: null, towerId: null, floorId: null, flatId: null, roomId: null, workflowId: null, dependencyId: null, photoUrl: null };
    // Parameter
    const { id } = useParams();
    // console.log(parentId)
    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [dirty, setDirty] = useState(false);
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [dependencySelectParams, setDependencySelectParams] = useState(initialParams);
    const [allDependencies, setAllDependencies] = useState([]); // API should be in backend to filter and fetch dependencies
    const [selectedOption, setSelectedOption] = useState(0);
    const [bfsSequence, setBfsSequence] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [imageField, setImageField] = useState({
        type: "area", width: 12
        , fields: [
            {
                text: 'Activity Blueprint', field: 'photoUrl', width: 12, type: 'ilab-canvas', required: true,
                imageModule: 'plan',
                schema: {
                    readonly: false,
                    upload: false,
                    parentId: -1,
                    save: true,
                    parent: {
                        module: 'plan',
                        filter: 'planId',
                    },
                    controls: {
                        balloon: true,
                        rectangle: true,
                        pencil: true,
                        camera: true,
                        delete: true,
                        reset: true
                    },
                    module: 'unitOfWork'
                }
            }
        ]
    });

    const filteredDependencies = allDependencies.filter(item => {
        // Apply filter only if the corresponding filter value is not null or undefined
        const matchesA = dependencySelectParams?.projectId !== null ? item.projectId === parseInt(dependencySelectParams.projectId) : true;
        const matchesB = dependencySelectParams?.towerId !== null ? item.towerId === parseInt(dependencySelectParams.towerId) : true;
        const matchesC = dependencySelectParams?.floorId !== null ? item.floorId === parseInt(dependencySelectParams.floorId) : true;
        const matchesD = dependencySelectParams?.flatId !== null ? item.flatId === parseInt(dependencySelectParams.flatId) : true;
        const matchesE = dependencySelectParams?.roomId !== null ? item.roomId === parseInt(dependencySelectParams.roomId) : true;

        // Return item if it matches all non-null filter conditions
        return matchesA && matchesB && matchesC && matchesD && matchesE;
    });

    // Usage
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const pageOptions = {
                recordPerPage: 0
            }

            const response = await api.getData({ module: dependencyModule, options: pageOptions });
            setAllDependencies(response?.data?.items);
        }

        fetchData();
    }, [dependencyModule]);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const item = await api.getSingleData({ module: module, id: id });
                setData(item.data);
            }
        }

        fetchData();
    }, [id]);

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access);
        if (module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, module]);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
        setDependencySelectParams({ ...dependencySelectParams, ...e.target.value });
    };

    const handleDependencySelection = (event) => {
        setSelectedOption(parseInt(event.target.value));
        setDependencySelectParams({ ...dependencySelectParams, workflowId: event.target.value });
    };


    const prepareActivityCreation = async (e) => {
        e.preventDefault();
        const selectedDependency = allDependencies?.filter((dependency) => dependency.id === parseInt(selectedOption))[0];
        const dependencyGraph = JSON.parse(selectedDependency?.data);
        const sourceNodes = findSourceNodes(dependencyGraph);
        const result = bfsTraversal(dependencyGraph?.nodes, dependencyGraph?.edges, sourceNodes[0]?.id);
        const item = (selectedDependency?.flatId !== null) ? await api.getSingleData({ module: 'plan', id: selectedDependency?.flatId }) : await api.getSingleData({ module: 'project', id: selectedDependency?.projectId });
        setDependencySelectParams({
            ...dependencySelectParams,
            towerId: selectedDependency?.towerId,
            floorId: selectedDependency?.floorId,
            flatId: selectedDependency?.flatId,
            roomId: selectedDependency?.roomId,
            photoUrl: item?.data?.blueprint
        });
        let activityParentId = -1;
        if (selectedDependency?.flatId !== null) {
            activityParentId = selectedDependency?.flatId;
        }
        else if (selectedDependency?.floorId !== null) {
            activityParentId = selectedDependency?.floorId;
        }
        else if (selectedDependency?.towerId !== null) {
            activityParentId = selectedDependency?.towerId;
        }
        else {
            activityParentId = selectedDependency?.projectId;
        }
        let tempImage = { ...imageField };
        tempImage.fields[0].schema.parentId = activityParentId;
        setImageField(tempImage);
        setBfsSequence(result?.filter(node => node !== undefined)?.map(node => ({ label: node?.data?.label, activityId: node?.node?.id })));
        setIsSetupComplete(true);
    };

    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading"> {setupSchema?.title}</div>
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className={isSetupComplete ? "d-none" : "row"}>
                        <div className="col-md-4">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <div>
                                        {
                                            setupSchema?.showBreadcrumbs && <Row>
                                                <Col md={12} className='mb-3'>
                                                    <IUIBreadcrumb schema={{ type: 'view', module: module, displayText: setupSchema?.title }} />
                                                </Col>
                                            </Row>
                                        }
                                        <div>

                                            <Row>
                                                {/* LEFT COLUMN */}
                                                <Col>
                                                    <Row>
                                                        <Col>
                                                            {setupSchema?.back &&
                                                                <Button variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                    onClick={() => navigate(-1)}> Back</Button>
                                                            }
                                                            <IUIModuleMessage schema={props.setupSchema} />
                                                        </Col>
                                                    </Row>
                                                    {(setupSchema?.back || setupSchema?.adding || setupSchema?.editing) &&
                                                        <hr />
                                                    }

                                                    {setupSchema?.fields?.map((fld, f) => (
                                                        <Row className={isSetupComplete ? "d-none" : ""} key={f}>
                                                            <Col>
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
                                                        </Row>
                                                    ))}


                                                    <Row className={isSetupComplete ? "d-none" : ""}>
                                                        {
                                                            (dependencySelectParams.projectId !== null && filteredDependencies.length > 0) && (
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <Form.Group className="position-relative form-group">
                                                                            <Form.Label className='mb-2'>
                                                                                Select a Dependency Label Setting
                                                                            </Form.Label>
                                                                            <div>
                                                                                < select
                                                                                    aria-label={`select-dependency-for-work`}
                                                                                    id={`select-dependency-for-work`}
                                                                                    value={selectedOption}
                                                                                    data-name={props.nameField}
                                                                                    name='select'
                                                                                    className={`form-control ${props.className}`}
                                                                                    disabled={props.readonly || false}
                                                                                    onChange={handleDependencySelection}>
                                                                                    <option>--Select--</option>
                                                                                    {filteredDependencies?.map((item, i) => (
                                                                                        <option key={i} value={item.id}>{item.name}</option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }

                                                        {
                                                            (dependencySelectParams.projectId !== null && filteredDependencies.length === 0) && (
                                                                <Form.Group className="position-relative form-group">
                                                                    <Form.Label className='text-uppercase mb-2'>
                                                                        No Matching Dependencies Found
                                                                    </Form.Label>
                                                                </Form.Group>
                                                            )
                                                        }
                                                    </Row>

                                                    {(!setupSchema?.readonly && (privileges?.add || privileges?.edit)) &&
                                                        <hr />
                                                    }
                                                    <Row>
                                                        <Col>
                                                            {/* {setupSchema?.back &&
                                                        <Button variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                            onClick={() => navigate(-1)}> Back</Button>
                                                    } */}
                                                            {!setupSchema?.readonly &&
                                                                <>
                                                                    {(privileges?.add || privileges?.edit) &&
                                                                        <>
                                                                            {/* <Button variant="contained"
                                                                        disabled={disabled}
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                        onClick={savePageValue}>Save </Button> */}
                                                                            {
                                                                                (selectedOption && !isSetupComplete) ? <Button variant="contained"
                                                                                    disabled={disabled}
                                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                                    onClick={prepareActivityCreation}>Proceed</Button> : null
                                                                            }


                                                                            <Button variant="contained"
                                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                                onClick={() => navigate(-1)}> Cancel</Button>
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-8">
                            {
                                (selectedOption && !isSetupComplete && filteredDependencies.length !== 0) ?
                                    <div className="main-card mb-3 card">
                                        <div className="card-body">
                                            <Row>
                                                <Col>
                                                    <FlowchartInit
                                                        readonly={true}
                                                        value={allDependencies?.filter((dependency) => dependency.id === parseInt(selectedOption))[0]?.data}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                    <div className={!isSetupComplete ? "d-none" : "row"}>
                        <div className="col-md-12">
                            {
                                setupSchema?.showBreadcrumbs && <Row>
                                    <Col md={12} className='mb-3'>
                                        <IUIBreadcrumb schema={{ type: 'view', module: module, displayText: setupSchema?.title }} />
                                    </Col>
                                </Row>
                            }
                            <Row>
                                <Col>
                                    {setupSchema?.back &&
                                        <Button variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                            onClick={() => navigate(-1)}> Back</Button>
                                    }
                                    <IUIModuleMessage schema={props.setupSchema} />
                                </Col>
                            </Row>
                            {(setupSchema?.back || setupSchema?.adding || setupSchema?.editing) &&
                                <hr />
                            }
                            <div className={!isSetupComplete ? "d-none" : "row d-flex justify-content-center mb-3"}>
                                <div className="col-sm-12 col-lg-12">
                                    <div className="main-card card">
                                        <div className="card-body">
                                            {
                                                (bfsSequence.length) ? (
                                                    <IUIActivityWizard
                                                        sequence={bfsSequence}
                                                        schema={{ ...creationSchema, fields: [...creationSchema?.fields, imageField] }}
                                                        dependencyData={dependencySelectParams}
                                                    />
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {(!setupSchema?.readonly && (privileges?.add || privileges?.edit)) &&
                                <hr />
                            }
                            <Row>
                                <Col>
                                    {/* {setupSchema?.back &&
                                                        <Button variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                            onClick={() => navigate(-1)}> Back</Button>
                                                    } */}
                                    {!setupSchema?.readonly &&
                                        <>
                                            {(privileges?.add || privileges?.edit) &&
                                                <>
                                                    {/* <Button variant="contained"
                                                                        disabled={disabled}
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                        onClick={savePageValue}>Save </Button> */}
                                                    {
                                                        (selectedOption && !isSetupComplete) ? <Button variant="contained"
                                                            disabled={disabled}
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                            onClick={prepareActivityCreation}>Proceed</Button> : null
                                                    }


                                                    <Button variant="contained"
                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                        onClick={() => navigate(-1)}> Cancel</Button>
                                                </>
                                            }
                                        </>
                                    }
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default IUIActivityCreate;
