import React, { useEffect, useState } from 'react';
import { Col, Form, Row, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import MaskedInput from 'react-text-mask';
import IUILookUp from './IUILookUp';
import IUIPictureUpload from './IUIPictureUpload';
import IUIRolePrivilege from './IUIRolePrivilege';
import IUIUserRoleEdit from './IUIUserRole';
import IUIListRelation from '../IUIListRelation';
import IUIResetPasswordElement from '../../ResetUserPassword';
import IUILookUpLink from './IUILookUpLink';
import IUIHiddenState from './IUIHiddenState';
import IUILookUpFilter from './IUILookUpFilter';
import IUILookUpEnum from './IUILookUpEnum';
// import ILab from './IUICanvas';
import ILab from "../../canvas-helper/Ilab-Canvas";
import FlowchartInit from '../../flowchart-helper/FlowchartInit';


const IUIPageElement = (props) => {
    // Properties
    const schema = props?.schema;

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
                                            <span><Link className="stretched-link" to={`${fld.to}${data[fld.field]}`}> {data[fld.field]} </Link></span>
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'label' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field}>{fld.text} : </Form.Label>
                                            <span> {data[fld.field]} </span>
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'label-date' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field}>{fld.text} : </Form.Label>
                                            <span> {data[fld.field]?.substring(0, 10)} </span>
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
                                {fld.type === 'user-roles' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <IUIUserRoleEdit
                                                value={data[fld.field] || []}
                                                id={fld.field}
                                                text={fld.text}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || false}
                                            />
                                        </Form.Group>
                                        <br />
                                    </>
                                }
                                {fld.type === 'user-privileges' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <IUIRolePrivilege value={data[fld.field] || []}
                                                id={fld.field}
                                                text={fld.text}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || false}
                                            />
                                        </Form.Group>
                                        <br />
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
                                {fld.type === 'lookup-enum' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >{fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>

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
                                {fld.type === 'lookup-filter' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >{fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>

                                            <IUILookUpFilter
                                                filter={fld.filter}
                                                value={data[fld.field]}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                id={fld.field}
                                                schema={fld.schema}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || false}
                                            />

                                        </Form.Group>
                                        <p className="text-danger">{errors[fld.field]}</p>
                                    </>
                                }
                                {fld.type === 'picture-upload' &&
                                    <>
                                        <Form.Group className="position-relative">
                                            <IUIPictureUpload value={data[fld.field] || []}
                                                id={fld.field}
                                                text={fld.text}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || false}
                                            />
                                        </Form.Group>
                                        <br />
                                    </>
                                }
                                {fld.type === 'module-relation' &&
                                    <>
                                        <Form.Group className="position-relative mt-2">
                                            <IUIListRelation schema={fld.schema} parentId={data.id} />
                                        </Form.Group>
                                        <br />
                                    </>
                                }
                                {fld.type === 'reset-password' &&
                                    <>
                                        <Form.Group className="position-relative">
                                            <IUIResetPasswordElement value={data[fld.field] || []}
                                                id={fld.field}
                                                text={fld.text}
                                            />
                                        </Form.Group>
                                        <br />
                                    </>
                                }
                                {fld.type === 'ilab-canvas' &&
                                    <>
                                        <ILab.MarkerCanvas schema={fld.schema} />
                                        <br />
                                    </>
                                }
                                {fld.type === 'ilab-flowchart' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >{fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <FlowchartInit onChange={handleChange} schema={fld.schema} />
                                            <br />
                                        </Form.Group>
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

export default IUIPageElement;