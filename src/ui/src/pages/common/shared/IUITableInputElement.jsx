import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import MaskedInput from 'react-text-mask';
import IUIHiddenState from './IUIHiddenState';
import IUILookUp from './IUILookUp';
import IUILookUpLink from './IUILookUpLink';
// import ILab from './IUICanvas';

import IUIRadio from './IUIRadio';

const IUITableInputElement = (props) => {
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
    const [dirty, setDirty] = useState(props.dirty);

    useEffect(() => {
        if (props?.value)
            setData(props?.value);
    }, [props?.value]);

    useEffect(() => {
        if (props?.clearFields) {
            setErrors({})
        }
    }, [props?.clearFields]);

    useEffect(() => {
        if (props?.dirty)
            setDirty(props?.dirty);
    }, [props?.dirty]);

    useEffect(() => {

        if (props?.errors)
            setErrors(props?.errors);
    }, [props?.errors]);

    useEffect(() => {
        if (props?.value) {
            // setData({});
            // setErrors({});
            // console.log(data)
        }
    }, [props?.value]);

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
            <>
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
                            <>
                                {fld.type === 'h1' &&
                                    <>
                                        <h1>{data[fld.field]}</h1>
                                    </>
                                }
                                {fld.type === 'h2' &&
                                    <>
                                        <h2>{data[fld.field]}</h2>
                                    </>
                                }
                                {fld.type === 'h3' &&
                                    <>
                                        <h3>{data[fld.field]}</h3>
                                    </>
                                }
                                {fld.type === 'h4' &&
                                    <>
                                        <h4>{data[fld.field]}</h4>
                                    </>
                                }
                                {fld.type === 'h5' &&
                                    <>
                                        <h5>{data[fld.field]}</h5>
                                    </>
                                }
                                {fld.type === 'h6' &&
                                    <>
                                        <h6>{data[fld.field]}</h6>
                                    </>
                                }
                                {fld.type === 'p' &&
                                    <>
                                        <p>{data[fld.field]}</p>
                                    </>
                                }
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
                                            <Form.Label htmlFor={fld.field}>{fld.text} : </Form.Label>
                                            <span id={fld.field}> {data[fld.field]} </span>
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'label-date' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field}>{fld.text} : </Form.Label>
                                            <span id={fld.field}> {data[fld.field]?.substring(0, 10)} </span>
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'lookup-link' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field}>{fld.text} : </Form.Label>
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
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}</Form.Label>
                                            {fld.required &&
                                                <span className="text-danger">*</span>
                                            }
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
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
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
                                {(fld.type === 'email') &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <Form.Control type="text"
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
                                {(fld.type === 'phone') &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <MaskedInput
                                                mask={[/[1-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                                                placeholder="##########"
                                                name={fld.field}
                                                id={fld.field}
                                                className={dirty ? (errors[fld.field] ? "form-control is-invalid" : "form-control is-valid") : "form-control"}
                                                value={data[fld.field] || ""}
                                                disabled={props.readonly || fld.readonly || false}
                                                onChange={handleChange} />
                                            <p className="text-danger">{errors[fld.field]}</p>

                                        </Form.Group>
                                    </>
                                }
                                {(fld.type === 'date') &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <Form.Control type="date"
                                                name={fld.field}
                                                id={fld.field}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                value={data[fld.field]?.substring(0, 10) || ""}
                                                disabled={props.readonly || fld.readonly || false}
                                                onChange={handleChange} />

                                        </Form.Group>
                                    </>
                                }
                                {(fld.type === 'datetype') &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <Form.Control type="date"
                                                name={fld.field}
                                                id={fld.field}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                value={data[fld.field] || new Date()}
                                                disabled={props.readonly || fld.readonly || false}
                                                onChange={handleChange} />

                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'check' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <InputGroup>
                                                <Form.Check className='text-capitalize'
                                                    type="switch"
                                                    style={{ transform: 'scale(1.2)' }}
                                                    id={fld.field}
                                                    checked={data[fld.field] || false}
                                                    onChange={(e) => handleChange(e)}
                                                    disabled={props.readonly}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'radio' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >
                                                {fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>

                                            <InputGroup>
                                                <IUIRadio
                                                    id={fld.field}
                                                    name={fld.field}
                                                    onChange={handleChange}
                                                    value={data[fld.field]}
                                                    options={isAliveStatus}
                                                    readonly={props.readonly}
                                                />
                                            </InputGroup>
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'lookup' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >{fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>

                                            <IUILookUp
                                                value={fld?.defaultValue || data[fld.field]}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                id={fld.field}
                                                nameField={fld.nameField}
                                                schema={fld.schema}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || defaultFields?.includes(fld.field) || false}
                                                clearFields={props?.clearFields}
                                            />

                                        </Form.Group>
                                        <p className="text-danger">{errors[fld.field]}</p>
                                    </>
                                }
                            </>
                        }
                    </React.Fragment>
                ))}
            </>
        </>

    )
}

export default IUITableInputElement;