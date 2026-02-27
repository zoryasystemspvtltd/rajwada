import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListFinancialYear = () => {

    const schema = {
        module: 'financialYear',
        title: 'Financial Year',
        path: 'financialyears',
        showBreadcrumbs: true,
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Code', field: 'code', type: 'text', sorting: true, searching: true },
            { text: 'Financial Year', field: 'finYear', type: 'text', sorting: false, searching: false },
            { text: 'Start Date', field: 'startDate', type: 'date', sorting: false, searching: false },
            { text: 'End Date', field: 'endDate', type: 'date', sorting: false, searching: false }
        ]
    }


    return (<IUIList schema={schema} />)
}

export const ViewFinancialYear = () => {
    const schema = {
        module: 'financialYear',
        title: 'Financial Year',
        path: 'financialyears',
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
                    { text: 'Code', field: 'code', width: 4, type: 'label' },
                    { text: 'Financial Year', field: 'finYear', width: 4, type: 'label' },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'label-date' },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'label-date' },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditFinancialYear = () => {
    const schema = {
        module: 'financialYear',
        title: 'Financial Year',
        path: 'financialyears',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Code', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    { text: 'Financial Year', field: 'finYear', width: 4, type: 'text', required: true },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'date', required: true },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'date', required: true }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddFinancialYear = () => {
    const schema = {
        module: 'financialYear',
        title: 'Financial Year',
        path: 'financialyears',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Code', field: 'code', placeholder: 'Code here...', width: 4, type: 'text', required: true },
                    { text: 'Financial Year', field: 'finYear', width: 4, type: 'text', required: true },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'date', required: true },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'date', required: true }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}