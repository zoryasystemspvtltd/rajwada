import IUIWorkflow from "../../common/IUIWorkflow"
export const AddWorkflow = () => {
    const schema = {
        module: 'asset',
        title: 'Add dependency',
        path: 'workflow',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Start Date', field: 'start', type: 'datetype', required: true, width: 6 },
                    { text: 'End Date', field: 'end', type: 'datetype', required: true, width: 6 },
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Code', field: 'id', placeholder: 'Code here...', type: 'text', required: true, width: 6 },                   
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 6,
                        schema: {
                            items: [
                                { name: 'Project' },
                                { name: 'Tower' },
                                { name: 'Floor' },
                                { name: 'Flat' }
                            ]
                        }
                    },
                    { text: 'Display Order', field: 'displayOrder', type: 'text', required: true, width: 6 },
                ]
            },
        ]
    }

    return (<IUIWorkflow schema={schema} />)
}