
import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import { Button, Col, Row, Form } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { RiDownload2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getData } from '../../../store/api-db';
import api from '../../../store/api-service';
import { notify } from "../../../store/notification";
import IUILookUp from '../../common/shared/IUILookUp';
import { formatStringDate } from '../../../store/datetime-formatter';

export const SiteMaterialApprovalReport = () => {
    const module = 'levelSetup';
    const schema = {
        module: 'levelSetup',
        title: 'Site Material Approval',
        path: 'site-material-approvals',
        paging: false,
        searching: false,
        editing: false,
        adding: false,
        fields: [
            { text: 'Project', field: 'projectName', type: 'text', sorting: true, searching: true },
            { text: 'Document Date', field: 'documentDate', type: 'date', sorting: true, searching: true },
            { text: 'Tracking No', field: 'trackingNo', type: 'text', sorting: true, searching: true },
            { text: 'Vehicle No', field: 'vechileNo', type: 'text', sorting: true, searching: true },
            { text: 'Supplier Name', field: 'supplierName', type: 'text', sorting: true, searching: true },
            { text: 'Individual Report', field: 'challanReport', reportDateField: 'documentDate', type: 'report', sorting: false, searching: false }
        ]
    }
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataSet, setDataSet] = useState([]);

    const handleSearch = async () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const newBaseFilter = {
            name: 'documentDate',
            value: start,
            operator: 'greaterThan',
            and: {
                name: 'documentDate',
                value: end,
                operator: 'lessThan',
            }
        };

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
    }

    const handleDownloadReport = async (itemId, reportDate) => {
        try {
            const response = await api.downloadReport({ module: module, id: itemId });

            if (response) {
                // Decode the base64 string to binary data
                const byteCharacters = atob(response.data.data); // Base64 decode
                const byteArrays = [];

                // Convert the decoded string into a byte array
                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    byteArrays.push(new Uint8Array(byteNumbers));
                }

                // Create a Blob object from the byte arrays
                const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Use FileSaver to trigger the download
                saveAs(blob, `${schema?.title}-Report-${new Date(reportDate).toISOString().split('T')[0]}.xlsx`);
            }
        } catch (error) {
            notify("error", `Failed to download ${schema?.title} report!`);
        }
    };

    const handleDownloadOverallReport = async () => {
        try {
            const start = new Date(startDate).toISOString();
            const end = new Date(endDate).toISOString();
            const response = await api.downloadAggregatedReport({ module: module, startDate: start, endDate: end });

            if (response) {
                // Decode the base64 string to binary data
                const byteCharacters = atob(response.data.data); // Base64 decode
                const byteArrays = [];

                // Convert the decoded string into a byte array
                for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                    const slice = byteCharacters.slice(offset, offset + 512);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }
                    byteArrays.push(new Uint8Array(byteNumbers));
                }

                // Create a Blob object from the byte arrays
                const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Use FileSaver to trigger the download
                saveAs(blob, `${schema?.title}-Report-${new Date(startDate).toISOString().split('T')[0]}-To-${new Date(endDate).toISOString().split('T')[0]}.xlsx`);
            }
        } catch (error) {
            notify("error", `Failed to download ${schema?.title} report!`);
        }
    };

    // return (<IUIList schema={schema} />)
    return (
        <>
            <div className="app-page-title">
                <div className="page-title-heading text-uppercase">Site Material Approval Report</div>
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
                                                <Col sm={12} md={4}>
                                                    <Form.Group controlId="startDate">
                                                        <Form.Label className='fw-bold'>Start Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm={12} md={4}>
                                                    <Form.Group controlId="endDate">
                                                        <Form.Label className='fw-bold'>End Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col xs="auto" className="d-flex align-items-end" sm={12} md={4}>
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
                                                    <Col className='mb-3'>
                                                        <Button
                                                            variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm"
                                                            onClick={() => handleDownloadOverallReport()}
                                                        >
                                                            <RiDownload2Fill className="inline-block mr-2" />
                                                            Download Overall Report
                                                        </Button>
                                                    </Col>
                                                </Row>
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
                                                                                        {(fld.type === 'report') &&
                                                                                            <Button
                                                                                                variant="contained"
                                                                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm"
                                                                                                onClick={() => handleDownloadReport(item?.id, item[fld?.reportDateField])}
                                                                                            >
                                                                                                <RiDownload2Fill className="inline-block mr-2" />
                                                                                                Download
                                                                                            </Button>
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
                                        (dataSet?.items?.length === 0 && startDate !== '' && endDate !== '') && (
                                            <p>No site material approval details found within the selected date range.</p>
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
