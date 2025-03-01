import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData, editData, addData, setSave } from '../../store/api-db'
import { useDispatch, useSelector } from 'react-redux'
import IUIPageElement from './shared/IUIPageElement';
import IUIModuleMessage from './shared/IUIModuleMessage';
import api from '../../store/api-service'
import IUIBreadcrumb from './shared/IUIBreadcrumb';
import IUIAssign from './shared/IUIAssign';
import IUIApprover from './shared/IUIApprover';
import { notify } from "../../store/notification";
import IUIMultiAssign from './shared/IUIMultiAssign';

const IUIPage = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;
    const [defaultValues, setDefaultValues] = useState({});
    const flowchartKey = "dependency-flow";
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
    const [disabled, setDisabled] = useState(false)
    const [approvalStatus, setApprovalStatus] = useState({});
    const [approvedMemeber, setApprovalBy] = useState({});
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
                setApprovalBy(item.data.member);
            }
        }

        fetchData();
    }, [id]);

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
        }
        return errors;
    };

    const assignPageValue = async (e, email, userId) => {
        e.preventDefault();
        let action = {};
        if (module === 'activity') {
            action = { module: module, data: { id: id, member: email, userId: userId } }
        }
        else {
            action = { module: module, data: { id: id, member: email } }
        }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }))
            //navigate(-1);
            notify("success", "Assignment Successful!");
        } catch (e) {
            // TODO
        }
    }

    const assignMultiPageValue = async (e, userList) => {
        e.preventDefault();
        let isAllAssignSuccessful = true;
        // Multi user assignment for main item
        await multiUserAssignment(id, userList);
        if (schema?.assignChild) {
            const newBaseFilter = {
                name: 'parentId',
                value: parseInt(id)
            }

            const pageOptions = {
                recordPerPage: 0
                , searchCondition: newBaseFilter
            }

            const childResponse = await api.getData({ module: module, options: pageOptions });
            let childrenItems = childResponse?.data?.items;
            try {
                // Multi user assignment for children
                for (let item of childrenItems) {
                    await multiUserAssignment(item.id, userList);
                }
            }
            catch (error) {
                isAllAssignSuccessful = false;
            }
        }
        if (isAllAssignSuccessful) {
            notify("success", "Assignments Successful!");
        }
        else {
            notify("error", "One or more assignments failed!");
        }
    }

    const multiUserAssignment = async (dataId, userList) => {
        let isAllAssignSuccessful = true;
        for (let user of userList) {
            let action = {};
            if (module === 'activity') {
                action = { module: module, data: { id: dataId, member: user.email, userId: user.id, status: 3 } }
            }
            else {
                action = { module: module, data: { id: dataId, member: user.email, status: 3 } }
            }
            try {
                await api.editPartialData(action);
                dispatch(setSave({ module: module }))
                //navigate(-1);

            } catch (e) {
                // TODO
                isAllAssignSuccessful = false;
            }
        }
        return;
    }

    const assignDirect = async (userId) => {
        const user = await api.getSingleData({ module: "user", id: userId });
        let email = user.data.email;
        const action = { module: module, data: { id: id, member: email, status: 2 } }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }))
            //navigate(-1);

        } catch (e) {
            // TODO
        }
    }

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
        const action = {
            module: module,
            data: { id: id, status: isApproved ? 4 : 6, approvedBy: approvedMemeber, approvedDate: current, isApproved: isApproved, isCompleted: isApproved, approvedRemarks: remarks }
        }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }));

            const timeId = setTimeout(async () => {
                // After 3 seconds set the show value to false
                setShowRemarksModal(false);
                // Mark Activity as Completed
                if (module === 'activity' && isApproved) {
                    const updatedActivityData = {
                        ...data,
                        isCompleted: true,
                        actualEndDate: new Date()
                    };
                    await api.editData({ module: 'activity', data: updatedActivityData });
                }
                navigate(0);
            }, 1000)

            return () => {
                clearTimeout(timeId)
            }

        } catch (e) {
            // TODO
        }
    }

    const handleModalClose = () => {
        setShowRemarksModal(false);
        setRemarks('');
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
    const savePageValue = async (e) => {
        e.preventDefault();

        if (!props?.readonly) {
            setDirty(true);
            const error = validate(data, schema?.fields)
            setErrors(error);
            if (Object.keys(error).length === 0) {
                if (!data)
                    return
                setDisabled(true)
                if (id != undefined)
                    try {
                        await api.editData({ module: module, data: (module === 'workflow') ? { ...data, data: localStorage.getItem(flowchartKey) ? localStorage.getItem(flowchartKey) : "" } : data });
                        dispatch(setSave({ module: module }))

                        const timeId = setTimeout(() => {
                            // After 3 seconds set the show value to false
                            if (schema?.assignNext) {
                                assignDirect(data?.[schema?.assignField]);
                            }
                            if (schema?.goNextList) {
                                navigate(`/${schema.path}`);
                            }
                            else {
                                navigate(-1);
                            }
                        }, 1000)

                        return () => {
                            clearTimeout(timeId)
                        }


                    } catch (e) {
                        // TODO
                    }
                else
                    try {
                        //api.addData({ module: module, data: (module === 'workflow') ? { ...data, data: localStorage.getItem(flowchartKey) ? localStorage.getItem(flowchartKey) : "" } : data });
                        // if (module === 'activity') {
                        //     console.log(data);
                        //     return;
                        // }
                        let response = await api.addData({ module: module, data: (module === 'workflow') ? { ...data, data: localStorage.getItem(flowchartKey) ? localStorage.getItem(flowchartKey) : "" } : data });
                        dispatch(setSave({ module: module }))
                        const timeId = setTimeout(() => {
                            // After 3 seconds set the show value to false
                            if (module === 'activity') {
                                props?.activityCallback(true);
                                return;
                            }
                            else {
                                if (schema.goNextView) {
                                    navigate(`/${schema.path}/${response.data}`);
                                }
                                else if (schema.goNextEdit) {
                                    navigate(`/${schema.path}/${response.data}/edit`);
                                } else {
                                    navigate(-1);
                                    localStorage.removeItem(flowchartKey);
                                }
                            }


                        }, 1000)

                        return () => {
                            clearTimeout(timeId)
                        }
                    } catch (e) {
                        // TODO
                        if (module === 'activity') {
                            props?.activityCallback(false);
                            return;
                        }
                    }
            }
        }
    };

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
                                        {/* {
                                            schema?.showBreadcrumbs && <Row>
                                                <Col md={12} className='mb-3'>
                                                    <IUIBreadcrumb schema={{ type: 'view', module: module, displayText: schema?.title }} />
                                                </Col>
                                            </Row>
                                        } */}
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
                                                    {(schema?.adding && module !== 'activity') &&
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
                                                    {
                                                        // Edit allowed until approvalStatus <= 3 (3 -> Assigned)
                                                        approvalStatus <= 3 &&
                                                        <>
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
                                                        </>
                                                    }
                                                    {
                                                        (approvalStatus === 3 || approvalStatus === 7) && loggedInUser?.email === data.member &&
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
                                                    {schema?.assign && privileges?.assign && schema?.assignType === 'single' && (approvalStatus !== 3 && approvalStatus !== 4 && approvalStatus !== 6) &&
                                                        <IUIAssign onClick={assignPageValue} />
                                                    }
                                                    {schema?.assign && privileges?.assign && schema?.assignType === 'multiple' && (approvalStatus !== 3 && approvalStatus !== 4 && approvalStatus !== 6) &&
                                                        <IUIMultiAssign onClick={assignMultiPageValue} />
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
                                                                    <Button variant="contained"
                                                                        disabled={disabled}
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                        onClick={savePageValue}>Save
                                                                    </Button>


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
                                                    {/* {schema?.adding &&
                                                        <>
                                                            {privileges?.add &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${schema.module}s/add`)}
                                                                >
                                                                    Add New
                                                                </Button>
                                                            }
                                                        </>
                                                    } */}
                                                    {/* {schema?.editing &&
                                                        <>
                                                            {privileges?.edit &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${schema.module}s/${id}/edit`)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            }
                                                        </>
                                                    } */}
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

export default IUIPage;