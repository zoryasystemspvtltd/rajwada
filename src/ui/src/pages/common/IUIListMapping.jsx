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
        setPrivileges(access)
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

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <Row>
                                <Col md={8} className='mb-3'>
                                    <div className="app-page-title">
                                        <div className="page-title-heading"> {schema?.title}</div>
                                    </div>
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
                                                    dataSet?.items?.map((item, i) => (
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
        </>
    )
}

export default IUIListMapping;