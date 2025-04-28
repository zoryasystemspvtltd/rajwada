import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import api from '../../store/api-service';

// Register Chart.js components and the datalabels plugin
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, ChartDataLabels);

const Dashboard = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const privileges = loggedInUser?.privileges;

    const [metrics, setMetrics] = useState({
        projects: { total: 0 },
        departments: { total: 0 },
        users: { total: 0, disabled: 0, active: 0 },
        towers: { total: 0 },
        floors: { total: 0 },
        flats: { total: 0 },
        activities: { notStarted: 0, inProgress: 0, completed: 0 },
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const userPageOptions = { recordPerPage: 0 };
                const pageOptionsPortfolio = { recordPerPage: 0 };
                const pageOptionsPlan = [
                    { recordPerPage: 0, searchCondition: { name: 'type', value: 'tower' } },
                    { recordPerPage: 0, searchCondition: { name: 'type', value: 'floor' } },
                    { recordPerPage: 0, searchCondition: { name: 'type', value: 'flat' } }
                ];
                const activityPageOptions = { recordPerPage: 0, searchCondition: { name: 'type', value: 'Sub Task' } };

                const [userData, projectDataTower, projectDataFloor, projectDataFlat, activityData] = await Promise.all([
                    api.getData({ module: 'user', options: userPageOptions }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[0] }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[1] }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[2] }),
                    api.getData({ module: 'activity', options: activityPageOptions }),
                ]);

                const [projectData, departmentData] = await Promise.all([
                    api.getData({ module: 'project', options: pageOptionsPortfolio }),
                    api.getData({ module: 'department', options: pageOptionsPortfolio })
                ]);

                // console.log("activityData", activityData);

                // Calculate totals
                const totalUsers = userData?.data?.items.length;
                const disabledUsers = userData?.data?.items.filter(userData => userData.disable === true).length;
                const activeUsers = totalUsers - disabledUsers;

                const totalProjects = projectData?.data?.items.length;
                const totalDepartments = departmentData?.data?.items.length;

                const totalTowers = projectDataTower?.data?.items.length;
                const totalFloors = projectDataFloor?.data?.items.length;
                const totalFlats = projectDataFlat?.data?.items.length;

                const createdActivities = activityData?.data?.items.filter(activity => [0].includes(activity?.status)).length;
                const inProgressActivities = activityData?.data?.items.filter(activity => [1, 2, 3, 7].includes(activity?.status)).length;
                const completedActivities = activityData?.data?.items.filter(activity => [4, 6].includes(activity?.status)).length;

                setMetrics({
                    projects: {
                        total: totalProjects
                    },
                    departments: {
                        total: totalDepartments
                    },
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
                        notStarted: createdActivities,
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
        responsive: true,
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
            {
                (privileges?.some(p => (p.module === 'user' || p.module === 'plan')) && !loggedInUser?.roles?.includes("Super Admin")) ? (
                    <Row className="mt-2">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Activities</Card.Title>
                                    {/* <Card.Text>
                                    <b>Created :</b> {metrics.activities.created} <br />
                                    <b>In Progress :</b> {metrics.activities.inProgress} <br />
                                    <b>Completed :</b> {metrics.activities.completed} <br />
                                </Card.Text> */}
                                    <div style={{ maxWidth: '600px', maxHeight: '350px' }} className='d-flex justify-content-center'>
                                        <Pie
                                            data={{
                                                labels: ['Not Started', 'In Progress', 'Completed'],
                                                datasets: [
                                                    {
                                                        label: 'Count',
                                                        data: [metrics.activities.notStarted, metrics.activities.inProgress, metrics.activities.completed],
                                                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                    }
                                                ],
                                            }}
                                            options={options} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body >
                                    <Card.Title>Towers, Floors and Flats</Card.Title>
                                    {/* <Card.Text>
                                    <b>Total Towers :</b> {metrics.towers.total} <br />
                                    <b>Total Floors :</b> {metrics.floors.total} <br />
                                    <b>Total Flats :</b> {metrics.flats.total} <br />
                                </Card.Text> */}
                                    <div style={{ maxWidth: '600px', maxHeight: '450px' }}>
                                        <Bar
                                            data={{
                                                labels: ['Count'],
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
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) :
                    <>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <h2>Welcome to Civilier ERP</h2>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}

export default Dashboard;
