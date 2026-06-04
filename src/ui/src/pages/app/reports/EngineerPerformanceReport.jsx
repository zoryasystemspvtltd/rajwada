import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import api from '../../../store/api-service';
import { notify } from '../../../store/notification';

const FIELD_LABELS = [
    { key: 'companyName', label: 'Company Name' },
    { key: 'projectName', label: 'Project Name' },
    { key: 'insideOutside', label: 'Inside / Outside' },
    { key: 'towerName', label: 'Tower Name' },
    { key: 'floorName', label: 'Floor' },
    { key: 'flatName', label: 'Flat' },
    { key: 'roomName', label: 'Room' },
    { key: 'developer', label: 'Developer' },
    { key: 'contractor', label: 'Contractor' },
    { key: 'activityName', label: 'Activities' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'day', label: 'Day' },
    { key: 'reportDate', label: 'Date' },
    { key: 'actualCost', label: 'Cost' },
    { key: 'engineer', label: 'Engineer' },
    { key: 'progressPercentage', label: 'Percentage of Work' },
    { key: 'status', label: 'Status' },
    { key: 'isApproved', label: 'Is Approved' },
];

const getItemValue = (item, keys, fallback = '') => {
    for (const key of keys) {
        if (item?.[key] !== undefined && item?.[key] !== null) {
            return item[key];
        }
    }
    return fallback;
};

const getText = (num) => {
    if (isNaN(num)) return "";

    const textMap = {
        0: "New",
        1: "In Progress",
        2: "QC Assigned",
        3: "Assigned",
        4: "Approved",
        5: "Hold",
        6: "Rejected",
        7: "HOD Assigned",
        12: "Cancelled"
    };

    return textMap[num] || "Unknown";
}

const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return dateString;
    }
};

const mapReportRow = (item) => ({
    companyName: (item?.companyName),
    projectName: (item?.projectName),
    insideOutside: (item?.insideOutside),
    towerName: (item?.towerName),
    floorName: (item?.floorName),
    flatName: (item?.flatName),
    roomName: (item?.roomName),
    developer: (item?.developer),
    contractor: (item?.contractor),
    activityName: (item?.activityName),
    startDate: formatDate(item?.startDate),
    endDate: formatDate(item?.endDate),
    reportDate: formatDate(item?.reportDate),
    day: (item?.day),
    actualCost: getItemValue(item, ['actualCost'], '') ? `₹${parseFloat(item.actualCost).toLocaleString('en-IN')}` : '',
    engineer: (item?.engineer),
    progressPercentage: (item?.progressPercentage),
    status: getText(item?.status),
    isApproved: item?.isApproved === true || item?.isApproved === 'true' || item?.approvalStatus === 4 ? 'Yes' : 'No',
});

const buildSearchPayload = ({ projectId, towerId, startDate, endDate }) => {
    const conditions = [];
    if (projectId) {
        conditions.push({ name: 'projectId', value: parseInt(projectId, 10) });
    }
    if (towerId) {
        conditions.push({ name: 'towerId', value: parseInt(towerId, 10) });
    }

    return {
        ...(projectId ? { projectId } : {}),
        ...(towerId ? { towerId } : {}),
        ...(startDate ? { startDate } : {}),
        ...(endDate ? { endDate } : {}),
    };
};

