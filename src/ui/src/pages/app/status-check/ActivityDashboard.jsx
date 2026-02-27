import React, { useEffect, useState } from "react";
import api from "../../../store/api-service";
import StatusCard from "./StatusCard";
import statusList from "../../../store/activity-status-check";
import "./ActivityDashboard.css";

const ActivityStatusDashboard = ({ counts = {}, selected = null, onStatusChange }) => {

    return (
        <div className="container-fluid dashboard-bg">
            <div className="row g-2">
                {statusList.map(status => (
                    <div key={status.key} className="col-12 col-md-6 col-xl-3">
                        <StatusCard
                            status={status}
                            count={counts[status.key] || 0}
                            selected={selected === status.key}
                            onSelect={() => onStatusChange && onStatusChange(status.key)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivityStatusDashboard;