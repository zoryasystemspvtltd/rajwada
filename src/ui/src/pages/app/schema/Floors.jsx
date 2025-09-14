import IUIListFilter from "../../common/IUIListFilter";
import IUIPage from "../../common/IUIPage"


export const ListFloor = () => {


    const schema = {
        module: 'plan',
        title: 'Floor',
        relationKey: "type",
        path: 'floors',
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
                text: 'Tower', field: 'parentName', type: 'text', sorting: false, searching: false,
            },
        ]
    }




    return (<IUIListFilter schema={schema} filter="floor" />)
}


export const FloorDashboard = () => {


    const schema = {
        module: 'plan',
        title: 'Floor',
        relationKey: "type",
        path: 'floors',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            {
                text: 'Tower', field: 'parentName', type: 'text', sorting: false, searching: false, width: 100,
            },
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true, width: 100, },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },


        ]
    }




    return (<IUIListFilter schema={schema} filter="floor" />)
}


export const ViewFloor = () => {
    // const { id } = useParams();


    const schema = {
        module: 'plan',
        title: 'Floor',
        path: 'floors',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        deleting: true,
        assign: true,
        assignType: 'single',
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Tower', field: 'parentId', type: 'lookup-link', required: false, width: 12,
                        schema: { module: 'plan', filter: 'type', value: 'tower', path: 'towers' }
                    },
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'h5', required: true, width: 12 },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'p', required: true, width: 12 }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Floor Blueprint', field: 'blueprint', placeholder: 'Floor Blueprint here...', type: 'picture-upload', shape: 'rect' },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-relation',
                        schema: {
                            title: 'Flat',
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'flats',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            uploading: true,
                            downloading: true,
                            fields: [
                                { text: 'Flat', field: 'name', type: 'link', sorting: true, searching: true, width: 100, },
                                { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },


                            ]
                        },
                    }
                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const EditFloor = () => {
    // const { id } = useParams();


    const schema = {
        module: 'plan',
        title: 'Floor',
        path: 'floors',
        back: false,
        copy: true,
        copySchema: {
            copyLabel: 'Floor',
            module: 'plan',
            filterKey: 'type',
            filterValue: 'floor',
            dataCopy: true
        },
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Tower', field: 'parentId', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Flat List', field: 'flatTemplates', width: 12, type: 'table-input', required: false,
                        schema: {
                            title: 'Flats',
                            module: 'flatTemplate',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            save: false,
                            fields: [
                                {
                                    text: 'Flat Template', field: 'flatTemplateId', type: 'lookup', required: true, width: 6,
                                    schema: { module: 'flatTemplate' }
                                },
                                { text: 'Flat Count', field: 'noOfFlats', placeholder: 'Flat count here...', type: 'number', width: 6, required: true }
                            ]
                        }
                    },
                ]
            },
            // {
            //     type: "area", width: 12
            //     , fields: [
            //         {
            //             text: 'Floor Blueprint', field: 'blueprint', placeholder: 'Floor Blueprint here...', type: 'ilab-canvas', shape: 'rect',
            //             schema: {
            //                 readonly: false,
            //                 upload: true,
            //                 save: true,
            //                 parentId: id,
            //                 parent: {
            //                     module: 'plan',
            //                     filter: 'planId',
            //                     path: 'floors'
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
                    { text: 'Floor Blueprint', field: 'blueprint', placeholder: 'Floor Blueprint here...', type: 'picture-upload', shape: 'rect', required: true },
                ]
            },
            { field: 'type', type: 'hidden-filter', value: "floor" }
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const AddFloor = () => {
    const schema = {
        module: 'plan',
        title: 'Floor',
        path: 'floors',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Tower', field: 'parentId', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
            // {
            //     type: "area", width: 12
            //     , fields: [
            //         {
            //             text: 'Flat List', field: 'plans', width: 12, type: 'table-input', required: true,
            //             schema: {
            //                 title: 'Flats',
            //                 module: 'plan',
            //                 paging: true,
            //                 searching: true,
            //                 editing: true,
            //                 adding: true,
            //                 save: false,
            //                 fields: [
            //                     {
            //                         text: 'Flat Template', field: 'flatTemplateId', type: 'lookup', required: true, width: 6,
            //                         schema: { module: 'flatTemplate' }
            //                     },
            //                     { text: 'Flat Count', field: 'noOfFlats', placeholder: 'Flat count here...', type: 'number', width: 6, required: true }
            //                 ]
            //             }
            //         },
            //     ]
            // },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Floor Blueprint', field: 'blueprint', placeholder: 'Floor Blueprint here...', type: 'picture-upload', shape: 'rect', required: true,
                        parent: 'parentId',
                        schema: {
                            type: "lookup-filter",
                            module: 'plan',
                            relationKey: "blueprint",
                            filter: 'type',
                            value: 'tower'
                        },
                    },
                ]
            },
            { field: 'type', type: 'hidden-filter', value: "floor" }
        ]
    }


    return (<IUIPage schema={schema} />)
}

