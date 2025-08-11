import { useEffect, useState } from "react";
import { Card, Col, Row, Form, Accordion } from "react-bootstrap";
import { Bar, Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import api from '../../store/api-service';
import {
    ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { notify } from "../../store/notification";

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

    const [projects, setProjects] = useState([]);
    const [activitiesWithData, setActivitiesWithData] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const userPageOptions = { recordPerPage: 0 };
                const pageOptionsPortfolio = { recordPerPage: 0 };
                const activityPageOptions = { recordPerPage: 0, searchCondition: { name: 'type', value: 'Sub Task' } };
                const mainActivityPageOptions = { recordPerPage: 0, searchCondition: { name: 'type', value: 'Main Task' } };

                const [userData, projectData, departmentData, activityData, mainActivityData] = await Promise.all([
                    api.getData({ module: 'user', options: userPageOptions }),
                    api.getMyProject(),
                    api.getData({ module: 'department', options: pageOptionsPortfolio }),
                    api.getData({ module: 'activity', options: activityPageOptions }),
                    api.getData({ module: 'activity', options: mainActivityPageOptions }),
                ]);
                // console.log(projectData);
                setProjects(projectData?.data);

                const updatedActivities = await Promise.all(
                    mainActivityData?.data?.items?.map(async (activity, index) => {
                        const baseFilter = {
                            name: 'parentId',
                            value: parseInt(activity.id)
                        };
                        const pageOptions = {
                            recordPerPage: 0,
                            searchCondition: baseFilter
                        };

                        let childActivities = [];
                        try {
                            const childActivitiesResponse = await api.getData({ module: 'activity', options: pageOptions });
                            childActivities = childActivitiesResponse.data.items || [];
                        } catch (error) {
                            notify("error", 'Error fetching child activities');
                        }

                        const data = {
                            labels: childActivities.map(sub => sub.name),
                            datasets: [
                                {
                                    label: 'Progress (%)',
                                    data: childActivities.map(sub => sub.progressPercentage),
                                    backgroundColor: '#0d6efd',
                                    borderRadius: 4,
                                },
                            ],
                        };

                        const options = {
                            indexAxis: 'y',
                            scales: {
                                x: {
                                    min: 0,
                                    max: 100,
                                    ticks: {
                                        stepSize: 20,
                                        callback: (val) => `${val}%`
                                    }
                                }
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    callbacks: {
                                        label: (context) => `${context.parsed.x}%`
                                    }
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        };

                        return {
                            ...activity,
                            data,
                            options,
                            childActivities,
                        };
                    })
                );

                setActivitiesWithData(updatedActivities);

                // Calculate totals
                const totalUsers = userData?.data?.items.length;
                const disabledUsers = userData?.data?.items.filter(userData => userData.disable === true).length;
                const activeUsers = totalUsers - disabledUsers;

                const totalProjects = projectData?.data?.length;
                const totalDepartments = departmentData?.data?.items.length;

                const createdActivities = activityData?.data?.items.filter(activity => [0].includes(activity?.status)).length;
                const inProgressActivities = activityData?.data?.items.filter(activity => [1, 2, 3, 7].includes(activity?.status)).length;
                const completedActivities = activityData?.data?.items.filter(activity => [4, 6].includes(activity?.status)).length;

                setMetrics((prevMetrics) => ({
                    ...prevMetrics,
                    projects: { total: totalProjects },
                    departments: { total: totalDepartments },
                    users: { total: totalUsers, disabled: disabledUsers, active: activeUsers },
                    activities: {
                        notStarted: createdActivities,
                        inProgress: inProgressActivities,
                        completed: completedActivities,
                    },
                }));
            } catch (error) {
                notify("error", 'Error fetching data');
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        async function fetchProjectData() {
            if (!selectedProject) return;

            try {
                const pageOptionsPlan = [
                    { recordPerPage: 0, searchCondition: { name: 'type', value: 'tower', and: { name: 'projectId', value: parseInt(selectedProject) } } },
                    { recordPerPage: 0, searchCondition: { name: 'type', value: 'floor', and: { name: 'projectId', value: parseInt(selectedProject) } } },
                    { recordPerPage: 0, searchCondition: { name: 'type', value: 'flat', and: { name: 'projectId', value: parseInt(selectedProject) } } },
                ];

                const [projectDataTower, projectDataFloor, projectDataFlat] = await Promise.all([
                    api.getData({ module: 'plan', options: pageOptionsPlan[0] }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[1] }),
                    api.getData({ module: 'plan', options: pageOptionsPlan[2] }),
                ]);

                const totalTowers = projectDataTower?.data?.items.length;
                const totalFloors = projectDataFloor?.data?.items.length;
                const totalFlats = projectDataFlat?.data?.items.length;

                // console.log(projectDataTower, projectDataFloor, projectDataFlat);
                // console.log("Selected Project ID:", selectedProject);

                setMetrics((prevMetrics) => ({
                    ...prevMetrics,
                    towers: { total: totalTowers },
                    floors: { total: totalFloors },
                    flats: { total: totalFlats },
                }));
            } catch (error) {
                notify("error", 'Error fetching project data');
            }
        }

        fetchProjectData();
    }, [selectedProject]);

    // Options for charts to display data labels
    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: 'white',
                font: {
                    weight: 'bold',
                },
            },
        },
    };

    return (
        <div className="container-fluid">
            {privileges?.some(p => (p.module === 'user' || p.module === 'plan')) ? (
                <>
                    <Row className="mt-2">
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Activities</Card.Title>
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
                                    <Form.Group className="d-flex align-items-center">
                                        <Form.Label className="me-2" style={{ width: '100px' }}>
                                            Filter by Project
                                        </Form.Label>
                                        <Form.Control
                                            as="select"
                                            onChange={(e) => setSelectedProject(e.target.value)}
                                            value={selectedProject || ''}
                                            style={{ flex: 1, maxWidth: '200px' }}
                                        >
                                            <option value="">Select a Project</option>
                                            {/* {console.log(projects)} */}
                                            {projects?.map(project => (
                                                <option key={project.id} value={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <div style={{ maxWidth: '600px', maxHeight: '450px', paddingTop: '20px' }}>
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
                    {
                        (loggedInUser?.roles?.includes("Civil Engineer") && privileges?.some(p => (p.module === 'activity'))) && (
                            <div className="mt-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Activities Progress</Card.Title>
                                        <Accordion>
                                            {activitiesWithData.map((activity, index) => (
                                                <Accordion.Item eventKey={String(index)} key={index}>
                                                    <Accordion.Header>{activity.name}</Accordion.Header>
                                                    <Accordion.Body>
                                                        <div style={{ height: `${activity.childActivities.length * 50}px` }}>
                                                            <Bar data={activity.data} options={activity.options} />
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            ))}
                                        </Accordion>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    }
                </>
            ) : <></>}
        </div>
    );
}

export default Dashboard;