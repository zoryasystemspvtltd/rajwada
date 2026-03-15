import React, { useCallback, useEffect, useState } from 'react';
import { Col, Form, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { formatStringDate } from '../../../store/datetime-formatter';
import IUILookUp from '../../common/shared/IUILookUp';
import IUITableInputElement from './IUITableInputElement';
import api from "../../../store/api-service";

const IUIItemAvailability = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;

    // Global State
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    // Local State
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [privileges, setPrivileges] = useState({});
    const [dataArray, setDataArray] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [availableIds, setAvailableIds] = useState([]);
    const [unavailableIds, setUnavailableIds] = useState([]);

    const loadData = useCallback(async () => {
        if (!schema?.module || !schema?.searchKey) return;

        try {
            const newBaseFilter = {
                name: schema.searchKey,
                value: parseInt(schema.searchValue, 10),
            };

            const pageOptions = {
                recordPerPage: 0,
                searchCondition: newBaseFilter,
            };

            const response = await api.getData({
                module: schema.module,
                options: pageOptions,
            });

            console.log(response)
            setDataArray(response?.data?.items || []);
        } catch (error) {
            console.error("Failed to load data:", error);
            setDataArray([]);
        }
    }, [
        schema?.module,
        schema?.searchKey,
        schema?.searchValue,
    ]);

    useEffect(() => {
        let isMounted = true;

        if (!isMounted) return;

        loadData();

        return () => {
            isMounted = false;
        };
    }, [loadData]);

     const handleChange = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access)
    }, [loggedInUser, module]);

    const addToAvailableList = (e, itemId) => {
        e.preventDefault();

        setAvailableIds(prev =>
            prev.includes(itemId) ? prev : [...prev, itemId]
        );

        setUnavailableIds(prev =>
            prev.filter(id => id !== itemId)
        );
    };

    const addToUnAvailableList = (e, itemId) => {
        e.preventDefault();

        setUnavailableIds(prev =>
            prev.includes(itemId) ? prev : [...prev, itemId]
        );

        setAvailableIds(prev =>
            prev.filter(id => id !== itemId)
        );
    };

    const getRowClass = (itemId) => {
        if (availableIds.includes(itemId)) return "table-success";   // green
        if (unavailableIds.includes(itemId)) return "table-danger";  // red
        return "";
    };

    const updateSingleItemAvailability = async (id, status) => {
        let itemData = dataArray?.find(item => item.id === id);
        return await api.editData({ module: module, data: { ...itemData, oldValues: JSON.stringify(itemData), availabilityStatus: status } });
    }

    const handleUpdateStatus = async () => {
        try {

            const availablePromises = availableIds.map(id => updateSingleItemAvailability(id, 1));
            await Promise.all(availablePromises);

            const unavailablePromises = unavailableIds.map(id => updateSingleItemAvailability(id, 0));
            await Promise.all(unavailablePromises);

            // Clear UI state
            setAvailableIds([]);
            setUnavailableIds([]);

            // 🔁 Refetch and reconstruct table
            await loadData();

        } catch (err) {
            console.error("Failed to update availability", err);
        }
    };

    return (
        <>
            <div className="tab-content">
                <div className="tabs-animation">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={schema?.readonly ? "main-card card" : "main-card mb-2 card"}>
                                <div
                                    className="card-body"
                                    style={(props.className !== "" && props.className === "is-invalid") ? { border: "1px solid red" } : (props.className !== "" && props.className === "is-valid") ? { border: "1px solid green" } : {}}
                                >
                                    <div>
                                        <Form>
                                            {
                                                (!schema?.readonly) && (
                                                    <Row>
                                                        {schema?.fields?.map((fld, f) => (
                                                            <Col md={fld.width || 6} key={f}>
                                                                {fld.type === 'area' &&
                                                                    <>
                                                                        <IUITableInputElement
                                                                            id={schema.module}
                                                                            schema={fld.fields}
                                                                            value={data}
                                                                            errors={(Object.keys(data).length === 0) ? {} : errors}
                                                                            readonly={schema.readonly}
                                                                            onChange={handleChange}
                                                                            dirty={false}
                                                                            defaultFields={schema?.defaultFields || []}
                                                                            clearFields={false}
                                                                        />
                                                                        {/* <br /> */}
                                                                    </>
                                                                }
                                                                {fld.type !== 'area' &&
                                                                    <>
                                                                        <IUITableInputElement
                                                                            id={schema.module}
                                                                            schema={[fld]}
                                                                            value={data}
                                                                            errors={(Object.keys(data).length === 0) ? {} : errors}
                                                                            onChange={handleChange}
                                                                            readonly={schema.readonly}
                                                                            clearFields={false}
                                                                        />
                                                                        {/* <br /> */}
                                                                    </>
                                                                }
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                )
                                            }

                                            {(!schema?.readonly && (privileges?.add || privileges?.edit)) && (dataArray.length > 0) &&
                                                <hr />
                                            }

                                            {
                                                (dataArray.length > 0) && (
                                                    <Row className='mt-2'>
                                                        <Table size="sm" className="scrollable-table" responsive>
                                                            <thead>
                                                                <tr>
                                                                    {schema?.fields?.map((fld, f) => (
                                                                        <th key={f}>
                                                                            <button
                                                                                type="submit"
                                                                                className="btn btn-link text-white p-0"
                                                                            >
                                                                                {fld.text}
                                                                            </button>
                                                                        </th>
                                                                    ))}
                                                                    {
                                                                        (!schema?.readonly) && (
                                                                            <th>
                                                                                Actions
                                                                            </th>
                                                                        )
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            {
                                                                <tbody>
                                                                    {dataArray?.map((item, i) => (
                                                                        <React.Fragment key={i}>
                                                                            <tr className={getRowClass(item.id)}>
                                                                                {schema?.fields?.map((fld, f) => (
                                                                                    <td key={f}>
                                                                                        {fld.type === 'link' && (
                                                                                            <Link to={`${item.id}`}>{item[fld.field]}</Link>
                                                                                        )}
                                                                                        {(!fld.type || fld.type === 'text') && item[fld.field]}
                                                                                        {fld.type === 'number' && item[fld.field]}
                                                                                        {fld.type === 'date' && formatStringDate(item[fld.field])}
                                                                                        {fld.type === 'lookup' && (
                                                                                            <IUILookUp
                                                                                                value={parseInt(item[fld.field])}
                                                                                                schema={fld.schema}
                                                                                                readonly={true}
                                                                                                textonly={true}
                                                                                            />
                                                                                        )}
                                                                                    </td>
                                                                                ))}




                                                                                {!schema?.readonly && privileges?.edit && (
                                                                                    <td>
                                                                                        <button
                                                                                            className="btn btn-pill btn-shadow btn-hover-shine btn btn-warning btn-sm mr-2"
                                                                                            onClick={(e) => addToAvailableList(e, item.id)}
                                                                                        >
                                                                                            Mark Available
                                                                                        </button>


                                                                                        <button
                                                                                            className="btn btn-pill btn-shadow btn-hover-shine btn btn-danger btn-sm"
                                                                                            onClick={(e) => addToUnAvailableList(e, item.id)}
                                                                                        >
                                                                                            Mark Unavailable
                                                                                        </button>
                                                                                    </td>
                                                                                )}
                                                                            </tr>
                                                                        </React.Fragment>
                                                                    ))}
                                                                </tbody>


                                                            }
                                                        </Table>

                                                        {(availableIds.length > 0 || unavailableIds.length > 0) && !schema?.readonly && privileges?.edit && (
                                                            <Row>
                                                                <Col>
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={handleUpdateStatus}
                                                                    >
                                                                        Update Availability
                                                                    </button>
                                                                </Col>
                                                            </Row>
                                                        )}

                                                    </Row>
                                                )
                                            }
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default IUIItemAvailability;
