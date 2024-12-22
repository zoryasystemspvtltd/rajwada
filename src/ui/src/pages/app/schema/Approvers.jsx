
import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListApprover = () => {

    const schema = {
        module: 'approver',
        title: 'Approver',
        path: 'approvers',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Module', field: 'module', type: 'link', sorting: true, searching: true },
            { text: 'Approver', field: 'userName', type: 'text', sorting: true, searching: true },
            { text: 'Level', field: 'level', type: 'text', sorting: true, searching: true }
        ]
    }


    return (<IUIList schema={schema} />)
}

export const ViewApprover = () => {
    const schema = {
        module: 'approver',
        title: 'Approver',
        path: 'approvers',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Module', field: 'module', type: 'label', width: 6 },
                    {
                        text: 'Approver', field: 'userId', type: 'lookup-link', width: 6,
                        schema: {
                            module: 'user',
                            path: 'users'
                        }
                    },
                    { text: 'Level', field: 'level', type: 'label', width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditApprover = () => {
    const schema = {
        module: 'approver',
        title: 'Approver',
        path: 'approvers',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Module', field: 'module', fieldIcon: 'building', placeholder: 'Module here...', type: 'lookup-module', required: true, width: 6,
                        schema: {
                            module: 'module'
                        }
                    },
                    {
                        text: 'Approver', field: 'userId', nameField: 'userName', fieldIcon: 'building', placeholder: 'Approver here...', type: 'lookup', required: true, width: 6,
                        schema: {
                            module: 'user'
                        }
                    },
                    { text: 'Level', field: 'level', fieldIcon: 'location-dot', placeholder: 'Level here...', type: 'text', required: false, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddApprover = () => {
    const schema = {
        module: 'approver',
        title: 'Approver',
        path: 'approvers',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Module', field: 'module', fieldIcon: 'building', placeholder: 'Module here...', type: 'lookup-module', required: true, width: 6,
                        schema: {
                            module: 'module'
                        }
                    },
                    {
                        text: 'Approver', field: 'userId', nameField: 'userName', fieldIcon: 'building', placeholder: 'Approver here...', type: 'lookup', required: true, width: 6,
                        schema: {
                            module: 'user'
                        }
                    },
                    { text: 'Level', field: 'level', fieldIcon: 'location-dot', placeholder: 'Level here...', type: 'text', required: false, width: 6 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}