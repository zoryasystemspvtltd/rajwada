import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spinner, Alert, Form, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import api from "../../../store/api-service";
import { notify } from "../../../store/notification";
import IUITableInput from "../../common/shared/IUITableInput";
import IUIDeleteModal from "../../common/IUIDeleteModal";

dayjs.extend(utc);
dayjs.extend(timezone);

const ReportDetailsPage = () => {
    const { date } = useParams();
    const { activityId } = useParams();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ NEW STATES
    const [editingId, setEditingId] = useState(null);
    const [oldReportData, setOldReportData] = useState({});
    const [editData, setEditData] = useState({});
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const itemListSchema = {
        text: 'Item List', field: 'item', width: 12, type: 'table-input', required: false, readonly: true,
        schema: {
            title: 'Item',
            module: 'activitytracking',
            readonly: true,
            paging: true,
            searching: true,
            editing: true,
            adding: true,
            fields: [
                {
                    text: 'Item', field: 'assetId', type: 'lookup', required: true, width: 4,
                    schema: { module: 'asset' }
                },
                { text: 'Quantity', field: 'quantity', type: 'number', width: 4, required: true },
                {
                    text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                    schema: { module: 'uom' }
                },
            ]
        }
    };

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const istStart = dayjs.tz(date, "Asia/Kolkata").startOf("day");
                const istEnd = dayjs.tz(date, "Asia/Kolkata").endOf("day");

                const utcStart = istStart.utc().toDate();
                const utcEnd = istEnd.utc().toDate();

                const newBaseFilter = {
                    name: 'date',
                    value: utcStart,
                    operator: 'greaterThan',
                    and: {
                        name: 'date',
                        value: utcEnd,
                        operator: 'lessThan',
                        and: {
                            name: "activityId",
                            value: parseInt(activityId)
                        }
                    }
                };

                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: newBaseFilter
                };

                const response = await api.getData({
                    module: 'activitytracking',
                    options: pageOptions
                });

                setReports(response?.data?.items || []);
            } catch {
                setError("Failed to load reports");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [date]);

    // ✅ EDIT HANDLER
    const handleEdit = (report) => {
        setEditingId(report.id);
        setOldReportData({ ...report });
        setEditData({ ...report });
    };

    // ✅ SAVE HANDLER
    const handleSave = async (id) => {
        try {

            await api.editData({ module: 'activitytracking', data: { ...editData, oldValues: JSON.stringify(oldReportData) } });

            setReports((prev) =>
                prev.map((r) => (r.id === id ? { ...editData } : r))
            );

            setEditingId(null);
            setOldReportData({});

            notify('success', 'Edit successful !');
        } catch (err) {
            notify('error', 'Edit failed !');
        }
    };

    const handleDeleteClick = (report) => {
        setSelectedItem({ module: 'activitytracking', id: report.id });
        setShowDeleteModal(true);
    };

    const deleteCheckpointTracking = async (itemId) => {
        const response = await api.deleteData({ module: 'workCheckPointTracking', id: itemId });
        return response.data;
    }

    // ✅ DELETE HANDLER
    const deletePageValue = async (e, id) => {
        try {
            e.preventDefault();
            // Need to delete Work Checkpoint Trackings which are related to this activity tracking id
            const newBaseFilter = {
                name: 'activityTrackingId',
                value: parseInt(id)
            }

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: newBaseFilter
            }

            const response = await api.getData({ module: 'workCheckPointTracking', options: pageOptions });
            let itemData = response?.data?.items;

            if (itemData.length > 0) {
                const deletePromises = itemData.map(unit => deleteCheckpointTracking(unit.id));
                await Promise.all(deletePromises);
            }

            await api.deleteData({ module: "activitytracking", id: parseInt(id) });

            setReports((prev) => prev.filter((r) => r.id !== id));

            notify('success', 'Deletion successful !');
        } catch (err) {
            notify("error", "Deletion failed ! Kindly check for relation constraints");
        }
    };

    return (
        <div>
            <Card className="shadow-sm p-3">
                <h4>Reports for {date}</h4>

                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}

                {reports.map((report) => (
                    <Card key={report.id} className="mt-3 shadow-sm">

                        {/* HEADER */}
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold">Report</span>

                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleEdit(report)}
                                >
                                    <FaEdit />
                                </Button>

                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDeleteClick(report)}
                                >
                                    <FaTrash />
                                </Button>
                            </div>
                        </Card.Header>

                        <Card.Body>

                            {/* EDIT MODE */}
                            {editingId === report.id ? (
                                <>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Cost</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editData.cost || ""}
                                            onChange={(e) =>
                                                setEditData({ ...editData, cost: e.target.value })
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Man Power</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editData.manPower || ""}
                                            onChange={(e) =>
                                                setEditData({ ...editData, manPower: e.target.value })
                                            }
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-2">
                                        <Form.Label>Progress (%)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={editData.progressPercentage || ""}
                                            onChange={(e) =>
                                                setEditData({ ...editData, progressPercentage: e.target.value })
                                            }
                                        />
                                    </Form.Group>

                                    <Button
                                        size="sm"
                                        className="mt-2"
                                        onClick={() => handleSave(report.id)}
                                    >
                                        Save
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p><strong>Cost:</strong> {report?.cost}</p>
                                    <p><strong>Man Power:</strong> {report?.manPower}</p>
                                    <p><strong>Progress Percentage:</strong> {report?.progressPercentage}</p>
                                </>
                            )}

                            {/* ITEM LIST (READ ONLY) */}
                            <div className="row my-2">
                                <div className="col-sm-12">
                                    <Form.Label className='fw-bold'>
                                        {itemListSchema.text}
                                    </Form.Label>

                                    <IUITableInput
                                        value={report.item}
                                        schema={itemListSchema.schema}
                                        onChange={() => { }}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}

                {showDeleteModal && (
                    <IUIDeleteModal
                        item={selectedItem}
                        onConfirm={deletePageValue}
                        onCancel={() => setShowDeleteModal(false)}
                    />
                )}
            </Card>
        </div>
    );
};

export default ReportDetailsPage;
