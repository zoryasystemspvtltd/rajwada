import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Spinner, Modal, Form } from "react-bootstrap";
import { useSelector } from 'react-redux';
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
                        text: 'Status', field: 'workflowState', width: 4, type: 'lookup-link',
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

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [selectedActivityId, setSelectedActivityId] = useState(null);

    // useEffect(() => {
    //     const commentPrivileges = loggedInUser?.privileges?.filter(p => p.module === "comment")?.map(p => p.name);
    //     const imagePrivileges = loggedInUser?.privileges?.filter(p => p.module === "attachment")?.map(p => p.name);
    //     const activityTrackingPrivileges = loggedInUser?.privileges?.filter(p => p.module === "activityTracking")?.map(p => p.name);
    //     let access = {};
    //     commentPrivileges.forEach(p => {
    //         access["comment"] = { ...access["comment"], ...{ [p]: true } }
    //     })
    //     imagePrivileges.forEach(p => {
    //         access["image"] = { ...access["image"], ...{ [p]: true } }
    //     })
    //     activityTrackingPrivileges.forEach(p => {
    //         access["activitytracking"] = { ...access["activitytracking"], ...{ [p]: true } }
    //     })
    //     setPrivileges(access)
    // }, [loggedInUser]);


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