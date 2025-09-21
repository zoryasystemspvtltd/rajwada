import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"


export const ListAuditLog = () => {


    const schema = {
        module: 'auditLog',
        title: 'Audit Log',
        path: 'audit-logs',
        paging: true,
        searching: true,
        editing: false,
        adding: false,
        fields: [
            { text: 'Entity Id', field: 'entityId', type: 'text', sorting: true, searching: true },
            { text: 'Module Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Action Type', field: 'actionType', type: 'text', sorting: true, searching: true },
            { text: 'Modified By', field: 'modifiedBy', type: 'text', sorting: true, searching: true },
            { text: 'Modified Date', field: 'modifiedDate', type: 'date', sorting: false, }
        ]
    }


    return (<IUIList schema={schema} />)
}


export const ViewAuditLog = () => {
    const schema = {
        module: 'auditLog',
        title: 'Audit Log',
        path: 'audit-logs',
        showBreadcrumbs: true,
        editing: false,
        adding: false,
        deleting: false,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entity Id', field: 'entityId', width: 4, type: 'label' },
                    { text: 'Module Name', field: 'name', width: 4, type: 'label' },
                    { text: 'Action Type', field: 'actionType', width: 4, type: 'label' },
                    { text: 'Modified By', field: 'modifiedBy', width: 4, type: 'label' },
                    { text: 'Modified Date', field: 'modifiedDate', width: 4, type: 'label-date' },
                    { text: 'Reviewed By', field: 'reviewedBy', width: 4, type: 'label' },
                    { text: 'Reviewed Date', field: 'reviewedDate', width: 4, type: 'label-date' },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'New Value', field: 'newValues', width: 12, type: 'key-val-table',
                        schema: {
                            excludeKeys: ["Blueprint", "Key", "Status"],
                            maxLength: 100
                        }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Old Value', field: 'oldValues', width: 12, type: 'key-val-table',
                        schema: {
                            excludeKeys: ["Blueprint", "Key", "Status"],
                            maxLength: 100
                        }
                    }
                ]
            }
        ]
    }


    return (<IUIPage schema={schema} />)
}


