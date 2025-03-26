import React, { useEffect, useState } from 'react';
import { Col, Form, InputGroup, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MaskedInput from 'react-text-mask';
import IUIResetPasswordElement from '../../ResetUserPassword';
import IUIListRelation from '../IUIListRelation';
import IUIHiddenState from './IUIHiddenState';
import IUILookUp from './IUILookUp';
import IUILookUpEnum from './IUILookUpEnum';
import IUILookUpFilter from './IUILookUpFilter';
import IUILookUpLink from './IUILookUpLink';
import IUIPictureUpload from './IUIPictureUpload';
import IUIRolePrivilege from './IUIRolePrivilege';
import IUIUserRoleEdit from './IUIUserRole';
// import ILab from './IUICanvas';
import ILab from "../../canvas-helper/Ilab-Canvas";
import FlowchartInit from '../../flowchart-helper/FlowchartInit';
import IUILookUpRelation from './IUILookUpRelation';
import IUIListInline from '../IUIListInline';
import IUIDocUpload from './IUIDocUpload';
import IUIRadio from './IUIRadio';
import IUITableInput from './IUITableInput';
import IUIListMapping from '../IUIListMapping';
import { formatStringDate } from '../../../store/datetime-formatter';
import IUIImageGallery from './IUIImageGallery';
import { FaImage } from 'react-icons/fa';

const IUIPageElement = (props) => {
    // Properties
    const schema = props?.schema;
    const defaultFields = props?.defaultFields?.map((fld) => fld?.field);
    const isAliveStatus = [
        { value: "true", label: "Alive" },
        { value: "false", label: "Dead" }
    ];
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [dirty, setDirty] = useState(props.dirty);
    const [showImageGalleryModal, setShowImageGalleryModal] = useState(false);

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

    const handleImageGalleryOpen = () => {
        setShowImageGalleryModal(true);
    };

    const handleImageGalleryClose = () => {
        setShowImageGalleryModal(false);
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
                                {fld.type === 'h21' &&
                                    <>
                                        <h4 className='mb-3'>{fld.field}</h4>
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
                                            <span id={fld.field}> {data[fld.field] ? formatStringDate(data[fld.field]) : ""} </span>
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
                                                value={fld?.defaultValue || data[fld.field]}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                id={fld.field}
                                                clearFields={fld?.reset || false}
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
                                                textonly={fld.textonly}
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
                                {fld.type === 'doc-upload' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >{fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <IUIDocUpload value={data[fld.field] || []}
                                                id={fld.field}
                                                text={fld.text}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || false}
                                            />
                                        </Form.Group>
                                        <br />
                                    </>
                                }
                                {fld.type === 'picture-upload' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor={fld.field} >{fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label>
                                            <IUIPictureUpload value={data[fld.field] || []}
                                                parentId={data[fld?.parent]}
                                                schema={fld?.schema}
                                                id={fld.field}
                                                text={fld.text}
                                                className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                onChange={handleChange}
                                                readonly={props.readonly || fld.readonly || false}
                                                shape={fld.shape || "circle"}
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
                                {fld.type === 'module-mapping' &&
                                    <>
                                        <Form.Group className="position-relative mt-2">
                                            <IUIListMapping schema={fld.schema} parentId={data.id} />
                                        </Form.Group>
                                        <br />
                                    </>
                                }
                                {fld.type === 'table-input' &&
                                    <>
                                        <Form.Label htmlFor={fld.field} className='fw-bold'>{fld.text}
                                            {fld.required &&
                                                <span className="text-danger">*</span>
                                            }
                                        </Form.Label>

                                        <IUITableInput
                                            id={fld.field}
                                            schema={fld.schema}
                                            collate={fld.schema?.collate || false}
                                            className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                            value={data[fld.field]}
                                            onChange={handleChange}
                                            readonly={props.readonly || fld.readonly || false}
                                        />
                                        <p className="text-danger">{errors[fld.field]}</p>
                                    </>
                                }
                                {fld.type === 'list-inline' &&
                                    <>
                                        <Form.Label htmlFor={fld.field} className='fw-bold'>{fld.text}
                                            {fld.required &&
                                                <span className="text-danger">*</span>
                                            }
                                        </Form.Label>

                                        <IUIListInline
                                            id={fld.field}
                                            schema={fld.schema}
                                            //value={data[fld.field]} //TODO
                                            parentId={data.id}
                                            onChange={handleChange}
                                            readonly={props.readonly || fld.readonly || false}
                                        />
                                        <br />
                                    </>
                                }
                                {fld.type === 'lookup-relation' &&
                                    <>
                                        {
                                            (data[fld.parent]) ? (
                                                <Form.Group className="position-relative form-group">
                                                    <Form.Label htmlFor={fld.field} >{fld.text}
                                                        {fld.required &&
                                                            <span className="text-danger">*</span>
                                                        }
                                                        {(fld?.exclusionCondition && data[fld?.exclusionCondition?.field] === fld?.exclusionCondition?.value) &&
                                                            <span className="text-danger">*</span>
                                                        }
                                                    </Form.Label>

                                                    <IUILookUpRelation
                                                        schema={fld.schema}
                                                        id={fld.field}
                                                        value={data[fld.field]}
                                                        className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                                        parentId={parseInt(data[fld.parent])}
                                                        onChange={handleChange}
                                                        readonly={props.readonly || fld.readonly || false}
                                                    />
                                                </Form.Group>
                                            ) : <></>
                                        }
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
                                        <Form.Label htmlFor={fld.field} className='fw-bold'>{fld.text}
                                            {fld.required &&
                                                <span className="text-danger">*</span>
                                            }
                                        </Form.Label>

                                        <ILab.MarkerCanvas
                                            id={fld.field}
                                            value={data[fld.field] || []}
                                            className={dirty ? (errors[fld.field] ? "is-invalid" : "is-valid") : ""}
                                            schema={fld.schema}
                                            onChange={handleChange}
                                            readonly={props.readonly || fld.readonly || false}
                                        />
                                        <p className="text-danger mt-2">{errors[fld.field]}</p>
                                        <br />
                                    </>
                                }
                                {fld.type === 'ilab-flowchart' &&
                                    <>
                                        <Form.Group className="position-relative form-group">
                                            {/* <Form.Label htmlFor={fld.field} >{fld.text}
                                                {fld.required &&
                                                    <span className="text-danger">*</span>
                                                }
                                            </Form.Label> */}
                                            <FlowchartInit
                                                readonly={props?.readonly || fld?.readonly || false}
                                                value={data[fld.field]}
                                            />
                                            <br />
                                        </Form.Group>
                                    </>
                                }
                                {fld.type === 'image-gallery' &&
                                    <>
                                        <Button
                                            title='Image Gallery'
                                            variant="contained"
                                            className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                                            onClick={handleImageGalleryOpen}
                                        >
                                            <FaImage size={14} className='mr-2' /> {fld.text}
                                        </Button>
                                        {
                                            showImageGalleryModal && <IUIImageGallery
                                                show={showImageGalleryModal}
                                                searchKey={fld.schema?.searchKey}
                                                searchId={fld.schema?.searchId}
                                                searchModule={fld.schema?.searchModule}
                                                handleClose={handleImageGalleryClose}
                                                title={fld.text}
                                            />
                                        }
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