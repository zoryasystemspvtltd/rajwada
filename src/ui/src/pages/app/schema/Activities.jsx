import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage";
import IUIActivityCreate from "../../common/shared/IUIActivityCreate.jsx";

export const ListActivity = () => {

    const schema = {
        module: 'activity',
        title: 'Activity',
        path: 'activities',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Dependency', field: 'dependencyId', type: 'lookup-link', sorting: false, searching: false,
                schema: { module: 'workflow' }
            }
        ]
    }


    return (<IUIList schema={schema} />)
}

export const ViewActivity = () => {
    const schema = {
        module: 'activity',
        title: 'Activity',
        path: 'activities',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        deleting: false,
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
                    { text: 'Duration', field: 'Duration', width: 4, type: 'number' },
                    { text: 'Progress(%)', field: 'progressPercentage', width: 4, type: 'number' },
                    // {
                    //     text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup',
                    //     schema: { module: 'approvalStatusType' }
                    // },
                    { text: 'Estimate Cost', field: 'costEstimate', width: 4, type: 'number' },
                    { text: 'Actual Cost', field: 'actualCost', width: 4, type: 'number' },
                    // { text: 'Document Links', field: 'documentLinks', width: 4, type: 'text' },
                    {
                        text: 'Assigned To', field: 'userId', width: 4, type: 'lookup',
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'Notes', field: 'notes', width: 4, type: 'text' }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditActivity = () => {
    const schema = {
        module: 'activity',
        title: 'Activity',
        path: 'activities',
        back: true,
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
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'Project' }
                    },
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'Activity' }
                    },
                    { text: 'Start Date', field: 'startDate', placeholder: 'Start Date here...', width: 4, type: 'date', required: false },
                    { text: 'End Date', field: 'endDate', placeholder: 'End Date here...', width: 4, type: 'date', required: false },
                    { text: 'Actual Start Date', field: 'actualStartDate', placeholder: 'Actual Start Date here...', width: 4, type: 'date', required: false },
                    { text: 'Actual End Date', field: 'actualEndDate', placeholder: 'Actual End Date here...', width: 4, type: 'date', required: false },
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
                    // {
                    //     text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup', required: false,
                    //     schema: { module: 'priorityStatusType' }
                    // },
                    { text: 'Duration', field: 'Duration', placeholder: 'Duration here...', width: 4, type: 'number', required: false },
                    { text: 'Progress(%)', field: 'progressPercentage', placeholder: 'Progress(%) here...', width: 4, type: 'number', required: false },
                    // {
                    //     text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup', required: false,
                    //     schema: { module: 'approvalStatusType' }
                    // },
                    { text: 'Estimate Cost', field: 'costEstimate', placeholder: 'Estimate Cost here...', width: 4, type: 'number', required: false },
                    { text: 'Actual Cost', field: 'actualCost', placeholder: 'Actual Cost here...', width: 4, type: 'number', required: false },
                    // { text: 'Document Links', field: 'documentLinks', placeholder: 'Document Links here...', width: 4, type: 'text', required: false },
                    {
                        text: 'Assign To', field: 'userId', width: 4, type: 'lookup', required: true,
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'Notes', field: 'notes', placeholder: 'Notes here...', width: 4, type: 'text', required: false }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

