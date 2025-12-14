import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListWorkflow = () => {

    const schema = {
        module: 'workflow',
        title: 'Dependency',
        path: 'dependencies',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Alias', field: 'code', type: 'text', sorting: true, searching: true },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            }
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewWorkflow = () => {
    const schema = {
        module: 'workflow',
        title: 'Dependency',
        path: 'dependencies',
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
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', type: 'label', width: 3 },
                    { text: 'Alias', field: 'code', type: 'label', width: 3 },
                    {
                        text: 'Type', field: 'type', type: 'lookup-link', width: 3,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Inside' },
                                { name: 'Outside' }
                            ]
                        }
                    },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', width: 3,
                        schema: { module: 'project', path: 'projects' }
                    },
                    {
                        text: 'Tower', field: 'towerId', type: 'lookup-link', width: 3,
                        schema: { module: 'plan', path: 'towers' }
                    },
                    {
                        text: 'Floor', field: 'floorId', type: 'lookup-link', width: 3,
                        schema: { module: 'plan', path: 'floors' }
                    },
                    {
                        text: 'Flat', field: 'flatId', type: 'lookup-link', width: 3,
                        schema: { module: 'plan', path: 'flats' }
                    },
                    {
                        text: 'Room', field: 'roomId', type: 'lookup-link', width: 3,
                        schema: { module: 'room', path: 'rooms' }
                    },
                    { field: 'data', type: 'ilab-flowchart', width: 12 }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditWorkflow = () => {
    const schema = {
        module: 'workflow',
        title: 'Dependency',
        path: 'dependencies',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 4 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 4 },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Inside' },
                                { name: 'Outside' }
                            ]
                        }
                    }
                ]
            },
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
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Setting', field: 'data', type: 'ilab-flowchart' }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddWorkflow = () => {
    const schema = {
        module: 'workflow',
        title: 'Dependency',
        path: 'dependencies',
        multiCopy: true,
        multiCopySchema: {
            copyLabel: 'Dependency',
            module: 'workflow',
            readonly: false,
            copyField: 'data',
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
        },
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 3 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 3 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 3,
                        schema: { module: 'project' }
                    },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 3,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Inside' },
                                { name: 'Outside' }
                            ]
                        }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'lookup-relation',
                        parent: 'projectId',
                        field: 'towerId',
                        // exclusionCondition:{
                        //     field: 'type',
                        //     value: 'Inside'
                        // },
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
                        // exclusionCondition:{
                        //     field: 'type',
                        //     value: 'Inside'
                        // },
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
                        // exclusionCondition:{
                        //     field: 'type',
                        //     value: 'Inside'
                        // },
                        text: 'Flat',
                        width: 3,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'flats'
                        },
                    },
                    {
                        type: 'lookup-relation-rooms',
                        parent: 'flatId',
                        field: 'roomId',
                        // exclusionCondition:{
                        //     field: 'type',
                        //     value: 'Inside'
                        // },
                        text: 'Room',
                        width: 3,
                        schema: {
                            module: 'plan',
                            parentModule: 'flatTemplateDetails',
                            childModule: 'room',
                            field: 'flatTemplateId',
                            parentFilterFields: [
                                {
                                    name: "projectId", // search key in parentData
                                    key: "projectId" // key used in query for filtering
                                },
                                {
                                    name: "floorId",
                                    key: "parentId"
                                },
                                {
                                    name: "type",
                                    key: "type",
                                    value: "flat"
                                }
                            ]
                        }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Setting', field: 'data', type: 'ilab-flowchart' }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}
