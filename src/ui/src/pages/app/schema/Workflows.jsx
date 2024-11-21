import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListWorkflow = () => {

    const schema = {
        module: 'workflow',
        title: 'Dependency Label Setting',
        path: 'labelsettings',
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
        title: 'Dependency Label Setting',
        path: 'labelsettings',
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
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', type: 'label', width: 4 },
                    { text: 'Alias', field: 'code', type: 'label', width: 4 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', width: 4,
                        schema: { module: 'project' }
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
        title: 'Dependency Label Setting',
        path: 'labelsettings',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 4 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 4 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'project' }
                    },
                    { text: 'Setting', field: 'data', type: 'ilab-flowchart', width: 12 }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddWorkflow = () => {
    const schema = {
        module: 'workflow',
        title: 'Dependency Label Setting',
        path: 'labelsettings',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 4 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 4 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 4,
                        schema: { module: 'project' }
                    },
                    { text: 'Setting', field: 'data', type: 'ilab-flowchart', width: 12 }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}