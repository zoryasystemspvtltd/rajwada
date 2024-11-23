import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListRsDaag = () => {

    const schema = {
        module: 'rsDaag',
        title: 'RS Master',
        path: 'rsdaags',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'RS Daag No', field: 'rsDaagNo', type: 'link', sorting: true, searching: true },
            { text: 'Mouza', field: 'mouzaName', type: 'text', sorting: true, searching: true },
            { text: 'Area', field: 'area', type: 'text', sorting: true, searching: true },
            { text: 'LR No', field: 'lrNo', type: 'text', sorting: true, searching: true },
            { text: 'Concern Area', field: 'concernArea', type: 'text', sorting: false,}
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewRsDaag = () => {
    const schema = {
        module: 'rsDaag',
        title: 'RS Master',
        path: 'rsdaags',
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
                    { text: 'RS Daag No', field: 'rsDaagNo', type: 'text', required: true, width: 6 },
                    {
                        text: 'Mouza', field: 'mouzaId', width: 6, type: 'lookup-link', required: true,
                        schema: { module: 'mouza', path: 'mouzas' }
                    },
                    { text: 'Area', field: 'area', type: 'text', required: false, width: 6 },                   
                    { text: 'LR No', field: 'lrNo', type: 'text', required: false, width: 6 },
                    { text: 'RS Khatian', field: 'rsKhatian', type: 'textarea', required: false, width: 6 },
                    { text: 'LR Khatian', field: 'lrKhatian', type: 'textarea', required: false, width: 6 },
                    { text: 'RS Parcha', field: 'rsParcha', type: 'doc-upload', required: false, width: 6 },
                    { text: 'Concern Area', field: 'concernArea', type: 'text', required: false, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditRsDaag = () => {
    const schema = {
        module: 'rsDaag',
        title: 'RS Master',
        path: 'rsdaags',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'RS Daag No', field: 'rsDaagNo', type: 'text', required: true, width: 6 },
                    {
                        text: 'Mouza', field: 'mouzaId', nameField: 'mouzaName', width: 6, type: 'lookup', required: true,
                        schema: { module: 'mouza' }
                    },
                    { text: 'Area', field: 'area', type: 'text', required: false, width: 6 },                    
                    { text: 'LR No', field: 'lrNo', type: 'text', required: false, width: 6 },
                    { text: 'RS Khatian', field: 'rsKhatian', type: 'textarea', required: false, width: 6 },
                    { text: 'LR Khatian', field: 'lrKhatian', type: 'textarea', required: false, width: 6 },
                    { text: 'RS Parcha', field: 'rsParcha', type: 'doc-upload', required: false, width: 6 },
                    { text: 'Concern Area', field: 'concernArea', type: 'number', required: false, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddRsDaag = () => {
    const schema = {
        module: 'rsDaag',
        title: 'RS Master',
        path: 'rsdaags',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'RS Daag No', field: 'rsDaagNo', placeholder: 'RS Daag No here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Mouza', field: 'mouzaId', nameField: 'mouzaName', width: 6, type: 'lookup', required: true,
                        schema: { module: 'mouza' }
                    },
                    { text: 'Area', field: 'area', placeholder: 'Area here...', type: 'text', required: false, width: 6 },                    
                    { text: 'LR No', field: 'lrNo', placeholder: 'LR No here...', type: 'text', required: false, width: 6 },
                    { text: 'RS Khatian', field: 'rsKhatian', placeholder: 'RS Khatian here...', type: 'textarea', required: false, width: 6 },
                    { text: 'LR Khatian', field: 'lrKhatian', placeholder: 'LR Khatian here...', type: 'textarea', required: false, width: 6 },
                    { text: 'RS Parcha', field: 'rsParcha', type: 'doc-upload', required: false, width: 6 },
                    { text: 'Concern Area', field: 'concernArea', placeholder: 'Concern Area here...', type: 'number', required: false, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}