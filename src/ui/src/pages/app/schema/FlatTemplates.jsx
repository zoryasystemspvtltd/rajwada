import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage";
import { useParams } from "react-router-dom";


export const ListFlatTemplate = () => {
    const schema = {
        module: 'flatTemplate',
        title: 'Flat Template',
        path: 'flat-templates',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: true, searching: true },
        ]
    }


    return (<IUIList schema={schema} />)
}


export const ViewFlatTemplate = () => {
    const { id } = useParams();

    const schema = {
        module: 'flatTemplate',
        title: 'Flat Template',
        path: 'flat-templates',
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
                    { text: 'Description', field: 'description', type: 'label', width: 6 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-mapping',
                        schema: {
                            title: 'Rooms', // title of child
                            module: 'flatTemplateDetails', // module for child
                            relationKey: "flatTemplateId", // foreign key field in child schema
                            parentPath: 'flat-templates', //
                            childPath: 'flat-template-mappings',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: false,
                            fields: [
                                {
                                    text: 'Type', field: 'roomId', type: 'lookup', required: true, width: 6,
                                    schema: { module: 'room' }
                                },
                                { text: 'Count', field: 'roomCount', type: 'text', width: 6, required: true },
                            ]
                        },
                    }
                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const EditFlatTemplate = () => {
    const schema = {
        module: 'flatTemplate',
        title: 'Flat Template',
        path: 'flat-templates',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'text', required: true, width: 6 },
                ]
            },
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const AddFlatTemplate = () => {
    const schema = {
        module: 'flatTemplate',
        title: 'Flat Template',
        path: 'flat-templates',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description', type: 'text', required: true, width: 6 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Room Details', field: 'templateDetails', width: 12, type: 'table-input', required: true,
                        schema: {
                            title: 'Rooms',
                            module: 'flatTemplateDetails',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            delete: true,
                            save: false,
                            fields: [
                                {
                                    text: 'Type', field: 'roomId', type: 'lookup', required: true, width: 6,
                                    schema: { module: 'room' }
                                },
                                { text: 'Count', field: 'roomCount', placeholder: 'Room count here...', type: 'number', width: 6, required: true }
                            ]
                        }
                    },
                ]
            },
        ]
    }


    return (<IUIPage schema={schema} />)
}
