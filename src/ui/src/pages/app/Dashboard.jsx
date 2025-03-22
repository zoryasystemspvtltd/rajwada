import { Col, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { ListReport } from "./schema/Report";

const Dashboard = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const privileges = loggedInUser?.privileges;


    return (
        <div className="container-fluid">
            {/* <Row>
                <Col>
                    <p>Welcome <em className="text-decoration-underline">{loggedInUser?.firstName} {loggedInUser?.lastName}</em> ! You are logged in using {loggedInUser?.email}</p>
                    <p>UNDER CONSTRUCTION</p>
                    <hr />
                </Col>
            </Row> */}
            {
                privileges?.some(p => p.module === 'activity') ? (
                    <Row className="mt-2">
                        <Col>
                            <ListReport />
                        </Col>
                    </Row>
                ) : <></>
            }
        </div>
    )
}

export default Dashboard