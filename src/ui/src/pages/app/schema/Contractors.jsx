import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"


export const ListContractor = () => {


    const schema = {
        module: 'contractor',
        title: 'Contractor Master',
        path: 'contractors',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Alias', field: 'code', type: 'text', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: true, searching: true },
            { text: 'GST No', field: 'gstNo', type: 'text', sorting: false, },
            { text: 'SPOC', field: 'spoc', type: 'text', sorting: false, }
        ]
    }


    return (<IUIList schema={schema} />)
}


export const ViewContractor = () => {
    const schema = {
        module: 'contractor',
        title: 'Contractor Master',
        path: 'contractors',
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
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', width: 4, type: 'label' },
                    { text: 'Alias', field: 'code', width: 4, type: 'label' },
                    { text: 'Type', field: 'type', width: 4, type: 'label' },
                    { text: 'Address', field: 'address', width: 4, type: 'label' },
                    { text: 'Phone', field: 'phoneNumber', width: 4, type: 'label' },
                    { text: 'PAN No', field: 'panNo', width: 4, type: 'label' },
                    { text: 'GST No', field: 'gstNo', width: 4, type: 'label' },
                    { text: 'Licence No', field: 'licenceNo', width: 4, type: 'label' },
                    { text: 'SPOC', field: 'spoc', width: 4, type: 'label' },
                    { text: 'Effective Start Date', field: 'effectiveStartDate', width: 4, type: 'label-date', },
                    { text: 'Effective End Date', field: 'effectiveEndDate', width: 4, type: 'label-date', },


                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const EditContractor = () => {
    const schema = {
        module: 'contractor',
        title: 'Contractor Master',
        path: 'contractors',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Contractor Type here...', type: 'lookup', required: false, width: 4,
                        schema: {
                            items: [
                                { name: 'Contractor' },
                                { name: 'Developer' }
                            ]
                        }
                    },
                    { text: 'Address 1', field: 'address', placeholder: 'Address here...', width: 4, type: 'textarea', required: false },
                    { text: 'Phone', field: 'phoneNumber', placeholder: 'Phone here...', width: 4, type: 'phone', required: false },
                    { text: 'PAN', field: 'panNo', placeholder: 'PAN here...', width: 4, type: 'text', required: false },
                    { text: 'GST', field: 'gstNo', placeholder: 'GST here...', width: 4, type: 'text', required: false },
                    { text: 'Licence No', field: 'licenceNo', placeholder: 'Licence No here...', width: 4, type: 'text', required: false },
                    { text: 'SPOC', field: 'spoc', placeholder: 'SPOC here...', width: 4, type: 'text', required: false },
                    { text: 'Effective Start Date', field: 'effectiveStartDate', placeholder: 'Effective Start Date here...', width: 4, type: 'date', required: false },
                    { text: 'Effective End Date', field: 'effectiveEndDate', placeholder: 'Effective End Date here...', width: 4, type: 'date', required: false },


                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const AddContractor = () => {
    const schema = {
        module: 'contractor',
        title: 'Contractor Master',
        path: 'contractors',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Contractor Type here...', type: 'lookup', required: false, width: 4,
                        schema: {
                            items: [
                                { name: 'Contractor' },
                                { name: 'Developer' }
                            ]
                        }
                    },
                    { text: 'Address 1', field: 'address', placeholder: 'Address here...', width: 4, type: 'textarea', required: false },
                    { text: 'Phone', field: 'phoneNumber', placeholder: 'Phone here...', width: 4, type: 'phone', required: false },
                    { text: 'PAN', field: 'panNo', placeholder: 'PAN here...', width: 4, type: 'text', required: false },
                    { text: 'GST', field: 'gstNo', placeholder: 'GST here...', width: 4, type: 'text', required: false },
                    { text: 'Licence No', field: 'licenceNo', placeholder: 'Licence No here...', width: 4, type: 'text', required: false },
                    { text: 'SPOC', field: 'spoc', placeholder: 'SPOC here...', width: 4, type: 'text', required: false },
                    { text: 'Effective Start Date', field: 'effectiveStartDate', placeholder: 'Effective Start Date here...', width: 4, type: 'date', required: false },
                    { text: 'Effective End Date', field: 'effectiveEndDate', placeholder: 'Effective End Date here...', width: 4, type: 'date', required: false },
                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}