// export const AddActivity = () => {
//     const schema = {
//         module: 'activity',
//         title: 'Activity',
//         path: 'activities',
//         back: true,
//         fields: [
//             {
//                 type: "area", width: 12
//                 , fields: [
//                     { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
//                     { text: 'Description', field: 'description', placeholder: 'Description here...', width: 4, type: 'text', required: true },
//                     {
//                         text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
//                         schema: {
//                             items: [ // or use items for fixed value
//                                 { name: 'Main Task' },
//                                 { name: 'Sub Task' }
//                             ]
//                         }
//                     },
//                     {
//                         text: 'Project', field: 'projectId', width: 4, type: 'lookup', required: false,
//                         schema: { module: 'Project' }
//                     },
//                     {
//                         text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup', required: false,
//                         schema: { module: 'Activity' }
//                     },
//                     { text: 'Start Date', field: 'startDate', placeholder: 'Start Date here...', width: 4, type: 'date', required: false },
//                     { text: 'End Date', field: 'endDate', placeholder: 'End Date here...', width: 4, type: 'date', required: false },
//                     { text: 'Actual Start Date', field: 'actualStartDate', placeholder: 'Actual Start Date here...', width: 4, type: 'date', required: false },
//                     { text: 'Actual End Date', field: 'actualEndDate', placeholder: 'Actual End Date here...', width: 4, type: 'date', required: false },
//                     {
//                         text: 'Status', field: 'workflowState', width: 4, type: 'lookup-enum', required: false,
//                         schema: { module: 'stateType' }
//                     },
//                     /*{
//                         text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-enum', required: false,
//                         schema: { module: 'priorityStatusType' }
//                     },
//                     { text: 'Duration', field: 'Duration', placeholder: 'Duration here...', width: 4, type: 'number', required: false },
//                     { text: 'Progress(%)', field: 'progressPercentage', placeholder: 'Progress(%) here...', width: 4, type: 'number', required: false },
//                     {
//                         text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup-enum', required: false,
//                         schema: { module: 'approvalStatusType' }
//                     },*/
//                     { text: 'Estimate Cost', field: 'costEstimate', placeholder: 'Estimate Cost here...', width: 4, type: 'number', required: false },
//                     { text: 'Actual Cost', field: 'actualCost', placeholder: 'Actual Cost here...', width: 4, type: 'number', required: false },
//                     { text: 'Document Links', field: 'documentLinks', placeholder: 'Document Links here...', width: 4, type: 'text', required: false },
//                     { text: 'Notes', field: 'notes', placeholder: 'Notes here...', width: 4, type: 'text', required: false }
//                 ]
//             },
//         ]
//     }

//     return (<IUIPage schema={schema} />)
// }

export const AddActivity = () => {
    const setupSchema = {
        module: 'activity',
        title: 'Activity',
        path: 'activities',
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
        title: 'Activity',
        path: 'activities',
        adding: true,
        back: true,
        defaultFields: ["projectId", "dependencyId", "towerId", "floorId", "flatId", "photoUrl"],
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
                        text: 'Dependency', field: 'dependencyId', width: 4, type: 'lookup', required: true,
                        schema: { module: 'workflow' }
                    },
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'activity' }
                    },
                    {
                        text: 'Tower', field: 'towerId', type: 'lookup-filter', required: false, width: 4,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    {
                        text: 'Floor', field: 'floorId', type: 'lookup-filter', required: false, width: 4,
                        schema: { module: 'plan', filter: 'type', value: 'floor' }
                    },
                    {
                        text: 'Flat', field: 'flatId', type: 'lookup-filter', required: false, width: 4,
                        schema: { module: 'plan', filter: 'type', value: 'flat' }
                    },
                    { text: 'Planned Start Date', field: 'startDate', placeholder: 'Start Date here...', width: 4, type: 'date', required: false },
                    { text: 'Planned End Date', field: 'endDate', placeholder: 'End Date here...', width: 4, type: 'date', required: false },
                    { text: 'Actual Start Date', field: 'actualStartDate', placeholder: 'Actual Start Date here...', width: 4, type: 'date', required: false },
                    { text: 'Actual End Date', field: 'actualEndDate', placeholder: 'Actual End Date here...', width: 4, type: 'date', required: false },
                    {
                        text: 'Status', field: 'workflowState', width: 4, type: 'lookup-enum', required: false,
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                    /*{
                        text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-enum', required: false,
                        schema: { module: 'priorityStatusType' }
                    },
                    { text: 'Duration', field: 'Duration', placeholder: 'Duration here...', width: 4, type: 'number', required: false },
                    { text: 'Progress(%)', field: 'progressPercentage', placeholder: 'Progress(%) here...', width: 4, type: 'number', required: false },
                    {
                        text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup-enum', required: false,
                        schema: { module: 'approvalStatusType' }
                    },*/
                    { text: 'Estimate Cost', field: 'costEstimate', placeholder: 'Estimate Cost here...', width: 4, type: 'number', required: false },
                    { text: 'Actual Cost', field: 'actualCost', placeholder: 'Actual Cost here...', width: 4, type: 'number', required: false },
                    // { text: 'Document Links', field: 'documentLinks', placeholder: 'Document Links here...', width: 4, type: 'text', required: false },
                    {
                        text: 'Assign To', field: 'userId', width: 4, type: 'lookup', required: true,
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'Notes', field: 'notes', placeholder: 'Notes here...', width: 4, type: 'text', required: false }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', required: true,
                        schema: {
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
                        text: 'Activity Blueprint', field: 'photoUrl', width: 12, type: 'ilab-canvas', required: true,
                        schema: {
                            upload: false
                        }
                    }
                ]
            }
        ]
    }

    return (<IUIActivityCreate setupSchema={setupSchema} creationSchema={creationSchema} />)
}