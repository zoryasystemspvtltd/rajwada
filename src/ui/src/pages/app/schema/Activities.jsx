import IUIListFilter from "../../common/IUIListFilter.jsx";
import IUIPage from "../../common/IUIPage";
import IUIActivityCreate from "../../common/shared/IUIActivityCreate.jsx";

export const ListActivity = () => {

    const schema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        relationKey: "type",
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: true, searching: true },
            { text: 'Planned Start Date', field: 'startDate', type: 'date', sorting: true, searching: true },
            { text: 'Planned End Date', field: 'endDate', type: 'date', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Dependency', field: 'workflowId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'workflow' }
            }
        ]
    }


    return (<IUIListFilter schema={schema} filter='Main Task' />)
}

export const ViewActivity = () => {
    const schema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        deleting: false,
        assign: true,
        assignType: 'multiple',
        assignChild: true,
        approving: true,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', width: 4, type: 'label' },
                    { text: 'Description', field: 'description', width: 4, type: 'label' },
                    {
                        text: 'Type', field: 'type', type: 'lookup-link', width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Main Task' },
                                { name: 'Sub Task' }
                            ]
                        }
                    },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup-link',
                        schema: { module: 'project', path: 'projects' }
                    },
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup-link',
                        schema: { module: 'activity', path: 'activities' }
                    },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'label-date' },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'label-date', },
                    { text: 'Actual Start Date', field: 'actualStartDate', width: 4, type: 'label-date', },
                    { text: 'Actual End Date', field: 'actualEndDate', width: 4, type: 'label-date', },
                    {
                        text: 'Status', field: 'workflowState', width: 4, type: 'lookup-link',
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                    // {
                    //     text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-link',
                    //     schema: { module: 'priorityStatusType' }
                    // },
                    { text: 'Duration', field: 'Duration', width: 4, type: 'label' },
                    { text: 'Progress(%)', field: 'progressPercentage', width: 4, type: 'label' },
                    // {
                    //     text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup',
                    //     schema: { module: 'approvalStatusType' }
                    // },
                    { text: 'Estimate Cost', field: 'costEstimate', width: 4, type: 'label' },
                    { text: 'Actual Cost', field: 'actualCost', width: 4, type: 'label' },
                    // { text: 'Document Links', field: 'documentLinks', width: 4, type: 'text' },
                    {
                        text: 'Assigned To', field: 'member', width: 4, type: 'label',
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'Notes', field: 'notes', width: 12, type: 'label' }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', readonly: true,
                        schema: {
                            readonly: true,
                            module: 'activity',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            fields: [
                                {
                                    text: 'Item', field: 'itemId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'asset' }
                                },
                                { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
                                {
                                    text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'uom' }
                                },
                            ]
                        }
                    },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-relation',
                        schema: {
                            module: 'activity',
                            relationKey: "parentId",
                            title: 'Related Work',
                            path: 'works',
                            paging: true,
                            searching: true,
                            editing: false,
                            adding: false,
                            fields: [
                                { text: 'Floors', field: 'name', type: 'link', sorting: true, searching: true, },
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

export const EditActivity = () => {
    const schema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', width: 4, type: 'text', required: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Main Task' },
                                { name: 'Sub Task' }
                            ]
                        }
                    },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup', required: true, readonly: true,
                        schema: { module: 'project' }
                    },
                    {
                        text: 'Dependency', field: 'workflowId', width: 4, type: 'lookup', required: true, readonly: true,
                        schema: { module: 'workflow' }
                    },
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'activity' }
                    },
                    {
                        text: 'Tower', field: 'towerId', type: 'lookup-filter', required: false, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    {
                        text: 'Floor', field: 'floorId', type: 'lookup-filter', required: false, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'floor' }
                    },
                    {
                        text: 'Flat', field: 'flatId', type: 'lookup-filter', required: false, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'flat' }
                    },
                    { text: 'Planned Start Date', field: 'startDate', placeholder: 'Start Date here...', width: 4, type: 'date', required: true },
                    { text: 'Planned End Date', field: 'endDate', placeholder: 'End Date here...', width: 4, type: 'date', required: true },
                    // {
                    //     text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-enum', required: false,
                    //     schema: { module: 'priorityStatusType' }
                    // },
                    // { text: 'Duration', field: 'Duration', placeholder: 'Duration here...', width: 4, type: 'number', required: false },
                    // { text: 'Progress(%)', field: 'progressPercentage', placeholder: 'Progress(%) here...', width: 4, type: 'number', required: false },
                    // {
                    //     text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup-enum', required: false,
                    //     schema: { module: 'approvalStatusType' }
                    // },
                    // { text: 'Document Links', field: 'documentLinks', placeholder: 'Document Links here...', width: 4, type: 'text', required: false },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Estimate Cost', field: 'costEstimate', placeholder: 'Estimate Cost here...', width: 4, type: 'number', required: false },
                    {
                        text: 'Status', field: 'workflowState', width: 4, type: 'lookup', required: false,
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    // {
                    //     text: 'Assign To', field: 'userId', width: 4, type: 'lookup', required: true,
                    //     schema: { module: 'user', path: 'users' }
                    // },
                    // {
                    //     text: 'Contractor Name', field: 'contractorId', nameField: 'contractorName', type: 'lookup', required: true, width: 4,
                    //     schema: { module: 'contractor' }
                    // },
                    {
                        text: 'Labour Provided By', field: 'labourProvidedBy', type: 'lookup-multi-column', required: true, width: 4,
                        schema: {
                            nameField: "name",
                            module: "contractor",
                            selectLabel: "Contractor",
                            columns: [
                                {
                                    name: "name",
                                    width: "50%"
                                },
                                {
                                    name: "type",
                                    width: "50%"
                                }
                            ]
                        }
                    },
                    // {
                    //     text: 'Labour Provided By', field: 'labourProvidedBy', type: 'lookup', required: true, width: 4,
                    //     schema: { module: 'contractor' }
                    // },
                    {
                        text: 'Material Provided By', field: 'materialProvidedBy', type: 'lookup', required: true, width: 4,
                        schema: { module: 'contractor' }
                    },
                    { text: 'Notes', field: 'notes', placeholder: 'Notes here...', width: 4, type: 'text', required: false },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', required: true,
                        schema: {
                            title: 'Item',
                            module: 'activity',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            fields: [
                                {
                                    text: 'Item', field: 'itemId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'asset' }
                                },
                                { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
                                {
                                    text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'uom' }
                                },
                            ]
                        }
                    },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddActivity = () => {
    const setupSchema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 3,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'projectId',
                        field: 'towerId',
                        text: 'Tower',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "projectId",
                            path: 'towers'
                        },
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'towerId',
                        field: 'floorId',
                        text: 'Floor',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'floors'
                        },
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'floorId',
                        field: 'flatId',
                        text: 'Flat',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'flats'
                        },
                    }
                ]
            },
        ]
    }

    const creationSchema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        adding: true,
        back: true,
        defaultFields: [
            {
                field: "projectId",
                type: "lookup"
            },
            {
                field: "workflowId",
                type: "lookup"
            },
            {
                field: "towerId",
                type: "lookup"
            },
            {
                field: "floorId",
                type: "lookup"
            },
            {
                field: "flatId",
                type: "lookup"
            },
            {
                field: "photoUrl",
                type: "photo"
            }
        ],
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', width: 4, type: 'text', required: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Main Task' },
                                { name: 'Sub Task' }
                            ]
                        }
                    },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup', required: true,
                        schema: { module: 'project' }
                    },
                    {
                        text: 'Dependency', field: 'workflowId', width: 4, type: 'lookup', required: true,
                        schema: { module: 'workflow' }
                    },
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'activity' }
                    },
                    {
                        text: 'Tower', field: 'towerId', type: 'lookup-filter', required: true, width: 4,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    // {
                    //     text: 'Floor', field: 'floorId', type: 'lookup-filter', required: false, width: 4,
                    //     schema: { module: 'plan', filter: 'type', value: 'floor' }
                    // },
                    // {
                    //     text: 'Flat', field: 'flatId', type: 'lookup-filter', required: false, width: 4,
                    //     schema: { module: 'plan', filter: 'type', value: 'flat' }
                    // },
                    {
                        type: 'lookup-relation',
                        parent: 'towerId',
                        field: 'floorId',
                        text: 'Floor',
                        width: 4,
                        required: false,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'floors'
                        },
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'floorId',
                        field: 'flatId',
                        text: 'Flat',
                        width: 4,
                        required: false,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'flats'
                        },
                    },
                    { text: 'Planned Start Date', field: 'startDate', placeholder: 'Start Date here...', width: 4, type: 'date', required: true },
                    { text: 'Planned End Date', field: 'endDate', placeholder: 'End Date here...', width: 4, type: 'date', required: true },
                    // {
                    //     text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-enum', required: false,
                    //     schema: { module: 'priorityStatusType' }
                    // },
                    // { text: 'Duration', field: 'Duration', placeholder: 'Duration here...', width: 4, type: 'number', required: false },
                    // { text: 'Progress(%)', field: 'progressPercentage', placeholder: 'Progress(%) here...', width: 4, type: 'number', required: false },
                    // {
                    //     text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup-enum', required: false,
                    //     schema: { module: 'approvalStatusType' }
                    // },
                    // { text: 'Document Links', field: 'documentLinks', placeholder: 'Document Links here...', width: 4, type: 'text', required: false },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Estimate Cost', field: 'costEstimate', placeholder: 'Estimate Cost here...', width: 4, type: 'number', required: false },
                    {
                        text: 'Status', field: 'workflowState', width: 4, type: 'lookup', required: false,
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    // {
                    //     text: 'Assign To', field: 'userId', width: 4, type: 'lookup', required: true,
                    //     schema: { module: 'user', path: 'users' }
                    // },
                    // {
                    //     text: 'Contractor Name', field: 'contractorId', nameField: 'contractorName', type: 'lookup', required: true, width: 4,
                    //     schema: { module: 'contractor' }
                    // },
                    {
                        text: 'Labour Provided By', field: 'labourProvidedBy', type: 'lookup-multi-column', required: true, width: 4,
                        schema: {
                            nameField: "name",
                            module: "contractor",
                            selectLabel: "Contractor",
                            columns: [
                                {
                                    name: "name",
                                    width: "50%"
                                },
                                {
                                    name: "type",
                                    width: "50%"
                                }
                            ]
                        }
                    },
                    {
                        text: 'Material Provided By', field: 'materialProvidedBy', type: 'lookup-multi-column', required: true, width: 4,
                        schema: {
                            nameField: "name",
                            module: "contractor",
                            selectLabel: "Contractor",
                            columns: [
                                {
                                    name: "name",
                                    width: "50%"
                                },
                                {
                                    name: "type",
                                    width: "50%"
                                }
                            ]
                        }
                    },
                    { text: 'Notes', field: 'notes', placeholder: 'Notes here...', width: 4, type: 'text', required: false },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', required: true,
                        schema: {
                            title: 'Item',
                            module: 'activity',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            fields: [
                                {
                                    text: 'Item', field: 'itemId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'asset' }
                                },
                                { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
                                {
                                    text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                                    schema: { module: 'uom' }
                                },
                            ]
                        }
                    },
                ]
            },
            // {
            //     type: "area", width: 12
            //     , fields: [
            //         {
            //             text: 'Activity Blueprint', field: 'photoUrl', width: 12, type: 'ilab-canvas', required: true,
            //             schema: {
            //                 readonly: true,
            //                 upload: false,
            //                 save: false,
            //                 parent: {
            //                     module: 'plan',
            //                     filter: 'planId',
            //                 },
            //                 controls: {
            //                     balloon: false,
            //                     rectangle: false,
            //                     pencil: false,
            //                     camera: false,
            //                     delete: false,
            //                     reset: false
            //                 },
            //                 module: 'unitOfWork'
            //             }
            //         }
            //     ]
            // }
        ]
    }

    return (<IUIActivityCreate setupSchema={setupSchema} creationSchema={creationSchema} />)
}