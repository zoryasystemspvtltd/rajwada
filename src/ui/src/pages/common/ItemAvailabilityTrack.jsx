import IUIListFilter from "../common/IUIListFilter.jsx";
import { useParams } from "react-router-dom";
import IUIItemAvailability from "./shared/IUIItemAvailability.jsx";

export const ListActivityForItemAvailability = () => {

    const schema = {
        module: 'activity',
        title: 'Work Item Availability Status',
        path: 'work-item-availabilities',
        paging: true,
        searching: true,
        editing: false,
        adding: false,
        relationKey: "type",
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: true, searching: true },
            { text: 'Expected Start Date', field: 'startDate', type: 'date', sorting: true, searching: true },
            { text: 'Expected End Date', field: 'endDate', type: 'date', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Dependency', field: 'workflowId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'workflow' }
            }
        ]
    }

    return (<IUIListFilter schema={schema} filter='Main Task' />)
}

export const ViewActivityForItemAvailability = () => {
    const { id } = useParams();

    const schema = {
        module: 'activityResource',
        title: 'Work Item Availability Status',
        path: 'work-item-availabilities',
        showBreadcrumbs: true,
        back: true,
        readonly: true,
        searchKey: 'activityId',
        searchValue: id,
        fields: [
            {
                text: 'Item List', field: 'items', width: 12, type: 'table-input', readonly: true,
                schema: {
                    readonly: true,
                    module: 'activity',
                    paging: true,
                    searching: true,
                    editing: true,
                    adding: true,
                    fields: [
                        {
                            text: 'Item', field: 'assetId', type: 'lookup', required: true, width: 4,
                            schema: { module: 'asset' }
                        },
                        { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
                        {
                            text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                            schema: { module: 'uom' }
                        },
                    ]
                }
            },
        ]
    }

    return (<IUIItemAvailability schema={schema} />)
}
