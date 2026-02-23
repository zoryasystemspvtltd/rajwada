import {
    FaPauseCircle,
    FaTools,
    FaExclamationTriangle,
    FaCheckCircle
} from "react-icons/fa";

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

export default statusList;