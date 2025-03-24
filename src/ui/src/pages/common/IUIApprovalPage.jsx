import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { setSave } from '../../store/api-db';
import api from '../../store/api-service';
import { notify } from "../../store/notification";
import IUIApprover from './shared/IUIApprover';
import IUIBreadcrumb from './shared/IUIBreadcrumb';
import IUIModuleMessage from './shared/IUIModuleMessage';
import IUIPageElement from './shared/IUIPageElement';

const IUIApprovalPage = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;
    const [defaultValues, setDefaultValues] = useState({});
    // Parameter
    const { id } = useParams();
    const { parentId } = useParams();
    // console.log(parentId)
    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    // const selectedDataId = useSelector((state) => state.api[module]?.selectedItemId)
    const [dirty, setDirty] = useState(false)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [approvalStatus, setApprovalStatus] = useState({});
    const [displayApprovalButtons, setDisplayApprovalButtons] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [approvalType, setApprovalType] = useState('');
    const [showRemarksModal, setShowRemarksModal] = useState(false);
    // Usage
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const item = await api.getSingleData({ module: module, id: id });
                setData(item.data);
                setApprovalStatus(item.data.status);
                if (loggedInUser?.roles?.includes("Quality Engineer")) {
                    if (item.data?.isQCApproved) {
                        setDisplayApprovalButtons(false);
                    }
                    else {
                        setDisplayApprovalButtons(true);
                    }
                }
                else {
                    if (item.data?.isApproved) {
                        setDisplayApprovalButtons(false);
                    }
                    else {
                        setDisplayApprovalButtons(true);
                    }
                }
            }
        }

        fetchData();
    }, [id, loggedInUser]);

    useEffect(() => {
        if (props?.defaultValues) {
            setDefaultValues(props?.defaultValues);
            const newData = { ...data };
            schema?.defaultFields?.forEach((fld) => {
                newData[fld.field] = (!["photo", "text"].includes(fld.type)) ? parseInt(props?.defaultValues[fld.field]) : props?.defaultValues[fld.field];
            })
            setData(newData);
        }
    }, [props?.defaultValues]);

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
            const error = validate(data, schema?.fields)
            setErrors(error);
        }
    }, [data, dirty]);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
    };

    const handleRemarksChange = (event) => {
        const { value } = event.target;
        setRemarks(value);
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

    const assignApprover = async (e, email) => {
        e.preventDefault();
        const action = { module: module, data: { id: id, member: email } }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }));

            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                navigate(0);
            }, 1000)

            return () => {
                clearTimeout(timeId)
            }

        } catch (e) {
            // TODO
        }
    }

    const approvedPageValue = async (e, isApproved) => {
        e.preventDefault();
        if (!remarks || remarks === '') {
            notify("error", "Remarks is mandatory!");
            return;
        }
        const current = new Date();
        let patchAction = {};
        let editAction = {};
        if (loggedInUser?.roles?.includes("Quality Engineer")) {
            // QC is approving
            if (isApproved) {
                patchAction = {
                    module: module,
                    data: { id: id, status: 7, qcApprovedBy: loggedInUser?.email, qcApprovedDate: current, isQCApproved: isApproved, isCompleted: isApproved, qcRemarks: remarks }
                }
            }
            // QC is rejecting
            else {
                patchAction = {
                    module: module,
                    data: { id: id, status: 3, qcApprovedBy: loggedInUser?.email, qcApprovedDate: current, isQCApproved: isApproved, isCompleted: isApproved, qcRemarks: remarks }
                }
                editAction = {
                    module: module,
                    data: { ...data, isCompleted: false, isAbandoned: true }
                }
            }
        }
        else {
            // HOD is approving
            if (isApproved) {
                patchAction = {
                    module: module,
                    data: { id: id, status: 4, approvedBy: loggedInUser?.email, approvedDate: current, isApproved: isApproved, isCompleted: isApproved, hodRemarks: remarks }
                }
                editAction = {
                    module: module,
                    data: { ...data, isCompleted: true, actualEndDate: current }
                }
            }
            // HOD is rejecting
            else {
                patchAction = {
                    module: module,
                    data: { id: id, status: 6, approvedBy: loggedInUser?.email, approvedDate: current, isApproved: isApproved, isCompleted: isApproved, hodRemarks: remarks }
                }
                editAction = {
                    module: module,
                    data: { ...data, isCompleted: false, isAbandoned: true }
                }
            }
        }
        try {
            if (Object.keys(editAction).length > 0) {
                await api.editData(editAction);
            }

            await api.editPartialData(patchAction);
            dispatch(setSave({ module: module }));

            const timeId = setTimeout(async () => {
                // After 3 seconds set the show value to false
                notify('success', 'Approval submission successful!');
                setShowRemarksModal(false);
                navigate(0);
            }, 1000)

            return () => {
                clearTimeout(timeId)
            }

        } catch (e) {
            // TODO
            notify('error', 'Failed to submit approval!');
        }
    }

    const handleModalClose = () => {
        setShowRemarksModal(false);
        setRemarks('');
    }

    return (
        <>
            <div className="app-page-title">
                {
                    schema?.showBreadcrumbs ?
                        <Row>
                            <Col md={12}>
                                <IUIBreadcrumb schema={{ type: 'view', module: module, displayText: schema?.title }} />
                            </Col>
                        </Row> :
                        <div className="page-title-heading"> {(module !== 'activity') ? schema?.title : ''}</div>
                }
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <div>
                                        <Form>
                                            <Row>
                                                <Col>
                                                    {((module !== 'activity' && schema?.back) || (module === 'activity' && !schema?.adding && schema?.back)) &&
                                                        <Button variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                            onClick={() => navigate(-1)}> Back</Button>
                                                    }
                                                    {/* {!schema?.readonly &&
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
                                                    {
                                                        (approvalStatus === 2 || approvalStatus === 7) && displayApprovalButtons &&
                                                        <>
                                                            {
                                                                schema?.readonly && privileges?.approve &&
                                                                <Button variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={(e) => { setShowRemarksModal(true); setApprovalType("Approve"); }}> Approve</Button>
                                                            }
                                                            {
                                                                schema?.readonly && privileges?.approve &&
                                                                <Button variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-sm mr-2"
                                                                    onClick={(e) => { setShowRemarksModal(true); setApprovalType("Reject"); }}> Reject</Button>
                                                            }
                                                        </>
                                                    }

                                                    {/* Condition modified by Adrish */}
                                                    {schema?.approving && privileges?.assign && approvalStatus === 3 && loggedInUser?.email !== data.member &&
                                                        <IUIApprover onClick={assignApprover} />
                                                    }
                                                    <IUIModuleMessage schema={props.schema} />
                                                </Col>
                                            </Row>
                                            {
                                                ((module !== 'activity') && (schema?.back || schema?.adding || schema?.editing)) || (module === 'activity' && schema?.editing) ?
                                                    <hr /> : null
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

                                                                    {
                                                                        ((module !== 'activity') || (module === 'activity' && !schema?.adding)) && (
                                                                            <Button variant="contained"
                                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                                onClick={() => navigate(-1)}> Cancel
                                                                            </Button>
                                                                        )
                                                                    }
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
                        {
                            (showRemarksModal) && <Modal show={showRemarksModal} onHide={handleModalClose}>
                                <Modal.Header closeButton>
                                    <h4 style={{ color: "black" }}>Remarks</h4>
                                </Modal.Header>
                                <Modal.Body style={{ color: "black" }}>
                                    <Form.Group as={Row} controlId="remarksInput">
                                        <Col>
                                            <Form.Control type="text" value={remarks} onChange={handleRemarksChange} placeholder="Remarks here....." />
                                        </Col>
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="contained"
                                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                                        onClick={handleModalClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                                        onClick={(e) => (approvalType === "Approve") ? approvedPageValue(e, true) : approvedPageValue(e, false)}
                                    >
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        }
                    </div>
                </div>
            </div>
        </>

    )
}

export default IUIApprovalPage;