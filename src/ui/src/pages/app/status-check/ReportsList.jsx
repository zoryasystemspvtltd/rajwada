import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const ReportsList = ({ groupedReports }) => {
    return (
        <Card className="my-2 shadow-sm p-2">
            <Card.Body>
                <h5>Submitted Reports</h5>

                <ListGroup variant="flush">
                    {groupedReports.map((group) => (
                        <ListGroup.Item
                            key={group.date}
                            className="d-flex justify-content-between align-items-center flex-wrap"
                        >
                            <Link
                                to={`/reports/${group.date}`}
                                className="fw-bold text-decoration-none"
                            >
                                {dayjs(group.date).format("DD MMM YYYY")}
                            </Link>

                            <span className="text-muted">
                                {group.count} reports
                            </span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default ReportsList;