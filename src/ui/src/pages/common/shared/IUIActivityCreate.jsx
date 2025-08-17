import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { setSave } from '../../../store/api-db';
import { getData } from '../../../store/api-db';
import api from '../../../store/api-service';
import IUIAssign from './IUIAssign';
import IUIBreadcrumb from './IUIBreadcrumb';
import IUIPageElement from './IUIPageElement';
import IUIModuleMessage from './IUIModuleMessage';
import FlowchartInit from '../../flowchart-helper/FlowchartInit';
import { bfsTraversal } from '../../flowchart-helper/GraphHelper';
import IUIActivityWizard from './IUIActivityWizard';

const IUIActivityCreate = (props) => {
    // Properties
    const setupSchema = props?.setupSchema;
    const creationSchema = props?.creationSchema;
    const module = setupSchema?.module;
    const dependencyModule = 'workflow';
    const flowchartKey = "dependency-flow";
    const initialParams = { projectId: null, towerId: null, floorId: null, flatId: null, dependencyId: null, photoUrl: null };
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

        // Return item if it matches all non-null filter conditions
        return matchesA && matchesB && matchesC && matchesD;
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

    useEffect(() => {
        if (dirty) {
            const error = validate(data, setupSchema?.fields)
            setErrors(error);
        }
    }, [data, dirty]);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
        setDependencySelectParams({ ...dependencySelectParams, ...e.target.value });
    };

    const handleDependencySelection = (event) => {
        setSelectedOption(parseInt(event.target.value));
        setDependencySelectParams({ ...dependencySelectParams, dependencyId: event.target.value });
    };

    const validate = (values, fields) => {
        let errors = {};

        for (let i = 0; i < fields?.length; i++) {
            let item = fields[i];
            if (item.type === 'area') {
                errors = { ...errors, ...validate(values, item.fields) }
            }
            if (item.required && !values) {
                errors[item.field] = `Required field.`;
            }
            if (item.required && values && !values[item?.field]) {
                errors[item.field] = `Required field.`;
            }
            if (item.type === 'email' && values && values[item?.field]) {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[item.field])) {
                    errors[item.field] = 'Invalid email address.'
                }
            }
            if (item.type === 'phone' && values && values[item?.field]) {
                const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
                //var pattern = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/); // /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
                if (!regex.test(values[item.field])) {
                    errors[item.field] = 'Invalid phone number.'
                }
            }
        }
        return errors;
    };

    const assignPageValue = async (e, email) => {
        e.preventDefault();
        //status :3 means assigned
        const action = { module: module, data: { id: id, member: email, status: 3 } }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }))
            //navigate(-1);

        } catch (e) {
            // TODO
        }
    }
    const deletePageValue = (e) => {
        e.preventDefault();
        api.deleteData({ module: module, id: id });
        dispatch(setSave({ module: module }))

        const timeId = setTimeout(() => {
            // After 3 seconds set the show value to false
            navigate(-1);
        }, 1000)

        return () => {
            clearTimeout(timeId)
        }
    }
    const savePageValue = (e) => {
        e.preventDefault();

        if (!props?.readonly) {
            setDirty(true);
            const error = validate(data, setupSchema?.fields)
            setErrors(error);
            if (Object.keys(error).length === 0) {
                if (!data)
                    return
                setDisabled(true)
                if (id !== undefined)
                    try {
                        api.editData({ module: module, data: (module === 'workflow') ? { ...data, data: localStorage.getItem(flowchartKey) ? localStorage.getItem(flowchartKey) : "" } : data });
                        dispatch(setSave({ module: module }))

                        const timeId = setTimeout(() => {
                            // After 3 seconds set the show value to false
                            navigate(-1);
                        }, 1000)

                        return () => {
                            clearTimeout(timeId)
                        }


                    } catch (e) {
                        // TODO
                    }
                else
                    try {
                        if (module === 'activity') {
                            console.log(data);
                            return;
                        }
                        api.addData({ module: module, data: (module === 'workflow') ? { ...data, data: localStorage.getItem(flowchartKey) ? localStorage.getItem(flowchartKey) : "" } : data });
                        dispatch(setSave({ module: module }))
                        const timeId = setTimeout(() => {
                            // After 3 seconds set the show value to false
                            navigate(-1);
                            localStorage.removeItem(flowchartKey);
                        }, 1000)

                        return () => {
                            clearTimeout(timeId)
                        }
                    } catch (e) {
                        // TODO
                    }
            }
        }
    };

    const prepareActivityCreation = async (e) => {
        e.preventDefault();
        const selectedDependency = allDependencies?.filter((dependency) => dependency.id === parseInt(selectedOption))[0];
        const dependencyGraph = JSON.parse(selectedDependency?.data);
        const result = bfsTraversal(dependencyGraph?.nodes, dependencyGraph?.edges, 'node_0');
        const item = (selectedDependency?.flatId !== null) ? await api.getSingleData({ module: 'plan', id: selectedDependency?.flatId }) : await api.getSingleData({ module: 'project', id: selectedDependency?.projectId });
        setDependencySelectParams({
            ...dependencySelectParams,
            towerId: selectedDependency?.towerId,
            floorId: selectedDependency?.floorId,
            flatId: selectedDependency?.flatId,
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
        setBfsSequence(result.map(node => node.data.label));
        setIsSetupComplete(true);
    };

    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading"> {setupSchema?.title}</div>
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
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
                                                <Col>
                                                    {setupSchema?.back &&
                                                        <Button variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                            onClick={() => navigate(-1)}> Back</Button>
                                                    }
                                                    {/* {!setupSchema?.readonly &&
                                                        <>
                                                            {(privileges?.add || privileges?.edit) &&
                                                                <>
                                                                    <Button variant="contained"
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                        onClick={savePageValue}>Save </Button>

                                                                    <Button variant="contained"
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                        onClick={() => navigate(-1)}> Cancel</Button>
                                                                </>
                                                            }
                                                        </>
                                                    } */}
                                                    {setupSchema?.adding &&
                                                        <>
                                                            {privileges?.add &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${setupSchema.path}/add`)}
                                                                >
                                                                    Add New
                                                                </Button>
                                                            }
                                                        </>
                                                    }
                                                    {setupSchema?.editing &&
                                                        <>
                                                            {privileges?.edit &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${setupSchema.path}/${id}/edit`)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            }
                                                        </>
                                                    }
                                                    {setupSchema?.deleting &&
                                                        <>
                                                            {privileges?.delete &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={deletePageValue}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            }
                                                        </>
                                                    }
                                                    {setupSchema?.assign &&
                                                        <IUIAssign onClick={assignPageValue} />
                                                        // <Button variant="contained"
                                                        //     className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                        //     onClick={assignPageValue}>Assign </Button>
                                                    }
                                                    <IUIModuleMessage schema={props.setupSchema} />
                                                </Col>
                                            </Row>
                                            {(setupSchema?.back || setupSchema?.adding || setupSchema?.editing) &&
                                                <hr />
                                            }
                                            <Row className={isSetupComplete ? "d-none" : ""}>
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

                                            <Row className={isSetupComplete ? "d-none" : ""}>
                                                {
                                                    (dependencySelectParams.projectId !== null && filteredDependencies.length > 0) && (
                                                        <Form.Group className="position-relative form-group">
                                                            <Form.Label className='text-uppercase mb-2'>
                                                                Select a Dependency Label Setting
                                                            </Form.Label>
                                                            <div>
                                                                {
                                                                    filteredDependencies?.map((dependency, index) => (
                                                                        <div key={`dep-${index}`}>
                                                                            <Form.Check className='text-capitalize form-check-inline'
                                                                                type="radio"
                                                                                value={dependency.id}
                                                                                checked={selectedOption == dependency.id}
                                                                                onChange={handleDependencySelection}
                                                                                label={dependency.name}
                                                                            />
                                                                            <br />
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </Form.Group>
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

                                            {
                                                (selectedOption && !isSetupComplete) ?
                                                    <Row>
                                                        <FlowchartInit
                                                            readonly={true}
                                                            value={allDependencies?.filter((dependency) => dependency.id === parseInt(selectedOption))[0]?.data}
                                                        />
                                                    </Row> : null
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
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default IUIActivityCreate;