const EngineerPerformanceReport = () => {
    //const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [towers, setTowers] = useState([]);
    const [filters, setFilters] = useState({ companyId: '', projectId: '', towerId: '', startDate: '', endDate: '' });
    const [reportRows, setReportRows] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //loadCompanies();
        loadProjects();
        loadTowers();
    }, []);

    useEffect(() => {
        if (filters.companyId) {
            loadProjects(filters.companyId);
        } else {
            loadProjects();
        }
        setFilters((prev) => ({ ...prev, projectId: '', towerId: '' }));
        setTowers([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.companyId]);

    useEffect(() => {
        if (filters.projectId) {
            loadTowers(filters.projectId);
        } else {
            setTowers([]);
        }
        setFilters((prev) => ({ ...prev, towerId: '' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.projectId]);

    const loadProjects = async (companyId) => {
        try {
            const options = { recordPerPage: 0 };
            if (companyId) {
                options.searchCondition = { name: 'companyId', value: parseInt(companyId, 10) };
            }
            const response = await api.getData({ module: 'project', options });
            setProjects(response?.data?.items || []);
        } catch (error) {
            notify('error', 'Failed to load projects');
        }
    };

    const loadTowers = async (projectId) => {
        try {
            const options = { recordPerPage: 0 };
            const typeCondition = { name: 'type', value: 'tower' };
            if (projectId) {
                options.searchCondition = {
                    name: 'projectId',
                    value: parseInt(projectId, 10),
                    and: typeCondition,
                };
            } else {
                options.searchCondition = typeCondition;
            }
            const response = await api.getData({ module: 'plan', options });
            setTowers(response?.data?.items || []);
        } catch (error) {
            notify('error', 'Failed to load towers');
        }
    };

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };


    const handleSearch = async () => {
        try {
            setLoading(true);
            const payload = buildSearchPayload(filters);
            console.log('Search payload:', payload);

            const response = await api.engineerPerformanceReport({ data: payload });
            console.log('Full API Response:', response);
            console.log('Response data property:', response?.data);

            // The API returns { success, totalRecords, data: [...] }
            const data = response?.data?.data || [];
            console.log('Extracted data array:', data, 'Length:', data.length);

            if (Array.isArray(data)) {
                setReportRows(data);
                console.log('Data set to state, reportRows should update');
            } else {
                console.error('Data is not an array:', data);
                setReportRows([]);
            }
        } catch (error) {
            console.error('Error fetching report:', error);
            notify('error', 'Failed to fetch report data');
            setReportRows([]);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFilters({ projectId: '', towerId: '', startDate: '', endDate: '' });
        setReportRows([]);
    };

    const handleExportToExcel = () => {
        if (!reportRows || reportRows.length === 0) {
            notify('info', 'No report rows available to export');
            return;
        }

        const exportData = reportRows.map((item) => {
            const row = mapReportRow(item);
            return {
                'Company Name': row.companyName,
                'Project Name': row.projectName,
                'Inside / Outside': row.insideOutside,
                'Tower Name': row.towerName,
                Floor: row.floorName,
                Flat: row.flatName,
                Room: row.roomName,
                Developer: row.developer,
                Contractor: row.contractor,
                Activities: row.activityName,
                StartDate: row.startDate,
                EndDate: row.endDate,
                Cost: row.actualCost,
                Day: row.day,
                Date: row.reportDate,
                Engineer: row.engineer,
                'Percentage of Work': row.progressPercentage,
                Status: row.status,
                'Is Approved': row.isApproved,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Construction Report');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `ConstructionReport-${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const renderedRows = reportRows.map((item, index) => {
        const row = mapReportRow(item);
        return (
            <tr key={index}>
                <td>{row.companyName}</td>
                <td>{row.projectName}</td>
                <td>{row.insideOutside}</td>
                <td>{row.towerName}</td>
                <td>{row.floorName}</td>
                <td>{row.flatName}</td>
                <td>{row.roomName}</td>
                <td>{row.developer}</td>
                <td>{row.contractor}</td>
                <td>{row.activityName}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
                <td>{row.day}</td>
                <td>{row.reportDate}</td>
                <td>{row.actualCost}</td>
                <td>{row.engineer}</td>
                <td>{row.progressPercentage}</td>
                <td>{row.status}</td>
                <td>{row.isApproved}</td>
            </tr>
        );
    });

    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading text-uppercase">Engineer Performance Report</div>
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <Form>
                                        <Row className="g-3">
                                            <Col sm={12} md={3}>
                                                <Form.Group controlId="projectId">
                                                    <Form.Label className="fw-bold">Project</Form.Label>
                                                    <Form.Select name="projectId" value={filters.projectId} onChange={handleFilterChange}>
                                                        <option value="">All Projects</option>
                                                        {projects.map((project) => (
                                                            <option key={project.id} value={project.id}>{project.name || project.projectName || project.title}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={3}>
                                                <Form.Group controlId="towerId">
                                                    <Form.Label className="fw-bold">Tower</Form.Label>
                                                    <Form.Select name="towerId" value={filters.towerId} onChange={handleFilterChange}>
                                                        <option value="">All Towers</option>
                                                        {towers.map((tower) => (
                                                            <option key={tower.id} value={tower.id}>{tower.name || tower.towerName || tower.title}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={2}>
                                                <Form.Group controlId="startDate">
                                                    <Form.Label className="fw-bold">Start Date</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="startDate"
                                                        value={filters.startDate}
                                                        onChange={handleFilterChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={2}>
                                                <Form.Group controlId="endDate">
                                                    <Form.Label className="fw-bold">End Date</Form.Label>
                                                    <Form.Control
                                                        type="date"
                                                        name="endDate"
                                                        value={filters.endDate}
                                                        onChange={handleFilterChange}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col xs="auto">
                                                <Button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm me-2" onClick={handleSearch} disabled={loading}>
                                                    {loading ? 'Loading...' : 'Display Result'}
                                                </Button>
                                                <Button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-sm me-2" onClick={handleReset}>
                                                    Reset
                                                </Button>
                                                <Button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success btn-sm" onClick={handleExportToExcel}>
                                                    Export to Excel
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {reportRows.length > 0 && (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body">
                                        <div className="alert alert-info">
                                            Displaying {reportRows.length} records
                                        </div>
                                        <div className="table-responsive">
                                            <Table responsive striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        {FIELD_LABELS.map((field) => (
                                                            <th key={field.key}>{field.label}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>{renderedRows}</tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {reportRows.length === 0 && !loading && (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="main-card mb-3 card">
                                    <div className="card-body text-center text-muted">
                                        No report records found. Use the filters above and click Display Result.
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default EngineerPerformanceReport;
