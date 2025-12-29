import React, { useEffect, useState } from "react";
import api from '../../store/api-service';
import { notify } from "../../store/notification";

const priorityStatus = {
    "normal": 0,
    "urgent": 1,
    "very_urgent": 2
}

// Mock APIs (replace with real API calls)
const fetchProjects = async () => {
    const pageOptions = {
        recordPerPage: 0
    }
    const response = await api.getData({ module: 'project', options: pageOptions });
    let projectData = response?.data?.items;
    return projectData;
}

const fetchTowers = async (projectId) => {
    const newBaseFilter = {
        name: 'projectId',
        value: parseInt(projectId),
        and: {
            name: 'type',
            value: 'tower'
        }
    }

    const pageOptions = {
        recordPerPage: 0,
        searchCondition: newBaseFilter
    }

    const response = await api.getData({ module: 'plan', options: pageOptions });
    let towerData = response?.data?.items;
    return towerData;
}

const fetchFlatsByFloor = async (projectId, floorId) => {
    const newBaseFilter = {
        name: 'projectId',
        value: parseInt(projectId),
        and: {
            name: 'parentId',
            value: parseInt(floorId),
            and: {
                name: 'type',
                value: 'flat'
            }
        }

    }

    const pageOptions = {
        recordPerPage: 0,
        searchCondition: newBaseFilter
    }

    const response = await api.getData({ module: 'plan', options: pageOptions });
    let flatData = response?.data?.items;
    return flatData;
}

const fetchFlats = async (projectId, towerId) => {
    const newBaseFilter = {
        name: 'projectId',
        value: parseInt(projectId),
        and: {
            name: 'parentId',
            value: parseInt(towerId),
            and: {
                name: 'type',
                value: 'floor'
            }
        }

    }

    const pageOptions = {
        recordPerPage: 0,
        searchCondition: newBaseFilter
    }

    const response = await api.getData({ module: 'plan', options: pageOptions });
    let floorIds = response?.data?.items?.map(floor => floor.id);
    let output = [];
    if (floorIds?.length > 0) {
        const fetchPromises = floorIds.map(item => fetchFlatsByFloor(projectId, item));
        output = await Promise.all(fetchPromises);
    }
    return output.flatMap(item => item);
}

const updateSingleStatus = async (flatId, status) => {
    const item = await api.getSingleData({ module: 'plan', id: flatId });
    const flatData = item.data;
    const updatedFlatData = {
        ...flatData,
        priorityStatus: priorityStatus[status]
    };
    return await api.editData({ module: 'plan', data: updatedFlatData });
}


const updateFlatStatuses = async (flatIds, status) => {
    console.log("Updating flats", flatIds, "to", status);

    try {
        if (flatIds?.length > 0) {
            const updatePromises = flatIds.map(id => updateSingleStatus(id, status));
            await Promise.all(updatePromises);
            notify("success", "Priorities updated successfully");
        }
        await fetchFlats();
        return true;
    }
    catch (e) {
        notify("error", "Priorities updation failed");
        return false;
    }
};

const STATUS_CONFIG = {
    normal: { label: "Normal", className: "success" },
    urgent: { label: "Urgent", className: "warning" },
    very_urgent: { label: "Very Urgent", className: "danger" },
};

