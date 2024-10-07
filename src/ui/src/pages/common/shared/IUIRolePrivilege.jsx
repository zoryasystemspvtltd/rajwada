import React, { useState, useEffect } from 'react';
import { getData, setModuleDataItem } from '../../../store/api-db';
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import IUIPrivileges from './IUIPrivileges';
import api from '../../../store/api-service'

const IUIRolePrivilege = (props) => {

    const module = "privilege"
    const [value, setValue] = useState(props?.value)

    // There is no server module privilege - this is fixed 
    const privileges = [
        { id: 0, name: "list" },
        { id: 1, name: "view" },
        { id: 2, name: "add" },
        { id: 3, name: "edit" },
        { id: 4, name: "delete" }
    ]

    const [modules, setModules] = useState([])



    const [schema, setSchema] = useState([])
    const dispatch = useDispatch();


    useEffect(() => {
        const pageOptions = { recordPerPage: 0 }
        //dispatch(getData({ module: module, options: pageOptions }));
        async function fetchData() {
            const response = await api.getModules();
            const items = response?.data
            const modulePrivileges = [
                { id: 999, name: 'role', text: "Role", items: privileges },
                { id: 998, name: 'user', text: "User", items: privileges },
            ].concat(items.map((item, index) => {
                return {
                    id: index,
                    name: item.name.charAt(0).toLowerCase() + item.name.slice(1),
                    text: item.name.replace(/[A-Z]/g, letter => ` ${letter.toUpperCase()}`),
                    items: (item.isAssignable || item.isProject || item.isCompany)
                        ? privileges.concat([
                            { id: 5, name: "assign" }
                        ])
                        : privileges
                }
            }))
            setModules(items)
            setSchema(modulePrivileges)
        }

        fetchData()
    }, []);

    useEffect(() => {
        if (props.value && props.value.length > 0) {
            setValue(props.value)
        }
    }, [props.value])

    useEffect(() => {

        //if (!props.readonly) {
        //const e = { target: { id: props.id, value: value }, preventDefault: function () { } }
        // if (props.onChange)
        //     props.onChange(e);
        //}

        //console.log(value)
    }, [value])



    const handleChange = (e, name) => {
        e.preventDefault();
        if (props.readonly) {
            return;
        }
        if (e?.target?.value) {
            const newValue = [...e?.target?.value]

            const distinctValue = newValue.reduce((acc, item) => {
                if (!acc.some(i => i.module === item.module && i.name === item.name)) {
                    acc.push(item);
                }
                return acc;
            }, []);

            setValue(distinctValue)
            const ev = { target: { id: props.id, value: distinctValue }, preventDefault: function () { } }
            if (props.onChange)
                props.onChange(ev);
        }
    };

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <Form.Label className="fs-6"><span className="fw-bold text-capitalize"> {props?.text} </span></Form.Label>
                </div>
                <div className="card-body">
                    <div className="fs-12">
                        {schema?.map((item, i) => (
                            <IUIPrivileges
                                key={i}
                                id={`${item.name}`}
                                schema={item}
                                value={value}
                                readonly={props.readonly}
                                onChange={(e) => handleChange(e, item.name)}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default IUIRolePrivilege