import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import api from '../../../store/api-service';
import IUIPageElement from '../shared/IUIPageElement';
import IUILookUp from '../../common/shared/IUILookUp';

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
    const [disabled, setDisabled] = useState(false)

    const [dataArray, setDataArray] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

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
            if (item.type === 'radio') {
                errors = { ...errors, ...validate(values, item.fields) }
            }
            if (item.type === 'lookup-relation') {
                if (item?.exclusionCondition && values && values[item?.exclusionCondition?.field] === item?.exclusionCondition?.value && !values[item?.field]) {
                    errors[item.field] = `Required field.`;
                }
            }
        }
        return errors;
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setData(dataArray[index]);
    };

    const handleDelete = (index) => {
        const updatedData = dataArray.filter((_, i) => i !== index);
        setDataArray(updatedData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!props?.readonly) {
            setDirty(true);
            const error = validate(data, schema?.fields)
            setErrors(error);
            console.log(data)
            console.log(error)
            if (Object.keys(error).length === 0) {
                if (!data)
                    return
                setDisabled(true)
                console.log(data)
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
            console.log(dataArray)
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
    }

    return (
        <>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <div>
                                        <Form>
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
                                                                    defaultFields={schema?.defaultFields || []}
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
                                                <Col>
                                                    <button
                                                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success btn-sm'
                                                        onClick={handleSubmit}
                                                    >
                                                        {editingIndex !== null ? 'Update' : 'Submit'}
                                                    </button>
                                                </Col>
                                            </Row>

                                            {(!schema?.readonly && (privileges?.add || privileges?.edit)) &&
                                                <hr />
                                            }
                                            {
                                                (dataArray.length > 0) && (
                                                    <Row>
                                                        <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                    {schema?.fields?.map((fld, f) => (
                                                                        <th key={f} width={fld.width}>
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-link text-white p-0"
                                                                            >
                                                                                {fld.text}
                                                                            </button>
                                                                        </th>
                                                                    ))}
                                                                    <th>
                                                                        Actions
                                                                    </th>
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
                                                                                        {fld.type === 'date' && item[fld.field]?.substring(0, 10)}
                                                                                        {(fld.type === 'lookup') &&
                                                                                            <IUILookUp
                                                                                                value={item[fld.field]}
                                                                                                schema={fld.schema}
                                                                                                readonly={true}
                                                                                                textonly={true}
                                                                                            />
                                                                                        }
                                                                                    </td>
                                                                                ))}
                                                                                <td>
                                                                                    <button className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-warning btn-s mr-2' onClick={() => handleEdit(i)}>Edit</button>
                                                                                    <button className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-danger btn-sm' onClick={() => handleDelete(i)}>Delete</button>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            }
                                                        </Table>
                                                    </Row>
                                                )
                                            }
                                            <Row>
                                                <Col>
                                                    {!schema?.readonly &&
                                                        <>

                                                            <Button variant="contained"
                                                                disabled={disabled}
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                onClick={savePageValue}>Save </Button>
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