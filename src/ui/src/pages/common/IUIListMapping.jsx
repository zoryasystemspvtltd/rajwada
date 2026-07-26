import React, { useState, useEffect, useRef } from 'react';
import { getData } from '../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import * as Icon from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IUIModuleMessage from './shared/IUIModuleMessage';
import IUILookUp from './shared/IUILookUp';
import { formatStringDate } from '../../store/datetime-formatter';
import IUILookUpCount from './shared/IUILookUpCount';

const IUIListMapping = (props) => {
    const schema = props.schema;
    const module = `${schema.module}#${props.parentId}`;
    const pageLength = schema.paging ? 10 : 0;
    const dataSet = useSelector((state) => state.api[module])
    const [baseFilter, setBaseFilter] = useState({})
    const [search, setSearch] = useState(useSelector((state) => state.api[module])?.options?.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);
    const [data, setData] = useState([]);
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [privileges, setPrivileges] = useState({});

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
    };

    useEffect(() => {
        if (props?.parentId) {
            const newBaseFilter = {
                name: schema?.relationKey,
                value: props?.parentId,
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
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === schema.module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access);
        if (schema.module !== 'workflow') {
            localStorage.removeItem("dependency-flow");
        }
    }, [loggedInUser, schema.module]);

    const pageChanges = async (page) => {
        if (
            page < 1 ||
            page > dataSet?.totalPages ||
            page === dataSet?.options?.currentPage
        ) {
            return;
        }

        const pageOptions = {
            currentPage: page
        };

        dispatch(getData({ module, options: pageOptions }));
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

    return (
        <>
            <div className="main-card card">
                <div className="card-body">
                    <Row>
                        <Col md={8} className='mb-3'>
                            {(schema?.adding) &&
                                <>
                                    {privileges?.add &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={() => navigate(`/${schema?.parentPath}/${props?.parentId}/${schema?.childPath}/add/`)}
                                        >
                                            Add New {schema?.title}
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
                                            (schema?.duplicateKey ? removeDuplicatesByKey(dataSet?.items, schema?.duplicateKey) : dataSet?.items)?.map((item, i) => (
                                                <tr key={i} >
                                                    {schema?.editing &&
                                                        <>
                                                            <td width={10}>
                                                                {privileges.edit &&
                                                                    <Link to={`/${schema?.parentPath}/${props?.parentId}/${schema?.childPath}/${item?.id}/edit`} title='Edit'><i className="fa-solid fa-pencil"></i></Link>
                                                                }
                                                            </td>
                                                        </>
                                                    }
                                                    {schema?.fields?.map((fld, f) => (
                                                        <td key={f} width={fld.width}>
                                                            {fld.type === 'link' &&
                                                                <Link to={`/${schema?.parentPath}/${props?.parentId}/${schema?.childPath}/${item?.id}`}>{item[fld.field]}</Link>
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
                                                            {(fld.type === 'lookup-count') &&
                                                                <IUILookUpCount
                                                                    schema={{ ...fld.schema, filter: { ...fld.schema.filter, [fld.schema.keyField]: item[fld.schema.keyField] } }}
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
                                            <td colSpan={schema?.fields.length + (schema?.editing ? 1 : 0)}>
                                                <Pagination size="sm" className="justify-content-center">

                                                    <Pagination.First
                                                        disabled={dataSet?.options?.currentPage === 1}
                                                        onClick={() => pageChanges(1)}
                                                    />

                                                    <Pagination.Prev
                                                        disabled={dataSet?.options?.currentPage === 1}
                                                        onClick={() => pageChanges(dataSet?.options?.currentPage - 1)}
                                                    />

                                                    {(() => {
                                                        const current = dataSet?.options?.currentPage || 1;
                                                        const total = dataSet?.totalPages || 1;

                                                        let start = Math.max(1, current - 2);
                                                        let end = Math.min(total, current + 2);

                                                        // Always try to display 5 page numbers
                                                        if (end - start < 4) {
                                                            if (start === 1) {
                                                                end = Math.min(total, 5);
                                                            } else if (end === total) {
                                                                start = Math.max(1, total - 4);
                                                            }
                                                        }

                                                        const pages = [];

                                                        if (start > 1) {
                                                            pages.push(
                                                                <Pagination.Ellipsis
                                                                    key="start-ellipsis"
                                                                    disabled
                                                                />
                                                            );
                                                        }

                                                        for (let i = start; i <= end; i++) {
                                                            pages.push(
                                                                <Pagination.Item
                                                                    key={i}
                                                                    active={current === i}
                                                                    onClick={() => pageChanges(i)}
                                                                    className='mt-2'
                                                                >
                                                                    {i}
                                                                </Pagination.Item>
                                                            );
                                                        }

                                                        if (end < total) {
                                                            pages.push(
                                                                <Pagination.Ellipsis
                                                                    key="end-ellipsis"
                                                                    disabled
                                                                />
                                                            );
                                                        }

                                                        return pages;
                                                    })()}

                                                    <Pagination.Next
                                                        disabled={dataSet?.options?.currentPage === dataSet?.totalPages}
                                                        onClick={() => pageChanges(dataSet?.options?.currentPage + 1)}
                                                    />

                                                    <Pagination.Last
                                                        disabled={dataSet?.options?.currentPage === dataSet?.totalPages}
                                                        onClick={() => pageChanges(dataSet?.totalPages)}
                                                    />

                                                </Pagination>
                                            </td>
                                        </tr>
                                    </tfoot>

                                }

                            </Table>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

const removeDuplicatesByKey = (arr, key) => {
    const seen = new Set();
    return arr?.filter(item => {
        const val = item[key];
        if (seen.has(val)) {
            return false;
        }
        seen.add(val);
        return true;
    });
}

export default IUIListMapping;