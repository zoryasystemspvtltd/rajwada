import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Form } from "react-bootstrap";
import IUIPrivileges from './IUIPrivileges';
import api from '../../../store/api-service'
import { Type } from 'react-bootstrap-icons';

const IUIRolePrivilege = (props) => {

    const module = "privilege"
    const [value, setValue] = useState(props?.value)

    // There is no server module privilege - this is fixed 
    const privileges = [
        { id: -1, name: "public" },
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
            let items = response?.data

            // Replacing hardcoded plan type with Tower Floor Flat
            const planIndex = items?.findIndex(item => `${item.name}` === `Plan`)
            const planItems = [
                { name: "plan", type: "tower", isApproval: items[planIndex].isApproval, isAssignable: items[planIndex].isAssignable, isCompany: items[planIndex].isCompany, isProject: items[planIndex].isProject },
                { name: "plan", type: "floor", isApproval: items[planIndex].isApproval, isAssignable: items[planIndex].isAssignable, isCompany: items[planIndex].isCompany, isProject: items[planIndex].isProject },
                { name: "plan", type: "flat", isApproval: items[planIndex].isApproval, isAssignable: items[planIndex].isAssignable, isCompany: items[planIndex].isCompany, isProject: items[planIndex].isProject }
            ]

            items = [
                ...items?.slice(0, planIndex), // everything before array
                ...items?.slice(planIndex + 1), // everything after array
                ...planItems
            ]

            let modulePrivileges = [
                { id: 998, name: 'user', type: 'user', text: "User", items: privileges },
                { id: 999, name: 'role', type: 'role', text: "Role", items: privileges },
            ].concat(items.map((item, index) => {
                return {
                    id: index,
                    name: item.name.charAt(0).toLowerCase() + item.name.slice(1),
                    type: item.type ? item.type : item.name.charAt(0).toLowerCase() + item.name.slice(1),
                    text: item.type ? item.type.replace(/[A-Z]/g, letter => ` ${letter.toUpperCase()}`) : item.name.replace(/[A-Z]/g, letter => ` ${letter.toUpperCase()}`),
                    items: ((item.isAssignable || item.isProject || item.isCompany)
                        ? privileges.concat([
                            { id: 5, name: "assign" }
                        ])
                        : (item?.isApproval)
                            ? privileges.concat([
                                { id: 5, name: "assign" },
                                { id: 6, name: "approve" },
                                { id: 7, name: "report" }
                            ])
                            : privileges
                    )
                }
            }));

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
                if (!acc.some(i => i.module === item.module && i.name === item.name && i.type === item.type)) {
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
                                id={`${item.type}`}
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