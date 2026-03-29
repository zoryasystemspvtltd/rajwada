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
    },
    "activity": {
        "dependent": [
            {
                "module": "activityResources",
                "field": "activityId"
            },
            {
                "module": "activityTracking",
                "field": "activityId"
            }
        ]
    }
};

export default deleteDependency;