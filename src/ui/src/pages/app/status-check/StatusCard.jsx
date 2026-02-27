import React from "react";
import CountUp from "react-countup";

const StatusCard = ({ status, count, selected, onSelect }) => {
    const Icon = status.icon;

    return (
        <div
            className={`premium-card ${status.gradient} 
      ${selected ? "card-active" : ""}`}
            onClick={onSelect}
        >
            <div className="card-top d-flex justify-content-between align-items-center">
                <Icon className="card-icon" />

                <input
                    type="radio"
                    checked={selected}
                    onChange={onSelect}
                />
            </div>

            <div className="card-body-content">
                <h6 className="status-title">{status.label}</h6>

                <h3 className="count-number">
                    <CountUp
                        end={count}
                        duration={1.5}
                        separator=","
                    />
                </h3>
            </div>
        </div>
    );
};

export default StatusCard;