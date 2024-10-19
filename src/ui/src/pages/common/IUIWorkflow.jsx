import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { setSave } from '../../store/api-db'
import { useDispatch, useSelector } from 'react-redux'
import IUIPageElement from './shared/IUIPageElement';
import IUIModuleMessage from './shared/IUIModuleMessage';
import api from '../../store/api-service'
import IUIBreadcrumb from './shared/IUIBreadcrumb';
import IUIAssign from './shared/IUIAssign';
import { Gantt } from "gantt-task-react";
import { IUIViewDependency } from "../common/IUIViewWorkflow";

const IUIWorkflow = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;

    // Parameter
    const { id } = useParams();
    const { parentId } = useParams();
    // console.log(parentId)
    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [dirty, setDirty] = useState(false)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [disabled, setDisabled] = useState(false)

    const [dependencyArr, setDependencyArr] = useState([]);
    // Usage
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access)
    }, [loggedInUser, module]);

    useEffect(() => {
        if (dirty) {
            const error = validate(data, schema?.fields)
            setErrors(error);
        }
    }, [data, dirty]);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
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
        const action = { module: module, data: { id: id, member: email } }
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

    const saveWorkflow = (e) => {
        e.preventDefault();

        if (!props?.readonly) {
            setDirty(true);
            const error = validate(data, schema?.fields)
            setErrors(error);
            if (Object.keys(error).length === 0) {
                if (!data)
                    return
            }
            var newStartDate = new Date(data?.start);
            var newEndDate = new Date(data?.end);
            var newData = { ...data, start: new Date(newStartDate.getFullYear(), newStartDate.getMonth(), newStartDate.getDay()), end: new Date(newEndDate.getFullYear(), newEndDate.getMonth(), newEndDate.getDay()) }

            console.log("After Start: " + newData);
            setDependencyArr([...dependencyArr, newData]);
        }
    }
    const parentRef = React.createRef()
    const [length, setLength] = useState(100)
    useEffect(() => {
        const parent = parentRef.current.offsetWidth
        setLength(parent);
    },[parentRef])

    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading"> {schema?.title}</div>
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <div>
                                        {
                                            schema?.showBreadcrumbs && <Row>
                                                <Col md={12} className='mb-3'>
                                                    <IUIBreadcrumb schema={{ type: 'view', module: module }} />
                                                </Col>
                                            </Row>
                                        }
                                        <Form>
                                            <Row>
                                                <Col>
                                                    {schema?.back &&
                                                        <Button variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                            onClick={() => navigate(-1)}> Back</Button>
                                                    }
                                                    {schema?.adding &&
                                                        <>
                                                            {privileges?.add &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${schema.path}/add`)}
                                                                >
                                                                    Add New
                                                                </Button>
                                                            }
                                                        </>
                                                    }
                                                    {schema?.editing &&
                                                        <>
                                                            {privileges?.edit &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${schema.path}/${id}/edit`)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            }
                                                        </>
                                                    }
                                                    {schema?.deleting &&
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
                                                    {schema?.assign &&
                                                        <IUIAssign onClick={assignPageValue} />
                                                        // <Button variant="contained"
                                                        //     className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                        //     onClick={assignPageValue}>Assign </Button>
                                                    }
                                                    <IUIModuleMessage schema={props.schema} />
                                                </Col>
                                            </Row>
                                            {(schema?.back || schema?.adding || schema?.editing) &&
                                                <hr />
                                            }
                                            <Row>
                                                {schema?.fields?.map((fld, f) => (
                                                    <Col md={fld.width || 6} key={f}>
                                                        {fld.type === 'area' &&
                                                            <>
                                                                <IUIPageElement
                                                                    id={schema.module}
                                                                    schema={fld.fields}
                                                                    value={data}
                                                                    errors={errors}
                                                                    readonly={schema.readonly}
                                                                    onChange={handleChange}
                                                                    dirty={dirty}
                                                                />
                                                                {/* <br /> */}
                                                            </>
                                                        }
                                                        {fld.type !== 'area' &&
                                                            <>
                                                                <IUIPageElement
                                                                    id={schema.module}
                                                                    schema={[fld]}
                                                                    value={data}
                                                                    errors={errors}
                                                                    onChange={handleChange}
                                                                    readonly={schema.readonly}
                                                                />
                                                                {/* <br /> */}
                                                            </>
                                                        }
                                                    </Col>
                                                ))}
                                            </Row>

                                            {(!schema?.readonly && (privileges?.add || privileges?.edit)) &&
                                                <hr />
                                            }
                                            <Row>
                                                <Col>
                                                    {!schema?.readonly &&
                                                        <>
                                                            {(privileges?.add || privileges?.edit) &&
                                                                <>
                                                                    <Button variant="contained"
                                                                        disabled={disabled}
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                        onClick={saveWorkflow}>Save </Button>

                                                                    <Button variant="contained"
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                        onClick={() => navigate(-1)}> Cancel</Button>
                                                                </>
                                                            }
                                                        </>
                                                    }

                                                </Col>
                                            </Row>
                                        </Form>
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
                            <div  className='position-absolute'
                            style={{ width: `${length-35}px` }}>
                                <IUIViewDependency></IUIViewDependency>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </>

    )
}

export default IUIWorkflow;