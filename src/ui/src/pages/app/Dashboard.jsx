import { Col, Row, Card } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import api from '../../store/api-service';
import { useEffect, useState } from "react";
import { use } from "react";

// Register Chart.js components and the datalabels plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const Dashboard = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const privileges = loggedInUser?.privileges;

    const [metrics, setMetrics] = useState({
        users: { total: 0, disabled: 0, active: 0 },
        towers: { total: 0 },
        floors: { total: 0 },
        flats: { total: 0 },
        activities: { created: 0, inProgress: 0, completed: 0 },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const pageOptions = {};
                const pageOptionsPlan = [{ name: 'type', value: 'tower' }, { name: 'type', value: 'floor' }, { name: 'type', value: 'flat' }];
                // const pageOptionsTower = { name: 'type', value: 'tower' };
                // const pageOptionsFloor = { name: 'type', value: 'floor' };
                // const pageOptionsFlat = { name: 'type', value: 'flat' };

                const [userData, projectDataTower, projectDataFloor, projectDataFlat, activityData] = await Promise.all([
                    api.getData({ module: 'user', options: pageOptions }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[0] }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[1] }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[2] }),
                    api.getData({ module: 'activity', options: pageOptions }),
                ]);
                // console.log("userData", userData);
                // console.log("projectDataTower", projectDataTower);
                // console.log("projectDataFloor", projectDataFloor);
                // console.log("projectDataFlat", projectDataFlat);
                console.log("activityData", activityData);


                // Calculate totals
                const totalUsers = userData.data.items.length;
                const disabledUsers = userData.data.items.filter(userData => userData.disable === true).length;
                const activeUsers = totalUsers - disabledUsers;

                // console.log("totalUsers", totalUsers);
                // console.log("disabledUsers", disabledUsers);
                // console.log("activeUsers", activeUsers);

                const totalTowers = projectDataTower.data.items.length;
                const totalFloors = projectDataFloor.data.items.length;
                const totalFlats = projectDataFlat.data.items.length;

                const createdActivities = activityData.data.items.length;
                const inProgressActivities = activityData.data.items.filter(activity => (activity.status === '1' || activity.status === '2' || activity.status === '3' || activity.status === '7')).length;
                const completedActivities = activityData.data.items.filter(activity => (activity.status === '4' || activity.status === '6')).length;

                setMetrics({
                    users: {
                        total: totalUsers,
                        disabled: disabledUsers,
                        active: activeUsers,
                    },
                    towers: {
                        total: totalTowers,
                    },
                    floors: {
                        total: totalFloors,
                    },
                    flats: {
                        total: totalFlats,
                    },
                    activities: {
                        created: createdActivities,
                        inProgress: inProgressActivities,
                        completed: completedActivities,
                    },
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    // Options for charts to display data labels
    const options = {
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                },
                // formatter: Math.round,
            },
        },
    };

    return (
        <div className="container-fluid">
            {privileges?.some(p => p.module === 'activity') ? (
                <>
                    <Row className="mt-2">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Total of Users : {metrics.users.total}</Card.Title>
                                    <Card.Text>
                                        <b>Active Users :</b> {metrics.users.active} <br />
                                        <b>Disabled Users :</b> {metrics.users.disabled} <br />
                                    </Card.Text>
                                    <div style={{ maxWidth: '600px', maxHeight: '600px', margin: 'auto' }}>
                                        <Pie
                                            data={{
                                                labels: ['Active', 'Disabled'],
                                                datasets: [
                                                    {
                                                        label: 'Number of Users',
                                                        data: [metrics.users.active, metrics.users.disabled],
                                                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                    },
                                                ],
                                            }}
                                            options={options} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mt-4">
                                <Card.Body>
                                    <Card.Title>User Details</Card.Title>
                                    <Row>
                                        <Col md={6}>
                                            <div>
                                                <b>User : </b>{loggedInUser?.firstName} {loggedInUser?.lastName} <br />
                                                <b>Email : </b>{loggedInUser?.email} <br />
                                                <b>Role : </b>{loggedInUser?.roles[0]} <br />
                                            </div>
                                        </Col>
                                        <Col md={6} className="d-flex">
                                            {/* <div>
                                                <img src={loggedInUser?.photoUrl} style={{ width: "3rem", height: "3rem", margin: "auto" }} title='Profile Picture' alt='Rajwada bProfile Picture' />
                                            </div> */}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <Card className="mt-4">
                                <Card.Body >
                                    <Card.Title>Projects, Towers, and Flats</Card.Title>
                                    <Card.Text>
                                        <b>Total Towers :</b> {metrics.towers.total} <br />
                                        <b>Total Floors :</b> {metrics.floors.total} <br />
                                        <b>Total Flats :</b> {metrics.flats.total} <br />
                                    </Card.Text>
                                    <Bar
                                        data={{
                                            labels: ['Metrics'],
                                            datasets: [
                                                {
                                                    label: 'Towers',
                                                    data: [metrics.towers.total],
                                                    backgroundColor: '#36A2EB',
                                                },
                                                {
                                                    label: 'Floors',
                                                    data: [metrics.floors.total],
                                                    backgroundColor: '#FF6384',
                                                },
                                                {
                                                    label: 'Flats',
                                                    data: [metrics.flats.total],
                                                    backgroundColor: '#FFCE56',
                                                },
                                            ],
                                        }}
                                        options={options}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={12}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Activities</Card.Title>
                                    <Card.Text>
                                        <b>Created :</b> {metrics.activities.created} <br />
                                        <b>In Progress :</b> {metrics.activities.inProgress} <br />
                                        <b>Completed :</b> {metrics.activities.completed} <br />
                                    </Card.Text>
                                    <Bar
                                        data={{
                                            labels: ['Activity Status'],
                                            datasets: [
                                                {
                                                    label: 'Created',
                                                    data: [metrics.activities.created],
                                                    backgroundColor: '#36A2EB',
                                                },
                                                {
                                                    label: 'In Progress',
                                                    data: [metrics.activities.inProgress],
                                                    backgroundColor: '#FF6384',
                                                },
                                                {
                                                    label: 'Completed',
                                                    data: [metrics.activities.completed],
                                                    backgroundColor: '#FFCE56',
                                                },
                                            ],
                                        }}
                                        options={options} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : <></>}
        </div>
    );
}

export default Dashboard;
