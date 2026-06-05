import IUIListFilter from "../common/IUIListFilter.jsx";
import { useParams } from "react-router-dom";
import IUIItemAvailability from "./shared/IUIItemAvailability.jsx";
import { useState } from "react";

export const ListActivityForItemAvailability = () => {

    const [type, setType] = useState("inside");

    const insideSchema = {
        module: 'work',
        priviliegeModule: 'activity',
        title: 'Work Item Availability Status',
        path: 'work-item-availabilities',
        paging: true,
        searching: true,
        editing: true,
        adding: false,
        relationKey: "type",
        fields: [
            { text: 'Name', field: 'activityName', type: 'link', sorting: true, searching: true },
            { text: 'Expected Start Date', field: 'startDate', type: 'date', sorting: true, searching: false },
            { text: 'Expected End Date', field: 'endDate', type: 'date', sorting: true, searching: false },
            { text: 'Project', field: 'projectName', type: 'text', sorting: true, searching: true },
            { text: 'Flat', field: 'flatName', type: 'text', sorting: true, searching: true },
            { text: 'Dependency', field: 'workflowName', type: 'text', sorting: true, searching: true },
        ]
    }

    const outsideSchema = {
        module: 'work',
        priviliegeModule: 'activity',
        title: 'Work Item Availability Status',
        path: 'work-item-availabilities',
        paging: true,
        searching: true,
        editing: true,
        adding: false,
        relationKey: "type",
        fields: [
            { text: 'Name', field: 'activityName', type: 'link', sorting: true, searching: true },
            { text: 'Expected Start Date', field: 'startDate', type: 'date', sorting: true, searching: false },
            { text: 'Expected End Date', field: 'endDate', type: 'date', sorting: true, searching: false },
            { text: 'Project', field: 'projectName', type: 'text', sorting: true, searching: true },
            { text: 'Outside Entity', field: 'outSideEntityName', type: 'text', sorting: true, searching: true },
            { text: 'Dependency', field: 'workflowName', type: 'text', sorting: true, searching: true },
        ]
    }

    return (
        <>
            <div className="card p-2 mb-4">
                <div className="d-flex flex-column flex-md-row gap-3">
                    <strong className="mb-0">Select Type:</strong>
                    <div className="d-flex gap-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                id="inside"
                                value="inside"
                                checked={type === "inside"}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="inside">
                                Inside
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="type"
                                id="outside"
                                value="outside"
                                checked={type === "outside"}
                                onChange={(e) => setType(e.target.value)}
                            />
                            <label className="form-check-label" htmlFor="outside">
                                Outside
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            {/* Conditional Rendering */}
            <div className="mt-2">
                {type === "inside" ?
                    <IUIListFilter schema={insideSchema} filter="Inside" /> :
                    <IUIListFilter schema={outsideSchema} filter="Outside" />
                }
            </div>
        </>
    );
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
                text: 'Item', field: 'assetId', type: 'lookup', required: true, width: 4,
                schema: { module: 'asset' }
            },
            {
                text: 'Availability', field: 'availabilityStatus', type: 'tick', required: true, width: 2,
            },
            { text: 'Quantity', field: 'quantity', placeholder: 'Item quantity here...', type: 'number', width: 4, required: true },
            {
                text: 'UOM', field: 'uomId', type: 'lookup', required: true, width: 4,
                schema: { module: 'uom' }
            },
        ]
    }

    const activitySchema = {
        module: 'activity',
        title: 'Work',
        path: 'works',
        showBreadcrumbs: false,
        editing: false,
        adding: false,
        deleting: false,
        assign: false,
        assignType: 'multiple',
        assignChild: false,
        approving: false,
        back: false,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Work ID', field: 'workId', width: 4, type: 'label' },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', width: 4, type: 'label' },
                    { text: 'Description', field: 'description', width: 4, type: 'label' },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup-link',
                        schema: { module: 'project', path: 'projects' }
                    },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'label-date' },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'label-date', },
                ]
            }
        ]
    }

    return (<IUIItemAvailability schema={schema} activitySchema={activitySchema} />)
}
