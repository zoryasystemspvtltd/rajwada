import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListProject = () => {

    const schema = {
        module: 'project',
        title: 'Project',
        path: 'projects',
        showBreadcrumbs: true,
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Company', field: 'companyName', type: 'text', sorting: true, searching: true },
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Alias', field: 'code', type: 'link', sorting: true, searching: true },
            { text: 'Start Fin Year', field: 'startFinYear', type: 'text', sorting: false, searching: false },
            { text: 'Planned Start Date', field: 'planStartDate', type: 'date', sorting: false, searching: false },
            { text: 'Planned End Date', field: 'planEndDate', type: 'date', sorting: false, searching: false }
        ]
    }


    return (<IUIList schema={schema} />)
}

export const ViewProject = () => {
    const schema = {
        module: 'project',
        title: 'Project',
        path: 'projects',
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
                    { text: 'Name', field: 'name', width: 4, type: 'label' },
                    { text: 'Alias', field: 'code', width: 4, type: 'label' },
                    { text: 'Start Fin Year', field: 'startFinYear', width: 4, type: 'label' },
                    { text: 'Planned Start Date', field: 'planStartDate', width: 4, type: 'label-date' },
                    { text: 'Planned End Date', field: 'planEndDate', width: 4, type: 'label-date' },
                    { text: 'Completion Certificate Date', field: 'completionCertificateDate', width: 4, type: 'label-date' },
                    {
                        text: 'Belongs To', field: 'companyId', width: 4, type: 'lookup-link',
                        schema: { module: 'company', path: 'companies' }
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
                    { text: 'Contact Name', field: 'contactName', width: 4, type: 'label' }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditProject = () => {
    const schema = {
        module: 'project',
        title: 'Project',
        path: 'projects',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    { text: 'Start Fin Year', field: 'startFinYear', width: 4, type: 'text', required: true },
                    { text: 'Planned Start Date', field: 'planStartDate', width: 4, type: 'date', required: true },
                    { text: 'Planned End Date', field: 'planEndDate', width: 4, type: 'date', required: false },
                    { text: 'Completion Certificate Date', field: 'completionCertificateDate', width: 4, type: 'date', required: false },
                    {
                        text: 'Belongs To', field: 'companyId', nameField: 'companyName', width: 4, type: 'lookup', required: false,
                        schema: { module: 'company' }
                    },
                    { text: 'Zone', field: 'zone', placeholder: 'Zone here...', width: 4, type: 'text', required: false },
                    { text: 'Address 1', field: 'address1', placeholder: 'Address 1 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 2', field: 'address2', placeholder: 'Address 2 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 3', field: 'address3', placeholder: 'Address 3 here...', width: 4, type: 'text', required: false },
                    { text: 'Country', field: 'country', placeholder: 'Country here...', width: 4, type: 'text', required: false },
                    { text: 'State', field: 'state', placeholder: 'State here...', width: 4, type: 'text', required: false },
                    { text: 'City', field: 'city', placeholder: 'City here...', width: 4, type: 'text', required: false },
                    { text: 'PIN', field: 'pinCode', placeholder: 'PIN here...', width: 4, type: 'number', required: false },
                    { text: 'Latitude', field: 'latitude', placeholder: 'Latitude here...', width: 4, type: 'number', required: false },
                    { text: 'Longitude', field: 'longitude', placeholder: 'Longitude here...', width: 4, type: 'number', required: false },
                    { text: 'Phone', field: 'phoneNumber', placeholder: 'Phone here...', width: 4, type: 'phone', required: false },
                    { text: 'Contact Name', field: 'contactName', placeholder: 'Contact Name here...', width: 4, type: 'text', required: false }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddProject = () => {
    const schema = {
        module: 'project',
        title: 'Project',
        path: 'projects',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    { text: 'Start Fin Year', field: 'startFinYear', width: 4, type: 'text', required: true },
                    { text: 'Planned Start Date', field: 'planStartDate', width: 4, type: 'date', required: true },
                    { text: 'Planned End Date', field: 'planEndDate', width: 4, type: 'date', required: false },
                    { text: 'Completion Certificate Date', field: 'completionCertificateDate', width: 4, type: 'date', required: false },
                    {
                        text: 'Belongs To', field: 'companyId', nameField: 'companyName', width: 4, type: 'lookup', required: false,
                        schema: { module: 'company' }
                    },
                    { text: 'Zone', field: 'zone', placeholder: 'Zone here...', width: 4, type: 'text', required: false },
                    { text: 'Address 1', field: 'address1', placeholder: 'Address 1 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 2', field: 'address2', placeholder: 'Address 2 here...', width: 4, type: 'text', required: false },
                    { text: 'Address 3', field: 'address3', placeholder: 'Address 3 here...', width: 4, type: 'text', required: false },
                    { text: 'Country', field: 'country', placeholder: 'Country here...', width: 4, type: 'text', required: false },
                    { text: 'State', field: 'state', placeholder: 'State here...', width: 4, type: 'text', required: false },
                    { text: 'City', field: 'city', placeholder: 'City here...', width: 4, type: 'text', required: false },
                    { text: 'PIN', field: 'pinCode', placeholder: 'PIN here...', width: 4, type: 'number', required: false },
                    { text: 'Latitude', field: 'latitude', placeholder: 'Latitude here...', width: 4, type: 'number', required: false },
                    { text: 'Longitude', field: 'longitude', placeholder: 'Longitude here...', width: 4, type: 'number', required: false },
                    { text: 'Phone', field: 'phoneNumber', placeholder: 'Phone here...', width: 4, type: 'phone', required: false },
                    { text: 'Contact Name', field: 'contactName', placeholder: 'Contact Name here...', width: 4, type: 'text', required: false }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}