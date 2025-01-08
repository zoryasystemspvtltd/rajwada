import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { FlatDashboard, TestCanvas } from "./schema/Flats";
import { FloorDashboard } from "./schema/Floors";
import { TowerDashboard } from "./schema/Towers";
import { PlanCreate } from "./schema/Plan";

const Dashboard = () => {

    const loggedInUser = useSelector((state) => state.api.loggedInUser)


    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <p>Welcome <em className="text-decoration-underline">{loggedInUser?.firstName} {loggedInUser?.lastName}</em>. You are logged in! using {loggedInUser?.email}</p>
                    <p>UNDER CONSTRUCTION</p>
                    <hr />
                    <PlanCreate />
                    <hr />
                    <TowerDashboard />
                    <hr />
                    <FloorDashboard />
                    <hr />
                    <FlatDashboard />
                    <hr />
                    <TestCanvas />
                </Col>
            </Row>
        </div>
    )
}

export default Dashboard