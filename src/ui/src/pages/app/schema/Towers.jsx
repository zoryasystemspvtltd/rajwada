import { useParams } from "react-router-dom";
import IUIListFilter from "../../common/IUIListFilter";
import IUIListRelation from "../../common/IUIListRelation";
import IUIPage from "../../common/IUIPage"

export const ListTower = () => {

    const schema = {
        module: 'plan',
        title: 'Tower',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        assignType: 'single',
        adding: true,
        uploading: true,
        downloading: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
        ]
    }


    return (<IUIListFilter schema={schema} filter='tower' />)
}

export const TowerDashboard = () => {

    const schema = {
        module: 'plan',
        title: 'Tower',
        relationKey: "type",
        path: 'towers',
        paging: true,
        searching: true,
        editing: true,
        assign: true,
        assignType: 'single',
        adding: true,
        fields: [
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false, width: 100,
                schema: { module: 'project', path: 'projects' }
            },
            { text: 'Tower', field: 'name', type: 'link', sorting: true, searching: true, width: 100, },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },

        ]
    }


    return (<IUIListFilter schema={schema} filter='tower' />)
}


export const ViewTower = () => {
    const { id } = useParams();
    
    const schema = {
        module: 'plan',
        title: 'Tower',
        path: 'towers',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        deleting: true,
        assign: true,
        assignType: 'single',
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', required: false, width: 4,
                        schema: { module: 'project', path: 'projects' }
                    },
                    // { text: 'Planned Start Date', field: 'planStartDate', width: 4, type: 'label-date' },
                    // { text: 'Planned End Date', field: 'planEndDate', width: 4, type: 'label-date' },
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'h5', required: true, width: 12 },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'p', required: true, width: 12 },

                ]
            },
            // {
            //     type: "area", width: 12
            //     , fields: [
            //         { text: 'Tower Blueprint', field: 'blueprint', placeholder: 'Tower Blueprint here...', type: 'picture-upload', shape: 'rect' },
            //     ]
            // },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Tower Blueprint', field: 'blueprint', placeholder: 'Tower Blueprint here...', type: 'ilab-canvas', shape: 'rect',
                        schema: {
                            readonly: true,
                            upload: false,
                            save: false,
                            parentId: id,
                            parent: {
                                module: 'plan',
                                filter: 'planId',
                            },
                            controls: {
                                balloon: false,
                                rectangle: false,
                                pencil: false,
                                camera: false,
                                delete: false,
                                reset: false
                            },
                            module: 'unitOfWork'
                        }
                    },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-relation',
                        schema: {
                            module: 'plan',
                            relationKey: "parentId",
                            title: 'Floor',
                            path: 'floors',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            uploading: true,
                            downloading: true,
                            fields: [
                                { text: 'Floors', field: 'name', type: 'link', sorting: true, searching: true, width: 100, },
                                { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },

                            ]
                        },
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditTower = () => {
    const { id } = useParams();

    const schema = {
        module: 'plan',
        title: 'Tower',
        path: 'towers',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Project', field: 'projectId', type: 'lookup-link', required: false, width: 4,
                        schema: { module: 'project', path: 'projects' }
                    },
                    // { text: 'Planned Start Date', field: 'planStartDate', width: 4, type: 'date', required: false },
                    // { text: 'Planned End Date', field: 'planEndDate', width: 4, type: 'date', required: false },
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 12 },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
            // {
            //     type: "area", width: 12
            //     , fields: [
            //         { text: 'Tower Blueprint', field: 'blueprint', placeholder: 'Tower Blueprint here...', type: 'picture-upload', shape: 'rect', required: true },
            //     ]
            // },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Tower Blueprint', field: 'blueprint', placeholder: 'Tower Blueprint here...', type: 'ilab-canvas', shape: 'rect',
                        schema: {
                            readonly: false,
                            upload: true,
                            save: true,
                            parentId: id,
                            parent: {
                                module: 'plan',
                                filter: 'planId',
                                path: 'towers'
                            },
                            controls: {
                                balloon: true,
                                rectangle: true,
                                pencil: true,
                                camera: false,
                                delete: true,
                                reset: true
                            },
                            module: 'unitOfWork'
                        }
                    },
                ]
            },
            { field: 'type', type: 'hidden-filter', value: "tower" }
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddTower = () => {
    const schema = {
        module: 'plan',
        title: 'Tower',
        path: 'towers',
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    {
                        text: 'Project', field: 'projectId', type: 'lookup', required: false, width: 6,
                        schema: { module: 'project' }
                    },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'textarea', required: true, width: 12 }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Tower Blueprint', field: 'blueprint', placeholder: 'Tower Blueprint here...', type: 'picture-upload', shape: 'rect', required: true,
                        parent: 'projectId',
                        schema: {
                            type: "lookup",
                            module: 'project',
                            relationKey: "blueprint",
                        },
                    },
                ]
            },
            { field: 'type', type: 'hidden-filter', value: "tower" }
        ]
    }

    return (<IUIPage schema={schema} />)
}