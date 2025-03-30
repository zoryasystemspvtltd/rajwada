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
        roles: { total: 0 },
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

                const [projectData, departmentData, roleData] = await Promise.all([
                    api.getData({ module: 'project', options: pageOptionsPortfolio }),
                    api.getData({ module: 'department', options: pageOptionsPortfolio }),
                    api.getData({ module: 'role', options: pageOptionsPortfolio })
                ]);

                // console.log("activityData", activityData);

                // Calculate totals
                const totalUsers = userData?.data?.items.length;
                const disabledUsers = userData?.data?.items.filter(userData => userData.disable === true).length;
                const activeUsers = totalUsers - disabledUsers;

                const totalProjects = projectData?.data?.items.length;
                const totalDepartments = departmentData?.data?.items.length;
                const totalRoles = roleData?.data?.items.length;

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
                    roles: {
                        total: totalRoles
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
            <div className="card">
                <div className="card-header-tab card-header">
                    <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i className="header-icon lnr-charts icon-gradient bg-happy-green"> </i>
                        Portfolio Statistics
                    </div>
                </div>
                <div className="no-gutters row">
                    <div className="col-sm-6 col-md-4 col-xl-4">
                        <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div className="icon-wrapper rounded-circle">
                                <div className="icon-wrapper-bg opacity-10 bg-warning"></div>
                                <i class="fa-solid fa-building-shield text-white"></i>
                            </div>
                            <div className="widget-chart-content">
                                <div className="widget-subheading">Total Projects</div>
                                <div className="widget-numbers text-warning">{metrics.projects.total}</div>
                            </div>
                        </div>
                        <div className="divider m-0 d-md-none d-sm-block"></div>
                    </div>
                    <div className="col-sm-6 col-md-4 col-xl-4">
                        <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div className="icon-wrapper rounded-circle">
                                <div className="icon-wrapper-bg opacity-9 bg-danger"></div>
                                <i class="fa-solid fa-building-user text-white"></i>
                            </div>
                            <div className="widget-chart-content">
                                <div className="widget-subheading">Total Departments</div>
                                <div className="widget-numbers text-danger"><span>{metrics.departments.total}</span></div>
                            </div>
                        </div>
                        <div className="divider m-0 d-md-none d-sm-block"></div>
                    </div>
                    <div className="col-sm-12 col-md-4 col-xl-4">
                        <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
                            <div className="icon-wrapper rounded-circle">
                                <div className="icon-wrapper-bg opacity-9 bg-success"></div>
                                <i class="fa-solid fa-circle-user text-white"></i>
                            </div>
                            <div className="widget-chart-content">
                                <div className="widget-subheading">Total User Roles</div>
                                <div className="widget-numbers text-success"><span>{metrics.roles.total}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                privileges?.some(p => (p.module === 'user' || p.module === 'plan')) ? (
                    <Row className="mt-2">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>User Statistics</Card.Title>
                                    {/* <Card.Text>
                                    <b>Active Users :</b> {metrics.users.active} <br />
                                    <b>Disabled Users :</b> {metrics.users.disabled} <br />
                                </Card.Text> */}
                                    <div style={{ maxWidth: '600px', maxHeight: '350px' }} className='d-flex justify-content-center'>
                                        <Doughnut
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
                            <Card>
                                <Card.Body >
                                    <Card.Title>Towers, Floors and Flats</Card.Title>
                                    {/* <Card.Text>
                                    <b>Total Towers :</b> {metrics.towers.total} <br />
                                    <b>Total Floors :</b> {metrics.floors.total} <br />
                                    <b>Total Flats :</b> {metrics.flats.total} <br />
                                </Card.Text> */}
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : <></>
            }
            {
                privileges?.some(p => p.module === 'activity') ? (
                    <Row className="my-2">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Activities</Card.Title>
                                    {/* <Card.Text>
                                    <b>Created :</b> {metrics.activities.created} <br />
                                    <b>In Progress :</b> {metrics.activities.inProgress} <br />
                                    <b>Completed :</b> {metrics.activities.completed} <br />
                                </Card.Text> */}
                                    <Pie
                                        data={{
                                            labels: ['Not Started', 'In Progress', 'Completed'],
                                            datasets: [
                                                {
                                                    label: 'Activity Status',
                                                    data: [metrics.activities.notStarted, metrics.activities.inProgress, metrics.activities.completed],
                                                    backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                                                }
                                            ],
                                        }}
                                        options={options} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ) : <></>
            }
        </div>
    );
}

export default Dashboard;
