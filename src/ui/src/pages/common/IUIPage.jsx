import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Modal, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData, editData, addData, setSave } from '../../store/api-db'
import { useDispatch, useSelector } from 'react-redux'
import IUIPageElement from './shared/IUIPageElement';
import IUIModuleMessage from './shared/IUIModuleMessage';
import api from '../../store/api-service'
import IUIBreadcrumb from './shared/IUIBreadcrumb';
import IUIAssign from './shared/IUIAssign';
import IUIApprover from './shared/IUIApprover';
import { notify } from "../../store/notification";
import { isDeleteAllowed } from '../../store/delete-service';
import IUIMultiAssign from './shared/IUIMultiAssign';
import IUICopy from './shared/IUICopy';
import IUIMultiCopyFilter from './shared/IUIMultiCopyFilter';

const IUIPage = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;
    const [defaultValues, setDefaultValues] = useState({});
    const flowchartKey = "dependency-flow";
    const [isInProgress, setIsInProgress] = useState(false);
    // Parameter
    const { id } = useParams();
    const { parentId } = useParams();
    // console.log(parentId)
    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    // const selectedDataId = useSelector((state) => state.api[module]?.selectedItemId)
    const [dirty, setDirty] = useState(false)
    // Local State
    const [data, setData] = useState({});
    const [multiCopiedData, setMultiCopiedData] = useState([]);
    const [amendmentData, setAmendmentData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [disabled, setDisabled] = useState(false)
    const [approvalStatus, setApprovalStatus] = useState({});
    const [approvedMemeber, setApprovalBy] = useState({});
    const [remarks, setRemarks] = useState('');
    const [approvalType, setApprovalType] = useState('');
    const [showRemarksModal, setShowRemarksModal] = useState(false);
    const [oldData, setOldData] = useState({});
    const [auditPrivileges, setAuditPrivileges] = useState({});
    // Usage
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const computeDeps = schema?.fields?.flatMap(f => f?.fields)
        ?.filter(f => f?.type?.startsWith('compute'))
        ?.flatMap(f => f?.dependsOn);
    const defaultDeps = React.useMemo(() => {
        return schema?.fields
            ?.flatMap(f => f?.fields || [])
            ?.filter(f => f?.hasDefaultValue)
            ?.map(f => f?.ownSearchField)
            ?.filter(Boolean) || [];
    }, [schema]);

    useEffect(() => {
        async function fetchData() {
            if (id) {
                const item = await api.getSingleData({ module: module, id: id });
                if (schema?.isAmendment) {
                    setAmendmentData(item.data);
                    setData(JSON.parse(item.data?.newValues));
                    // print and check full activity details
                }
                else {
                    setData(item.data);
                }
                setOldData(item.data);
                setApprovalStatus(item.data.status);
                setApprovalBy(item.data.member);
            }
        }


        fetchData();
    }, [id]);

    useEffect(() => {
        if (!props?.defaultValues || !schema) return;

        const newData = { ...data };

        schema?.defaultFields?.forEach((fld) => {
            newData[fld.field] =
                !["photo", "text"].includes(fld.type)
                    ? parseInt(props?.defaultValues[fld.field])
                    : props?.defaultValues[fld.field];
        });

        setData(newData);
    }, [props?.defaultValues, schema]);

    const isDataReadyForDefaults = React.useMemo(() => {
        if (!defaultDeps.length) return true;
        return defaultDeps.every(dep => data?.[dep] != null);
    }, [data, defaultDeps]);


    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access);
        if (module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, module]);

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === "auditLog")?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setAuditPrivileges(access);
        if (module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, module]);

    useEffect(() => {
        const updates = {};


        schema?.fields?.flatMap(f => f?.fields)?.forEach(fld => {
            if (fld?.type?.startsWith('compute')) {
                updates[fld.field] = fld.compute(data);
            }
        });

        setData(prev => ({ ...prev, ...updates }));
        // console.log(updates)
    }, computeDeps.map(dep => data[dep]));


    const prepareDefaultValue = async (fld) => {
        const defaultType = fld?.defaultType;
        //console.log(fld)
        if (defaultType === 'direct') {
            return fld?.defaultValue;
        }

        if (defaultType === 'indirect') {
            const { dependsOnModule, dependsOnField, ownSearchField, otherModuleSearchField } = fld;
            // Do NOT permanently exit — wait for data
            if (!data?.[ownSearchField]) {
                return undefined;
            }

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: {
                    name: otherModuleSearchField,
                    value: parseInt(data[ownSearchField])
                }
            };

            const response = await api.getData({
                module: dependsOnModule,
                options: pageOptions
            });
            return response?.data?.items?.[0]?.[dependsOnField];
        }

        return undefined;
    };


    const prepareDefaultValues = async (schema) => {
        const fields = schema?.fields?.flatMap(f => f?.fields) || {};
        const updates = {};

        for (const fld of fields) {
            if (fld?.hasDefaultValue) {
                const value = await prepareDefaultValue(fld);
                if (value !== undefined) {
                    updates[fld.field] = value;
                }
            }
        }

        return updates;
    };

    useEffect(() => {
        if (!schema || !isDataReadyForDefaults) return;

        let cancelled = false;

        const initDefaults = async () => {
            const updates = await prepareDefaultValues(schema);

            if (!cancelled && Object.keys(updates).length) {
                setData(prev => ({ ...prev, ...updates }));
            }
        };

        initDefaults();

        return () => {
            cancelled = true;
        };
    }, [schema, isDataReadyForDefaults]);


    const handleAuditClick = () => {
        navigate("/audit-logs", { state: { id: id, childModule: module, disableSelection: true } });
    };

    useEffect(() => {
        if (dirty) {
            const error = validate(data, schema?.fields)
            setErrors(error);
        }
    }, [data, dirty]);

    const handleChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
    };

    const handleCopyChange = (e) => {
        e.preventDefault();
        const newData = { ...data, ...e.target.value }
        setData(newData);
    }

    const handleMultiCopyChange = (e) => {
        e.preventDefault();
        // console.log(e.target.value);
        notify('info', `Selected items for ${schema?.title} copied, provide other inputs and click the Save button`)
        setMultiCopiedData(e.target.value);
    }

    const handleRemarksChange = (event) => {
        const { value } = event.target;
        setRemarks(value);
    };

    const validate = (values, fields) => {
        let errors = {};

        for (let i = 0; i < fields?.length; i++) {
            let item = fields[i];
            if (item.type === 'area') {
                errors = { ...errors, ...validate(values, item.fields) }
            }
            if (item.required && !values) {
                errors[item.field] = `Required field.`;
            }
            if (item.required && values && !values[item?.field]) {
                errors[item.field] = `Required field.`;
            }
            if (item.type === 'text' && values && values[item?.field]) {
                if (values[item?.field]?.includes("/")) {
                    errors[item.field] = 'Text cannot contain /';
                }
            }
            if (item.type === 'email' && values && values[item?.field]) {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[item.field])) {
                    errors[item.field] = 'Invalid email address.'
                }
            }
            if (item.type === 'phone' && values && values[item?.field]) {
                const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
                //var pattern = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/); // /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
                if (!regex.test(values[item.field])) {
                    errors[item.field] = 'Invalid phone number.'
                }
            }
            if (item.type === 'radio') {
                errors = { ...errors, ...validate(values, item.fields) }
            }
            if (item.type === 'lookup-relation') {
                if (item?.exclusionCondition && values && values[item?.exclusionCondition?.field] === item?.exclusionCondition?.value && !values[item?.field]) {
                    errors[item.field] = `Required field.`;
                }
            }
            if (item.type === 'number' && values[item?.field]) {
                try {
                    let numericValue = parseInt(values[item?.field]);
                    if (numericValue < 0) {
                        errors[item.field] = `Negative input not allowed.`;
                    }
                }
                catch (e) {
                    errors[item.field] = `Invalid Input.`;
                }
            }
        }
        return errors;
    };

    const assignPageValue = async (e, email, userId) => {
        e.preventDefault();
        let action = {};
        if (module === 'activity') {
            action = { module: module, data: { id: id, member: email, userId: userId, status: 3, modifiedBy: loggedInUser?.email } }
        }
        else {
            //status :3 means assigned
            action = { module: module, data: { id: id, member: email, status: 3, modifiedBy: loggedInUser?.email } }
        }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }))
            //navigate(-1);
            notify("success", "Assignment Successful !");
        } catch (e) {
            // TODO
        }
    }

    const assignMultiPageValue = async (e, userList, uncheckedUserList) => {
        e.preventDefault();
        let isAllAssignSuccessful = true;
        // Multi user assignment for main item
        await multiUserAssignment(id, userList);
        await multiUserUnassignment(id, uncheckedUserList); // unassign users
        if (schema?.assignChild) {
            const newBaseFilter = {
                name: 'parentId',
                value: parseInt(id)
            }

            const pageOptions = {
                recordPerPage: 0
                , searchCondition: newBaseFilter
            }

            const childResponse = await api.getData({ module: module, options: pageOptions });
            let childrenItems = childResponse?.data?.items;
            try {
                // Multi user assignment for children
                for (let item of childrenItems) {
                    await multiUserAssignment(item.id, userList);
                    await multiUserUnassignment(item.id, uncheckedUserList);
                }
            }
            catch (error) {
                isAllAssignSuccessful = false;
            }
        }
        if (isAllAssignSuccessful) {
            notify("success", "Assignments Successful !");
        }
        else {
            notify("error", "One or more assignments failed !");
        }
        window.location.reload();
    }

    const multiUserAssignment = async (dataId, userList) => {
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

    const multiUserUnassignment = async (dataId, uncheckedUserList) => {
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

    const assignDirect = async (userId) => {
        const user = await api.getSingleData({ module: "user", id: userId });
        let email = user.data.email;
        const action = { module: module, data: { id: id, member: email, status: 2, modifiedBy: loggedInUser?.email } }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }))
            //navigate(-1);


        } catch (e) {
            // TODO
        }
    }

    const assignApprover = async (e, email) => {
        e.preventDefault();
        //status :3 means assigned
        const action = { module: module, data: { id: id, member: email, status: 3, modifiedBy: loggedInUser?.email } }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }));

            const timeId = setTimeout(() => {
                // After 3 seconds set the show value to false
                navigate(0);
            }, 1000)

            return () => {
                clearTimeout(timeId)
            }
        } catch (e) {
            // TODO
        }
    }

    const approvedPageValue = async (e, isApproved) => {
        e.preventDefault();
        if (!remarks || remarks === '') {
            notify("error", "Remarks is mandatory !");
            return;
        }
        const current = new Date();
        const action = {
            module: module,
            data: { id: id, status: isApproved ? 4 : 6, approvedBy: approvedMemeber, approvedDate: current, isApproved: isApproved, isCompleted: isApproved, approvedRemarks: remarks, modifiedBy: loggedInUser?.email }
        }
        try {
            await api.editPartialData(action);
            dispatch(setSave({ module: module }));

            const timeId = setTimeout(async () => {
                // After 3 seconds set the show value to false
                setShowRemarksModal(false);
                // Mark Activity as Completed
                if (module === 'activity' && isApproved) {
                    const updatedActivityData = {
                        ...data,
                        isCompleted: true,
                        actualEndDate: new Date()
                    };
                    await api.editData({ module: 'activity', data: updatedActivityData });
                }
                navigate(0);
            }, 1000)

            return () => {
                clearTimeout(timeId)
            }

        } catch (e) {
            // TODO
        }
    }

    const handleModalClose = () => {
        setShowRemarksModal(false);
        setRemarks('');
    }

    const deletePageValue = async (e) => {
        try {
            e.preventDefault();
            setIsInProgress(true);

            const isAllowed = await isDeleteAllowed(module, id);

            if (isAllowed) {
                api.deleteData({ module: module, id: id });
                dispatch(setSave({ module: module }))

                const timeId = setTimeout(() => {
                    // After 3 seconds set the show value to false
                    navigate(-1);
                    notify('success', 'Deletion successful !');
                }, 1000)

                return () => {
                    clearTimeout(timeId)
                }
            }
            else {
                notify("error", "Deletion failed ! Kindly check for relation constraints");
            }
        }
        catch (error) {
            notify("error", "Deletion failed ! Kindly check for relation constraints");
        }
        finally {
            setIsInProgress(false);
        }
    }

    const addIndividualForMultiCopy = async (copiedData) => {
        const newData = { ...data, [schema?.multiCopySchema?.copyField]: copiedData[schema?.multiCopySchema?.copyField] };
        console.log(newData); // remove after check
        const response = await api.addData({ module: schema?.module, data: newData });
        return response.data;
    }

    const saveDependencyItemWithPeople = async (people, dependencyId, departmentId, item) => {
        const addPayload = {
            ...item,
            resourceType: "item",
            notifyBefore: people?.notifyDuration,
            availabilityStatus: 0,
            assignedUser: people?.member,
            dependencyId: parseInt(dependencyId),
            departmentId: parseInt(departmentId)
        };
        return await api.addData({ module: 'dependencyResource', data: addPayload });
    }

    const addSingleDependencyItem = async (item, dependencyId) => {
        const itemPeople = item?.assign?.people;
        const departmentId = item?.assign?.department;

        if (itemPeople?.length > 0) {
            // Item has 1 or more people assigned
            const addPromises = itemPeople.map(p => saveDependencyItemWithPeople(p, dependencyId, departmentId, item));
            return await Promise.all(addPromises);
        }
        else {
            // Item has no people assigned
            const addPayload = {
                ...item,
                resourceType: "item",
                availabilityStatus: 0,
                dependencyId: parseInt(dependencyId)
            };
            return await api.addData({ module: 'dependencyResource', data: addPayload });
        }
    }

    const saveDependencyResources = async (data, dependencyId) => {
        const dependencyItems = JSON.parse(data?.items);

        if (dependencyItems?.length > 0) {
            const addPromises = dependencyItems.map(item => addSingleDependencyItem(item, dependencyId));
            await Promise.all(addPromises);
        }
        return;
    }

    const deleteDependencyResource = async (itemId) => {
        const response = await api.deleteData({ module: 'dependencyResource', id: itemId });
        return response.data;
    }

    const updateDependencyResources = async (data, dependencyId) => {
        const newBaseFilter = {
            name: 'dependencyId',
            value: parseInt(dependencyId)
        }

        const pageOptions = {
            recordPerPage: 0,
            searchCondition: newBaseFilter
        }

        const response = await api.getData({ module: 'dependencyResource', options: pageOptions });
        let itemData = response?.data?.items;

        if (itemData.length > 0) {
            const deletePromises = itemData.map(unit => deleteDependencyResource(unit.id));
            await Promise.all(deletePromises);
        }

        return await saveDependencyResources(data, dependencyId);
    }

    const prepareItemsForActivity = (data) => {
        const items = JSON.parse(data?.items);
        if (items?.length === 0) return;

        let output = [];
        items?.forEach((item) => {
            let people = item?.assign?.people;
            let assignedList = [];

            people?.forEach((p) => {
                let newAssign = { member: p?.member, notifyBefore: item?.assign?.notifyDuration, departmentId: item?.assign?.departmentId };
                assignedList.push(newAssign);
            })

            delete item?.assign;
            output.push({ ...item, assignedList: assignedList })
        });

        return JSON.stringify(output);
    }

    const savePageValue = async (e) => {
        e.preventDefault();

        if (!props?.readonly) {
            setDirty(true);
            const error = validate(data, schema?.fields)
            setErrors(error);

            if (schema?.multiCopy && multiCopiedData?.length > 0) {
                // Add logic to add items
                try {
                    if (Object.keys(error).length === 0) {


                        const addPromises = multiCopiedData?.map(data => addIndividualForMultiCopy(data));
                        await Promise.all(addPromises);


                        const timeId = setTimeout(() => {
                            // After 3 seconds set the show value to false
                            navigate(-1);
                            localStorage.removeItem(flowchartKey);
                        }, 1000)


                        return () => {
                            clearTimeout(timeId)
                        }
                    }
                }
                catch (e) {
                    // TODO
                }
            }
            else if (Object.keys(error).length === 0) {
                if (!data)
                    return
                setDisabled(true)
                if (id != undefined)
                    // Check for Amendment Data
                    try {
                        setIsInProgress(true);

                        if (schema?.isAmendment) {
                            // Update the data in amendment table
                            // Change planned end date in activity table
                            let amendmentAction = {
                                module: 'activityamendment',
                                data: {
                                    ...amendmentData, oldData: JSON.stringify(oldData), newValues: JSON.stringify(data), amendmentStatus: 1
                                }
                            }

                            await api.editData(amendmentAction);

                            await api.editData({ module: 'activity', data: { ...data, oldValues: JSON.stringify(oldData), progressPercentage: 50 } });
                        }
                        else {
                            await api.editData({ module: module, data: (module === 'workflow') ? { ...data, oldValues: JSON.stringify(oldData), data: localStorage.getItem(flowchartKey) ? localStorage.getItem(flowchartKey) : "" } : { ...data, oldValues: JSON.stringify(oldData) } });
                            if (module === 'dependency') {
                                await updateDependencyResources(data, id);
                            }
                        }
                        dispatch(setSave({ module: module }))

                        const timeId = setTimeout(() => {
                            // After 3 seconds set the show value to false
                            if (schema?.assignNext) {
                                assignDirect(data?.[schema?.assignField]);
                            }
                            if (schema?.goNextList) {
                                navigate(`/${schema.path}`);
                            }
                            else {
                                navigate(-1);
                                localStorage.removeItem(flowchartKey);
                            }
                            notify('success', 'Edit successful !');
                        }, 1000)

                        return () => {
                            clearTimeout(timeId)
                        }

                    } catch (e) {
                        // TODO
                        notify('error', 'Edit operation failed !');
                    }
                    finally {
                        setIsInProgress(false);
                    }
                else
                    try {
                        // console.log(data);
                        setIsInProgress(true);
                        let response = await api.addData(
                            {
                                module: module,
                                data: (module === 'workflow') ? { ...data, data: localStorage.getItem(flowchartKey) ? localStorage.getItem(flowchartKey) : "" } :
                                    (module === 'activity') ? { ...data, items: prepareItemsForActivity(data) } : data
                            }
                        );
                        console.log(response)
                        if (module === 'dependency') {
                            await saveDependencyResources(data, response?.data);
                        }
                        dispatch(setSave({ module: module }))
                        const timeId = setTimeout(() => {
                            // After 3 seconds set the show value to false
                            if (module === 'activity') {
                                props?.activityCallback({ status: true, id: response?.data });
                                notify('success', `Activity ${data?.name} created successfully !`);
                                return;
                            }
                            else {
                                if (schema.goNextView) {
                                    navigate(`/${schema.path}/${response.data}`);
                                }
                                else if (schema.goNextEdit) {
                                    navigate(`/${schema.path}/${response.data}/edit`);
                                } else {
                                    navigate(-1);
                                    localStorage.removeItem(flowchartKey);
                                }
                            }
                            notify('success', 'Creation successful !')
                        }, 1000)

                        return () => {
                            clearTimeout(timeId)
                        }
                    } catch (e) {
                        // TODO
                        console.log(e);
                        notify('error', 'Creation failed !')
                        if (module === 'activity') {
                            props?.activityCallback({ status: false, id: -1 });
                            return;
                        }
                    }
                    finally {
                        setIsInProgress(false);
                    }
            }
        }
    };

    return (
        <>
            <div className="app-page-title">
                {
                    schema?.showBreadcrumbs ?
                        <Row>
                            <Col md={12}>
                                <IUIBreadcrumb schema={{ type: 'view', module: module, displayText: schema?.title }} />
                            </Col>
                        </Row> :
                        <div className="page-title-heading"> {(module !== 'activity') ? schema?.title : ''}</div>
                }
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <div>
                                        {/* {
                                            schema?.showBreadcrumbs && <Row>
                                                <Col md={12} className='mb-3'>
                                                    <IUIBreadcrumb schema={{ type: 'view', module: module, displayText: schema?.title }} />
                                                </Col>
                                            </Row>
                                        } */}
                                        <Form>
                                            <Row>
                                                <Col>
                                                    {((module !== 'activity' && schema?.back) || (module === 'activity' && !schema?.adding && schema?.back)) &&
                                                        <Button variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                            onClick={() => navigate(-1)}> Back</Button>
                                                    }
                                                    {/* {!schema?.readonly &&
                                                        <>
                                                            {(privileges?.add || privileges?.edit) &&
                                                                <>
                                                                    <Button variant="contained"
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                        onClick={savePageValue}>Save </Button>


                                                                    <Button variant="contained"
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                        onClick={() => navigate(-1)}> Cancel</Button>
                                                                </>
                                                            }
                                                        </>
                                                    } */}
                                                    {(schema?.adding && module !== 'activity') &&
                                                        <>
                                                            {privileges?.add &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${schema.path}/add`)}
                                                                >
                                                                    Add New
                                                                </Button>
                                                            }
                                                        </>
                                                    }
                                                    {
                                                        // Edit allowed until approvalStatus <= 3 (3 -> Assigned)
                                                        approvalStatus <= 3 &&
                                                        <>
                                                            {schema?.editing &&
                                                                <>
                                                                    {privileges?.edit &&
                                                                        <Button
                                                                            variant="contained"
                                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                            onClick={() => navigate(`/${schema.path}/${id}/edit`)}
                                                                        >
                                                                            Edit
                                                                        </Button>
                                                                    }
                                                                </>
                                                            }
                                                            {schema?.deleting &&
                                                                <>
                                                                    {privileges?.delete &&
                                                                        <Button
                                                                            variant="contained"
                                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                            onClick={deletePageValue}
                                                                        >
                                                                            Delete
                                                                        </Button>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                    {
                                                        (auditPrivileges?.view && module !== "auditLog" && (!schema?.adding || !schema?.editing)) && !schema?.isAmendment && schema?.readonly &&
                                                        <>
                                                            <Button
                                                                variant="contained"
                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                onClick={() => handleAuditClick()}
                                                            >
                                                                Change History
                                                            </Button>
                                                        </>
                                                    }
                                                    {
                                                        (approvalStatus === 3 || approvalStatus === 7) && loggedInUser?.email === data.member &&
                                                        <>
                                                            {
                                                                schema?.readonly && privileges?.approve &&
                                                                <Button variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={(e) => { setShowRemarksModal(true); setApprovalType("Approve"); }}> Approve</Button>
                                                            }
                                                            {
                                                                schema?.readonly && privileges?.approve &&
                                                                <Button variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-sm mr-2"
                                                                    onClick={(e) => { setShowRemarksModal(true); setApprovalType("Reject"); }}> Reject</Button>
                                                            }
                                                        </>
                                                    }
                                                    {schema?.assign && privileges?.assign && schema?.assignType === 'single' && (approvalStatus !== 3 && approvalStatus !== 4 && approvalStatus !== 6) &&
                                                        <IUIAssign onClick={assignPageValue} />
                                                    }
                                                    {schema?.assign && privileges?.assign && schema?.assignType === 'multiple' && (approvalStatus !== 4 && approvalStatus !== 6) &&
                                                        <IUIMultiAssign onClick={assignMultiPageValue} schema={{ module: module, id: id }} />
                                                    }
                                                    {/* Condition modified by Adrish */}
                                                    {schema?.approving && privileges?.assign && approvalStatus === 3 && loggedInUser?.email !== data.member &&
                                                        <IUIApprover onClick={assignApprover} />
                                                    }
                                                    <IUIModuleMessage schema={props.schema} />
                                                </Col>
                                            </Row>
                                            {
                                                ((module !== 'activity') && (schema?.back || schema?.adding || schema?.editing)) || (module === 'activity' && (schema?.editing || schema?.back)) ?
                                                    <hr /> : null
                                            }
                                            {
                                                schema?.copy && <IUICopy
                                                    schema={schema?.copySchema}
                                                    onChange={handleCopyChange}
                                                />
                                            }
                                            {
                                                schema?.multiCopy && <IUIMultiCopyFilter
                                                    schema={schema?.multiCopySchema}
                                                    onChange={handleMultiCopyChange}
                                                />
                                            }
                                            <Row>
                                                {schema?.fields?.map((fld, f) => (
                                                    <Col md={fld.width || 6} key={f}>
                                                        {fld.type === 'area' &&
                                                            <>
                                                                <IUIPageElement
                                                                    id={schema.module}
                                                                    schema={fld.fields}
                                                                    value={data}
                                                                    errors={errors}
                                                                    readonly={schema.readonly}
                                                                    onChange={handleChange}
                                                                    dirty={dirty}
                                                                    defaultFields={schema?.defaultFields || []}
                                                                />
                                                                {/* <br /> */}
                                                            </>
                                                        }
                                                        {fld.type !== 'area' &&
                                                            <>
                                                                <IUIPageElement
                                                                    id={schema.module}
                                                                    schema={[fld]}
                                                                    value={data}
                                                                    errors={errors}
                                                                    onChange={handleChange}
                                                                    readonly={schema.readonly}
                                                                />
                                                                {/* <br /> */}
                                                            </>
                                                        }
                                                    </Col>
                                                ))}
                                            </Row>

                                            {(!schema?.readonly && (privileges?.add || privileges?.edit)) &&
                                                <hr />
                                            }
                                            <Row>
                                                <Col>
                                                    {!schema?.readonly &&
                                                        <>
                                                            {(privileges?.add || privileges?.edit) &&
                                                                <>
                                                                    <Button variant="contained"
                                                                        disabled={disabled}
                                                                        className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-md mr-2"
                                                                        onClick={savePageValue}>
                                                                        Save 
                                                                        {
                                                                            isInProgress && <Spinner size='sm' className='ml-2' animation='border' role='status'>
                                                                                <span className='visually-hidden'>Loading....</span>
                                                                            </Spinner>
                                                                        }
                                                                    </Button>


                                                                    {
                                                                        ((module !== 'activity') || (module === 'activity' && !schema?.adding)) && (
                                                                            <Button variant="contained"
                                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary btn-md mr-2"
                                                                                onClick={() => navigate(-1)}> Cancel
                                                                            </Button>
                                                                        )
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                    {/* {schema?.adding &&
                                                        <>
                                                            {privileges?.add &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${schema.module}s/add`)}
                                                                >
                                                                    Add New
                                                                </Button>
                                                            }
                                                        </>
                                                    } */}
                                                    {/* {schema?.editing &&
                                                        <>
                                                            {privileges?.edit &&
                                                                <Button
                                                                    variant="contained"
                                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mr-2"
                                                                    onClick={() => navigate(`/${schema.module}s/${id}/edit`)}
                                                                >
                                                                    Edit
                                                                </Button>
                                                            }
                                                        </>
                                                    } */}
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            (showRemarksModal) && <Modal show={showRemarksModal} onHide={handleModalClose}>
                                <Modal.Header closeButton>
                                    <h4 style={{ color: "black" }}>Remarks</h4>
                                </Modal.Header>
                                <Modal.Body style={{ color: "black" }}>
                                    <Form.Group as={Row} controlId="remarksInput">
                                        <Col>
                                            <Form.Control type="text" value={remarks} onChange={handleRemarksChange} placeholder="Remarks here....." />
                                        </Col>
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="contained"
                                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                                        onClick={handleModalClose}
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        variant="contained"
                                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary'
                                        onClick={(e) => (approvalType === "Approve") ? approvedPageValue(e, true) : approvedPageValue(e, false)}
                                    >
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default IUIPage;
