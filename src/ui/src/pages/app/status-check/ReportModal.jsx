import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, ProgressBar } from "react-bootstrap";
import api from '../../../store/api-service';
import IUITableInput from "../../common/shared/IUITableInput";
import { getToday } from "./dateUtils";

const ReportModal = ({ activityId, show, onClose }) => {
    const today = getToday();

    const [formData, setFormData] = useState({
        activityId: activityId,
        date: today,
        taskName: "",
        cost: "",
        manPower: "",
        taskStatus: "",
        progress: 0,
        isCuringDone: false,
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

    const [activityData, setActivityData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            if (activityId) {
                const item = await api.getSingleData({ module: 'activity', id: activityId });
                setActivityData(item.data);
            }
        }

        fetchData();
    }, [activityId]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");

            await api.addData({ module: 'activitytracking', data: formData });

            if (!activityData?.actualStartDate) {
                const updatedActivityData = {
                    ...activityData,
                    actualStartDate: new Date()
                };
                await api.editData({ module: 'activity', data: updatedActivityData });
            }
            onClose();
        } catch (err) {
            setError(
                err.response?.data?.message || "Submission failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={onClose} size="xl">
                <Modal.Header>
                    <Modal.Title>Submit Daily Report</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div className="row mb-2">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <span><strong>Date: </strong>{today}</span>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <span><strong>Task: </strong>{activityData?.name}</span>
                        </div>
                    </div>
                    <Form>
                        <div className="row">
                            <div className="col">
                                <Form.Group className="position-relative form-group">
                                    <Form.Label>Cost</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.cost ?? ""}
                                        disabled={activityData?.isCompleted}
                                        onChange={(e) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                cost: e.target.value,
                                            }))
                                        }
                                        placeholder="Cost here......"
                                    />
                                </Form.Group>
                            </div>
                            <div className="col">
                                <Form.Group className="position-relative form-group">
                                    <Form.Label>Man Power</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={formData.manPower ?? ""}
                                        disabled={activityData?.isCompleted}
                                        onChange={(e) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                manPower: e.target.value,
                                            }))
                                        }
                                        placeholder="Man Power here......"
                                    />
                                </Form.Group>
                            </div>
                        </div>

                        <div className='row'>
                            <div className="col-sm-12 col-md-3">
                                <Form.Group className="position-relative form-group">
                                    <InputGroup>
                                        <Form.Check
                                            type="checkbox"
                                            disabled={activityData?.isCompleted}
                                            label="Curing Done"
                                            className="d-flex align-items-center"
                                            onChange={(e) =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    isCuringDone: e.target.checked,
                                                }))
                                            }
                                            checked={formData.isCuringDone}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </div>

                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Group className="position-relative form-group">
                                    <Form.Label>Progress</Form.Label>
                                    <Form.Range
                                        min="0"
                                        max="100"
                                        value={formData.progress}
                                        disabled={activityData?.isCompleted}
                                        onChange={(e) =>
                                            setFormData(prev => ({
                                                ...prev,
                                                progress: parseInt(e.target.value, 10),
                                            }))
                                        }
                                    />
                                </Form.Group>


                                <div className="my-2">
                                    <ProgressBar
                                        now={formData.progress}
                                        label={`${formData.progress}%`}
                                        variant="info"
                                        style={{ height: '20px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Daily Item List Input */}
                        <div className="row my-2">
                            <div className="col-sm-12">
                                <Form.Label htmlFor={itemListSchema.field} className='fw-bold'>{itemListSchema.text}
                                    {itemListSchema.required &&
                                        <span className="text-danger">*</span>
                                    }
                                </Form.Label>

                                <IUITableInput
                                    id={itemListSchema.field}
                                    value={formData.item}
                                    schema={itemListSchema.schema}
                                    onChange={(e) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            item: e.target.value,
                                        }))
                                    }
                                    readonly={itemListSchema.readonly}
                                />
                            </div>
                        </div>

                        {/* Balloon Marker Input */}
                        {/* <div className="row my-2">
                            <div className="col-sm-12">
                                <Form.Label htmlFor={canvasSchema.field} className='fw-bold'>{canvasSchema.text}
                                    {canvasSchema.required &&
                                        <span className="text-danger">*</span>
                                    }
                                </Form.Label>

                                {
                                    (blueprint?.split('.')[1] !== "pdf") ?
                                        <ILab.MarkerCanvas
                                            imageModule={canvasSchema.imageModule}
                                            id={canvasSchema.field}
                                            value={blueprint || []}
                                            schema={canvasSchema.schema}
                                            onChange={handleBlueprintChange}
                                            readonly={canvasSchema.readonly || !isSameDay(selectedDate, startOfToday())}
                                        />
                                        :
                                        <IUIPdfTool
                                            displayToolbar={!canvasSchema.readonly || isSameDay(selectedDate, startOfToday())}
                                            height={800}
                                            id={canvasSchema.field}
                                            file={blueprint || []}
                                            schema={canvasSchema.schema}
                                            onChange={handleBlueprintChange}
                                            readonly={canvasSchema.readonly || !isSameDay(selectedDate, startOfToday())}
                                        />
                                }
                            </div>
                        </div> */}

                        <div className="row">
                            <div className="col-sm-12">
                                <Form.Group className="position-relative form-group">
                                    <InputGroup>
                                        <Form.Check
                                            type="checkbox"
                                            disabled={formData.progress !== 100 || activityData?.isCompleted}
                                            label="Assign to QC"
                                            className="d-flex align-items-center mr-2"
                                            onChange={(e) =>
                                                setFormData(prev => ({
                                                    ...prev,
                                                    isCompleted: e.target.checked,
                                                }))
                                            }
                                            checked={formData.isCompleted}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                        onClick={onClose}
                    >
                        Close
                    </Button>

                    <Button
                        variant="contained"
                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ReportModal;