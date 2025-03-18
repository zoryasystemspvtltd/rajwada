import { useSelector } from 'react-redux';
import IUIApprovalList from "../../common/IUIApprovalList.jsx";

export const ListActivityApproval = () => {
    const loggedInUser = useSelector((state) => state.api.loggedInUser);

    const schema = {
        module: 'activity',
        title: 'Activity',
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

    const filterSchema = {
        fields: {

        }
    }

    return (<IUIApprovalList schema={schema} filter='Main Task' />)
}