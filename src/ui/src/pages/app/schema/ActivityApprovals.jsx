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
                                            <a data-bs-toggle="tab" href="#approval-pending" className="active nav-link">Approval Pending</a>
                                        </li>
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#approval-completed" className="nav-link">Approval Completed</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="approval-pending" role="tabpanel">
                                            <IUIApprovalList schema={schema} filter='Sub Task' filterSchema={filterSchema?.approvalPending} />
                                        </div>

                                        <div className="tab-pane" id="approval-completed" role="tabpanel">
                                            <IUIApprovalList schema={schema} filter='Sub Task' filterSchema={filterSchema?.approvalCompleted} />
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
        path: 'activities',
        showBreadcrumbs: true,
        editing: true,
        adding: false,
        deleting: false,
        approving: true,
        back: true,
        readonly: true,
        fields: [
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
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup-link',
                        schema: { module: 'activity', path: 'activities' }
                    },
                    { text: 'Start Date', field: 'startDate', width: 4, type: 'label-date' },
                    { text: 'End Date', field: 'endDate', width: 4, type: 'label-date', },
                    { text: 'Actual Start Date', field: 'actualStartDate', width: 4, type: 'label-date', },
                    { text: 'Actual End Date', field: 'actualEndDate', width: 4, type: 'label-date', },
                    {
                        text: 'Status', field: 'status', type: 'lookup-enum', width: 4, textonly: true,
                        schema: { module: 'statusType' }
                    },

                    { text: 'Duration', field: 'Duration', width: 4, type: 'label' },
                    { text: 'Progress(%)', field: 'progressPercentage', width: 4, type: 'label' },
                    { text: 'Estimate Cost', field: 'costEstimate', width: 4, type: 'label' },
                    { text: 'Actual Cost', field: 'actualCost', width: 4, type: 'label' },
                    {
                        text: 'Assigned To', field: 'member', width: 4, type: 'label',
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'QC Remarks', field: 'qcRemarks', type: 'label', width: 4 },
                    { text: 'HOD Remarks', field: 'hodRemarks', type: 'label', width: 4 },
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
                            collate: true,
                            collateSchema: {
                                module: 'activitytracking',
                                parentKey: 'activityId',
                                parentValue: id,
                                searchKey: 'item'
                            },
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
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'Activity Blueprint', field: 'photoUrl', placeholder: 'Flat Blueprint here...', type: 'ilab-canvas', shape: 'rect',
                        schema: {
                            readonly: true,
                            upload: false,
                            save: false,
                            parentId: id,
                            goBack: true,
                            parent: {
                                module: 'activity',
                                filter: 'activityId',
                                path: 'activities'
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
                    }
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