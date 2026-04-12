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
        },
        "floor": {
            "dependent": [
                {
                    module: "plan",
                    field: "parentId"
                },
                {
                    module: "workflow",
                    field: "floorId"
                },
                {
                    module: "activity",
                    field: "floorId"
                }
            ]
        },
        "tower": {
            "dependent": [
                {
                    module: "plan",
                    field: "parentId"
                },
                {
                    module: "workflow",
                    field: "towerId"
                },
                {
                    module: "activity",
                    field: "towerId"
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
            },
            {
                "module": "activityAmendment",
                "field": "activityId"
            }
        ]
    },
    "roomDetails": {
        "dependent": [
            {
                "module": "activity",
                "field": "roomId"
            }
        ]
    },
    "project": {
        "dependent": [
            {
                "module": "plan",
                "field": "projectId"
            },
            {
                "module": "workflow",
                "field": "projectId"
            },
            {
                "module": "activity",
                "field": "projectId"
            }
        ]
    },
    "activitytracking": {
        "dependent": []
    }
};

export default deleteDependency;