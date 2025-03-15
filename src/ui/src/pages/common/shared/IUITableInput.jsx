import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import api from '../../../store/api-service';
import { notify } from '../../../store/notification';
import IUILookUp from '../../common/shared/IUILookUp';
import IUITableInputElement from './IUITableInputElement';
import { formatStringDate } from '../../../store/datetime-formatter';

const IUITableInput = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;

    // Parameter
    const { id } = useParams();

    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [dirty, setDirty] = useState(false)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [dataArray, setDataArray] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isNewAdd, setIsNewAdd] = useState(true);

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
        setPrivileges(access)
    }, [loggedInUser, module]);

    useEffect(() => {
        if (dirty) {
            const error = validate(data, schema?.fields)
            setErrors(error);
        }
    }, [data, dirty]);

    useEffect(() => {
        if (props?.value) {
            setDataArray(JSON.parse(props?.value));
        }
    }, [props?.value]);

    useEffect(() => {
        if (dataArray.length > 0) {
            setData({});
            setErrors({});
            setDisabled(false)
        }
    }, [dataArray]);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value };
        setData(newData);
        setErrors(validate(newData, schema?.fields));
        setIsNewAdd(false);
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
            if (item.type === 'radio') {
                errors = { ...errors, ...validate(values, item.fields) }
            }
            if (item.type === 'lookup-relation') {
                if (item?.exclusionCondition && values && values[item?.exclusionCondition?.field] === item?.exclusionCondition?.value && !values[item?.field]) {
                    errors[item.field] = `Required field.`;
                }
            }
            if (item.type === 'number' && values[item?.field]) {
                try {
                    let numericValue = parseInt(values[item?.field]);
                    if (numericValue < 0) {
                        errors[item.field] = `Negative input not allowed.`;
                    }
                }
                catch (e) {
                    errors[item.field] = `Invalid Input.`;
                }
            }
        }
        return errors;
    };

    const handleEdit = (e, index) => {
        e.preventDefault();
        setEditingIndex(index);
        setData(dataArray[index]);
    };

    const handleDelete = (e, index) => {
        e.preventDefault();
        const updatedData = dataArray.filter((_, i) => i !== index);
        setDataArray(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!props?.readonly) {
            setDirty(true);
            const error = validate(data, schema?.fields)
            setErrors(error);
            //console.log(data)
            //console.log(error)
            setIsNewAdd(true);
            if (Object.keys(error).length === 0) {
                if (!data)
                    return
                setDisabled(true)
                //console.log(data)
                if (editingIndex !== null) {
                    const updatedData = [...dataArray];
                    updatedData[editingIndex] = data;
                    setDataArray(updatedData);
                    setEditingIndex(null);
                }

                else {
                    setDataArray([...dataArray, data]);
                }
            }
            setData({});
            setErrors({});
            setIsNewAdd(true);
            const modifiedEvent = {
                target: {
                    id: props?.id,
                    value: JSON.stringify([...dataArray, data])
                },
                preventDefault: function () { }
            };
            props.onChange(modifiedEvent);
            // console.log(dataArray)
        }
    };

    const savePageValue = (e) => {
        e.preventDefault();
        const modifiedEvent = {
            target: {
                id: props?.id,
                value: JSON.stringify(dataArray)
            },
            preventDefault: function () { }
        };
        props.onChange(modifiedEvent);
        notify("success", `${schema?.title} List Updation Successful!`);
    }

    return (
        <>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={schema?.readonly ? "main-card card" : "main-card mb-2 card"}>
                                <div
                                    className="card-body"
                                    style={(props.className !== "" && props.className === "is-invalid") ? { border: "1px solid red" } : (props.className !== "" && props.className === "is-valid") ? { border: "1px solid green" } : {}}
                                >
                                    <div>
                                        <Form>
                                            {
                                                (!schema?.readonly) && (
                                                    <Row>
                                                        {schema?.fields?.map((fld, f) => (
                                                            <Col md={fld.width || 6} key={f}>
                                                                {fld.type === 'area' &&
                                                                    <>
                                                                        <IUITableInputElement
                                                                            id={schema.module}
                                                                            schema={fld.fields}
                                                                            value={data}
                                                                            errors={(isNewAdd && Object.keys(data).length === 0) ? {} : errors}
                                                                            readonly={schema.readonly}
                                                                            onChange={handleChange}
                                                                            dirty={dirty}
                                                                            defaultFields={schema?.defaultFields || []}
                                                                            clearFields={isNewAdd}
                                                                        />
                                                                        {/* <br /> */}
                                                                    </>
                                                                }
                                                                {fld.type !== 'area' &&
                                                                    <>
                                                                        <IUITableInputElement
                                                                            id={schema.module}
                                                                            schema={[fld]}
                                                                            value={data}
                                                                            errors={(isNewAdd && Object.keys(data).length === 0) ? {} : errors}
                                                                            onChange={handleChange}
                                                                            readonly={schema.readonly}
                                                                            clearFields={isNewAdd}
                                                                        />
                                                                        {/* <br /> */}
                                                                    </>
                                                                }
                                                            </Col>
                                                        ))}
                                                        <Col>
                                                            <button
                                                                className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md'
                                                                onClick={handleSubmit}
                                                            >
                                                                {editingIndex !== null ? `Update ${schema?.title}` : `Add ${schema?.title}`}
                                                            </button>
                                                        </Col>
                                                    </Row>
                                                )
                                            }

                                            {(!schema?.readonly && (privileges?.add || privileges?.edit)) && (dataArray.length > 0) &&
                                                <hr />
                                            }

                                            {
                                                (dataArray.length > 0) && (
                                                    <Row className='mt-2'>
                                                        <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                    {schema?.fields?.map((fld, f) => (
                                                                        <th key={f}>
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-link text-white p-0"
                                                                            >
                                                                                {fld.text}
                                                                            </button>
                                                                        </th>
                                                                    ))}
                                                                    {
                                                                        (!schema?.readonly) && (
                                                                            <th>
                                                                                Actions
                                                                            </th>
                                                                        )
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            {
                                                                <tbody>
                                                                    {
                                                                        dataArray?.map((item, i) => (
                                                                            <tr key={i}>
                                                                                {schema?.fields?.map((fld, f) => (
                                                                                    <td key={f}>
                                                                                        {fld.type === 'link' &&
                                                                                            <Link to={`${item.id}`}>{item[fld.field]}</Link>
                                                                                        }
                                                                                        {(!fld.type || fld.type === 'text') && item[fld.field]}
                                                                                        {(fld.type === 'number') && item[fld.field]}
                                                                                        {fld.type === 'date' && formatStringDate(item[fld.field])}
                                                                                        {(fld.type === 'lookup') &&
                                                                                            <IUILookUp
                                                                                                value={parseInt(item[fld.field])}
                                                                                                schema={fld.schema}
                                                                                                readonly={true}
                                                                                                textonly={true}
                                                                                            />
                                                                                        }
                                                                                    </td>
                                                                                ))}
                                                                                {
                                                                                    (!schema?.readonly) && (<td>
                                                                                        <button className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-warning btn-s mr-2' onClick={(e) => handleEdit(e, i)}>Edit</button>
                                                                                        <button className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-danger btn-sm' onClick={(e) => handleDelete(e, i)}>Delete</button>
                                                                                    </td>)
                                                                                }
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            }
                                                        </Table>
                                                    </Row>
                                                )
                                            }
                                            {(!schema?.readonly && (privileges?.add || privileges?.edit)) && (dataArray.length > 0) &&
                                                <hr />
                                            }
                                            <Row className='mt-2'>
                                                <Col>
                                                    {!schema?.readonly &&
                                                        <>

                                                            <Button variant="contained"
                                                                disabled={disabled}
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                onClick={savePageValue}>Save {schema?.title} List</Button>
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
        </>

    )
}

export default IUITableInput;