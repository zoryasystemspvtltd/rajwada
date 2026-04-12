import React from 'react';
import { useParams } from "react-router-dom";
import IUIPage from "../../common/IUIPage";

export const EditWorkCheckpointMapping = () => {
    const schema = {
        module: 'workCheckPointMapping',
        title: 'Work Checkpoint Mapping',
        path: 'checkpointmappings',
        deleting: true,
        back: true,
        defaultFields: [
            {
                field: "activityId",
                type: "lookup"
            }
        ],
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Checkpoint Type', field: 'workCheckPointId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'workCheckPoint' }
                    },
                    {
                        text: 'Activity', field: 'activityId', type: 'lookup', required: true, width: 4, readonly: true,
                        schema: { module: 'activity' }
                    },
                ]
            },
        ]
    }
    const { activityId } = useParams();

    return (<IUIPage schema={schema} defaultValues={{ activityId: activityId }} />)
}


export const AddWorkCheckpointMapping = () => {
    const schema = {
        module: 'workCheckPointMapping',
        title: 'Work Checkpoint Mapping',
        path: 'checkpointmappings',
        back: true,
        defaultFields: [
            {
                field: "activityId",
                type: "lookup"
            }
        ],
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Checkpoint Type', field: 'workCheckPointId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'workCheckPoint' }
                    },
                    {
                        text: 'Activity', field: 'activityId', type: 'lookup', required: true, width: 4, readonly: true,
                        schema: { module: 'activity' }
                    },
                ]
            },
        ]
    }
    const { activityId } = useParams();

    return (<IUIPage schema={schema} defaultValues={{ activityId: activityId }} />)
}
