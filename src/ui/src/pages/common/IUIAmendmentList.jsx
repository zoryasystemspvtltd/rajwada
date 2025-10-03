import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-bootstrap";
import * as Icon from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { getData } from '../../store/api-db';
import { formatStringDate } from '../../store/datetime-formatter';
import api from '../../store/api-service';
import IUILookUp from './shared/IUILookUp';
import IUIModuleMessage from './shared/IUIModuleMessage';
import { notify } from "../../store/notification";

const IUIAmendmentList = (props) => {
    const schema = props.schema;
    const amendmentType = props?.amendmentType;
    const module = `${schema.module}#${props.filter}`;
    const pageLength = schema.paging ? 10 : 0;
    const initialData = useSelector((state) => state.api[module])
    const [dataSet, setDataSet] = useState(initialData)
    const [baseFilter, setBaseFilter] = useState({})
    const [search, setSearch] = useState(useSelector((state) => state.api[module])?.options?.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.api.loggedInUser);
    const [privileges, setPrivileges] = useState({});

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


    useEffect(() => {
        async function fetchAmendmentList() {
            try {
                if (props?.filterSchema) {
                    // Fetch all the amendments whose parentId is Null
                    const amendmentByNull = await api.getAmendmentsByNullValue({ model: module });
                    const parentAmendmentIds = amendmentByNull.data.map(amendment => amendment.id);

                    const newBaseFilter = props?.filterSchema

                    setBaseFilter(newBaseFilter)

                    const pageOptions = {
                        ...initialData?.options
                        , recordPerPage: pageLength,
                        searchCondition: newBaseFilter
                    }

                    const response = await api.getData({ module: module, options: pageOptions });
                    setDataSet(response?.data?.items?.filter(amendment => parentAmendmentIds?.includes(amendment.id)));
                }
            }
            catch (error) {
                notify('error', 'Failed to fetch Activity List!')
            }
        }
        fetchAmendmentList();
    }, [props]);

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
                                                {(schema?.editing && amendmentType === 'queue') &&
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
                                                    dataSet?.map((item, i) => (
                                                        <tr key={i}>
                                                            {(schema?.editing && amendmentType === 'queue') &&
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
                                                                        <Link to={`/amendments/${item.id}`}>{item[fld.field]}</Link>
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
                                                    <td colSpan={schema?.fields?.length}>
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

export default IUIAmendmentList;
