import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import IUIApprovalList from "../../common/IUIApprovalList.jsx";
import IUIApprovalPage from '../../common/IUIApprovalPage.jsx';
import approvalSchema from "../../../store/approval-schema.json";
import IUIBreadcrumb from '../../common/shared/IUIBreadcrumb.jsx';

export const ListActivityApproval = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);

    const schema = {
        module: 'activity',
        title: 'Work Approval',
        path: 'activities',
        paging: true,
        searching: true,
        editing: false,
        adding: false,
        relationKey: "type",
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: true, searching: true },
            { text: 'Planned Start Date', field: 'startDate', type: 'date', sorting: true, searching: true },
            { text: 'Planned End Date', field: 'endDate', type: 'date', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Dependency', field: 'dependencyId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'workflow' }
            }
        ]
    }

    const filterSchema = loggedInUser?.roles?.includes("Quality Engineer") ? approvalSchema.quality : approvalSchema.civilHead;

    // return (<IUIApprovalList schema={schema} filter='Main Task' />)

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
                                            <a data-bs-toggle="tab" href="#approval-pending-inside" className="active nav-link">Approval Pending (Inside)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#approval-completed-inside" className="nav-link">Approval Completed (Inside)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#approval-pending-outside" className="nav-link">Approval Pending (Outside)</a>
                                        </li>
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#approval-completed-outside" className="nav-link">Approval Completed (Outside)</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="approval-pending-inside" role="tabpanel">
                                            <IUIApprovalList schema={schema} filter='Inside' filterSchema={filterSchema?.approvalPending} />
                                        </div>

                                        <div className="tab-pane" id="approval-completed-inside" role="tabpanel">
                                            <IUIApprovalList schema={schema} filter='Inside' filterSchema={filterSchema?.approvalCompleted} />
                                        </div>

                                        <div className="tab-pane" id="approval-pending-outside" role="tabpanel">
                                            <IUIApprovalList schema={schema} filter='Outside' filterSchema={filterSchema?.approvalPending} />
                                        </div>

                                        <div className="tab-pane" id="approval-completed-outside" role="tabpanel">
                                            <IUIApprovalList schema={schema} filter='Outside' filterSchema={filterSchema?.approvalCompleted} />
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

export const ViewActivityApproval = () => {
    const { id } = useParams();

    const schema = {
        module: 'activity',
        title: 'Work Approval',
        path: 'works',
        showBreadcrumbs: false,
        editing: false,
        adding: false,
        deleting: false,
        approving: true,
        back: true,
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
                        text: 'Type', field: 'type', type: 'lookup-link', width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Main Task' },
                                { name: 'Sub Task' }
                            ]
                        }
                    },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup-link',
                        schema: { module: 'project', path: 'projects' }
                    },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'label-date' },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'label-date', },
                    { text: 'Actual Start Date', field: 'actualStartDate', width: 4, type: 'label-date', },
                    { text: 'Actual End Date', field: 'actualEndDate', width: 4, type: 'label-date', },
                    {
                        text: 'Status', field: 'status', width: 4, type: 'lookup-link',
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                    // {
                    //     text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-link',
                    //     schema: { module: 'priorityStatusType' }
                    // },
                    { text: 'Duration', field: 'duration', width: 4, type: 'label' },
                    { text: 'Progress(%)', field: 'progressPercentage', width: 4, type: 'label' },

                    { text: 'Estimate Cost', field: 'costEstimate', width: 4, type: 'label' },
                    { text: 'Actual Cost', field: 'actualCost', width: 4, type: 'label' },
                    {
                        text: 'Assigned To', field: 'member', width: 4, type: 'label',
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'Notes', field: 'notes', width: 4, type: 'label' },
                    {
                        text: 'Labour Provided By', field: 'labourProvidedBy', width: 4, type: 'lookup-link',
                        schema: { module: 'contractor', path: 'contractors' }
                    },
                    {
                        text: 'Material Provided By', field: 'materialProvidedBy', width: 4, type: 'lookup-link',
                        schema: { module: 'contractor', path: 'contractors' }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Item List', field: 'items', width: 12, type: 'table-input', readonly: true,
                        schema: {
                            readonly: true,
                            module: 'activity',
                            paging: true,
                            searching: true,
                            editing: false,
                            adding: false,
                            delete: false,
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
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'image-gallery',
                        field: 'images',
                        text: 'Activity Images',
                        schema: {
                            searchKey: "parentId",
                            searchId: id,
                            searchModule: "activity"
                        }
                    }
                ]
            }
        ]
    }

    return (<IUIApprovalPage schema={schema} />)
}