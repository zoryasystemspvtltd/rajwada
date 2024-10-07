import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListCompany = () => {

    const schema = {
        module: 'company',
        title: 'Company',
        path: 'companies',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Alias', field: 'code', type: 'text', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false }
        ]
    }


    return (<IUIList schema={schema} />)
}

export const ViewCompany = () => {
    const schema = {
        module: 'company',
        title: 'Company',
        path: 'companies',
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
                    {
                        text: 'Type', field: 'type', type: 'lookup-link', width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Enterprise' },
                                { name: 'Company' },
                                { name: 'Business Unit' }
                            ],
                            path: '#'
                        }
                    },
                    {
                        text: 'Parent Company', field: 'belongTo', width: 4, type: 'lookup-link',
                        schema: { module: 'company', path: 'companies', }
                    },
                    { text: 'Zone', field: 'zone', width: 4, type: 'label' },
                    { text: 'Address 1', field: 'address1', width: 4, type: 'label' },
                    { text: 'Address 2', field: 'address2', width: 4, type: 'label' },
                    { text: 'Address 3', field: 'address3', width: 4, type: 'label' },
                    { text: 'Country', field: 'country', width: 4, type: 'label' },
                    { text: 'State', field: 'state', width: 4, type: 'label' },
                    { text: 'City', field: 'city', width: 4, type: 'label' },
                    { text: 'PIN', field: 'pinCode', width: 4, type: 'label' },
                    { text: 'Latitude', field: 'latitude', width: 4, type: 'label' },
                    { text: 'Longitude', field: 'longitude', width: 4, type: 'label' },
                    { text: 'Phone', field: 'phoneNumber', width: 4, type: 'label' },
                    { text: 'Email', field: 'email', width: 4, type: 'label' },
                    { text: 'Website', field: 'website', width: 4, type: 'label' },
                    { text: 'Contact Name', field: 'contactName', width: 4, type: 'label' },
                    { text: 'Logo', field: 'logo', width: 4, type: 'label' },
                    { text: 'Currency', field: 'currency', width: 4, type: 'label' },
                    { text: 'GST', field: 'gSTNo', width: 4, type: 'label' },
                    { text: 'PAN', field: 'panNo', width: 4, type: 'label' },
                    { text: 'TIN', field: 'tinNo', width: 4, type: 'label' },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditCompany = () => {
    const schema = {
        module: 'company',
        title: 'Company',
        path: 'companies',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Enterprise' },
                                { name: 'Company' },
                                { name: 'Business Unit' }
                            ]
                        }
                    },
                    {
                        text: 'Parent Company', field: 'belongTo', width: 4, type: 'lookup', required: false,
                        schema: { module: 'company' }
                    },
                    { text: 'Zone', field: 'zone', placeholder: 'Zone here...', width: 4, type: 'text', required: false },
                    { text: 'Address 1', field: 'address1', placeholder: 'Address1 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 2', field: 'address2', placeholder: 'Address2 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 3', field: 'address3', placeholder: 'Address3 here...', width: 4, type: 'text', required: false },
                    { text: 'Country', field: 'country', placeholder: 'Country here...', width: 4, type: 'text', required: false },
                    { text: 'State', field: 'state', placeholder: 'State here...', width: 4, type: 'text', required: false },
                    { text: 'City', field: 'city', placeholder: 'City here...', width: 4, type: 'text', required: false },
                    { text: 'PIN', field: 'pinCode', placeholder: 'PIN here...', width: 4, type: 'number', required: false },
                    { text: 'Latitude', field: 'latitude', placeholder: 'Latitude here...', width: 4, type: 'number', required: false },
                    { text: 'Longitude', field: 'longitude', placeholder: 'Longitude here...', width: 4, type: 'number', required: false },
                    { text: 'Phone', field: 'phoneNumber', placeholder: 'Phone here...', width: 4, type: 'phone', required: false },
                    { text: 'Email', field: 'email', placeholder: 'Email here...', width: 4, type: 'email', required: false },
                    { text: 'Website', field: 'website', placeholder: 'Website here...', width: 4, type: 'text', required: false },
                    { text: 'Contact Name', field: 'contactName', placeholder: 'Contact Name here...', width: 4, type: 'text', required: false },
                    { text: 'Logo', field: 'logo', placeholder: 'Logo here...', width: 4, type: 'text', required: false },
                    //{ text: 'QrCode', field: 'qrCode', placeholder: 'QrCode here...', width: 4, type: 'text', required: false },
                    { text: 'Currency', field: 'currency', placeholder: 'Currency here...', width: 4, type: 'text', required: false },
                    { text: 'GST', field: 'gSTNo', placeholder: 'GST here...', width: 4, type: 'text', required: false },
                    { text: 'PAN', field: 'panNo', placeholder: 'PAN here...', width: 4, type: 'text', required: false },
                    { text: 'TIN', field: 'tinNo', placeholder: 'TIN here...', width: 4, type: 'text', required: false },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddCompany = () => {
    const schema = {
        module: 'company',
        title: 'Company',
        path: 'companies',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Enterprise' },
                                { name: 'Company' },
                                { name: 'Business Unit' }
                            ]
                        }
                    },
                    {
                        text: 'Parent Company', field: 'belongTo', width: 4, type: 'lookup', required: false,
                        schema: { module: 'company' }
                    },
                    { text: 'Zone', field: 'zone', placeholder: 'Zone here...', width: 4, type: 'text', required: false },
                    { text: 'Address 1', field: 'address1', placeholder: 'Address1 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 2', field: 'address2', placeholder: 'Address2 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 3', field: 'address3', placeholder: 'Address3 here...', width: 4, type: 'text', required: false },
                    { text: 'Country', field: 'country', placeholder: 'Country here...', width: 4, type: 'text', required: false },
                    { text: 'State', field: 'state', placeholder: 'State here...', width: 4, type: 'text', required: false },
                    { text: 'City', field: 'city', placeholder: 'City here...', width: 4, type: 'text', required: false },
                    { text: 'PIN', field: 'pinCode', placeholder: 'PIN here...', width: 4, type: 'number', required: false },
                    { text: 'Latitude', field: 'latitude', placeholder: 'Latitude here...', width: 4, type: 'number', required: false },
                    { text: 'Longitude', field: 'longitude', placeholder: 'Longitude here...', width: 4, type: 'number', required: false },
                    { text: 'Phone', field: 'phoneNumber', placeholder: 'Phone here...', width: 4, type: 'phone', required: false },
                    { text: 'Email', field: 'email', placeholder: 'Email here...', width: 4, type: 'email', required: false },
                    { text: 'Website', field: 'website', placeholder: 'Website here...', width: 4, type: 'text', required: false },
                    { text: 'Contact Name', field: 'contactName', placeholder: 'Contact Name here...', width: 4, type: 'text', required: false },
                    { text: 'Logo', field: 'logo', placeholder: 'Logo here...', width: 4, type: 'text', required: false },
                    //{ text: 'QrCode', field: 'qrCode', placeholder: 'QrCode here...', width: 4, type: 'text', required: false },
                    { text: 'Currency', field: 'currency', placeholder: 'Currency here...', width: 4, type: 'text', required: false },
                    { text: 'GST', field: 'gSTNo', placeholder: 'GST here...', width: 4, type: 'text', required: false },
                    { text: 'PAN', field: 'panNo', placeholder: 'PAN here...', width: 4, type: 'text', required: false },
                    { text: 'TIN', field: 'tinNo', placeholder: 'TIN here...', width: 4, type: 'text', required: false },
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}