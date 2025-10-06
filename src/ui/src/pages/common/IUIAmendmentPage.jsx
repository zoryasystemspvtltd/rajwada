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

const IUIAmendmentPage = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;
    const [defaultValues, setDefaultValues] = useState({});
    // Parameter
    const id = schema?.id;
    // console.log(parentId)
    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    // const selectedDataId = useSelector((state) => state.api[module]?.selectedItemId)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [amendmentStatus, setAmendmentStatus] = useState({});
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
                setAmendmentStatus(item.data.amendmentStatus); // check whether extra status tracking is required
                // Display the approve/reject iff the following conditions are satisfied
                // 1. Item is a main amendment item i.e parentId is null
                // 2. Item has rejectedByQC = false
                // 3. Item has amendmentStatus = 1 i.e amendment has been resubmitted atleast once
                // 4. Role of loggedIn user is QC
                if (loggedInUser?.roles?.includes("Quality Engineer")) {
                    if (item?.data?.parentId === null && item.data?.rejectedByQC && item.data?.amendmentStatus === 1) {
                        setDisplayApprovalButtons(true);
                    }
                    else {
                        setDisplayApprovalButtons(false);
                    }
                }
                // else {
                //     if (item.data?.amendmentStatus === 1) {
                //         setDisplayApprovalButtons(true);
                //     }
                //     else {
                //         setDisplayApprovalButtons(false);
                //     }
                // }
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

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
    };

    const handleRemarksChange = (event) => {
        const { value } = event.target;
        setRemarks(value);
    };

    const assignApprover = async (e, email) => {
        e.preventDefault();
        //status :3 means assigned
        const action = { module: module, data: { id: id, member: email, status: 3 } }
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

    const updateAmendments = async (amendment) => {
        const response = await api.editData({ module: module, data: amendment });
        return response.data;
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
            // QC is approving, then
            // 1. set AmendmentStatus to 2 for parent as well as child
            // 2. Find the newValues from the latest child amendment
            // 3. Update the main Activity Table with the newValues
            if (isApproved) {
                // Find child amendments
                const newBaseFilter = {
                    name: 'parentId',
                    value: parseInt(id)
                }


                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: newBaseFilter
                }


                const response = await api.getData({ module: module, options: pageOptions });


                let childAmendments = response?.data?.items;


                const sortedAmendmentData = childAmendments?.sort((t1, t2) => new Date(t2.date) - new Date(t1.date));


                const lastChildAmendmentData = sortedAmendmentData[0];


                const lastChildActivityData = JSON.parse(lastChildAmendmentData?.newValues);


                const allAmendmentsToUpdate = [data, ...childAmendments].map((amendment) => ({ ...amendment, amendmentStatus: 2, rejectedByQC: false, reviewedBy: loggedInUser?.email, qcRemarks: remarks }))


                // Update all amendments
                const updatePromises = allAmendmentsToUpdate.map(amendment => updateAmendments(amendment));
                await Promise.all(updatePromises);


                patchAction = {
                    module: 'activity',
                    data: { id: lastChildActivityData?.id, status: 7, qcApprovedBy: loggedInUser?.email, qcApprovedDate: current, isQCApproved: isApproved, isCompleted: isApproved, qcRemarks: remarks }
                }


                // Edit the main activity
                editAction = {
                    module: 'activity',
                    data: { ...lastChildActivityData, isCompleted: false, isAbandoned: true, isInProgress: true, progressPercentage: 95 }
                }
            }
            // QC is rejecting, then
            // Process continues, just set the QC Remarks field in the main parent amendment
            else {
                editAction = {
                    module: module,
                    data: { ...data, qcRemarks: remarks }
                }
            }
        }

        try {
            if (Object.keys(editAction).length > 0) {
                await api.editData(editAction);
            }

            if (Object.keys(patchAction).length > 0) {
                await api.editPartialData(patchAction);
            }

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


                                                    {
                                                        (amendmentStatus <= 1) && displayApprovalButtons &&
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
                                                    {/* {schema?.approving && privileges?.assign && approvalStatus === 3 && loggedInUser?.email !== data.member &&
                                                        <IUIApprover onClick={assignApprover} />
                                                    } */}
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
                                                                    dirty={false}
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

export default IUIAmendmentPage;
