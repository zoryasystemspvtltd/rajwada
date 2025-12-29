import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListPostWorkPeriodicCheck = () => {
    const schema = {
        module: 'postWorkPeriodicChecking',
        title: 'Post Work Periodic Check',
        path: 'post-work-periodic-checks',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: false, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: true }
        ]
    }

    return (<IUIList schema={schema} />)
}


export const ViewPostWorkPeriodicCheck = () => {
    const schema = {
        module: 'postWorkPeriodicChecking',
        title: 'Post Work Periodic Check',
        path: 'post-work-periodic-checks',
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
                    { text: 'Is Photo Required ?', field: 'isPhoto', placeholder: 'Check to edit photo status', type: 'label-check', required: false, width: 4 },
                    { text: 'Is Calendar Required ?', field: 'isCalendar', placeholder: 'Check to edit calendar status', type: 'label-check', required: false, width: 4 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}


export const EditPostWorkPeriodicCheck = () => {
    const schema = {
        module: 'postWorkPeriodicChecking',
        title: 'Post Work Periodic Check',
        path: 'post-work-periodic-checks',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Checkpoint Name', type: 'text', required: true, width: 4 },
                    { text: 'Description', field: 'description', placeholder: 'Checkpoint Description', type: 'text', required: true, width: 4 },
                    { text: 'Is Photo Required ?', field: 'isPhoto', placeholder: 'Check to edit photo status', type: 'check', required: false, width: 4 },
                    { text: 'Is Calendar Required ?', field: 'isCalendar', placeholder: 'Check to edit calendar status', type: 'check', required: false, width: 4 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}


export const AddPostWorkPeriodicCheck = () => {
    const schema = {
        module: 'postWorkPeriodicChecking',
        title: 'Post Work Periodic Check',
        path: 'post-work-periodic-checks',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', placeholder: 'Checkpoint Name', type: 'text', required: true, width: 4 },
                    { text: 'Description', field: 'description', placeholder: 'Checkpoint Description', type: 'text', required: true, width: 4 },
                    { text: 'Is Photo Required ?', field: 'isPhoto', placeholder: 'Check to edit photo status', type: 'check', required: false, width: 4 },
                    { text: 'Is Calendar Required ?', field: 'isCalendar', placeholder: 'Check to edit calendar status', type: 'check', required: false, width: 4 },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}
