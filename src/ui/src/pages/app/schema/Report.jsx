import IUIList from "../../common/IUIList";
import IUIPage from "../../common/IUIPage";
import React, { useState } from 'react';

export const ListReport = () => {

    const schema = {
        module: 'activity',
        title: 'Report',
        path: 'reporting',
        paging: true,
        searching: true,
        editing: true,
        adding: true,
        fields: [
            { text: 'Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Description', field: 'description', type: 'text', sorting: true, searching: true },
            { text: 'Type', field: 'type', type: 'text', sorting: false, searching: false },
            {
                text: 'Project', field: 'projectId', type: 'lookup', sorting: false, searching: false,
                schema: { module: 'project' }
            },
            {
                text: 'Dependency', field: 'dependencyId', type: 'lookup-link', sorting: false, searching: false,
                schema: { module: 'workflow' }
            }
        ]
    }


    return (<IUIList schema={schema} />)
}

export const ViewReport = () => {
    const schema = {
        module: 'activity',
        title: 'Report',
        path: 'reporting',
        editing: true,
        adding: false,
        deleting: true,
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
                        text: 'Status', field: 'workflowState', width: 4, type: 'lookup-link',
                        // schema: { module: 'stateType' }
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'New' },
                                { name: 'In Progress' },
                                { name: 'Completed' }
                            ]
                        }
                    },
                    {
                        text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup-link',
                        schema: { module: 'priorityStatusType' }
                    },
                    { text: 'Duration', field: 'Duration', width: 4, type: 'number' },
                    { text: 'Progress(%)', field: 'progressPercentage', width: 4, type: 'number' },
                    {
                        text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup',
                        schema: { module: 'approvalStatusType' }
                    },
                    { text: 'Estimate Cost', field: 'costEstimate', width: 4, type: 'number' },
                    { text: 'Actual Cost', field: 'actualCost', width: 4, type: 'number' },
                    // { text: 'Document Links', field: 'documentLinks', width: 4, type: 'text' },
                    {
                        text: 'Assigned To', field: 'userId', width: 4, type: 'lookup',
                        schema: { module: 'user', path: 'users' }
                    },
                    { text: 'Notes', field: 'notes', width: 4, type: 'text' }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}

export const EditReport = () => {
    const [isActualStartDateEditable, setActualStartDateEditable] = useState(true);
    const [isActualEndDateEditable, setActualEndDateEditable] = useState(true);

    const schema = {
        module: 'activity',
        title: 'Report',
        path: 'reporting',
        back: false,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Name', field: 'name', fieldIcon: 'object-group', placeholder: 'Name here...', width: 4, type: 'text', required: true, readonly: true },
                    { text: 'Description', field: 'description', placeholder: 'Description here...', width: 4, type: 'text', required: true, readonly: true },
                    {
                        text: 'Type', field: 'type', placeholder: 'Type here...', type: 'lookup', required: true, width: 4,
                        schema: {
                            items: [ // or use items for fixed value
                                { name: 'Main Task' },
                                { name: 'Sub Task' }
                            ]
                        }
                        , readonly: true
                    },
                    {
                        text: 'Project', field: 'projectId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'Project' }, readonly: true
                    },
                    {
                        text: 'Parent Activity', field: 'parentId', width: 4, type: 'lookup', required: false,
                        schema: { module: 'Activity' }, readonly: true
                    },
                    { text: 'Start Date', field: 'startDate', placeholder: 'Start Date here...', width: 4, type: 'date', required: false, readonly: true },
                    { text: 'End Date', field: 'endDate', placeholder: 'End Date here...', width: 4, type: 'date', required: false, readonly: true },
                    { text: 'Actual Start Date', field: 'actualStartDate', placeholder: 'Actual Start Date here...', width: 4, type: 'date', required: false },
                    { text: 'Actual End Date', field: 'actualEndDate', placeholder: 'Actual End Date here...', width: 4, type: 'date', required: false },
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
                    // {
                    //     text: 'Priority', field: 'PriorityStatus', width: 4, type: 'lookup', required: false,
                    //     schema: { module: 'priorityStatusType' }
                    // },
                    { text: 'Duration', field: 'Duration', placeholder: 'Duration here...', width: 4, type: 'number', required: false },
                    { text: 'Progress(%)', field: 'progressPercentage', placeholder: 'Progress(%) here...', width: 4, type: 'number', required: false },
                    // {
                    //     text: 'Approval Status', field: 'approvalStatus', width: 4, type: 'lookup', required: false,
                    //     schema: { module: 'approvalStatusType' }
                    // },
                    { text: 'Estimate Cost', field: 'costEstimate', placeholder: 'Estimate Cost here...', width: 4, type: 'number', required: false, readonly: true },
                    { text: 'Actual Cost', field: 'actualCost', placeholder: 'Actual Cost here...', width: 4, type: 'number', required: false },
                    // { text: 'Document Links', field: 'documentLinks', placeholder: 'Document Links here...', width: 4, type: 'text', required: false },
                    {
                        text: 'Assign To', field: 'userId', width: 4, type: 'lookup', required: true,
                        schema: { module: 'user', path: 'users' }, readonly: true
                    },
                    { text: 'Hold', field: 'notes', width: 4, type: 'check', required: false },
                    { text: 'Change', field: 'notes', width: 4, type: 'check', required: false },
                    { text: 'Eng', field: 'notes', width: 4, type: 'check', required: false },
                    { text: 'Curing', field: 'notes', width: 4, type: 'check', required: false },
                    { text: 'Notes', field: 'notes', placeholder: 'Notes here...', width: 4, type: 'text', required: false }
                ]
            },
        ]
    }

    return (<IUIPage schema={schema} />)
}