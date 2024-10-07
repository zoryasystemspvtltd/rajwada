import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListItemGroup = () => {

    const schema = {
        module: 'assetGroup',
        title: 'Item Group',
        path: 'item-groups',
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

export const ViewItemGroup = () => {
    const schema = {
        module: 'assetGroup',
        title: 'Item Group',
        path: 'item-groups',
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
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', type: 'label', width: 6 },
                    { text: 'Alias', field: 'code', type: 'label', width: 6 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-relation',
                        schema: {
                            module: 'asset',
                            relationKey: "GroupId",
                            title: 'Related Items',
                            path: 'item-masters',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,

                            fields: [
                                { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
                                { text: 'Alias', field: 'code', type: 'text', sorting: false, searching: false },
                                { text: 'Type', field: 'itemType', type: 'text', sorting: true, searching: true }
                            ]
                        },
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditItemGroup = () => {
    const schema = {
        module: 'assetGroup',
        title: 'Item Group',
        path: 'item-groups',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 6 },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddItemGroup = () => {
    const schema = {
        module: 'assetGroup',
        title: 'Item Group',
        path: 'item-groups',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 6 },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}