const FlatStatusWidget = () => {
    const [projects, setProjects] = useState([]);
    const [towers, setTowers] = useState([]);
    const [flats, setFlats] = useState([]);

    const [projectId, setProjectId] = useState("");
    const [towerId, setTowerId] = useState("");

    const [selectedFlats, setSelectedFlats] = useState([]);
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        fetchProjects().then(setProjects);
    }, []);

    useEffect(() => {
        if (projectId) {
            fetchTowers(projectId).then(setTowers);
            setTowerId("");
            setFlats([]);
        }
    }, [projectId]);

    useEffect(() => {
        if (projectId && towerId) {
            fetchFlats(projectId, towerId).then(setFlats);
            setSelectedFlats([]);
            setNewStatus("");
        }
    }, [projectId, towerId]);

    const toggleFlat = (flatId) => {
        setSelectedFlats((prev) =>
            prev.includes(flatId)
                ? prev.filter((id) => id !== flatId)
                : [...prev, flatId]
        );
    };

    const handleSubmit = async () => {
        await updateFlatStatuses(selectedFlats, newStatus);
        setFlats((prev) =>
            prev.map((f) =>
                selectedFlats.includes(f.id) ? { ...f, priorityStatus: priorityStatus[newStatus] } : f
            )
        );
        setSelectedFlats([]);
        setNewStatus("");
    };

    const PAGE_SIZE = 12;

    const [pageByStatus, setPageByStatus] = useState({
        normal: 1,
        urgent: 1,
        very_urgent: 1,
    });

    const groupedFlats = {
        normal: flats.filter((f) => f.priorityStatus === 0),
        urgent: flats.filter((f) => f.priorityStatus === 1),
        very_urgent: flats.filter((f) => f.priorityStatus === 2),
    };

    const paginatedFlats = (status) => {
        const start = (pageByStatus[status] - 1) * PAGE_SIZE;
        return groupedFlats[status].slice(start, start + PAGE_SIZE);
    };

    const totalPages = (status) =>
        Math.ceil(groupedFlats[status].length / PAGE_SIZE);

    return (
        <>
            {/* Project & Tower Selection */}
            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Project</label>
                    <select
                        className="form-select"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                    >
                        <option value="">Select Project</option>
                        {projects.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Tower</label>
                    <select
                        className="form-select"
                        value={towerId}
                        onChange={(e) => setTowerId(e.target.value)}
                        disabled={!projectId}
                    >
                        <option value="">Select Tower</option>
                        {towers.map((t) => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                    </select>
                </div>
            </div>


            {/* Flats Section */}
            {towerId && (
                <div>
                    {Object.entries(groupedFlats).map(([status, list]) => (
                        <div key={status} className="mb-4">
                            <h6 className={`mb-2 text-uppercase text-${STATUS_CONFIG[status].className} fw-bold`}>{STATUS_CONFIG[status].label}</h6>
                            <div className="row g-2">
                                {paginatedFlats(status).map((flat) => (
                                    <div key={flat.id} className="col-md-3 col-sm-4 col-6">
                                        <div
                                            className={`card p-2 h-10 border bg-${STATUS_CONFIG[status].className}`}
                                        >
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedFlats.includes(flat.id)}
                                                    onChange={() => toggleFlat(flat.id)}
                                                />
                                                <label className="form-check-label">
                                                    {flat.name}
                                                </label>
                                            </div>
                                        </div>



                                    </div>
                                ))}
                                {totalPages(status) > 1 && (
                                    <nav className="mt-2">
                                        <ul className="pagination pagination-sm mb-0">
                                            {Array.from({ length: totalPages(status) }).map((_, i) => (
                                                <li
                                                    key={i}
                                                    className={`page-item ${pageByStatus[status] === i + 1 ? "active" : ""}`}
                                                >
                                                    <button
                                                        className="page-link"
                                                        onClick={() =>
                                                            setPageByStatus((prev) => ({
                                                                ...prev,
                                                                [status]: i + 1,
                                                            }))
                                                        }
                                                    >
                                                        {i + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </nav>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Bulk Status Update */}
            {selectedFlats.length > 0 && (
                <div className="border-top pt-3">
                    <div className="row align-items-end">
                        <div className="col-md-6">
                            <label className="form-label">Change Status To</label>
                            <select
                                className="form-select"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                            >
                                <option value="">Select Status</option>
                                <option value="normal">Normal</option>
                                <option value="urgent">Urgent</option>
                                <option value="very_urgent">Very Urgent</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <button
                                className="btn btn-primary w-100"
                                disabled={!newStatus}
                                onClick={handleSubmit}
                            >
                                Update Selected Flats
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FlatStatusWidget;