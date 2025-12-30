import { useParams } from "react-router-dom";
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
            {
                text: 'Parent', field: 'parentId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'dependency' }
            },
            {
                text: 'Belongs To', field: 'belongsTo', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'dependency' }
            }
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
                    {
                        text: 'Parent', field: 'parentId', width: 4, type: 'lookup-link',
                        schema: { module: 'dependency', path: 'activities' }
                    },
                    {
                        text: 'Belongs To', field: 'belongsTo', width: 4, type: 'lookup-link',
                        schema: { module: 'dependency', path: 'activities' }
                    },
                    { text: 'Expected Duration', field: 'expectedDuration', type: 'text', required: true, width: 6 },
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', required: true,
                        schema: {
                            title: 'Item',
                            module: 'dependency',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            assign: true, // for assign accordion
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
                    }
                ]
            },
        ]
    }
    return (<IUIPage schema={schema} />)
}


export const EditWorkItem = () => {
    const { id } = useParams();

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
                        text: 'Parent', field: 'parentId', type: 'lookup-filter-null', required: false, width: 6,
                        schema: {
                            module: 'dependency',
                            selfId: id,
                            fieldsToFilter: [],
                            matchAll: false,
                            excludeSelf: true
                        }
                    },
                    {
                        text: 'Belongs To', field: 'belongsTo', type: 'lookup-filter-null', required: false, width: 6,
                        schema: {
                            module: 'dependency',
                            selfId: id,
                            fieldsToFilter: ["parentId", "belongsTo"],
                            matchAll: true,
                            excludeSelf: true
                        }
                    },
                    { text: 'Expected Duration', field: 'expectedDuration', type: 'number', required: true, width: 6 },
                    {
                        type: "area", width: 12
                        , fields: [
                            {
                                text: 'Item List', field: 'items', width: 12, type: 'table-input', required: true,
                                schema: {
                                    title: 'Item',
                                    module: 'activity',
                                    paging: true,
                                    searching: true,
                                    editing: true,
                                    adding: true,
                                    assign: true, // for assign accordion
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
                    { text: 'Expected Duration', field: 'expectedDuration', type: 'number', required: true, width: 6 },
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', required: true,
                        schema: {
                            title: 'Item',
                            module: 'dependency',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            assign: true, // for assign accordion
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
                    }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}
