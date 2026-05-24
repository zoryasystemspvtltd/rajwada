import {
    FaPauseCircle,
    FaTools,
    FaExclamationTriangle,
    FaCheckCircle,
    FaRedo
} from "react-icons/fa";
import { FaHourglassStart } from "react-icons/fa6";


const statusList = [
    {
        key: "notStarted",
        label: "Not Started",
        gradient: "info-gradient",
        icon: FaHourglassStart,
        query: {
            "nullValue": "actualStartDate"
        }
    },
    {
        key: "hold",
        label: "On Hold",
        gradient: "warning-gradient",
        icon: FaPauseCircle,
        query: {
            name: "isOnHold",
            value: true,
            and: {
                name: "status",
                value: 5
            }
        }
    },
    {
        key: "inProgress",
        label: "In Progress",
        gradient: "primary-gradient",
        icon: FaTools,
        query: {
            name: 'actualStartDate',
            value: new Date(),
            operator: 'lessThan'
        }
    },
    {
        key: "delayed",
        label: "Cancelled",
        gradient: "danger-gradient",
        icon: FaExclamationTriangle,
        query: {
            name: "isCancelled",
            value: true,
            and: {
                name: "status",
                value: 12
            }
        }
    },
    {
        key: "closed",
        label: "Closed",
        gradient: "success-gradient",
        icon: FaCheckCircle,
        query: {
            name: "isCompleted",
            value: true,
            and: {
                name: "status",
                value: 4,
                or: {
                    name: "status",
                    value: 6
                }
            }
        }
    },
    {
        key: "rework",
        label: "Rework",
        gradient: "rework-gradient",
        icon: FaRedo,
        query: {
            module: "activityAmendment"
        }
    }
];


export default statusList;
