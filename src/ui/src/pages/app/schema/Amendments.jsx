import { useParams } from "react-router-dom";
import amendmentSchema from "../../../store/amendment-schema.json";
import IUIAmendmentList from "../../common/IUIAmendmentList.jsx";
import IUIBreadcrumb from '../../common/shared/IUIBreadcrumb.jsx';
import IUIAmendmentPage from "../../common/IUIAmendmentPage.jsx";
import IUIPage from "../../common/IUIPage.jsx";

export const ListAmendment = () => {
    const schema = {
        module: 'activityamendment',
        title: 'Activity Amendment',
        relationKey: "parentId",
        path: 'amendments',
        paging: true,
        searching: true,
        editing: true,
        adding: false,
        fields: [
            { text: 'Code', field: 'code', type: 'link', sorting: true, searching: true },
            {
                text: 'Activity', field: 'activityId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'activity' }
            }
        ]
    }

    const filterSchema = amendmentSchema.quality;

    return (
        <>
            <div className="app-page-title">
                <IUIBreadcrumb schema={{ type: 'list', module: module, displayText: schema?.title }} />
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="main-card mb-2 card">
                        <div className="card-body">
                            <div className="mb-2">
                                <div className="card-header card-header-tab-animation">
                                    <ul className="nav nav-justified">
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#amendments-in-queue" className="active nav-link">Amendments In Queue</a>
                                        </li>
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#amendments-in-progress" className="nav-link">Amendments In Progress</a>
                                        </li>
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#completed-amendments" className="nav-link">Amendments Completed</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="amendments-in-queue" role="tabpanel">
                                            <IUIAmendmentList schema={schema} filter={null} amendmentType={'queue'} filterSchema={filterSchema?.amendmentInQueue} />
                                        </div>


                                        <div className="tab-pane" id="amendments-in-progress" role="tabpanel">
                                            <IUIAmendmentList schema={schema} filter={null} amendmentType={'in-progress'} filterSchema={filterSchema?.amendmentInProgress} />
                                        </div>


                                        <div className="tab-pane" id="completed-amendments" role="tabpanel">
                                            <IUIAmendmentList schema={schema} filter={null} amendmentType={'completed'} filterSchema={filterSchema?.amendmentCompleted} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export const ViewAmendment = () => {
    const { id } = useParams();

    const schema = {
        module: 'activityamendment',
        title: 'Activity Amendment',
        relationKey: "parentId",
        path: 'amendments',
        id: parseInt(id),
        showBreadcrumbs: true,
        editing: false,
        adding: false,
        deleting: true,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Code', field: 'code', width: 6, type: 'label' },
                    {
                        text: 'Activity', field: 'activityId', type: 'lookup-link', width: 6,
                        schema: { module: 'activity', path: 'works' }
                    },
                    { text: 'QC Remarks', field: 'qcRemarks', width: 6, type: 'label' },
                    { text: 'Amendment Reason', field: 'amendmentReason', width: 6, type: 'label' }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Old Values', field: 'oldData', width: 12, type: 'key-val-table',
                        schema: {
                            excludeKeys: ["Blueprint", "Key", "Status"],
                            maxLength: 100
                        }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'New Values', field: 'newValues', width: 12, type: 'key-val-table',
                        schema: {
                            excludeKeys: ["Blueprint", "Key", "Status"],
                            maxLength: 100
                        }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-relation',
                        schema: {
                            module: 'activityamendment',
                            relationKey: "parentId",
                            title: 'Related Amendments',
                            path: 'amendments',
                            paging: true,
                            searching: true,
                            editing: false,
                            adding: false,
                            fields: [
                                { text: 'Code', field: 'code', type: 'link', sorting: true, searching: true },
                                {
                                    text: 'Activity', field: 'activityId', type: 'lookup', sorting: false, searching: false,
                                    schema: { module: 'activity' }
                                },
                                { text: 'Status', field: 'amendmentStatus', type: 'text', sorting: false, searching: false }
                            ]
                        },
                    }
                ]
            }
        ]
    }

    return (<IUIAmendmentPage schema={schema} />);
}

export const EditAmendment = () => {
    const schema = {
        module: 'activityamendment',
        title: 'Activity Amendment',
        path: 'amendments',
        isAmendment: true,
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', width: 4, type: 'text', required: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Main Task' },
                                { name: 'Sub Task' }
                            ]
                        }
                    },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup', required: true, readonly: true,
                        schema: { module: 'project' }
                    },
                    {
                        text: 'Dependency', field: 'workflowId', width: 4, type: 'lookup', required: true, readonly: true,
                        schema: { module: 'workflow' }
                    },
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'activity' }
                    },
                    {
                        text: 'Tower', field: 'towerId', type: 'lookup-filter', required: false, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'tower' }
                    },
                    {
                        text: 'Floor', field: 'floorId', type: 'lookup-filter', required: false, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'floor' }
                    },
                    {
                        text: 'Flat', field: 'flatId', type: 'lookup-filter', required: false, width: 4, readonly: true,
                        schema: { module: 'plan', filter: 'type', value: 'flat' }
                    },
                    { text: 'Planned Start Date', field: 'startDate', placeholder: 'Start Date here...', width: 4, type: 'date', required: true },
                    { text: 'Planned End Date', field: 'endDate', placeholder: 'End Date here...', width: 4, type: 'date', required: true }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Estimate Cost', field: 'costEstimate', placeholder: 'Estimate Cost here...', width: 4, type: 'number', required: false },
                    {
                        text: 'Status', field: 'workflowState', width: 4, type: 'lookup', required: false,
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Labour Provided By', field: 'labourProvidedBy', type: 'lookup-multi-column', required: true, width: 4,
                        schema: {
                            nameField: "name",
                            module: "contractor",
                            selectLabel: "Contractor",
                            columns: [
                                {
                                    name: "name",
                                    width: "50%"
                                },
                                {
                                    name: "type",
                                    width: "50%"
                                }
                            ]
                        }
                    },
                    {
                        text: 'Material Provided By', field: 'materialProvidedBy', type: 'lookup-multi-column', required: true, width: 4,
                        schema: {
                            nameField: "name",
                            module: "contractor",
                            selectLabel: "Contractor",
                            columns: [
                                {
                                    name: "name",
                                    width: "50%"
                                },
                                {
                                    name: "type",
                                    width: "50%"
                                }
                            ]
                        }
                    },
                    { text: 'Notes', field: 'notes', placeholder: 'Notes here...', width: 4, type: 'text', required: false },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', required: true,
                        schema: {
                            title: 'Item',
                            module: 'activity',
                            paging: true,
                            searching: true,
                            editing: true,
                            adding: true,
                            fields: [
                                {
                                    text: 'Item', field: 'itemId', type: 'lookup', required: true, width: 4,
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
        ]
    }

    return (<IUIPage schema={schema} />)
}
