import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListRoom = () => {

    const schema = {
        module: 'room',
        title: 'Room',
        path: 'rooms',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Alias', field: 'code', type: 'text', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: true, searching: true },
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewRoom = () => {
    const schema = {
        module: 'room',
        title: 'Room',
        path: 'rooms',
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
                    { text: 'Description', field: 'description', type: 'label', width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditRoom = () => {
    const schema = {
        module: 'room',
        title: 'Room',
        path: 'rooms',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description',placeholder: 'Description here...',  type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddRoom = () => {
    const schema = {
        module: 'room',
        title: 'Room',
        path: 'rooms',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name',placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Alias', field: 'code', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description',placeholder: 'Description here...', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}