import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListOutsideEntityType = () => {
    const schema = {
        module: 'outSideEntityType',
        title: 'Outside Entity Type',
        path: 'outside-entity-types',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Alias', field: 'code', type: 'text', sorting: true, searching: true },
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewOutsideEntityType = () => {
    const schema = {
        module: 'outSideEntityType',
        title: 'Outside Entity Type',
        path: 'outside-entity-types',
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
                    { text: 'Name', field: 'name', type: 'label', width: 6 },
                    { text: 'Alias', field: 'code', type: 'label', width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditOutsideEntityType = () => {
    const schema = {
        module: 'outSideEntityType',
        title: 'Outside Entity Type',
        path: 'outside-entity-types',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddOutsideEntityType = () => {
    const schema = {
        module: 'outSideEntityType',
        title: 'Outside Entity Type',
        path: 'outside-entity-types',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}
