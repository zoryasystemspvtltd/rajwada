import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage";


export const ListWorkItem = () => {

    const schema = {
        module: 'dependency',
        title: 'Activity',
        path: 'activities',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Code', field: 'code', type: 'text', sorting: false, searching: false },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },
        ]
    }
    return (<IUIList schema={schema} />)
}


export const ViewWorkItem = () => {
    const schema = {
        module: 'dependency',
        title: 'Activity',
        path: 'activities',
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
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Code', field: 'code', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'text', required: true, width: 6 },
                ]
            },
        ]
    }
    return (<IUIPage schema={schema} />)
}


export const EditWorkItem = () => {
    const schema = {
        module: 'dependency',
        title: 'Activity',
        path: 'activities',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Code', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description', type: 'text', required: true, width: 6 },
                    {
                        text: 'Parent', field: 'parentId', type: 'lookup', required: false, width: 6,
                        schema: { module: 'dependency' }
                    },
                    {
                        text: 'Belongs To', field: 'belongsTo', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'dependency', filter: 'parent', value: null }
                    }
                ]
            },
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const AddWorkItem = () => {
    const schema = {
        module: 'dependency',
        title: 'Activity',
        path: 'activities',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Code', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description', type: 'text', required: true, width: 6 },
                    {
                        text: 'Parent', field: 'parentId', type: 'lookup', required: false, width: 6,
                        schema: { module: 'dependency' }
                    },
                    {
                        text: 'Belongs To', field: 'belongsTo', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'dependency', filter: 'parent', value: null }
                    },
                ]
            },
        ]
    }


    return (<IUIPage schema={schema} />)
}
