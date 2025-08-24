import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage";

export const ListRole = () => {
    const schema = {
        module: 'role',
        title: 'Role',
        path: 'roles',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Role Name', field: 'name', type: 'link', sorting: true, searching: true },
        ]
    }
    return (<IUIList schema={schema} />)
}

export const ViewRole = () => {
    const schema = {
        module: 'role',
        title: 'Role',
        path: 'roles',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        back: true,
        readonly: true,
        fields: [
            { text: 'Role Name', field: 'name', fieldIcon: 'circle-user', type: 'label', width: 12 },
            { text: 'Privileges', field: 'privileges', type: 'user-privileges', width: 12 },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditRole = () => {
    const schema = {
        module: 'role',
        title: 'Role',
        path: 'roles',
        back: false,
        fields: [
            { text: 'Role Name', field: 'name', fieldIcon: 'circle-user', type: 'label', width: 12 },
            { text: 'Privileges', field: 'privileges', type: 'user-privileges', width: 12 },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddRole = () => {
    const schema = {
        module: 'role',
        title: 'Role',
        path: 'roles',
        back: true,
        copy: true,
        copySchema: {
            module: 'role'
        },
        fields: [
            { text: 'Role Name', field: 'name', fieldIcon: 'circle-user', placeholder: 'Role Name here...', type: 'text', required: true, width: 6 },
            { text: 'Privileges', field: 'privileges', type: 'user-privileges', width: 12 },
        ]
    }

    return (<IUIPage schema={schema} />)
}