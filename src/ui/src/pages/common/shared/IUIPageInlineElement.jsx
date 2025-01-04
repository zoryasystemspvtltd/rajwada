import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import IUIHiddenState from './IUIHiddenState';
import IUILookUp from './IUILookUp';
import IUILookUpEnum from './IUILookUpEnum';
import IUILookUpLink from './IUILookUpLink';


const IUIPageInlineElement = (props) => {
    // Properties
    const schema = props?.schema;
    const defaultFields = props?.defaultFields;
    const isAliveStatus = [
        { value: "true", label: "Alive" },
        { value: "false", label: "Dead" }
    ];
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [dirty, setDirty] = useState(props.dirty)

    useEffect(() => {
        if (props?.value)
            setData(props?.value);
    }, [props?.value]);

    useEffect(() => {
        if (props?.dirty)
            setDirty(props?.dirty);
    }, [props?.dirty]);

    useEffect(() => {

        if (props?.errors)
            setErrors(props?.errors);
    }, [props?.errors]);

    const handleChange = (e) => {
        e.preventDefault();
        if (props.readonly)
            return

        let newData = { ...data, [e.target.id]: e.target.value }
        if (e.target?.dataset?.name) {
            newData = { ...newData, [e.target?.dataset?.name]: e.target[e.target.selectedIndex].text };
        }

        if (e.target.id === 'roles') {
            let newPrivileges = []
            if (newData?.privileges) {
                newPrivileges = newData?.privileges
            }
            if (e.target.value) {
                newPrivileges = []
                for (let i = 0; i < e.target.value.length; i++) {
                    if (e.target.value[i].privileges) {
                        newPrivileges = [...newPrivileges, ...e.target.value[i].privileges]
                    }
                }

                newPrivileges = [...newPrivileges, ...[{ id: -1, name: "dummy", module: "dummy" }]]
            }
            newData = { ...newData, privileges: newPrivileges }
        }
        else if (e.target.id === 'disable') {
            newData = { ...data, [e.target.id]: e.target.checked }
        }
        setData(newData);
        const event = { target: { id: props.id, value: newData }, preventDefault: function () { } }
        if (props.onChange) {
            props.onChange(event);
        }
    };


    return (
        <>
            <Row>
                {schema?.map((fld, f) => (
                    <React.Fragment key={f}>
                        {fld.type === 'hidden-filter' &&
                            <span >
                                <IUIHiddenState
                                    value={fld.value}
                                    id={fld.field}
                                    onChange={handleChange}
                                />
                            </span>
                        }
                        {fld.type !== 'hidden-filter' &&
                            <Col md={fld.width || 12} >
                                {fld.type === 'link' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field}>{fld.text} : </Form.Label>
                                            <span id={fld.field}><Link className="stretched-link" to={`${fld.to}${data[fld.field]}`}> {data[fld.field]} </Link></span>
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'label' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <span id={fld.field}> {data[fld.field]} </span>
                                        </Form.Group>
                                    </>
                                }

                                {fld.type === 'lookup-link' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <IUILookUpLink
                                                value={data[fld.field]}
                                                id={fld.field}
                                                schema={fld.schema}
                                            />
                                        </Form.Group>
                                    </>
                                }
                                {(!fld.type || fld.type === 'text' || fld.type === 'number') &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Control type={fld.type}
                                                name={fld.field}
                                                id={fld.field}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                placeholder={fld.placeholder}
                                                value={data[fld.field] || ""}
                                                disabled={props.readonly || fld.readonly || false}
                                                onChange={handleChange} />

                                            <p className="text-danger">{errors[fld.field]}</p>
                                        </Form.Group>
                                    </>
                                }
                                {(fld.type === 'textarea') &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Control as="textarea" rows={2}
                                                name={fld.field}
                                                id={fld.field}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                placeholder={fld.placeholder}
                                                value={data[fld.field] || ""}
                                                disabled={props.readonly || fld.readonly || false}
                                                onChange={handleChange} />
                                            <p className="text-danger">{errors[fld.field]}</p>

                                        </Form.Group>
                                    </>
                                }

                                {fld.type === 'lookup' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <IUILookUp
                                                value={fld?.defaultValue || data[fld.field]}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                id={fld.field}
                                                nameField={fld.nameField}
                                                schema={fld.schema}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || defaultFields?.includes(fld.field) || false}
                                            />

                                        </Form.Group>
                                        <p className="text-danger">{errors[fld.field]}</p>
                                    </>
                                }
                                {fld.type === 'lookup-enum' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <IUILookUpEnum
                                                value={data[fld.field]}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                id={fld.field}
                                                nameField={fld.nameField}
                                                schema={fld.schema}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || false}
                                            />

                                        </Form.Group>
                                        <p className="text-danger">{errors[fld.field]}</p>
                                    </>
                                }

                            </Col>
                        }
                    </React.Fragment>
                ))}
            </Row>
        </>

    )
}

export default IUIPageInlineElement;