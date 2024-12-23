
import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListLevelSetup = () => {
    const schema = {
        module: 'levelSetupMaster',
        title: 'Level Setup',
        path: 'level-setups',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Project', field: 'project', type: 'link', sorting: true, searching: true },
            { text: 'Tracking No', field: 'trackingNo', type: 'text', sorting: true, searching: true },
            { text: 'VechileNo', field: 'vechileNo', type: 'text', sorting: true, searching: true },
            { text: 'Supplier Name', field: 'supplierName', type: 'text', sorting: true, searching: true }
        ]
    }


    return (<IUIList schema={schema} />)
}

export const AddLevelSetup = () => {
    const schema = {
        module: 'levelSetupMaster',
        title: 'Level Setup',
        path: 'level-setups',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entry Level', field: 'Entry Level', type: 'h2l', required: false, width: 6 },
                    {
                        text: 'Quantity In Chanrge Name', field: 'inChargeId', nameField: 'inChargeName', type: 'lookup', required: true, width: 6,
                        schema: { module: 'user' }
                    },
                    {
                        text: 'Project', field: 'projectId', nameField: 'projectName', type: 'lookup', required: true, width: 6,
                        schema: { module: 'project' }
                    },
                    { text: 'Vehicle No', field: 'vechileNo', placeholder: 'Vehicle No here...', type: 'text', required: false, width: 6 },
                    { text: 'Tracking No', field: 'trackingNo', placeholder: 'Tracking No here...', type: 'text', required: false, width: 6 },
                    { text: 'Documenate Date', field: 'documentDate', placeholder: 'Document Date here...', type: 'date', required: false, width: 6 },
                    {
                        text: 'Supplier Name', field: 'supplierId', nameField: 'supplierName', type: 'lookup', required: true, width: 6,
                        schema: { module: 'supplier' }
                    },                    
                    { text: 'Remarks', field: 'remarks', placeholder: 'Remarks here...', type: 'text', required: false, width: 12 },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-relation-inline',
                        field: 'items',
                        schema: {
                            title: 'Level Setup Items',
                            editing: true,
                            adding: true,
                            fields: [
                                { field: 'id', type: 'hidden-filter',schema: {
                                    module: 'levelSetupMaster'
                                } },
                                {
                                    text: 'Item', field: 'itemId', nameField: 'itemName', type: 'lookup', required: true, width: 6,
                                    schema: { module: 'uom' }
                                },
                                { text: 'Quantity', field: 'quantity', type: 'text', required: true, width: 12 },
                                { text: 'Price', field: 'price', type: 'text', required: true, width: 12 },                               
                                {
                                    text: 'UOM', field: 'uomId', nameField: 'uomName', type: 'lookup', required: true, width: 6,
                                    schema: { module: 'uom' }
                                },
                                {
                                    text: 'Quality Type', field: 'qualityType', type: 'lookup-enum', required: true, width: 6,
                                    schema: { module: 'qualityType' }
                                },                              
                                { text: 'Quality Remarks', field: 'qualityRemarks', type: 'text', required: false, width: 12 }
                            ]
                        },
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}