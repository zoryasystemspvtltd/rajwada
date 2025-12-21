import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { setSave } from '../../store/api-db';
import api from "../../store/api-service";
import { notify } from '../../store/notification';
import IUIPage from "../common/IUIPage.jsx";
import IUIListFilter from "./IUIListFilter.jsx";

export const ListActivityForTransfer = () => {

    const schema = {
        module: 'activity',
        title: 'Work Transfer',
        path: 'worktransfers',
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


export const ViewActivityForTransfer = () => {
    const { id } = useParams();

    const module = "user";
    // const schema = props?.schema;
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [otherUsers, setOtherUsers] = useState([]);
    const [reason, setReason] = useState("");

    const [oldUser, setOldUser] = useState(null);
    const [newUser, setNewUser] = useState(null);

    const [error, setError] = useState({});
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const dispatch = useDispatch();

    const schema = {
        module: 'activity',
        title: 'Work Transfer',
        path: 'worktransfers',
        showBreadcrumbs: true,
        editing: false,
        adding: false,
        deleting: false,
        assign: false,
        assignType: 'multiple',
        assignChild: false,
        approving: false,
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
                        text: 'Assigned To', field: 'member', width: 4, type: 'label',
                        schema: { module: 'user', path: 'users' }
                    }
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        type: 'module-relation',
                        schema: {
                            module: 'activity',
                            relationKey: "parentId",
                            title: 'Related Work',
                            path: 'works',
                            paging: true,
                            searching: false,
                            editing: false,
                            adding: false,
                            delete: false,
                            enableCheckBoxRow: false,
                            fields: [
                                { text: 'Name', field: 'name', type: 'text', sorting: true, searching: true, },
                                { text: 'Description', field: 'description', type: 'text', sorting: false, searching: false },
                            ]
                        },
                    }
                ]
            }
        ]
    }

    useEffect(() => {
        async function fetchData() {
            const pageOptions = { recordPerPage: 0 }
            const response = await api.getData({ module: module, options: pageOptions });

            let allAssignedUsersResponse = await api.assignedUsers({ module: schema?.module, id: id });
            let allAssignedUsers = allAssignedUsersResponse?.data;

            const assignedUsersTemp = allAssignedUsers?.map((item) => {
                return response?.data?.items?.find(user => user.email === item?.member)
            })?.filter(value => value !== undefined) || [];

            const assignedUserIds = allAssignedUsers?.map((item) => {
                return response?.data?.items?.find(user => user.email === item?.member)?.id
            })?.filter(value => value !== undefined) || [];

            setAssignedUsers(assignedUsersTemp);
            setOtherUsers(response?.data?.items?.filter((user) => !assignedUserIds.includes(user.id)));
        }

        fetchData();
    }, []);

    async function performTransfer() {
        if (!oldUser || !newUser || reason === "") {
            alert("All inputs are mandatory!");
            return;
        }

        try {
            await multiUserAssignment("activity", id, [newUser]);
            await multiUserUnassignment("activity", id, [oldUser]); // unassign users

            let isAllAssignSuccessful = true;

            const newBaseFilter = {
                name: 'parentId',
                value: parseInt(id)
            }

            const pageOptions = {
                recordPerPage: 0
                , searchCondition: newBaseFilter
            }

            const childResponse = await api.getData({ module: "activity", options: pageOptions });
            let childrenItems = childResponse?.data?.items;
            try {
                // Multi user assignment for children
                for (let item of childrenItems) {
                    await multiUserAssignment("activity", item.id, [newUser]);
                    await multiUserUnassignment("activity", item.id, [oldUser]);
                }

                // Add Logic to record transfer operation in new activity transfer table
                // TODO
            }
            catch (error) {
                isAllAssignSuccessful = false;
            }

            if (isAllAssignSuccessful) {
                notify("success", "Transfer Successful!");
            }
            else {
                notify("error", "Transfer failed!");
            }
        } catch (err) {
            console.error(err);
            setError(err.message || "Error performing transfer");
        } finally {

        }
    }

    const multiUserAssignment = async (module, dataId, userList) => {
        for (let user of userList) {
            let action = {};
            if (module === 'activity') {
                action = { module: module, data: { id: dataId, member: user.email, userId: user.id, status: 3, modifiedBy: loggedInUser?.email } }
            }
            else {
                //status :3 means assigned
                action = { module: module, data: { id: dataId, member: user.email, status: 3, modifiedBy: loggedInUser?.email } }
            }
            try {
                await api.editPartialData(action);
                dispatch(setSave({ module: module }));
                //navigate(-1);

            } catch (e) {
                // TODO
            }
        }
        return;
    }

    const multiUserUnassignment = async (module, dataId, uncheckedUserList) => {
        for (let user of uncheckedUserList) {
            let action = {};
            if (module === 'activity') {
                action = { module: module, data: { id: dataId, member: user.email, userId: user.id, status: -3, modifiedBy: loggedInUser?.email } }
            }
            else {
                action = { module: module, data: { id: dataId, member: user.email, status: -3, modifiedBy: loggedInUser?.email } }
            }
            try {
                await api.editPartialData(action);
                dispatch(setSave({ module: module }));
                //navigate(-1);

            } catch (e) {
                // TODO
            }
        }
        return;
    }

    return (<>
        <IUIPage schema={schema} />
        <div className="app-page-title">
            <div className="page-title-heading">Transfer Work</div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="main-card mb-2 card">
                    <div className="card-body">
                        <div className="mb-2">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12 col-lg-2 m-2">
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor="parameter" >
                                                Transfer From
                                                <span className="text-danger">*</span>
                                            </Form.Label>
                                            <select
                                                id="parameter"
                                                value={oldUser}
                                                name='parameter'
                                                className={`form-control`}
                                                onChange={e => setOldUser(e.target.value)}>
                                                {assignedUsers?.map((item, i) => (
                                                    <option key={i} value={item}>{item?.email}</option>
                                                ))}
                                            </select>

                                        </Form.Group>
                                    </div>

                                    <div className="col-md-12 col-lg-2 m-2">
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor="parameter" >
                                                Transfer To
                                                <span className="text-danger">*</span>
                                            </Form.Label>
                                            <select
                                                id="parameter"
                                                value={newUser}
                                                name='parameter'
                                                className={`form-control`}
                                                onChange={e => setNewUser(e.target.value)}>
                                                {otherUsers?.map((item, i) => (
                                                    <option key={i} value={item}>{item?.email}</option>
                                                ))}
                                            </select>

                                        </Form.Group>
                                    </div>

                                    <div className="col-md-12 col-lg-2 m-2">
                                        <Form.Group className="position-relative form-group">
                                            <Form.Label htmlFor="reason" >
                                                Transfer Reason
                                            </Form.Label>
                                            <span className="text-danger">*</span>

                                            <Form.Control type="text"
                                                name="reason"
                                                id="reason"
                                                className={`form-control`}
                                                placeholder="Transfer reason"
                                                value={reason}
                                                onChange={e => setReason(e.target.value)} />
                                        </Form.Group>
                                    </div>

                                    <div className="col-md-12 col-lg-2 d-flex justify-content-center align-items-center">
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md"
                                            onClick={performTransfer}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </>)
}
