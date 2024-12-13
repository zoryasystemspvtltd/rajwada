import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListMouza = () => {

    const schema = {
        module: 'mouza',
        title: 'Mouza',
        path: 'mouzas',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Gl No', field: 'gl_No', type: 'text', sorting: true, searching: true },
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewMouza = () => {
    const schema = {
        module: 'mouza',
        title: 'Mouza',
        path: 'mouzas',
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
                    { text: 'Name', field: 'name', type: 'text', required: true, width: 6 },
                    { text: 'Gl No', field: 'gl_No', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditMouza = () => {
    const schema = {
        module: 'mouza',
        title: 'Mouza',
        path: 'mouzas',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'GL No', field: 'gl_No', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddMouza = () => {
    const schema = {
        module: 'mouza',
        title: 'Mouza',
        path: 'mouzas',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Gl No', field: 'gl_No', type: 'text', required: true, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}