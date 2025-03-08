
import { useSelector } from 'react-redux';
import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage";

export const ListLevelSetup = () => {
    const schema = {
        module: 'levelSetup',
        title: 'Level Setup',
        path: 'level-setups',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Project', field: 'projectName', type: 'link', sorting: true, searching: true },
            { text: 'Document Date', field: 'documentDate', type: 'date', sorting: true, searching: false },
            { text: 'Tracking No', field: 'trackingNo', type: 'text', sorting: true, searching: true },
            { text: 'Vehicle No', field: 'vechileNo', type: 'text', sorting: true, searching: true },
            { text: 'Supplier Name', field: 'supplierName', type: 'text', sorting: true, searching: true }
        ]
    }
    return (<IUIList schema={schema} />)
}

export const ViewLevelSetup = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);

    const schema = {
        module: 'levelSetup',
        title: 'Level Setup',
        path: 'level-setups',
        editing: true,
        adding: false,
        deleting: true,
        back: true,
        approving: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entry Level', field: 'Entry Level', type: 'h21', required: false, width: 12, },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', width: 4,
                        schema: { module: 'project', path: 'projects' }
                    },
                    {
                        text: 'Quality In Charge Name', field: 'inChargeId', type: 'lookup-link',
                        width: 4, schema: { module: 'user', path: 'users' }
                    },
                    {
                        text: 'Status', field: 'status', type: 'lookup-enum', width: 4, textonly: true,
                        schema: { module: 'statusType' }
                    },
                    { text: 'Vehicle No', field: 'vechileNo', type: 'label', width: 4 },
                    { text: 'Tracking No', field: 'trackingNo', type: 'label', width: 4 },
                    { text: 'Document Date', field: 'documentDate', type: 'label-date', width: 4 },
                    {
                        text: 'Supplier Name', field: 'supplierId', type: 'lookup-link', width: 4,
                        schema: { module: 'supplier', path: 'suppliers' }
                    },
                    // {
                    //     text: 'Assigned To', field: 'member', type: 'label', width: 4,
                    // },
                    { text: 'Remarks', field: 'approvedRemarks', type: 'label', width: 12 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'list-inline',
                        field: 'items',
                        schema: {
                            path: 'levelSetupDetails',//TODO
                            module: 'levelSetupDetails',
                            title: 'Level Setup Items',
                            relationKey: "headerId", //TODO
                            approvalKey: "isApproved",
                            parentModule: 'levelSetup',
                            title: 'Level Setup Items',
                            editing: loggedInUser?.roles?.includes("Quality Engineer") ? true : false,
                            fields: [
                                {
                                    field: 'id', type: 'hidden-filter'
                                },
                                {
                                    text: 'Item', field: 'itemId', nameField: 'name', type: 'lookup', labelvisible: false, // TODO
                                    required: true, width: 12, schema: { module: 'asset' }
                                },
                                { text: 'Quantity', field: 'quantity', type: 'text', required: true, width: 12, labelvisible: false },
                                { text: 'Price', field: 'price', type: 'text', required: true, width: 12, labelvisible: false },
                                {
                                    text: 'UOM', field: 'uomId', nameField: 'uomName', type: 'lookup', required: true, width: 12,
                                    labelvisible: false, schema: { module: 'uom' }
                                },
                                {
                                    text: 'Quality Status', field: 'qualityStatus', type: 'lookup-enum', required: false, width: 12, readonly: !loggedInUser?.roles?.includes("Quality Engineer"),
                                    labelvisible: false, schema: { module: 'qualityStatus' }
                                },
                                { text: 'Quality Remarks', field: 'qualityRemarks', type: 'text', required: false, labelvisible: false, readonly: !loggedInUser?.roles?.includes("Quality Engineer"), width: 12 },
                                {
                                    text: 'Receiver Status', field: 'receiverStatus', type: 'lookup-enum', required: false, width: 12, readonly: !loggedInUser?.roles?.includes("Receiver"),
                                    labelvisible: false, schema: { module: 'qualityStatus' }
                                },
                                { text: 'Receiver Remarks', field: 'receiverRemarks', type: 'text', required: false, readonly: !loggedInUser?.roles?.includes("Receiver"), labelvisible: false, width: 12 }
                            ]
                        },
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditLevelSetup = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);

    const schema = {
        module: 'levelSetup',
        title: 'Level Setup',
        path: 'level-setups',
        goNextView: true,
        back: false,
        goNextList: true,
        assignNext: true,
        assignField: "inChargeId",
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entry Level', field: 'Entry Level', type: 'h21', required: false, width: 12, },
                    {
                        text: 'Quality In Charge Name', field: 'inChargeId', nameField: 'inChargeName', type: 'lookup',
                        required: true, width: 4, schema: { module: 'user' }
                    },
                    {
                        text: 'Project', field: 'projectId', nameField: 'projectName', type: 'lookup', required: true, width: 4,
                        schema: { module: 'project' }
                    },
                    { text: 'Vehicle No', field: 'vechileNo', placeholder: 'Vehicle No here...', type: 'text', required: false, width: 4 },
                    { text: 'Tracking No', field: 'trackingNo', placeholder: 'Tracking No here...', type: 'text', required: false, width: 4 },
                    { text: 'Document Date', field: 'documentDate', placeholder: 'Document Date here...', type: 'date', required: false, width: 4 },
                    {
                        text: 'Supplier Name', field: 'supplierId', nameField: 'supplierName', type: 'lookup', required: true, width: 4,
                        schema: { module: 'supplier' }
                    },
                    // { text: 'Remarks', field: 'remarks', placeholder: 'Remarks here...', type: 'text', required: false, width: 12 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'list-inline',
                        field: 'items',
                        schema: {
                            path: 'levelSetupDetails',//TODO
                            module: 'levelSetupDetails',
                            title: 'Level Setup Items',
                            relationKey: "headerId", //TODO
                            editing: true,
                            adding: true,
                            fields: [
                                {
                                    field: 'id', type: 'hidden-filter'
                                },
                                {
                                    text: 'Item', field: 'itemId', nameField: 'name', type: 'lookup', labelvisible: false, // TODO
                                    required: true, width: 12, schema: { module: 'asset' }
                                },
                                { text: 'Quantity', field: 'quantity', type: 'text', required: true, width: 12, labelvisible: false },
                                { text: 'Price', field: 'price', type: 'text', required: true, width: 12, labelvisible: false },
                                {
                                    text: 'UOM', field: 'uomId', nameField: 'uomName', type: 'lookup', required: true, width: 12,
                                    labelvisible: false, schema: { module: 'uom' }
                                },
                                {
                                    text: 'Quality Status', field: 'qualityStatus', type: 'lookup-enum', required: false, width: 12, readonly: !loggedInUser?.roles?.includes("Quality Engineer"),
                                    labelvisible: false, schema: { module: 'qualityStatus' }
                                },
                                { text: 'Quality Remarks', field: 'qualityRemarks', type: 'text', required: false, labelvisible: false, readonly: !loggedInUser?.roles?.includes("Quality Engineer"), width: 12 },
                                {
                                    text: 'Receiver Status', field: 'receiverStatus', type: 'lookup-enum', required: true, width: 12, readonly: !loggedInUser?.roles?.includes("Receiver"),
                                    labelvisible: false, schema: { module: 'qualityStatus' }
                                },
                                { text: 'Receiver Remarks', field: 'receiverRemarks', type: 'text', required: false, readonly: !loggedInUser?.roles?.includes("Receiver"), labelvisible: false, width: 12 }
                            ]
                        },
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddLevelSetup = () => {
    const schema = {
        module: 'levelSetup',
        title: 'Level Setup',
        path: 'level-setups',
        back: true,
        goNextEdit: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entry Level', field: 'Entry Level', type: 'h21', required: false, width: 12, },
                    {
                        text: 'Project', field: 'projectId', nameField: 'projectName', type: 'lookup', required: true, width: 4,
                        schema: { module: 'project' }
                    },
                    {
                        text: 'Quality In Charge Name', field: 'inChargeId', nameField: 'inChargeName', type: 'lookup',
                        required: true, width: 4, schema: { module: 'user' }
                    },
                    { text: 'Vehicle No', field: 'vechileNo', placeholder: 'Vehicle No here...', type: 'text', required: false, width: 4 },
                    { text: 'Tracking No', field: 'trackingNo', placeholder: 'Tracking No here...', type: 'text', required: false, width: 4 },
                    { text: 'Document Date', field: 'documentDate', placeholder: 'Document Date here...', type: 'date', required: true, width: 4 },
                    {
                        text: 'Supplier Name', field: 'supplierId', nameField: 'supplierName', type: 'lookup', required: true, width: 4,
                        schema: { module: 'supplier' }
                    },
                    // { text: 'Remarks', field: 'remarks', placeholder: 'Remarks here...', type: 'text', required: false, width: 12 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}