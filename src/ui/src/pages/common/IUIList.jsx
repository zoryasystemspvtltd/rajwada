import React, { useState, useEffect } from 'react';
import { getData } from '../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import * as Icon from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IUIModuleMessage from './shared/IUIModuleMessage';
import IUILookUp from '../common/shared/IUILookUp'
import IUIBreadcrumb from './shared/IUIBreadcrumb';
import { RiDownload2Fill } from 'react-icons/ri';
import { saveAs } from 'file-saver';
import api from '../../store/api-service';
import { notify } from "../../store/notification";
import IUIResetPasswordElement from '../ResetUserPassword';
import { formatStringDate } from '../../store/datetime-formatter';

const IUIList = (props) => {
    const schema = props?.schema;
    const module = schema?.module;
    const pageLength = schema?.paging ? 10 : 0;
    const dataSet = useSelector((state) => state.api[module])
    const [search, setSearch] = useState(useSelector((state) => state.api[module])?.options?.search);
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [privileges, setPrivileges] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const pageOptions = { ...dataSet?.options, recordPerPage: pageLength }
        dispatch(getData({ module: module, options: pageOptions }));
    }, []);

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        // console.log(access)
        setPrivileges(access)
        if (module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, module]);

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

    return (
        <>
            <div className="app-page-title">
                {/* <div className="page-title-heading"> {schema?.title}</div> */}
                <IUIBreadcrumb schema={{ type: 'list', module: module, displayText: schema?.title }} />
            </div>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    {/* <Row>
                                        <Col md={12} className='mb-3'>
                                            <IUIBreadcrumb schema={{type: 'list', module: module, displayText: schema?.title}} />
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col md={8} className='mb-3'>
                                            {schema.adding &&
                                                <>
                                                    {privileges.add &&
                                                        <Button
                                                            variant="contained"
                                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm"
                                                            onClick={() => navigate(`/${schema.path}/add`)}
                                                        >
                                                            Add New
                                                        </Button>
                                                    }
                                                </>
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
                                                            <>
                                                                <th>
                                                                    {privileges.edit &&
                                                                        <button type="submit" className="btn btn-link text-white p-0">#</button>
                                                                    }
                                                                </th>
                                                            </>
                                                        }
                                                        {schema?.fields?.map((fld, f) => (
                                                            <th key={f} width={fld.width}>
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
                                                                            <td width={10}>
                                                                                {privileges.edit &&
                                                                                    <Link to={`${item.id}/edit`} title='Edit'><i className="fa-solid fa-pencil"></i></Link>
                                                                                }
                                                                            </td>
                                                                        </>
                                                                    }
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
                                                                                    Download Report
                                                                                </Button>
                                                                            }
                                                                            {(fld.type === 'reset-password') &&
                                                                                <IUIResetPasswordElement value={item[fld.field] || []}
                                                                                    id={`reset-password-${item.id}`}
                                                                                    text={fld.text}
                                                                                    disabled={!privileges.edit}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default IUIList;