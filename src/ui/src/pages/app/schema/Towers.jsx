import IUIList from "../../common/IUIList";
import IUIListFilter from "../../common/IUIListFilter";
import IUIListRelation from "../../common/IUIListRelation";
import IUIPage from "../../common/IUIPage"

export const ListTower = () => {

    const schema = {
        module: 'plan',
        title: 'Tower',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
        ]
    }


    return (<IUIListFilter schema={schema} filter='tower' />)
}

export const ViewTower = () => {
    const schema = {
        module: 'plan',
        title: 'Tower',
        path: 'towers',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        deleting: true,
        assign: true,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: false, width: 6,
                        schema: { module: 'project' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditTower = () => {
    const schema = {
        module: 'plan',
        title: 'Tower',
        path: 'towers',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: false, width: 6,
                        schema: { module: 'project' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
            { field: 'type', type: 'hidden-filter', value: "tower" }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddTower = () => {
    const schema = {
        module: 'plan',
        title: 'Tower',
        path: 'towers',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: false, width: 6,
                        schema: { module: 'project' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
            { field: 'type', type: 'hidden-filter', value: "tower" }
        ]
    }

    return (<IUIPage schema={schema} />)
}