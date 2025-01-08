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
import { HiOutlineUpload } from 'react-icons/hi';
import { RiDownload2Fill } from 'react-icons/ri';
import * as XLSX from 'xlsx';
import api from '../../store/api-service'
import { setSave } from '../../store/api-db'

const IUIListFilter = (props) => {
    const schema = props.schema;
    const module = `${schema.module}#${props.filter}`;
    const pageLength = schema.paging ? 10 : 0;
    const dataSet = useSelector((state) => state.api[module])
    const [baseFilter, setBaseFilter] = useState({})
    const [search, setSearch] = useState(useSelector((state) => state.api[module])?.options?.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const fileInputRef = useRef(null);
    const [data, setData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                const sheetName = workbook.SheetNames[0]; // Assuming the first sheet is needed
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                console.log(jsonData);
                setData(jsonData);
                setMessage("File successfully uploaded!");
            };
            reader.readAsArrayBuffer(file);
            var dataUpload = { dataModel: "", rawData: "" };
            dataUpload.dataModel = module;
            dataUpload.rawData = data;
            api.saveData(dataUpload);
            dispatch(setSave({ module: module }))
        } else {
            setMessage("Error: Invalid file type. Please upload an Excel file (.xlsx, .xls).");
        }
    }

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger the file input click
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
                <div className="page-title-heading"> {schema?.title}</div>
            </div>
            <div className="row ">
                <div className="col-md-12">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <Row>
                                <Col md={8} className='mb-3'>
                                    {schema.adding &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={() => navigate(`/${schema?.path}/add`)}
                                        >
                                            Add New
                                        </Button>
                                    }
                                    {schema?.downloading &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={() => {
                                                const excelFileUrl = `/templates/${schema?.title}Details.xlsx`;
                                                console.log(excelFileUrl);
                                                const link = document.createElement("a");
                                                link.href = excelFileUrl;
                                                link.download = `${schema?.title}Details.xlsx`;
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }}
                                        >
                                            <RiDownload2Fill className="inline-block mr-2" />
                                            Download
                                        </Button>
                                    }
                                    {schema?.uploading &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={handleButtonClick}
                                        >
                                            <HiOutlineUpload className="inline-block mr-2" />
                                            <input
                                                type='file'
                                                accept='.xlsx'
                                                ref={fileInputRef}
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
                                                        <button type="submit" className="btn btn-link text-white">#</button>

                                                    </th>
                                                }
                                                {schema?.fields?.map((fld, f) => (
                                                    <th key={f}>
                                                        {fld.sorting &&
                                                            <button
                                                                type="submit"
                                                                className="btn btn-link text-white"
                                                                onClick={(e) => sortData(e, fld.field)}
                                                            >
                                                                {dataSet?.options && fld.field === dataSet?.options.sortColumnName && dataSet?.options?.sortDirection ? <Icon.SortUp /> : <Icon.SortDown />} {dataSet?.options?.sortDirection}
                                                                {fld.text}
                                                            </button>
                                                        }
                                                        {!fld.sorting &&
                                                            <button
                                                                type="submit"
                                                                className="btn btn-link text-white"
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
                                                                <td width={10}>
                                                                    <Link to={`/${schema?.path}/${item?.id}/edit`}><i className="fa-solid fa-pencil"></i></Link>
                                                                </td>
                                                            }
                                                            {schema?.fields?.map((fld, f) => (
                                                                <td key={f} width={fld.width}>
                                                                    {fld.type === 'link' &&
                                                                        <Link to={`/${schema.path}/${item.id}`}>{item[fld.field]}</Link>
                                                                    }
                                                                    {(!fld.type || fld.type === 'text') && item[fld.field]}
                                                                    {fld.type === 'date' && item[fld.field].substring(0, 10)}
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

export default IUIListFilter