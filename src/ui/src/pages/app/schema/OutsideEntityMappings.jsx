import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListOutsideEntityMappings = () => {
    const schema = {
        module: 'outSideEntity',
        title: 'Outside Entity Mapping',
        path: 'outside-entities',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            {
                text: 'Outside Entity Type', field: 'outSideEntityTypeId', type: 'lookup', sorting: true, searching: false,
                schema: { module: 'outSideEntityType' }
            },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: true, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Tower', field: 'towerId', type: 'lookup', sorting: true, searching: false,
                schema: { module: 'plan' }
            },
            {
                text: 'Floor', field: 'floorId', type: 'lookup', sorting: true, searching: false,
                schema: { module: 'plan' }
            }
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewOutsideEntityMappings = () => {
    const schema = {
        module: 'outSideEntity',
        title: 'Outside Entity Mapping',
        path: 'outside-entities',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        deleting: true,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', type: 'label', required: false, width: 6 },
                    {
                        text: 'Outside Entity Type', field: 'outSideEntityTypeId', type: 'lookup-link', required: false, width: 6, readonly: true,
                        schema: { module: 'outSideEntityType', path: 'outside-entity-types' }
                    },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', required: false, width: 6, readonly: true,
                        schema: { module: 'project', path: 'projects' }
                    },
                    {
                        text: 'Tower', field: 'towerId', type: 'lookup-link', required: false, width: 6, readonly: true,
                        schema: { module: 'plan', path: 'towers' }
                    },
                    {
                        text: 'Floor', field: 'floorId', type: 'lookup-link', required: false, width: 6, readonly: true,
                        schema: { module: 'plan', path: 'floors' }
                    },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditOutsideEntityMappings = () => {
    const schema = {
        module: 'outSideEntity',
        title: 'Outside Entity Mapping',
        path: 'outside-entities',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 6, readonly: true,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'projectId',
                        field: 'towerId',
                        text: 'Tower',
                        width: 6,
                        required: false,
                        readonly: true,
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
                        width: 6,
                        required: false,
                        readonly: true,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'floors'
                        },
                    },
                    { text: 'Name', field: 'name', type: 'text', required: true, width: 6 },
                    {
                        text: 'Outside Entity Type', field: 'outSideEntityTypeId', type: 'lookup', required: true, width: 6, readonly: true,
                        schema: { module: 'outSideEntityType' }
                    },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddOutsideEntityMappings = () => {
    const schema = {
        module: 'outSideEntity',
        title: 'Outside Entity Mapping',
        path: 'outside-entities',
        back: true,
        copy: true,
        copySchema: {
            copyLabel: 'Outside Entity',
            module: 'outSideEntity'
        },
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-tower',
                        parent: 'projectId',
                        field: 'towerId',
                        required: true,
                        text: 'Tower',
                        width: 4,
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
                        width: 4,
                        required: false,
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            path: 'floors'
                        },
                    },
                    {
                        text: 'Outside Entities List', field: 'entitiesList', width: 12, type: 'table-input', required: true,
                        schema: {
                            title: 'Outside Entity',
                            module: 'outSideEntity',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            delete: true,
                            save: false,
                            fields: [
                                {
                                    text: 'Entity Type', field: 'outSideEntityTypeId', type: 'lookup', required: true, width: 6,
                                    schema: { module: 'outSideEntityType' }
                                },
                                { text: 'Count', field: 'noOfEntity', placeholder: 'Entity count here...', type: 'number', width: 6, required: true }
                            ]
                        }
                    },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}
