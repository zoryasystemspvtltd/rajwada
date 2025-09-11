import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"


export const ListParkingType = () => {
    const schema = {
        module: 'parkingType',
        title: 'Parking Type',
        path: 'parking-types',
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


export const ViewParkingType = () => {
    const schema = {
        module: 'parkingType',
        title: 'Parking Type',
        path: 'parking-types',
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
                    { text: 'Alias', field: 'code', type: 'label', width: 6 },
                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const EditParkingType = () => {
    const schema = {
        module: 'parkingType',
        title: 'Parking Type',
        path: 'parking-types',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}


export const AddParkingType = () => {
    const schema = {
        module: 'parkingType',
        title: 'Parking Type',
        path: 'parking-types',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}
