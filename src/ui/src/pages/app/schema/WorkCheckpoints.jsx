import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListWorkCheckpoint = () => {
    const schema = {
        module: 'workCheckpoint',
        title: 'Work Checkpoint',
        path: 'work-checkpoints',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: false, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: true }
        ]
    }

    return (<IUIList schema={schema} />)
}


export const ViewWorkCheckpoint = () => {
    const schema = {
        module: 'workCheckpoint',
        title: 'Work Checkpoint',
        path: 'work-checkpoints',
        showBreadcrumbs: false,
        editing: true,
        adding: false,
        deleting: true,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Checkpoint Name', type: 'label', required: true, width: 4 },
                    { text: 'Description', field: 'description', placeholder: 'Checkpoint Description', type: 'label', required: true, width: 4 },
                    {
                        text: 'Type', field: 'type', placeholder: 'Checkpoint Type', type: 'lookup-label', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'During' },
                                { name: 'After' }
                            ]
                        }
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}


export const EditWorkCheckpoint = () => {
    const schema = {
        module: 'workCheckpoint',
        title: 'Work Checkpoint',
        path: 'work-checkpoints',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Checkpoint Name', type: 'text', required: true, width: 4 },
                    { text: 'Description', field: 'description', placeholder: 'Checkpoint Description', type: 'text', required: true, width: 4 },
                    {
                        text: 'Type', field: 'type', placeholder: 'Checkpoint Type', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'During' },
                                { name: 'After' }
                            ]
                        }
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}


export const AddWorkCheckpoint = () => {
    const schema = {
        module: 'workCheckpoint',
        title: 'Work Checkpoint',
        path: 'work-checkpoints',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Checkpoint Name', type: 'text', required: true, width: 4 },
                    { text: 'Description', field: 'description', placeholder: 'Checkpoint Description', type: 'text', required: true, width: 4 },
                    {
                        text: 'Type', field: 'type', placeholder: 'Checkpoint Type', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'During' },
                                { name: 'After' }
                            ]
                        }
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}
