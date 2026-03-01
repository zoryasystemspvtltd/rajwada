import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../../store/api-service';
import { Card, Spinner, Alert } from "react-bootstrap";
import dayjs from "./dayjsConfig";

const ReportDetailsPage = () => {
    const { date } = useParams();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
                        <p><strong>Cost:</strong> {report.cost}</p>
                        <p><strong>Man Power:</strong> {report.manPower}</p>
                        <p><strong>Status:</strong> {"In Progress"}</p>
                        <p><strong>Progress:</strong> {"5"}%</p>
                    </Card>
                ))}
            </Card>
        </div>
    );
};

export default ReportDetailsPage;