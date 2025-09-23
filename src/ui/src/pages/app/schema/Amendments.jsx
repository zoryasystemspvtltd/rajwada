import { useParams } from "react-router-dom";
import amendmentSchema from "../../../store/amendment-schema.json";
import IUIAmendmentList from "../../common/IUIAmendmentList.jsx";
import IUIBreadcrumb from '../../common/shared/IUIBreadcrumb.jsx';
import IUIAmendmentPage from "../../common/IUIAmendmentPage.jsx";

export const ListAmendment = () => {
    const schema = {
        module: 'activityamendment',
        title: 'Activity Amendment',
        relationKey: "parentId",
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
                                            <a data-bs-toggle="tab" href="#new-amendments" className="active nav-link">Amendments In Progress</a>
                                        </li>
                                        <li className="nav-item">
                                            <a data-bs-toggle="tab" href="#completed-amendments" className="nav-link">Amendments Completed</a>
                                        </li>
                                    </ul>
                                </div>


                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="new-amendments" role="tabpanel">
                                            <IUIAmendmentList schema={schema} filter={null} filterSchema={filterSchema?.amendmentInProgress} />
                                        </div>


                                        <div className="tab-pane" id="completed-amendments" role="tabpanel">
                                            <IUIAmendmentList schema={schema} filter={null} filterSchema={filterSchema?.amendmentCompleted} />
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
