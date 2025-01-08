import IUIList from "../../common/IUIList";
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
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },
            {
                text: 'Floor', field: 'parentName', type: 'text', sorting: false, searching: false,
            }
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
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'h5', required: true, width: 12 },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'p', required: true, width: 12 },
                    // { field: 'name', type: 'ilab-canvas', width: 12 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'ilab-canvas', shape: 'rect' },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-mapping',
                        schema: {
                            title: 'Room', // title of child
                            module: 'resource', // module for child
                            relationKey: "planId", // foreign key field in child schema
                            parentPath: 'flats', //
                            childPath: 'roommappings',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            fields: [
                                {
                                    text: 'Room', field: 'roomId', type: 'lookup', sorting: true, searching: true, width: 100,
                                    schema: { module: 'room' }
                                },
                                { text: 'Count', field: 'quantity', type: 'text', sorting: false, searching: false },
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
    const schema = {
        module: 'plan',
        title: 'Flat',
        path: 'flats',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Floor', field: 'parentId', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'plan', filter: 'type', value: 'floor' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'picture-upload', shape: 'rect', required: true },
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
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Floor', field: 'parentId', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'plan', filter: 'type', value: 'floor' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 },
                    { field: 'type', type: 'hidden-filter', value: "flat" }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Flat Blueprint', field: 'blueprint', placeholder: 'Flat Blueprint here...', type: 'picture-upload', shape: 'rect', required: true },
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