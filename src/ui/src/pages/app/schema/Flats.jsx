import { useParams } from "react-router-dom";
import IUIListFilter from "../../common/IUIListFilter";
import IUIPage from "../../common/IUIPage"

export const ListFlat = () => {

    const schema = {
        module: 'plan',
        title: 'Flat',
        relationKey: "type",
        path: 'flats',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        uploading: true,
        downloading: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: true },
            {
                text: 'Floor', field: 'parentName', type: 'text', sorting: false, searching: false,
            },
            {
                text: 'Priority', field: 'priorityStatus', type: 'lookup-enum', sorting: false, searching: false,
                schema: { module: 'priorityStatusType' }
            },
        ]
    }

    return (<IUIListFilter schema={schema} filter="flat" />)
}

export const FlatDashboard = () => {

    const schema = {
        module: 'plan',
        title: 'Flat',
        relationKey: "type",
        path: 'flats',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            {
                text: 'Floor', field: 'parentName', type: 'text', sorting: false, searching: false, width: 100,
            },
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true, width: 100 },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },

        ]
    }

    return (<IUIListFilter schema={schema} filter="flat" />)
}

export const ViewFlat = () => {
    const { id } = useParams();

    const schema = {
        module: 'plan',
        title: 'Flat',
        path: 'flats',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        back: true,
        deleting: true,
        assign: true,
        assignType: 'multiple',
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'h5', required: true, width: 12 },
                    // { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'p', required: true, width: 12 },
                    {
                        text: 'Priority', field: 'priorityStatus', width: 4, type: 'lookup-enum', readonly: true, textonly: true,
                        schema: { module: 'priorityStatusType' }
                    },
                    // { field: 'name', type: 'ilab-canvas', width: 12 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'picture-upload', shape: 'rect', module: 'plan' },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-mapping',
                        schema: {
                            title: 'Room', // title of child
                            module: 'roomDetails', // module for child
                            relationKey: "planId", // foreign key field in child schema
                            parentPath: 'flats', //
                            childPath: 'roommappings',
                            paging: true,
                            searching: true,
                            editing: false,
                            adding: true,
                            fields: [
                                {
                                    text: 'Room ID', field: 'roomId', type: 'text', sorting: true, searching: true,
                                },
                                { text: 'Name', field: 'name', type: 'text', sorting: false, searching: false },
                            ]
                        },
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}


export const EditFlat = () => {
    const { id } = useParams();

    const schema = {
        module: 'plan',
        title: 'Flat',
        path: 'flats',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6, duplicate: true },
                    {
                        text: 'Floor', field: 'parentId', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'plan', filter: 'type', value: 'floor' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 },
                    {
                        text: 'Priority', field: 'priorityStatus', width: 4, type: 'lookup-enum', required: false,
                        schema: { module: 'priorityStatusType' }
                    }
                ]
            },
            // {
            //     type: "area", width: 12
            //     , fields: [
            //         {
            //             text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'ilab-canvas', shape: 'rect',
            //             schema: {
            //                 readonly: false,
            //                 upload: true,
            //                 save: true,
            //                 parentId: id,
            //                 parent: {
            //                     module: 'plan',
            //                     filter: 'planId',
            //                     path: 'flats'
            //                 },
            //                 controls: {
            //                     balloon: true,
            //                     rectangle: true,
            //                     pencil: true,
            //                     camera: false,
            //                     delete: true,
            //                     reset: true
            //                 },
            //                 module: 'unitOfWork'
            //             }
            //         },
            //     ]
            // },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'picture-upload', shape: 'rect', required: true, module: 'plan' },
                ]
            },
            { field: 'type', type: 'hidden-filter', value: "flat" }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddFlat = () => {
    const schema = {
        module: 'plan',
        title: 'Flat',
        path: 'flats',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6, duplicate: true },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'project' }
                    },
                    {
                        text: 'Floor', field: 'parentId', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'plan', filter: 'type', value: 'floor' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 },
                    {
                        text: 'Priority', field: 'priorityStatus', width: 4, type: 'lookup-enum', required: true,
                        schema: { module: 'priorityStatusType' }
                    },
                    { field: 'type', type: 'hidden-filter', value: "flat" }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'picture-upload', shape: 'rect', required: true,
                        parent: 'parentId',
                        module: 'plan',
                        schema: {
                            type: "lookup-filter",
                            module: 'plan',
                            relationKey: "blueprint",
                            filter: 'type',
                            value: 'floor'
                        },
                    },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const TestCanvas = () => {
    const schema = {
        module: 'plan',
        title: 'Test',
        path: 'flats',
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'ilab-canvas', shape: 'rect' },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}
