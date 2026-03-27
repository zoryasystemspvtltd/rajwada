const deleteDependency = {
    "plan": {
        "flat": {
            "dependent": [
                {
                    module: "roomDetails",
                    field: "planId"
                },
                {
                    module: "workflow",
                    field: "flatId"
                },
                {
                    module: "activity",
                    field: "flatId"
                }
            ]
        }
    }
};

export default deleteDependency;