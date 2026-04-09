import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../../store/api-service';
import { Card, Spinner, Alert, Form } from "react-bootstrap";
import dayjs from "./dayjsConfig";
import IUITableInput from "../../common/shared/IUITableInput";

const ReportDetailsPage = () => {
    const { date } = useParams();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                    text: 'Item', field: 'itemId', type: 'lookup', required: true, width: 4,
                    schema: { module: 'asset' }
                },
                { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
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

                // Convert to UTC for backend
                const utcStart = istStart.utc().toDate();
                const utcEnd = istEnd.utc().toDate();

                const timeStamp = new Date(date).getTime(); // check if new Date() is required
                const trackingDateStart = new Date(timeStamp);
                const trackingDateEnd = new Date(timeStamp + 86400000);

                const newBaseFilter = {
                    name: 'date',
                    value: utcStart,
                    operator: 'greaterThan',
                    and: {
                        name: 'date',
                        value: utcEnd,
                        operator: 'lessThan'
                    }
                }

                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: newBaseFilter
                }
                const response = await api.getData({ module: 'activitytracking', options: pageOptions });
                // console.log(response?.data);

                let trackingData = response?.data?.items;
                setReports(trackingData);
            } catch {
                setError("Failed to load reports");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [date]);

    return (
        <div>
            <Card className="shadow-sm p-3">
                <h4>Reports for {date}</h4>

                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}

                {reports.map((report) => (
                    <Card key={report._id} className="mt-3 p-3">
                        {/* <p><strong>Task:</strong> {report.taskName}</p> */}
                        <p><strong>Cost:</strong> {report?.cost}</p>
                        <p><strong>Man Power:</strong> {report?.manPower}</p>
                        <p><strong>Progress:</strong> {report?.progressPercentage}</p>

                        <div className="row my-2">
                            <div className="col-sm-12">
                                <Form.Label htmlFor={itemListSchema.field} className='fw-bold'>{itemListSchema.text}
                                    {itemListSchema.required &&
                                        <span className="text-danger">*</span>
                                    }
                                </Form.Label>

                                <IUITableInput
                                    id={itemListSchema.field}
                                    value={report.item}
                                    schema={itemListSchema.schema}
                                    onChange={() => { }}
                                    readonly={true}
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </Card>
        </div>
    );
};

export default ReportDetailsPage;