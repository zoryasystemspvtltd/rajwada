import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Spinner, Modal, Form, Row, Col } from "react-bootstrap";
import { setSave } from '../../../store/api-db';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import api from '../../../store/api-service';
import IUIPage from "../../common/IUIPage";
import ReportModal from "./ReportModal";
import ReportsList from "./ReportsList";
import dayjs from "./dayjsConfig";
import { notify } from "../../../store/notification";
import { getFormattedDateTime } from "../../../store/datetime-formatter";
import CommentsModal from "./CommentsModal";

const ViewActivityStatus = () => {
    const schema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        showBreadcrumbs: false,
        editing: false,
        adding: false,
        deleting: false,
        assign: false,
        assignType: 'multiple',
        assignChild: false,
        approving: false,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Work ID', field: 'workId', width: 4, type: 'label' },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', width: 4, type: 'label' },
                    { text: 'Description', field: 'description', width: 4, type: 'label' },
                    {
                        text: 'Type', field: 'type', type: 'lookup-link', width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Main Task' },
                                { name: 'Sub Task' }
                            ]
                        }
                    },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup-link',
                        schema: { module: 'project', path: 'projects' }
                    },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'label-date' },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'label-date', },
                    { text: 'Actual Start Date', field: 'actualStartDate', width: 4, type: 'label-date', },
                    { text: 'Actual End Date', field: 'actualEndDate', width: 4, type: 'label-date', },
                    {
                        text: 'Status', field: 'status', width: 4, type: 'status-badge',
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                    // {
                    //     text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-link',
                    //     schema: { module: 'priorityStatusType' }
                    // },
                    { text: 'Duration', field: 'duration', width: 4, type: 'label' },
                    { text: 'Progress(%)', field: 'progressPercentage', width: 4, type: 'label' },


                    { text: 'Estimate Cost', field: 'costEstimate', width: 4, type: 'label' },
                    { text: 'Actual Cost', field: 'actualCost', width: 4, type: 'label' },
                    {
                        text: 'Assigned To', field: 'member', width: 4, type: 'label',
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'Notes', field: 'notes', width: 4, type: 'label' },
                    {
                        text: 'Labour Provided By', field: 'labourProvidedBy', width: 4, type: 'lookup-link',
                        schema: { module: 'contractor', path: 'contractors' }
                    },
                    {
                        text: 'Material Provided By', field: 'materialProvidedBy', width: 4, type: 'lookup-link',
                        schema: { module: 'contractor', path: 'contractors' }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', readonly: true,
                        schema: {
                            readonly: true,
                            module: 'activity',
                            paging: true,
                            searching: true,
                            editing: false,
                            adding: false,
                            delete: false,
                            fields: [
                                {
                                    text: 'Item', field: 'assetId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'asset' }
                                },
                                { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
                                {
                                    text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'uom' }
                                },
                            ]
                        }
                    },
                ]
            }
        ]
    }

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.api.loggedInUser)

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);
    const [activityData, setActivityData] = useState(null);
    const [auditPrivileges, setAuditPrivileges] = useState({});

    const [remarks, setRemarks] = useState('');
    const [approvalType, setApprovalType] = useState('');
    const [showRemarksModal, setShowRemarksModal] = useState(false);

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === "auditLog")?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setAuditPrivileges(access);
        if (module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, module]);


    /* ---------------- LOAD ACTIVITY ON FIRST MOUNT ---------------- */

    useEffect(() => {
        async function fetchActivity() {
            if (!id) return;

            try {
                const res = await api.getSingleData({
                    module: "activity",
                    id: parseInt(id)
                });
                const activity = res.data;
                setActivityData(activity);


            } catch (err) {
                console.error("Failed to load activity", err);
            }
        }

        fetchActivity();
    }, [id]);

    const loadReports = async () => {
        try {
            setLoading(true);

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: {
                    name: "activityId",
                    value: parseInt(id)
                }
            }

            const response = await api.getData({ module: 'activitytracking', options: pageOptions });
            setReports(response?.data?.items || []);
        } catch (err) {
            setError("Failed to load reports");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReports();
    }, []);

    /**
     * 🔥 GROUPING LOGIC (UI SIDE)
     */
    const groupedReports = useMemo(() => {
        const map = {};

        reports.forEach((report) => {
            const dateKey = dayjs
                .utc(report.date)
                .tz("Asia/Kolkata")
                .format("YYYY-MM-DD");

            if (!map[dateKey]) {
                map[dateKey] = [];
            }

            map[dateKey].push(report);
        });

        return Object.keys(map)
            .sort((a, b) => new Date(b) - new Date(a))
            .map((date) => ({
                date,
                count: map[date].length,
                reports: map[date],
            }));
    }, [reports]);

    const handleCommentClick = (id) => {
        setSelectedActivityId(id);
        setCommentsModalOpen(true);
    };

    const closeCommentsModal = () => {
        setCommentsModalOpen(false);
        setSelectedActivityId(null);
    };

    const handleModalClose = () => {
        setShowRemarksModal(false);
        setRemarks('');
    };

    const handleRemarksChange = (event) => {
        const { value } = event.target;
        setRemarks(value);
    };

    const approvedPageValue = async (e, approvalstatus) => {
        e.preventDefault();
        if (!remarks || remarks === '') {
            notify("error", "Remarks is mandatory !");
            return;
        }
        const current = new Date();
        const action = {
            module: module,
            data: {
                id: id,
                status: approvalstatus,
                isApproved: approvalstatus === 4,
                isOnHold: approvalstatus === 5,
                isCancelled: approvalstatus === 12,
                hodRemarks: remarks,
                modifiedBy: loggedInUser?.email
            }
        }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }));

            const timeId = setTimeout(async () => {
                // After 3 seconds set the show value to false
                setShowRemarksModal(false);
                navigate(0);
            }, 1000)

            return () => {
                clearTimeout(timeId)
            }

        } catch (e) {
            // TODO
        }
    }

    return (
        <>
            <div>
                <div className="row">
                    <div className="col">
                        <IUIPage schema={schema} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Card className="shadow-sm p-3">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                                <h5>Daily Activity Reports</h5>
                                <div className="">
                                    <Button
                                        variant="contained"
                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md"
                                        disabled={[5, 12].includes(activityData?.status)}
                                        onClick={() => setModalOpen(true)}
                                    >
                                        Submit Today's Report
                                    </Button>

                                    <Button
                                        variant="contained"
                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md"
                                        onClick={() => handleCommentClick(id)}
                                    >
                                        Activity Comments
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        {loading && (
                            <div className="text-center mt-4">
                                <Spinner animation="border" />
                            </div>
                        )}

                        {error && <Alert variant="danger">{error}</Alert>}

                        {!loading && (
                            <ReportsList activityId={id} groupedReports={groupedReports} />
                        )}

                        <ReportModal
                            activityId={id}
                            show={modalOpen}
                            onClose={() => {
                                setModalOpen(false);
                                loadReports();
                                window.location.reload();
                            }}
                        />

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
                                        onClick={(e) => (approvalType === "In Progress") ? approvedPageValue(e, 1) : approvedPageValue(e, 12)}
                                    >
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        }
                    </div>
                </div>

                <CommentsModal
                    show={commentsModalOpen}
                    onClose={closeCommentsModal}
                    activityId={selectedActivityId}
                />
            </div>
        </>
    );
}

export default ViewActivityStatus;
