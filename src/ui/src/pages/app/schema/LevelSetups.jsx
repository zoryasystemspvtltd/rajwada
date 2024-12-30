
import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListLevelSetup = () => {
    const schema = {
        module: 'levelSetupHeader',
        title: 'Level Setup',
        path: 'level-setups',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Project', field: 'projectName', type: 'link', sorting: true, searching: true },
            { text: 'Tracking No', field: 'trackingNo', type: 'text', sorting: true, searching: true },
            { text: 'VechileNo', field: 'vechileNo', type: 'text', sorting: true, searching: true },
            { text: 'Supplier Name', field: 'supplierName', type: 'text', sorting: true, searching: true }
        ]
    }
    return (<IUIList schema={schema} />)
}

export const ViewLevelSetup = () => {
    const schema = {
        module: 'levelSetupHeader',
        title: 'Level Setup',
        path: 'level-setups',
        editing: true,
        adding: false,
        deleting: true,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entry Level', field: 'Entry Level', type: 'h2l', required: false, width: 12, },
                    {
                        text: 'Quantity In Charge Name', field: 'inChargeId', type: 'lookup-link',
                        width: 4, schema: { module: 'user', path: 'users' }
                    },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', width: 4,
                        schema: { module: 'project', path: 'projects' }
                    },
                    { text: 'Vehicle No', field: 'vechileNo', type: 'label', width: 4 },
                    { text: 'Tracking No', field: 'trackingNo', type: 'label', width: 4 },
                    { text: 'Document Date', field: 'documentDate', type: 'date', width: 4 },
                    {
                        text: 'Supplier Name', field: 'supplierId', type: 'lookup-link', width: 4,
                        schema: { module: 'supplier', path: 'suppliers' }
                    },
                    { text: 'Remarks', field: 'remarks', type: 'label', width: 12 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'list-inline',
                        field: 'items',
                        schema: {
                            title: 'Level Setup Items',
                            fields: [
                                {
                                    field: 'levelSetupMasterId', type: 'hidden-filter', schema: { module: 'levelSetupMaster' }
                                },
                                { text: 'Item', field: 'itemName', type: 'label', labelvisible: false },
                                { text: 'Quantity', field: 'quantity', type: 'label', width: 12, labelvisible: false },
                                { text: 'Price', field: 'price', type: 'label', width: 12, labelvisible: false },
                                { text: 'UOM', field: 'uomName', type: 'label', width: 12, labelvisible: false },
                                { text: 'Quality Type', field: 'qualityType', type: 'label', width: 12, labelvisible: false },
                                { text: 'Quality Remarks', field: 'qualityRemarks', type: 'label', labelvisible: false, width: 12 }
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
    const schema = {
        module: 'levelSetupHeader',
        title: 'Level Setup',
        path: 'level-setups',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entry Level', field: 'Entry Level', type: 'h2l', required: false, width: 12, },
                    {
                        text: 'Quantity In Charge Name', field: 'inChargeId', nameField: 'inChargeName', type: 'lookup',
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
                    { text: 'Remarks', field: 'remarks', placeholder: 'Remarks here...', type: 'text', required: false, width: 12 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'list-inline',
                        field: 'items',
                        schema: {
                            module: 'levelSetupDetails',
                            title: 'Level Setup Items',
                            editing: true,
                            adding: true,
                            fields: [
                                {
                                    field: 'id', type: 'hidden-filter'
                                },
                                {
                                    text: 'Item', field: 'itemId', nameField: 'itemName', type: 'lookup', labelvisible: false,
                                    required: true, width: 12, schema: { module: 'asset' }
                                },
                                { text: 'Quantity', field: 'quantity', type: 'text', required: true, width: 12, labelvisible: false },
                                { text: 'Price', field: 'price', type: 'text', required: true, width: 12, labelvisible: false },
                                {
                                    text: 'UOM', field: 'uomId', nameField: 'uomName', type: 'lookup', required: true, width: 12,
                                    labelvisible: false, schema: { module: 'uom' }
                                },
                                {
                                    text: 'Quality Type', field: 'qualityType', type: 'lookup-enum', required: true, width: 12,
                                    labelvisible: false, schema: { module: 'qualityType' }
                                },
                                { text: 'Quality Remarks', field: 'qualityRemarks', type: 'text', required: false, labelvisible: false, width: 12 }
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
        module: 'levelSetupHeader',
        title: 'Level Setup',
        path: 'level-setups',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entry Level', field: 'Entry Level', type: 'h2l', required: false, width: 12, },
                    {
                        text: 'Quantity In Charge Name', field: 'inChargeId', nameField: 'inChargeName', type: 'lookup',
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
                    { text: 'Remarks', field: 'remarks', placeholder: 'Remarks here...', type: 'text', required: false, width: 12 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}