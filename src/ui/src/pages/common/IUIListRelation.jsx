import React, { useState, useEffect, useRef } from 'react';
import { getData } from '../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import * as Icon from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { Button, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IUIModuleMessage from './shared/IUIModuleMessage';
import IUILookUp from './shared/IUILookUp';
import { HiOutlineUpload } from 'react-icons/hi';
import { RiDownload2Fill } from 'react-icons/ri';
import * as XLSX from 'xlsx';
import { formatStringDate } from '../../store/datetime-formatter';
import api from '../../store/api-service';
import { notify } from '../../store/notification';


const IUIListRelation = (props) => {
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
    const [selectedValues, setSelectedValues] = useState([]);
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
                // console.log(jsonData);
                // setData(jsonData);
                setMessage("File successfully uploaded!");
            };
            reader.readAsArrayBuffer(file);
        } else {
            setMessage("Error: Invalid file type. Please upload an Excel file (.xlsx, .xls).");
        }
    }


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


    const handleIndividualChange = (e) => {
        const { value, checked } = e.target;
        let newValues = [];
        if (checked) {
            newValues = [...selectedValues, parseInt(value)];
            setSelectedValues(newValues);


        } else {
            newValues = selectedValues.filter(v => v !== parseInt(value));
            setSelectedValues(newValues);
        }
    };


    const handleRowChange = (e) => {
        if (e.target.checked) {
            const newValue = [...dataSet?.items?.map(data => data?.id)];
            setSelectedValues(newValue);
        }
        else {
            setSelectedValues([]);
        }
    };


    const deleteItem = async (itemId) => {
        const response = await api.deleteData({ module: schema?.module, id: itemId });
        return response.data;
    }


    const deleteSelected = async () => {
        if (selectedValues.length > 0) {
            const deletePromises = selectedValues.map(id => deleteItem(id));
            await Promise.all(deletePromises);
            notify("success", 'Deletion Successful!');
            setSelectedValues([]);
             window.location.reload();
        }
        else {
            notify("info", `Kindly select ${schema?.module} to delete!`)
        }
    }


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
                                    {schema.adding &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={() => navigate(`/${schema?.path}/add/`)}
                                        >
                                            Add New {schema?.title}
                                        </Button>
                                    }
                                    {schema?.downloading &&
                                        <Button
                                            variant="contained"
                                            className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                            onClick={() => {
                                                const excelFileUrl = '/templates/FloorDetails.xlsx';
                                                // console.log(excelFileUrl);
                                                const link = document.createElement("a");
                                                link.href = excelFileUrl;
                                                link.download = "FloorDetails.xlsx";
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
                                                accept='.xlsx, .xls'
                                                ref={fileInputRef}
                                                onChange={handleFileUpload}
                                                style={{ display: 'none' }}
                                            />
                                            Upload
                                        </Button>
                                    }
                                    {schema?.delete &&
                                        <>
                                            {
                                                privileges?.delete &&
                                                <Button
                                                    variant="contained"
                                                    className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-sm mx-2"
                                                    onClick={() => deleteSelected()}
                                                >
                                                    Delete
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
                                                {
                                                    schema?.enableCheckBoxRow &&
                                                    <th>
                                                        <Form.Check className='text-capitalize'
                                                            id={`${props.id}_Check_All`}
                                                            checked={(selectedValues?.length === dataSet?.items?.length) || false}
                                                            onChange={(e) => handleRowChange(e)}
                                                        />
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
                                                            {
                                                                schema?.enableCheckBoxRow &&
                                                                <td>
                                                                    <Form.Check className='text-capitalize'
                                                                        id={item.id}
                                                                        value={item.id}
                                                                        checked={selectedValues.includes(item.id)}
                                                                        onChange={(e) => handleIndividualChange(e)}
                                                                        label={''}
                                                                    />
                                                                </td>
                                                            }
                                                            {schema?.editing &&
                                                                <td width={10}>
                                                                    <Link to={`/${schema?.path}/${item?.id}/edit/${props?.parentId}`} title='Edit'><i className="fa-solid fa-pencil"></i></Link>
                                                                </td>
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
        </>
    )
}


export default IUIListRelation
