import React, { useState, useEffect } from 'react';
import { getData, setSelected } from '../../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import * as Icon from 'react-bootstrap-icons';
import Table from 'react-bootstrap/Table';
import { Accordion, Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IUIModuleMessage from './IUIModuleMessage';
import IUILookUp from './IUILookUp'
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { IUIMonthStrip } from '../IUITree';

const IUITreeNode = (props) => {
    const schema = props?.schema;

    const module = `${schema?.module}#${props?.filter}`;
    const pageLength = schema?.paging ? 10 : 0;
    const dataSet = useSelector((state) => state.api[module])
    const [baseFilter, setBaseFilter] = useState()
    const [search, setSearch] = useState(props?.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((state) => state.api.loggedInUser)
    const [privileges, setPrivileges] = useState({});
    const [layer, setLayer] = useState(0)
    const [config, setConfig] = useState(props?.config)


    useEffect(() => {
        if (props?.configuration) {
            setConfig(props?.configuration)
        }
    }, [props?.configuration]);

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === schema?.module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access)
    }, [loggedInUser, schema?.module]);

    useEffect(() => {
        if (props?.layer) {
            setLayer(props?.layer)
        }

        if (props?.filter) {
            let newBaseFilter = {
                name: schema?.relationKey,
                value: props?.filter,
                //operator: 'likelihood' // Default value is equal
            }

            setBaseFilter(newBaseFilter)

            if (props?.search) {
                const searchFields = schema.fields
                    .filter(fld => fld.searching)
                    .map(fld => ({ name: fld.field, value: props?.search, operator: 'likelihood' }));


                for (let i = 1; i < searchFields.length; i++) {
                    searchFields[i] = { ...searchFields[i], or: searchFields[i - 1] }
                }

                let condition = searchFields[searchFields.length - 1];
                newBaseFilter.And = condition
            }
            const pageOptions = {
                ...dataSet?.options
                , recordPerPage: pageLength
                , search: search
                , searchCondition: newBaseFilter
            }
            dispatch(getData({ module: module, options: pageOptions }));
        }

        setSearch(props?.search);
    }, [props]);

    const handleExpand = (e, id) => {
        e.preventDefault();

        dispatch(setSelected({ module: module, id: id, items: dataSet?.items }))
    }

    return (
        <>
            {dataSet?.items?.map((item, i) => (
                <React.Fragment key={i}>
                    <tr key={item?.id}>
                        <td >
                            <Link>
                                <i className={`metismenu-icon fa-solid fa-eye${(item && item.selected) ? '' : '-slash'}`} onClick={e => handleExpand(e, item.id)}></i>
                            </Link>
                            {schema?.editing &&
                                <>
                                    {privileges.edit &&
                                        <Link to={`/${schema.path}/${item.id}/edit`}><i className="fa-solid fa-pencil"></i></Link>
                                    }
                                </>
                            }
                        </td>
                        <td>
                            {/* TODO - HIDE on PHONE */}
                            {Array.from(Array(layer), (e, i) => {
                                return <div key={i} style={{ float: 'left', width: '20px' }}>-</div>
                            })}

                            {schema?.fields?.map((fld, f) => (
                                <div key={`${i}_${f}`} style={{ float: 'left' }}>
                                    {fld.type === 'link' &&
                                        <Link to={`/${schema.path}/${item.id}`}>{item[fld.field]}</Link>
                                    }
                                    {(!fld.type || fld.type === 'text') && item[fld.field]}
                                    {fld.type === 'date' && item[fld.field]?.substring(0, 10)}
                                    {(fld.type === 'lookup') &&
                                        <IUILookUp
                                            value={item[fld.field]}
                                            schema={fld.schema}
                                            readonly={true}
                                            textonly={true}
                                        />
                                    }
                                </div>
                            ))}
                        </td>
                        <td>
                            <IUIMonthStrip data={{ start: item[schema?.startField], end: item[schema?.endField] }} configuration={config} />
                        </td>
                    </tr >
                    {schema?.schema &&
                        <>
                            {item && item.selected &&
                                <IUITreeNode
                                    key={`_${item?.id}`}
                                    schema={schema?.schema}
                                    filter={item.id}
                                    layer={layer + 1}
                                    search={search} />
                            }
                        </>
                    }
                </React.Fragment>

            ))
            }
        </>
    )
}

export default IUITreeNode