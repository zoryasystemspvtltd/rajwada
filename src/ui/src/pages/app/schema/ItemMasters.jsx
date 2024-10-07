import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListItemMaster = () => {

    const schema = {
        module: 'asset',
        title: 'Item Master',
        path: 'item-masters',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Alias', field: 'code', type: 'text', sorting: true, searching: true },
            { text: 'Group', field: 'groupId', type: 'lookup', schema: { module: 'assetGroup' }, sorting: true, searching: true },
            { text: 'UOM', field: 'uomId', type: 'lookup', schema: { module: 'uom' }, sorting: true, searching: true },
            { text: 'Type', field: 'typeId', type: 'lookup', schema: { module: 'assetType' }, sorting: true, searching: true },
        ]
    }


    return (<IUIList schema={schema} />)
}

export const ViewItemMaster = () => {
    const schema = {
        module: 'asset',
        title: 'Item Master',
        path: 'item-masters',
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
                    {
                        text: 'Group', field: 'groupId', type: 'lookup-link', required: true, width: 6,
                        schema: { module: 'assetGroup', path: 'item-groups' }
                    },
                    {
                        text: 'Type', field: 'typeId', type: 'lookup-link', required: true, width: 6,
                        schema: { module: 'assetType', path: 'item-types' }
                    },
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'label', required: true, width: 6 },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', type: 'label', required: true, width: 6 },
                    {
                        text: 'UOM', field: 'uomId', type: 'lookup-link', required: true, width: 6,
                        schema: { module: 'uom', path: 'uoms' }
                    },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditItemMaster = () => {
    const schema = {
        module: 'asset',
        title: 'Item Master',
        path: 'item-masters',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Group', field: 'groupId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'assetGroup' }
                    },
                    {
                        text: 'Type', field: 'typeId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'assetType' }
                    },
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'uom' }
                    },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddItemMaster = () => {
    const schema = {
        module: 'asset',
        title: 'Item Master',
        path: 'item-masters',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Group', field: 'groupId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'assetGroup' }
                    },
                    {
                        text: 'Type', field: 'typeId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'assetType' }
                    },
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'uom' }
                    },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}