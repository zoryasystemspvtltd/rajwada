import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';

const Dashboard = () => {

    const loggedInUser = useSelector((state) => state.api.loggedInUser)


    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <p>Welcome <em className="text-decoration-underline">{loggedInUser?.firstName} {loggedInUser?.lastName}</em>. You are logged in! using {loggedInUser?.email}</p>
                    <p>UNDER CONSTRUCTION</p>
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard