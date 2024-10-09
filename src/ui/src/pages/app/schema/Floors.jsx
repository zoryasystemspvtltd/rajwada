import IUIList from "../../common/IUIList";
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

export const ViewFloor = () => {
    const schema = {
        module: 'plan',
        title: 'Floor',
        path: 'floors',
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
                        text: 'Tower', field: 'parentId', type: 'lookup-filter', required: false, width: 6,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditFloor = () => {
    const schema = {
        module: 'plan',
        title: 'Floor',
        path: 'floors',
        back: false,
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
            { field: 'type', type: 'hidden-filter', value: "floor" }
        ]
    }

    return (<IUIPage schema={schema} />)
}