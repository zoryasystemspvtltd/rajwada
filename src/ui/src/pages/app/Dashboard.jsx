import { Col, Row, Card } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import api from '../../store/api-service';
import { useEffect } from "react";

// Register Chart.js components and the datalabels plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const Dashboard = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const privileges = loggedInUser?.privileges;

    useEffect(() => {
        async function fetchData() {
            const pageOptions = {
            };
            const pageOptionsTower = {
                name: 'type',
                value: 'tower'
            };
            const userData = await api.getData({ module: 'user', options: pageOptions });
            const projectData = await api.getData({ module: 'plan', options: pageOptions });
            console.log(userData.data);
        }
        fetchData();
    }, []);



    // Dummy data for demonstration purposes
    const metrics = {
        users: {
            total: 15000,
            disabled: 1000,
            active: 14000,
        },
        projects: {
            total: 5000,
        },
        towers: {
            total: 2000,
        },
        flats: {
            total: 3000,
        },
        activities: {
            created: 10000,
            inProgress: 3000,
            completed: 7000,
        },
    };

    // Data for charts
    const userData = {
        labels: ['Total', 'Disabled', 'Active'],
        datasets: [
            {
                label: 'Number of Users',
                data: [metrics.users.total, metrics.users.disabled, metrics.users.active],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    const activityData = {
        labels: ['Created', 'In Progress', 'Completed'],
        datasets: [
            {
                label: 'Activities',
                data: [metrics.activities.created, metrics.activities.inProgress, metrics.activities.completed],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    // Options for charts to display data labels
    const options = {
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                },
                formatter: Math.round,
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
                                    <Card.Title>Number of Users</Card.Title>
                                    <Pie data={userData} options={options} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>User Details</Card.Title>
                                    <div>
                                        <b>User : </b>{loggedInUser?.firstName} {loggedInUser?.lastName} <br />
                                        <b>Email : </b>{loggedInUser?.email} <br />
                                        <b>Role : </b>{loggedInUser?.roles[0]} <br />
                                    </div>
                                </Card.Body>

                            </Card>
                            <Card className="mt-2" style={{ height: '53vh' }}>
                                <Card.Body >
                                    <Card.Title>Projects, Towers, and Flats</Card.Title>
                                    <Bar
                                        data={{
                                            labels: ['Projects', 'Towers', 'Flats'],
                                            datasets: [
                                                {
                                                    label: 'Count',
                                                    data: [metrics.projects.total, metrics.towers.total, metrics.flats.total],
                                                    backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                },
                                            ],
                                        }}
                                        options={options}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={12}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Activities</Card.Title>
                                    <Bar data={activityData} options={options} />
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
