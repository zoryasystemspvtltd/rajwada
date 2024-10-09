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



const IUITreeNodeExtra = (props) => {
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

    useEffect(() => {
        const modulePrivileges = loggedInUser?.privileges?.filter(p => p.module === schema?.module)?.map(p => p.name);
        let access = {};
        modulePrivileges.forEach(p => {
            access = { ...access, ...{ [p]: true } }
        })
        setPrivileges(access)
    }, [loggedInUser, schema?.module]);


    const handleExpand = (e, id) => {
        e.preventDefault();

        dispatch(setSelected({ module: module, id: id, items: dataSet?.items }))
    }

    return (
        <>
            {dataSet?.items?.map((item, i) => (
                <>
                    <tr key={item?.id}>
                        <td key={`${i}`}>
                            <IUIMonthStrip data={{ start: item[schema?.startField], end: item[schema?.endField] }} />
                        </td>
                    </tr >
                    {schema?.schema &&
                        <>
                            {item && item.selected &&
                                <IUITreeNodeExtra
                                    key={`_${item?.id}`}
                                    schema={schema?.schema}
                                    filter={item.id}
                                    layer={layer + 1}
                                    search={search} />
                            }
                        </>
                    }
                </>

            ))
            }
        </>
    )
}

export default IUITreeNodeExtra