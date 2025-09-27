

import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getData } from '../../../store/api-db';
import api from '../../../store/api-service';
import { formatStringDate } from '../../../store/datetime-formatter';
import IUILookUp from '../../common/shared/IUILookUp';
import IUIPage from '../../common/IUIPage';


export const ListAuditLog = (props) => {
    const module = 'auditLog';
    const schema = {
        module: 'auditLog',
        title: 'Audit Log',
        path: 'audit-logs',
        paging: true,
        searching: true,
        editing: false,
        adding: false,
        fields: [
            { text: 'Entity Id', field: 'entityId', type: 'text', sorting: true, searching: true },
            { text: 'Module Name', field: 'name', type: 'link', sorting: true, searching: true },
            { text: 'Action Type', field: 'actionType', type: 'text', sorting: true, searching: true },
            { text: 'Modified By', field: 'modifiedBy', type: 'text', sorting: true, searching: true },
            { text: 'Modified Date', field: 'modifiedDate', type: 'date', sorting: false, }
        ]
    }
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataSet, setDataSet] = useState([]);
    const [allModules, setAllModules] = useState([]);
    const [entityId, setEntityId] = useState(null);
    const [selectedChildModule, setSelectedChildModule] = useState('');
    const location = useLocation();
    // Get values from props first, otherwise fallback to navigation state
    const id = props.id ?? location.state?.id ?? null;
    const childModule = props.childModule ?? location.state?.childModule ?? null;


    useEffect(() => {
        async function fetchAllModules() {
            const response = await api.getModules();
            let items = response?.data;
            setAllModules(items);
        }

        fetchAllModules()
    }, []);


    useEffect(() => {
        async function fetchData() {
            if (id && childModule) {
                setEntityId(parseInt(id));
                setSelectedChildModule(childModule);

                const newBaseFilter = {
                    name: 'entityId',
                    value: parseInt(id),
                    and: {
                        name: 'name',
                        value: childModule
                    }
                };

                const pageOptions = { recordPerPage: 0, searchCondition: newBaseFilter };
                const response = await api.getData({ module: module, options: pageOptions });
                setDataSet(response?.data);
            }
            else {
                const pageOptions = { recordPerPage: 0 };
                const response = await api.getData({ module: module, options: pageOptions });
                setDataSet(response?.data);
            }
        }

        fetchData();
    }, [id, childModule]);


    const handleModuleSelection = async (event) => {
        event.preventDefault();
        setSelectedChildModule(event.target.value);
    };

    const handleSearch = async () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let newBaseFilter = {};


        if (entityId) {
            newBaseFilter = {
                name: 'entityId',
                value: entityId,
                and: {
                    name: 'name',
                    value: selectedChildModule,
                    and: {
                        name: 'documentDate',
                        value: start,
                        operator: 'greaterThan',
                        and: {
                            name: 'documentDate',
                            value: end,
                            operator: 'lessThan',
                        }
                    }
                }
            };
        }
        else {
            newBaseFilter = {
                name: 'name',
                value: selectedChildModule,
                and: {
                    name: 'documentDate',
                    value: start,
                    operator: 'greaterThan',
                    and: {
                        name: 'documentDate',
                        value: end,
                        operator: 'lessThan',
                    }
                }
            };
        }

        const pageOptions = { recordPerPage: 0, searchCondition: newBaseFilter };
        const response = await api.getData({ module: module, options: pageOptions });
        setDataSet(response?.data);
    };

    const pageChanges = async (e) => {
        e.preventDefault();
        const pageOptions = {
            currentPage: e.target.text
        }
        dispatch(getData({ module: module, options: pageOptions }));
    };

    const sortData = async (e, field) => {
        e.preventDefault();
        const sortOptions = {
            sortColumnName: field,
            sortDirection: !dataSet?.options?.sortDirection
        }

        dispatch(getData({ module: module, options: sortOptions }));
    }

    const handleReset = () => {
        setDataSet([]);
        setStartDate('');
        setEndDate('');
        setSelectedChildModule('');
    }

    // return (<IUIList schema={schema} />)
    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading text-uppercase">Audit Report</div>
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <Row>
                                        <Form className="mb-3">
                                            <Row>
                                                <Col sm={12} md={3}>
                                                    <Form.Group controlId="startDate">
                                                        <Form.Label className='fw-bold'>Start Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={12} md={3}>
                                                    <Form.Group controlId="endDate">
                                                        <Form.Label className='fw-bold'>End Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={12} md={3}>
                                                    <Form.Group className="position-relative form-group" controlId="childModule">
                                                        <Form.Label className='text-uppercase mb-2'>
                                                            Select a {schema?.copyLabel}
                                                        </Form.Label>


                                                        < select
                                                            aria-label={`audit-${module}`}
                                                            id={`audit-select-${module}`}
                                                            value={selectedChildModule}
                                                            data-name={'audit-module'}
                                                            name='select'
                                                            className={`form-control`}
                                                            disabled={entityId || false}
                                                            onChange={(e) => handleModuleSelection(e)}>
                                                            <option>--Select--</option>
                                                            {allModules?.map((item, i) => (
                                                                <option key={i} value={item.name}>{item.name}</option>
                                                            ))}
                                                        </select>


                                                    </Form.Group >
                                                </Col>
                                                <Col xs="auto" className="d-flex align-items-end" sm={12} md={3}>
                                                    <Button
                                                        variant="contained"
                                                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn-sm btn btn-primary mr-2'
                                                        onClick={handleSearch}
                                                    >
                                                        Fetch Report
                                                    </Button>
                                                    <Button
                                                        variant="conatined"
                                                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn-sm btn btn-secondary'
                                                        onClick={handleReset}
                                                    >
                                                        Reset
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Row>
                                    {
                                        (dataSet?.items?.length > 0) && (
                                            <>
                                                <Row>
                                                    <Col>
                                                        <Table responsive>
                                                            <thead>
                                                                <tr>
                                                                    {schema?.editing &&
                                                                        <th>
                                                                            <button type="submit" className="btn btn-link text-white p-0">#</button>
                                                                        </th>
                                                                    }
                                                                    {schema?.fields?.map((fld, f) => (
                                                                        <th key={f} width={fld.width}>
                                                                            {fld.sorting &&
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-link text-white p-0"
                                                                                    onClick={(e) => sortData(e, fld.field)}
                                                                                >
                                                                                    {dataSet?.options && fld.field === dataSet?.options.sortColumnName && dataSet?.options?.sortDirection ? <Icon.SortUp title='Sort up' /> : <Icon.SortDown title='Sort down' />} {dataSet?.options?.sortDirection}
                                                                                    {fld.text}
                                                                                </button>
                                                                            }
                                                                            {!fld.sorting &&
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-link text-white p-0"
                                                                                >
                                                                                    {fld.text}
                                                                                </button>}
                                                                        </th>
                                                                    ))}
                                                                </tr>
                                                            </thead>
                                                            {
                                                                <tbody>
                                                                    {
                                                                        dataSet?.items?.map((item, i) => (
                                                                            <tr key={i}>
                                                                                {schema?.fields?.map((fld, f) => (
                                                                                    <td key={f}>
                                                                                        {fld.type === 'link' &&
                                                                                            <Link to={`${item.id}`}>{item[fld.field]}</Link>
                                                                                        }
                                                                                        {(!fld.type || fld.type === 'text') && item[fld.field]}
                                                                                        {fld.type === 'date' && formatStringDate(item[fld.field])}
                                                                                        {(fld.type === 'lookup') &&
                                                                                            <IUILookUp
                                                                                                value={item[fld.field]}
                                                                                                schema={fld.schema}
                                                                                                readonly={true}
                                                                                                textonly={true}
                                                                                            />
                                                                                        }
                                                                                    </td>
                                                                                ))}
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>
                                                            }
                                                            {schema.paging &&
                                                                <tfoot>
                                                                    <tr>
                                                                        <td colSpan={schema?.fields.length}>
                                                                            <Pagination size="sm" onClick={pageChanges}>
                                                                                {[...Array(dataSet?.totalPages)].map((e, i) => {
                                                                                    return <Pagination.Item key={i}
                                                                                        className="paginate_button"
                                                                                        active={(`${dataSet?.options?.currentPage}` === `${i + 1}`)}
                                                                                    >{i + 1}</Pagination.Item>
                                                                                })}
                                                                            </Pagination>
                                                                        </td>
                                                                        {schema?.editing &&
                                                                            <td>
                                                                            </td>
                                                                        }
                                                                    </tr>
                                                                </tfoot>
                                                            }
                                                        </Table>
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    }
                                    {
                                        (dataSet?.items?.length === 0 && startDate !== '' && endDate !== '' && selectedChildModule !== '') && (
                                            <p>No audit log found within the selected date range.</p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}

export const ViewAuditLog = () => {
    const schema = {
        module: 'auditLog',
        title: 'Audit Log',
        path: 'audit-logs',
        showBreadcrumbs: true,
        editing: false,
        adding: false,
        deleting: false,
        back: true,
        readonly: true,
        fields: [
            {
                type: "area", width: 12
                , fields: [
                    { text: 'Entity Id', field: 'entityId', width: 4, type: 'label' },
                    { text: 'Module Name', field: 'name', width: 4, type: 'label' },
                    { text: 'Action Type', field: 'actionType', width: 4, type: 'label' },
                    { text: 'Created By', field: 'member', width: 4, type: 'label' },
                    { text: 'Creation Date', field: 'date', width: 4, type: 'label-date' },
                    { text: 'Modified By', field: 'modifiedBy', width: 4, type: 'label' },
                    { text: 'Modified Date', field: 'modifiedDate', width: 4, type: 'label-date' },
                    { text: 'Reviewed By', field: 'reviewedBy', width: 4, type: 'label' },
                    { text: 'Reviewed Date', field: 'reviewedDate', width: 4, type: 'label-date' },
                ]
            },
            {
                type: "area", width: 12
                , fields: [
                    {
                        text: 'New Value', field: 'newValues', width: 12, type: 'key-val-table',
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
                        text: 'Old Value', field: 'oldValues', width: 12, type: 'key-val-table',
                        schema: {
                            excludeKeys: ["Blueprint", "Key", "Status"],
                            maxLength: 100
                        }
                    }
                ]
            }
        ]
    }

    return (<IUIPage schema={schema} />)
}