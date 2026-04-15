import { useEffect, useState } from "react";
import api from "../../../store/api-service";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Table, Spinner, Alert } from "react-bootstrap";
import IUILookUp from "../../common/shared/IUILookUp";
import { getFormattedDateTime, formatStringDate } from '../../../store/datetime-formatter';

const WorkCheckpointTrackings = ({ activityId, reportDate = null }) => {

    const [checkpoints, setCheckpoints] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!activityId) return;

        async function fetchCheckpoints() {

            try {

                setLoading(true);
                setError("");

                let pageOptions = {};

                if (reportDate) {
                    const currentDay = new Date(reportDate);

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

                    pageOptions = {
                        recordPerPage: 0,
                        searchCondition: baseFilter
                    };
                }
                else {
                    pageOptions = {
                        recordPerPage: 0,
                        searchCondition: {
                            name: "activityId",
                            value: parseInt(activityId)
                        }
                    };
                }

                const response = await api.getData({
                    module: "workCheckPointTracking",
                    options: pageOptions
                });

                const data = response?.data?.items || [];

                setCheckpoints(data);

            } catch (err) {

                setError("Failed to load checkpoints");
                console.error(err);

            } finally {
                setLoading(false);
            }
        }

        fetchCheckpoints();

    }, [activityId]);

    if (loading) {
        return (
            <div className="text-center p-3">
                <Spinner animation="border" />
            </div>
        );
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (checkpoints.length === 0) {
        return (
            <Alert variant="info">
                {`No checkpoints found for this activity on ${formatStringDate(reportDate)}`}
            </Alert>
        );
    }

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Checkpoint Name</th>
                    <th>Checkpoint Status</th>
                    <th>Checkpoint Time</th>
                </tr>
            </thead>
            {
                <tbody>
                    {checkpoints.map((cp, index) => (
                        <tr key={cp.id || index}>
                            <td>{index + 1}</td>
                            <td>
                                <IUILookUp
                                    value={cp?.workCheckPointId}
                                    schema={{ module: 'workCheckPoint' }}
                                    readonly={true}
                                    textonly={true}
                                />
                            </td>
                            <td>{(cp.name === "Yes") ? <FaCheck color="green" /> : <FaTimes color="red" />}</td>
                            <td>
                                {cp?.date && getFormattedDateTime(cp?.date)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            }
        </Table>
    );
};

export default WorkCheckpointTrackings;