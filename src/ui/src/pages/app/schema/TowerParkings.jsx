import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"

export const ListTowerParking = () => {
    const schema = {
        module: 'parking',
        title: 'Tower Parking',
        path: 'parkings',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            {
                text: 'Parking Type', field: 'parkingTypeId', type: 'lookup', sorting: true, searching: true,
                schema: { module: 'parkingType' }
            },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: true, searching: true,
                schema: { module: 'project' }
            },
            {
                text: 'Tower', field: 'towerId', type: 'lookup', sorting: true, searching: true,
                schema: { module: 'plan' }
            }
        ]
    }

    return (<IUIList schema={schema} />)
}

export const ViewTowerParking = () => {
    const schema = {
        module: 'parking',
        title: 'Tower Parking',
        path: 'parkings',
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
                    { text: 'Name', field: 'name', type: 'label', required: false, width: 6 },
                    {
                        text: 'Parking Type', field: 'parkingTypeId', type: 'lookup-link', required: false, width: 6, readonly: true,
                        schema: { module: 'parkingType', path: 'parking-types' }
                    },
                    {
                        text: 'Tower', field: 'towerId', type: 'lookup-link', required: false, width: 6, readonly: true,
                        schema: { module: 'plan', path: 'towers' }
                    },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', required: false, width: 6, readonly: true,
                        schema: { module: 'project', path: 'projects' }
                    },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditTowerParking = () => {
    const schema = {
        module: 'parking',
        title: 'Tower Parking',
        path: 'parkings',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 6, readonly: true,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'projectId',
                        field: 'towerId',
                        text: 'Tower',
                        width: 6,
                        required: true,
                        readonly: true,
                        schema: {
                            module: 'plan',
                            relationKey: "projectId",
                            path: 'towers'
                        },
                    },
                    { text: 'Name', field: 'name', type: 'text', required: true, width: 6 },
                    {
                        text: 'Parking Type', field: 'parkingTypeId', type: 'lookup', required: true, width: 6, readonly: true,
                        schema: { module: 'parkingType' }
                    },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddTowerParking = () => {
    const schema = {
        module: 'parking',
        title: 'Tower Parking',
        path: 'parkings',
        back: true,
        copy: true,
        copySchema: {
            copyLabel: 'Parking',
            module: 'parking'
        },
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'project' }
                    },
                    {
                        type: 'lookup-relation',
                        parent: 'projectId',
                        field: 'towerId',
                        text: 'Tower',
                        width: 6,
                        required: true,
                        schema: {
                            module: 'plan',
                            relationKey: "projectId",
                            path: 'towers'
                        },
                    },
                    { text: 'Name', field: 'name', type: 'text', required: true, width: 6 },
                    {
                        text: 'Parking Type', field: 'parkingTypeId', type: 'lookup', required: true, width: 6,
                        schema: { module: 'parkingType' }
                    },
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}
