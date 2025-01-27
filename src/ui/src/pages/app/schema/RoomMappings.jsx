import React from 'react';
import { useParams } from "react-router-dom";
import IUIPage from "../../common/IUIPage";

export const EditRoomMapping = () => {
    const schema = {
        module: 'resource',
        title: 'Room',
        path: 'roommappings',
        back: true,
        defaultFields: [
            {
                field: "planId",
                type: "lookup"
            },
            {
                field: "type",
                type: "text"
            }
        ],
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Room Type', field: 'roomId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'room' }
                    },
                    { text: 'Count', field: 'quantity', placeholder: 'Room Count', type: 'number', required: true, width: 4 },
                    {
                        text: 'Flat', field: 'planId', type: 'lookup-filter', required: true, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'flat' }
                    },
                ]
            },
        ]
    }
    const { flatId } = useParams();

    return (<IUIPage schema={schema} defaultValues={{ planId: flatId, type: 'room' }} />)
}

export const AddRoomMapping = () => {
    const schema = {
        module: 'resource',
        title: 'Room',
        path: 'roommappings',
        back: true,
        defaultFields: [
            {
                field: "planId",
                type: "lookup"
            },
            {
                field: "type",
                type: "text"
            }
        ],
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Room Type', field: 'roomId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'room' }
                    },
                    { text: 'Count', field: 'quantity', placeholder: 'Room Count', type: 'number', required: true, width: 4 },
                    {
                        text: 'Flat', field: 'planId', type: 'lookup-filter', required: true, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'flat' }
                    },
                ]
            },
        ]
    }
    const { flatId } = useParams();

    return (<IUIPage schema={schema} defaultValues={{ planId: flatId, type: 'room' }} />)
}