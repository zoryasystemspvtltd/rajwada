import Badge from "react-bootstrap/Badge";

const IUIStatusBadge = ({ value }) => {
    const getText = (num) => {
        if (!num) return "";

        const textMap = {
            1: "New",
            2: "QC Assigned",
            3: "Assigned",
            4: "Approved",
            5: "Hold",
            6: "Rejected",
            7: "HOD Assigned"
        };

        return textMap[num] || "Unknown";
    }

    const getClass = (num) => {
        if (!num) return "bg-dark";

        const classMap = {
            1: "badge-orange",
            2: "badge-purple",
            3: "badge-teal",
            4: "badge-green",
            5: "badge-yellow",
            6: "badge-red",
            7: "badge-blue"
        };

        return classMap[num] || "bg-dark";
    };

    return (
        <Badge className={getClass(value)}>
            {getText(value)}
        </Badge>
    );
};

export default IUIStatusBadge;
