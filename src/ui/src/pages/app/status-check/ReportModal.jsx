import { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal, ProgressBar } from "react-bootstrap";
import api from '../../../store/api-service';
import IUITableInput from "../../common/shared/IUITableInput";
import { getToday } from "./dateUtils";

const ReportModal = ({ activityId, show, onClose, submitDisabled = false }) => {

    const today = getToday();

    const createDefaultForm = useCallback(() => ({
        activityId,
        date: today,
        cost: "",
        manPower: "",
        progress: 0,
        checkpoints: [],
        item: '',
        isCompleted: false
    }), [activityId, today]);

    const itemListSchema =
    {
        text: 'Item List', field: 'item', width: 12, type: 'table-input', required: false, readonly: false,
        schema: {
            title: 'Item',
            module: 'activitytracking',
            readonly: false,
            paging: true,
            searching: true,
            editing: true,
            adding: true,
            delete: true,
            fields: [
                {
                    text: 'Item', field: 'assetId', type: 'lookup-intersection', required: true, width: 4,
                    schema: { module: 'asset', intersection: { module: 'activity', id: parseInt(activityId), field: 'items', identifier: 'assetId' } }
                },
                { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
                {
                    text: 'UOM', field: 'uomId', type: 'lookup-intersection', required: true, width: 4,
                    schema: { module: 'uom', intersection: { module: 'activity', id: parseInt(activityId), field: 'items', identifier: 'uomId' } }
                },
            ]
        }
    };

    const [formData, setFormData] = useState(createDefaultForm());
    const [activityData, setActivityData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [minProgressPercentage, setMinProgressPercentage] = useState(0);

    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    /* ---------------- Fetch Activity ---------------- */

    useEffect(() => {
        async function fetchActivity() {

            if (!activityId) return;

            const res = await api.getSingleData({
                module: 'activity',
                id: activityId
            });

            setActivityData(res.data);
        }

        fetchActivity();
    }, [activityId]);

    /* ---------------- Load Latest Report ---------------- */

    useEffect(() => {

        if (!show) return; // prevents re-runs when modal closes

        let isMounted = true;

        async function loadReportAndCheckpoints() {
            if (!activityId || !show) return;

            try {

                /* Fetch latest report today */
                const currentDay = new Date();
                const todayStart = new Date(currentDay.setHours(0, 0, 0, 0));
                const todayEnd = new Date(currentDay.setHours(23, 59, 59, 999));

                const baseFilter = {
                    name: 'activityId',
                    value: parseInt(activityId),
                    and: {
                        name: 'date',
                        value: todayStart,
                        operator: 'greaterThan',
                        and: {
                            name: 'date',
                            value: todayEnd,
                            operator: 'lessThan'
                        }
                    }
                };

                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: baseFilter
                };

                const response = await api.getData({ module: 'activitytracking', options: pageOptions });
                const reports = response?.data?.items?.sort((t1, t2) => new Date(t2.date) - new Date(t1.date)) || [];

                /* Fetch checkpoints */

                const checkpointRes = await api.getData({
                    module: "workCheckPointMapping",
                    options: {
                        recordPerPage: 0,
                        searchCondition: {
                            name: "activityId",
                            value: parseInt(activityId)
                        }
                    }
                });

                const checkpoints = checkpointRes?.data?.items?.map(c => ({
                    ...c,
                    isChecked: false
                })) || [];

                if (reports.length > 0) {
                    const latest = reports[0];
                    setMinProgressPercentage(latest.progressPercentage || 0);
                    setFormData({
                        activityId,
                        date: today,
                        cost: latest.cost ?? "",
                        manPower: latest.manPower ?? "",
                        progressPercentage: latest.progressPercentage ?? 0,
                        checkpoints: checkpoints,
                        item: latest.item ?? "",
                        isCompleted: latest.isCompleted ?? false
                    });
                } else {
                    setMinProgressPercentage(0);
                    setFormData({
                        ...createDefaultForm(),
                        checkpoints
                    });
                }
            } catch (err) {
                console.error("Error loading modal data", err);
            }
        }

        loadReportAndCheckpoints();

        return () => {
            isMounted = false;
        };

    }, [show, activityId, today, createDefaultForm]);

    useEffect(() => {
        if (!show) {
            setFormData(createDefaultForm());
            setMinProgressPercentage(0);
        }
    }, [show, createDefaultForm]);

    /* ---------------- Toggle checkpoint ---------------- */

    const toggleCheckpoint = (index) => {
        const updated = [...formData.checkpoints];
        updated[index].isChecked = !updated[index].isChecked;
        updateField("checkpoints", updated);
    };

    /* ---------------- Submit ---------------- */

    const handleSubmit = async () => {
        try {

            setLoading(true);
            setError("");

            await api.addData({
                module: 'activitytracking',
                data: formData
            });

            await saveWorkCheckpoints();

            if (!activityData?.actualStartDate) {
                await api.editData({
                    module: 'activity',
                    data: {
                        ...activityData,
                        actualStartDate: new Date()
                    }
                });
            }
            onClose();

        } catch (err) {
            setError(err.response?.data?.message || "Submission failed");
        } finally {
            setLoading(false);
        }
    };

    const saveWorkCheckpoints = async () => {
        if (formData.checkpoints?.length > 0) {
            const addPromises = formData.checkpoints.map(item => addSingleWorkCheckpoint(item));
            await Promise.all(addPromises);
        }
        return;
    }

    const addSingleWorkCheckpoint = async (checkPoint) => {
        const addPayload = {
            name: checkPoint?.isChecked ? "Yes" : "No",
            workCheckPointId: parseInt(checkPoint?.workCheckPointId),
            activityId: parseInt(activityId)
        };

        return await api.addData({ module: 'workCheckPointTracking', data: addPayload });
    }

    return (

        <Modal show={show} onHide={onClose} size="xl">

            <Modal.Header>
                <Modal.Title>Submit Daily Report</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <strong>Date:</strong> {today}
                    </div>

                    <div className="col-md-6">
                        <strong>Task:</strong> {activityData?.name}
                    </div>
                </div>

                <Form>

                    {/* Cost + Manpower */}

                    <div className="row">
                        <div className="col">
                            <Form.Label>Cost</Form.Label>

                            <Form.Control
                                type="number"
                                value={formData.cost}
                                disabled={activityData?.isCompleted}
                                onChange={(e) =>
                                    updateField("cost", e.target.value)
                                }
                            />
                        </div>

                        <div className="col">
                            <Form.Label>Man Power</Form.Label>

                            <Form.Control
                                type="number"
                                value={formData.manPower}
                                disabled={activityData?.isCompleted}
                                onChange={(e) =>
                                    updateField("manPower", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* progressPercentage */}

                    <div className="row mt-3">
                        <div className="col">
                            <Form.Label>Progress Percentage</Form.Label>

                            <Form.Range
                                min={minProgressPercentage}
                                max={100}
                                value={formData.progressPercentage}
                                disabled={activityData?.isCompleted}
                                onChange={(e) =>
                                    updateField("progressPercentage", parseInt(e.target.value))
                                }
                            />

                            <ProgressBar
                                now={formData.progressPercentage}
                                label={`${formData.progressPercentage}%`}
                                className="mt-2"
                                style={{ height: 20 }}
                            />
                        </div>
                    </div>

                    {/* Checkpoints */}

                    <div className="row mt-4">
                        <div className="col-sm-12">
                            <Form.Label className="fw-bold mb-2">
                                Checkpoints
                            </Form.Label>

                            {formData.checkpoints?.map((cp, index) => (
                                <Form.Check
                                    key={cp.id || index}
                                    type="checkbox"
                                    label={cp.name}
                                    checked={cp.isChecked}
                                    disabled={activityData?.isCompleted}
                                    onChange={() => toggleCheckpoint(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Item List */}

                    <div className="row my-3">
                        <div className="col-sm-12">
                            <Form.Label className="fw-bold">
                                Item List
                            </Form.Label>

                            <IUITableInput
                                value={formData.item}
                                schema={itemListSchema.schema}
                                readonly={itemListSchema.readonly}
                                onChange={(e) =>
                                    updateField("item", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Assign QC */}

                    <div className="row">
                        <div className="col-sm-12">
                            <Form.Check
                                type="checkbox"
                                label="Assign to QC"
                                checked={formData.isCompleted}
                                disabled={
                                    formData.progressPercentage !== 100 ||
                                    activityData?.isCompleted
                                }
                                onChange={(e) =>
                                    updateField("isCompleted", e.target.checked)
                                }
                            />
                        </div>
                    </div>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Close
                </Button>

                <Button
                    className="btn-primary"
                    disabled={loading || submitDisabled}
                    onClick={handleSubmit}
                >
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReportModal;