import React, { useState, useEffect, useRef } from 'react';
import { getData } from '../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import * as Icon from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { Button, Col, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IUIModuleMessage from './shared/IUIModuleMessage';
import IUILookUp from './shared/IUILookUp';
import IUIBreadcrumb from './shared/IUIBreadcrumb';
import { HiOutlineUpload } from 'react-icons/hi';
import { RiDownload2Fill } from 'react-icons/ri';
import { saveAs } from 'file-saver';
import api from '../../store/api-service';
import { notify } from "../../store/notification";
import { formatStringDate } from '../../store/datetime-formatter';

const IUIListFilter = (props) => {
    const schema = props.schema;
    const module = `${schema.module}#${props.filter}`;
    const pageLength = schema.paging ? 10 : 0;
    const dataSet = useSelector((state) => state.api[module])
    const [baseFilter, setBaseFilter] = useState({})
    const [search, setSearch] = useState(useSelector((state) => state.api[module])?.options?.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showUploadStatus, setShowUploadStatus] = useState(false);
    const [bulkUploadResponse, setBulkUploadResponse] = useState(null);
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [privileges, setPrivileges] = useState({});

    const handleClose = () => setShowUploadStatus(false);

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === schema.module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        // console.log(access)
        setPrivileges(access);
        if (schema.module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, schema.module]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            const formData = new FormData();
            formData.append('file', file); // Attach the file with the key 'file'
            formData.append('title', schema?.title);

            api.uploadExcelFile({ module: schema?.module, data: formData })
                .then((response) => {
                    return response;
                })
                .then((data) => {//handle modal next.
                    setBulkUploadResponse(data?.data);
                    // setShowUploadStatus(true);
                    notify("success", 'File upload successful!');
                })
                .then(() => {
                    setShowUploadStatus(true);
                })
                .catch((error) => {
                    notify("error", `Failed to upload file!`);
                });
        } else {
            notify("error", `Invalid file type! Please upload an Excel file (.xlsx, .xls).`);
        }
        event.target.value = null;
    }

    const handleDownloadClick = async () => {
        try {
            const response = await api.downloadTemplate({ module: schema?.title });

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
                saveAs(blob, `${schema?.title}Details.xlsx`);
            }
        } catch (error) {
            notify("error", `Failed to download ${schema?.title} template!`);
        }
    };


    useEffect(() => {
        if (props?.filter) {
            const newBaseFilter = {
                name: schema?.relationKey,
                value: props?.filter,
                //operator: 'likelihood' // Default value is equal
            }

            setBaseFilter(newBaseFilter)

            const pageOptions = {
                ...dataSet?.options
                , recordPerPage: pageLength
                , searchCondition: newBaseFilter
            }
            dispatch(getData({ module: module, options: pageOptions }));
        }
    }, [props]);

    useEffect(() => {
        if (props?.filter && showUploadStatus) {
            const newBaseFilter = {
                name: schema?.relationKey,
                value: props?.filter,
                //operator: 'likelihood' // Default value is equal
            }

            setBaseFilter(newBaseFilter)

            const pageOptions = {
                ...dataSet?.options
                , recordPerPage: pageLength
                , searchCondition: newBaseFilter
            }
            dispatch(getData({ module: module, options: pageOptions }));
        }
    }, [props, showUploadStatus]);


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

    const handleSearchChange = async (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        if (search) {
            const searchFields = schema.fields
                .filter(fld => fld.searching)
                .map(fld => ({ name: fld.field, value: search, operator: 'likelihood' }));


            for (let i = 1; i < searchFields.length; i++) {
                searchFields[i] = { ...searchFields[i], or: searchFields[i - 1] }
            }

            let condition = searchFields[searchFields.length - 1];
            if (baseFilter) {
                condition.And = baseFilter
            }
            const searchOptions = {
                currentPage: 1,
                search: search,
                searchCondition: condition
            }
            dispatch(getData({ module: module, options: searchOptions }));
        }
        else {
            const searchOptions = {
                currentPage: 1,
                search: search,
                searchCondition: null
            }
            dispatch(getData({ module: module, options: searchOptions }));
        }
    };

    return (
        <>
            <div className="app-page-title">
                {/* <div className="page-title-heading"> {schema?.title}</div> */}
                <IUIBreadcrumb schema={{ type: 'list', module: module, displayText: schema?.title }} />
            </div>
            <div className="row ">
                <div className="col-md-12">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            {/* <Row>
                                <Col md={12} className='mb-3'>
                                    <IUIBreadcrumb schema={{ type: 'list', module: module, displayText: schema?.title }} />
                                </Col>
                            </Row> */}
                            <Row>
                                <Col md={8} className='mb-3'>
                                    {schema.adding &&
                                        <>
                                            {
                                                privileges?.add &&
                                                <Button
                                                    variant="contained"
                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                                    onClick={() => navigate(`/${schema?.path}/add`)}
                                                >
                                                    Add New
                                                </Button>
                                            }
                                        </>
                                    }
                                    {schema?.downloading &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={handleDownloadClick}
                                        >
                                            <RiDownload2Fill className="inline-block mr-2" />
                                            Download
                                        </Button>
                                    }
                                    {schema?.uploading &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={() => document.getElementById('upload-btn').click()}
                                        >
                                            <HiOutlineUpload className="inline-block mr-2" />
                                            <input
                                                type='file'
                                                accept='.xlsx'
                                                id='upload-btn'
                                                onChange={handleFileUpload}
                                                style={{ display: 'none' }}
                                            />
                                            Upload
                                        </Button>
                                    }
                                    <IUIModuleMessage schema={props.schema} />

                                </Col>
                                <Col md={4}>
                                    {schema.searching &&
                                        <div className="input-group mb-2 justify-content-end " data-mdb-input-init>

                                            <input className="form-control"
                                                type="text"
                                                placeholder="Search"
                                                id="search"
                                                value={search}
                                                onChange={handleSearchChange}
                                            />

                                            <button
                                                type="submit"
                                                onClick={handleSearch}
                                                className="btn btn-primary" data-mdb-ripple-init
                                            >
                                                Search
                                            </button>
                                        </div>
                                    }
                                </Col>
                            </Row >
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
                                                    <th key={f}>
                                                        {fld.sorting &&
                                                            <button
                                                                type="submit"
                                                                className="btn btn-link text-white p-0"
                                                                onClick={(e) => sortData(e, fld.field)}
                                                            >
                                                                {dataSet?.options && fld.field === dataSet?.options.sortColumnName && dataSet?.options?.sortDirection ? <Icon.SortUp /> : <Icon.SortDown />} {dataSet?.options?.sortDirection}
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
                                                            {schema?.editing &&
                                                                <>
                                                                    {
                                                                        privileges?.edit &&
                                                                        <td width={10}>
                                                                            <Link to={`/${schema?.path}/${item?.id}/edit`} title='Edit'><i className="fa-solid fa-pencil"></i></Link>
                                                                        </td>
                                                                    }
                                                                </>
                                                            }
                                                            {schema?.fields?.map((fld, f) => (
                                                                <td key={f} width={fld.width}>
                                                                    {fld.type === 'link' &&
                                                                        <Link to={`/${schema.path}/${item.id}`}>{item[fld.field]}</Link>
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
                                                                    active={(dataSet?.options?.currentPage === i + 1)}
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
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showUploadStatus} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>{`${schema?.title} Bulk Upload Status`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Success Status</h5>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (bulkUploadResponse) && (
                                    bulkUploadResponse?.successData?.map((data, index) => (
                                        <tr key={`Success-${index}`}>
                                            <td>{index}</td>
                                            <td>{data}</td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </Table>

                    <h5>Failure Status</h5>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (bulkUploadResponse) && (
                                    bulkUploadResponse?.failureData?.map((data, index) => (
                                        <tr key={`Failure-${index}`}>
                                            <td>{index}</td>
                                            <td>{data}</td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="contained"
                        className='btn-wide btn-pill btn-shadow btn-hover-shine btn btn-secondary mr-2'
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default IUIListFilter