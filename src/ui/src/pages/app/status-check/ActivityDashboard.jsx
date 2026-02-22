import React, { useEffect, useState } from "react";
import api from "../../../store/api-service";
import StatusCard from "./StatusCard";
import {
    FaPauseCircle,
    FaTools,
    FaExclamationTriangle,
    FaCheckCircle
} from "react-icons/fa";
import "./ActivityDashboard.css";
import ActivityListByStatus from "./ActivityList";

const statusList = [
    {
        key: "hold",
        label: "On Hold",
        gradient: "warning-gradient",
        icon: FaPauseCircle,
        query: {
            name: "status",
            value: 5
        }
    },
    {
        key: "inprogress",
        label: "In Progress",
        gradient: "primary-gradient",
        icon: FaTools,
        query: {
            "nullValue": "actualStartDate"
        }
    },
    {
        key: "delayed",
        label: "Cancelled",
        gradient: "danger-gradient",
        icon: FaExclamationTriangle,
        query: {
            name: "isCancelled",
            value: true
        }
    },
    {
        key: "closed",
        label: "Closed",
        gradient: "success-gradient",
        icon: FaCheckCircle,
        query: {
            name: "isCompleted",
            value: true
        }
    }
];

const setupSchema = {
    module: 'activity',
    title: 'Work Planning',
    path: 'works',
    back: false,
    fields: [
        {
            type: "area", width: 12
            , fields: [
                {
                    text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 12,
                    schema: { module: 'project' }
                },
                {
                    text: 'Tower', field: 'towerId', parent: 'projectId', type: 'lookup-filter', required: false, width: 12,
                    schema: { module: 'plan', filter: 'type', value: 'tower' }
                },
                {
                    type: 'lookup-relation',
                    parent: 'towerId',
                    field: 'floorId',
                    text: 'Floor',
                    width: 12,
                    schema: {
                        module: 'plan',
                        relationKey: "parentId",
                        path: 'floors'
                    },
                },
                {
                    type: 'lookup-relation',
                    parent: 'floorId',
                    field: 'flatId',
                    text: 'Flat',
                    width: 12,
                    schema: {
                        module: 'plan',
                        relationKey: "parentId",
                        path: 'flats'
                    },
                }
            ]
        },
    ]
}

const listSchema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        paging: true,
        searching: true,
        editing: false,
        adding: false,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Expected Start', field: 'startDate', type: 'date', sorting: true, searching: true },
            { text: 'Expected End', field: 'endDate', type: 'date', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Dependency', field: 'workflowId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'workflow' }
            }
        ]
    }

const ActivityStatusDashboard = () => {
    const [counts, setCounts] = useState({});
    const [selected, setSelected] = useState("inprogress");

    const fetchStatusCount = async (status) => {
        try {
            if (!Object.keys(status.query).includes("nullValue")) {
                const pageOptions = {
                    recordPerPage: 0,
                    searchCondition: status.query
                }

                const response = await api.getData({ module: 'activity', options: pageOptions });
                return response?.data?.items?.length;
            }
            else {
                const activitiesByNullValue = await api.getAmendmentsByNullValue({ model: 'activity' });
                return activitiesByNullValue?.data?.length;
            }
        } catch (error) {
            console.error(`Error fetching ${status.key} count`, error);
            return 0;
        }
    };

    useEffect(() => {
        const fetchAllCounts = async () => {
            try {
                const promises = statusList.map(status =>
                    fetchStatusCount(status)
                );

                const results = await Promise.all(promises);

                const countsObject = statusList.reduce((acc, status, index) => {
                    acc[status.key] = results[index];
                    return acc;
                }, {});

                setCounts(countsObject);
            } catch (error) {
                console.error("Error fetching counts", error);
            }
        };

        fetchAllCounts();
    }, []);

    return (
        <div className="container-fluid px-4 py-4 dashboard-bg">
            <div className="row g-2">
                {statusList.map(status => (
                    <div key={status.key} className="col-12 col-md-6 col-xl-3">
                        <StatusCard
                            status={status}
                            count={counts[status.key] || 0}
                            selected={selected === status.key}
                            onSelect={() => setSelected(status.key)}
                        />
                    </div>
                ))}
            </div>
            <div className="row">
                <div className="col">
                    <ActivityListByStatus setupSchema={setupSchema} listSchema={listSchema} status={statusList.find(i => i.key === selected)} />
                </div>
            </div>
        </div>
    );
};

export default ActivityStatusDashboard;