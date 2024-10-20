import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage"
export const ListDependency = () => {

    const schema = {
        module: 'dependency',
        title: 'Dependency',
        path: 'Dependencies',
        paging: true,
        searching: true,
        editing: true,
        adding: true,       
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Code', field: 'code', type: 'text', sorting: false, searching: false },
            { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false }

        ]
    }
    return (<IUIList schema={schema} />)
}

export const ViewDependency = () => {
    const schema = {
        module: 'dependencie',
        title: 'Dependency',
        path: 'Dependencies',
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
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Code', field: 'code', type: 'text', required: true, width: 6 },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', type: 'text', required: true, width: 12 },
                ]
            },
        ]
    }
    return (<IUIPage schema={schema} />)
}

export const EditDependency = () => {
    const schema = {
        module: 'dependency',
        title: 'Dependency',
        path: 'Dependencies',        
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [                    
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Code', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },                    
                    { text: 'Description', field: 'description', type: 'text', required: true, width: 12 }                   
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const AddDependency = () => {
    const schema = {
        module: 'dependency',
        title: 'Dependency',
        path: 'Dependencies',       
        back: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [                    
                    { text: 'Name', field: 'name', placeholder: 'Name here...', type: 'text', required: true, width: 6 },
                    { text: 'Code', field: 'code', placeholder: 'Code here...', type: 'text', required: true, width: 6 },                    
                    { text: 'Description', field: 'description', type: 'text', required: true, width: 12 }                   
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}