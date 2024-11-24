import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListNameMaster = () => {

    const schema = {
        module: 'nameMaster',
        title: 'Name Master',
        path: 'namemasters',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'LL Name', field: 'llName', type: 'link', sorting: true, searching: true },
            { text: 'Father Name', field: 'fatherName', type: 'text', sorting: true, searching: true },
            { text: 'Mother Name', field: 'motherName', type: 'text', sorting: true, searching: true },
            { text: 'Mouza', field: 'mouzaName', type: 'text', sorting: true, searching: true },
            { text: 'RS Daag No', field: 'rsDaagNo', type: 'link', sorting: true, searching: true },
            { text: 'LR No', field: 'lrNo', type: 'text', sorting: true, searching: true },
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewNameMaster = () => {
    const schema = {
        module: 'nameMaster',
        title: 'Name Master',
        path: 'namemasters',
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
                    { text: 'LL Name', field: 'llName', type: 'text', required: true, width: 6 },
                    { text: 'Father Name', field: 'fatherName', type: 'text', required: true, width: 6 },
                    { text: 'Is Father Alive', field: 'isFatherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Father Certificate', field: 'fatherCertificate', type: 'doc-upload', required: true, width: 6 },
                    { text: 'Mother Name', field: 'motherName', type: 'text', required: true, width: 6 },
                    { text: 'Is Mother Alive', field: 'isMotherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Mother Certificate', field: 'motherCertificate', type: 'doc-upload', required: true, width: 6 },
                    { text: 'Grand Father Name', field: 'grandFatherName', type: 'text', required: false, width: 6 },
                    { text: 'Is Grand Father Alive', field: 'isGrandFatherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Grand Father Certificate', field: 'grandFatherCertificate', type: 'doc-upload', required: false, width: 6 },
                    { text: 'Grand Mother Name', field: 'grandMotherName', type: 'text', required: false, width: 6 },
                    { text: 'Is Grand Mother Alive', field: 'isGrandMotherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Grand Mother Certificate', field: 'grandMotherCertificate', type: 'doc-upload', required: false, width: 6 },
                    {
                        text: 'Mouza', field: 'mouzaId', width: 6, type: 'lookup-link', required: true,
                        schema: { module: 'mouza', path: 'mouzas' }
                    },
                    {
                        text: 'RS Daag No', field: 'rsDaagId', width: 6, type: 'lookup-link', required: true,
                        schema: { module: 'rsDaag', path: 'rsdaags', nameField: 'rsDaagNo' }
                    },
                    { text: 'LR No', field: 'lrNo', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditNameMaster = () => {
    const schema = {
        module: 'nameMaster',
        title: 'Name Master',
        path: 'namemasters',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'LL Name', field: 'llName', type: 'text', required: true, width: 6 },
                    { text: 'Father Name', field: 'fatherName', type: 'text', required: true, width: 6 },
                    { text: 'Is Father Alive', field: 'isFatherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Father Certificate', field: 'fatherCertificate', type: 'doc-upload', required: true, width: 6 },
                    { text: 'Mother Name', field: 'motherName', type: 'text', required: true, width: 6 },
                    { text: 'Is Mother Alive', field: 'isMotherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Mother Certificate', field: 'motherCertificate', type: 'doc-upload', required: true, width: 6 },
                    { text: 'Grand Father Name', field: 'grandFatherName', type: 'text', required: false, width: 6 },
                    { text: 'Is Grand Father Alive', field: 'isGrandFatherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Grand Father Certificate', field: 'grandFatherCertificate', type: 'doc-upload', required: false, width: 6 },
                    { text: 'Grand Mother Name', field: 'grandMotherName', type: 'text', required: false, width: 6 },
                    { text: 'Is Grand Mother Alive', field: 'isGrandMotherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Grand Mother Certificate', field: 'grandMotherCertificate', type: 'doc-upload', required: false, width: 6 },
                    {
                        text: 'Mouza', field: 'mouzaId', nameField: 'mouzaName', width: 6, type: 'lookup', required: true,
                        schema: { module: 'mouza' }
                    },
                    {
                        text: 'RS Daag No', field: 'rsDaagId', nameField: 'rsDaagNo', width: 6, type: 'lookup',
                        required: true, schema: { module: 'rsDaag', dynamic: true }
                    },
                    { text: 'LR No', field: 'lrNo', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddNameMaster = () => {
    const schema = {
        module: 'nameMaster',
        title: 'Name Master',
        path: 'namemasters',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'LL Name', field: 'llName', placeholder: 'LL Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Father Name', field: 'fatherName', placeholder: 'Father Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Is Father Alive', field: 'isFatherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Father Certificate', field: 'fatherCertificate', type: 'doc-upload', required: true, width: 6 },
                    { text: 'Mother Name', field: 'motherName', placeholder: 'Mother Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Is Mother Alive', field: 'isMotherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Mother Certificate', field: 'motherCertificate', type: 'doc-upload', required: true, width: 6 },
                    { text: 'Grand Father Name', field: 'grandFatherName', placeholder: 'Grand Father Name here...', type: 'text', required: false, width: 6 },
                    { text: 'Is Grand Father Alive', field: 'isGrandFatherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Grand Father Certificate', field: 'grandFatherCertificate', type: 'doc-upload', required: false, width: 6 },
                    { text: 'Grand Mother Name', field: 'grandMotherName', placeholder: 'Grand Mother Name here...', type: 'text', required: false, width: 6 },
                    { text: 'Is Grand Mother Alive', field: 'isGrandMotherAlive', type: 'radio', required: false, width: 6 },
                    { text: 'Grand Mother Certificate', field: 'grandMotherCertificate', type: 'doc-upload', required: false, width: 6 },
                    {
                        text: 'Mouza', field: 'mouzaId', nameField: 'mouzaName', width: 6, type: 'lookup', required: true,
                        schema: { module: 'mouza' }
                    },
                    {
                        text: 'RS Daag No', field: 'rsDaagId', nameField: 'rsDaagNo', width: 6, type: 'lookup',
                        required: true, schema: { module: 'rsDaag', dynamic: true }
                    },
                    { text: 'LR No', field: 'lrNo', placeholder: 'LR No here...', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}