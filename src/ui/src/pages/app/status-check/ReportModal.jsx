import { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal, ProgressBar } from "react-bootstrap";
import api from '../../../store/api-service';
import IUITableInput from "../../common/shared/IUITableInput";
import { getToday, getFormattedDate } from "./dateUtils";
import WorkCheckpointTrackings from "../schema/WorkCheckpointTrackings";

const ReportModal = ({ activityId, show, onClose, submitDisabled = false, reportDate = null }) => {

    const today = reportDate ? getFormattedDate(reportDate) : getToday();

    const createDefaultForm = (activity = {}) => ({
        activityId,
        date: today,
        cost: "",
        manPower: "",
        progressPercentage: activity?.progressPercentage ?? 0,
        checkpoints: [],
        item: '',
        isCompleted: false
    });

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
    const [activityData, setActivityData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [minProgressPercentage, setMinProgressPercentage] = useState(0);

    const updateField = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    /* ---------------- LOAD ACTIVITY ON FIRST MOUNT ---------------- */

    useEffect(() => {

        async function fetchActivity() {

            if (!activityId) return;

            try {
                const res = await api.getSingleData({
                    module: "activity",
                    id: activityId
                });

                const activity = res.data;

                setActivityData(activity);
                setMinProgressPercentage(activity?.progressPercentage ?? 0);

                setFormData(createDefaultForm(activity));

            } catch (err) {
                console.error("Failed to load activity", err);
            }
        }

        fetchActivity();

    }, [activityId]);

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            progressPercentage: Math.max(prev.progressPercentage, minProgressPercentage)
        }));
    }, [minProgressPercentage]);

    /* ---------------- LOAD REPORT + CHECKPOINTS WHEN MODAL OPENS ---------------- */

    useEffect(() => {

        if (!show || !activityId || !activityData) return;

        async function loadReportAndCheckpoints() {

            try {

                const currentDay = reportDate ? new Date(reportDate) : new Date();

                const todayStart = new Date(currentDay.setHours(0, 0, 0, 0));
                const todayEnd = new Date(currentDay.setHours(23, 59, 59, 999));

                const baseFilter = {
                    name: "activityId",
                    value: parseInt(activityId),
                    and: {
                        name: "date",
                        value: todayStart,
                        operator: "greaterThan",
                        and: {
                            name: "date",
                            value: todayEnd,
                            operator: "lessThan"
                        }
                    }
                };

                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: baseFilter
                };

                /* Fetch today's reports */

                const response = await api.getData({
                    module: "activitytracking",
                    options: pageOptions
                });

                const reports = response?.data?.items
                    ?.sort((a, b) => new Date(b.date) - new Date(a.date)) || [];

                /* Fetch checkpoints */

                const checkpointResp = await api.getData({
                    module: "workCheckPointMapping",
                    options: {
                        recordPerPage: 0,
                        searchCondition: {
                            name: "activityId",
                            value: parseInt(activityId)
                        }
                    }
                });

                const checkpoints = checkpointResp?.data?.items?.map(c => ({
                    ...c,
                    isChecked: false
                })) || [];

                if (reports.length > 0) {

                    const latest = reports[0];
                    console.log(latest)
                    setFormData({
                        activityId,
                        date: today,
                        cost: latest.cost ?? "",
                        manPower: latest.manPower ?? "",
                        progressPercentage: latest.progressPercentage ?? activityData.progressPercentage,
                        checkpoints,
                        item: latest.item ?? "",
                        isCompleted: latest.isCompleted ?? false
                    });

                } else {
                    setFormData({
                        ...createDefaultForm(activityData),
                        checkpoints
                    });

                }

            } catch (err) {
                console.error("Error loading modal data", err);
            }
        }

        loadReportAndCheckpoints();

    }, [show, activityId, activityData, today]);

    /* ---------------- RESET FORM WHEN MODAL CLOSES ---------------- */

    useEffect(() => {

        if (!show && activityData) {
            setFormData(createDefaultForm(activityData));
        }

    }, [show, activityData]);

    /* ---------------- TOGGLE CHECKPOINT ---------------- */

    const toggleCheckpoint = (index) => {

        const updated = [...formData.checkpoints];
        updated[index].isChecked = !updated[index].isChecked;

        updateField("checkpoints", updated);
    };

    /* ---------------- SUBMIT ---------------- */

    const handleSubmit = async () => {

        try {

            setLoading(true);
            setError("");

            const trackingId = await api.addData({
                module: "activitytracking",
                data: formData
            });

            console.log(trackingId)

            await saveWorkCheckpoints(trackingId.data);

            if (!activityData?.actualStartDate) {

                await api.editData({
                    module: "activity",
                    data: {
                        ...activityData,
                        actualStartDate: new Date()
                    }
                });

            } else {

                await api.editData({
                    module: "activity",
                    data: {
                        ...activityData,
                        progressPercentage: formData.progressPercentage
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

    const saveWorkCheckpoints = async (trackingId) => {

        if (!formData.checkpoints?.length) return;

        const promises = formData.checkpoints.map(cp => {

            const payload = {
                name: cp.isChecked ? "Yes" : "No",
                workCheckPointId: parseInt(cp.workCheckPointId),
                activityId: parseInt(activityId),
                activityTrackingId: parseInt(trackingId)
            };

            return api.addData({
                module: "workCheckPointTracking",
                data: payload
            });

        });

        await Promise.all(promises);
    };

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
                                disabled={activityData?.isCompleted || submitDisabled}
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
                                disabled={activityData?.isCompleted || submitDisabled}
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
                                max={100}
                                step={1}
                                value={formData.progressPercentage}
                                disabled={activityData?.isCompleted || submitDisabled}
                                onChange={(e) => {
                                    const newValue = Number(e.target.value);

                                    if (newValue >= activityData?.progressPercentage) {
                                        updateField("progressPercentage", Number(e.target.value))
                                    }
                                }
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
                                    disabled={activityData?.isCompleted || submitDisabled}
                                    onChange={() => toggleCheckpoint(index)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col-sm-12">
                            <Form.Label className="fw-bold mb-2">
                                Checkpoints History
                            </Form.Label>

                            <WorkCheckpointTrackings activityId={activityId} reportDate={reportDate} />
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
                    className="btn-secondary btn btn-pill"
                    onClick={onClose}
                >
                    Close
                </Button>

                <Button
                    className="btn-primary btn btn-pill"
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