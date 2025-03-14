import React, { useState, useEffect } from 'react';
import IUIPageInlineElement from './shared/IUIPageInlineElement';
import { setSave } from '../../store/api-db'
import api from '../../store/api-service'
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux'

const IUIPageInline = (props) => {
    // Properties
    const schema = props?.schema;
    const module = schema?.module;
    const { id } = useParams();
    // Local State
    const [value, setValue] = useState({});
    const [dirty, setDirty] = useState(false)
    const [errors, setErrors] = useState({});
    const [parentData, setParentData] = useState({});


    // Usage
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchParent() {
            if (schema?.parentModule && id) {
                const item = await api.getSingleData({ module: schema?.parentModule, id: id });
                setParentData(item.data);
            }
        }

        fetchParent();
    }, [id, schema?.parentModule]);

    useEffect(() => {
        if (props?.value) {
            const item = { ...props?.value, ...{ readonly: props?.value?.mode !== 'add' } }
            setValue(item);
        }
    }, [props?.value]);

    const handleChange = (e) => {
        e.preventDefault();
        const item = { ...value, ...e.target.value }
        setValue(item)
    };

    const validate = (values, fields) => {
        let errors = {};

        for (let i = 0; i < fields?.length; i++) {
            let item = fields[i];
            if (item.type === 'area') {
                errors = { ...errors, ...validate(values, item.fields) }
            }
            if (item.required && values && !values[item?.field]) {
                errors[item.field] = `Required field.`;
            }
            if (item.type === 'number' && values[item?.field]) {
                try {
                    let numericValue = parseInt(values[item?.field]);
                    if (numericValue < 0) {
                        errors[item.field] = `Negative input not allowed.`;
                    }
                }
                catch (e) {
                    errors[item.field] = `Invalid Input.`;
                }
            }
        }
        return errors;
    };

    const savePageValue = async (e) => {
        e.preventDefault();
        setDirty(true);
        const error = validate(value, schema?.fields)
        setErrors(error);
        console.log(value)
        if (Object.keys(error).length === 0) {
            if (!value)
                return

            setDirty(false);
            setErrors({});

            value.HeaderId = parseInt(id);
            setValue(value);
            if (id != undefined)
                try {
                    if (value?.mode === 'add') {
                        delete value.id;
                        await api.addData({ module: module, data: value });
                    } else {
                        await api.editData({ module: module, data: value });
                    }
                    dispatch(setSave({ module: module }))
                } catch (e) {

                }

            const item = { ...value, mode: null, readonly: null }
            const event = { target: { id: props?.id, value: item }, preventDefault: function () { } }
            if (props.onChange) {
                props.onChange(event);
            }
        }
    };

    const deletePageValue = async (e) => {
        e.preventDefault();
        await api.deleteData({ module: module, id: value.id });
        const event = { target: { id: props?.id, value: { id: value.id, deleted: true } }, preventDefault: function () { } }
        if (props.onChange) {
            props.onChange(event);
        }
    }

    const cancelPageValue = (e) => {
        e.preventDefault();
        const event = { target: { id: props?.id, value: { id: value.id } }, preventDefault: function () { } }
        if (props.onChange) {
            props.onChange(event);
        }
    }

    const setMode = (e, mode) => {
        e.preventDefault();
        setDirty(false)
        setErrors({})
        const item = {
            ...value,
            ...{
                mode: mode,
                readonly: (mode !== 'add' && mode !== 'edit')
            }
        }
        setValue(item);
    }

    return (
        <React.Fragment>
            {schema?.fields?.map((fld, f) => (
                <React.Fragment key={f}>
                    {fld.type !== 'hidden-filter' &&
                        <td >
                            <IUIPageInlineElement
                                id={`${value?.id}`}
                                schema={[fld]}
                                value={value}
                                errors={errors}
                                onChange={handleChange}
                                readonly={value?.readonly}
                                inline={true}
                                dirty={dirty}
                            />
                        </td>
                    }
                </React.Fragment>
            ))}
            {<td>
                {schema?.editing &&
                    <div className="input-group">
                        {(!value?.mode && !parentData?.[schema?.approvalKey]) &&
                            <>
                                < button className="btn btn-outline-primary" onClick={e => setMode(e, 'edit')}><i className="fa-solid fa-edit" title='Edit'></i></button>
                                < button className="btn btn-outline-danger" onClick={deletePageValue}><i className="fa-solid fa-trash" title='Delete'></i></button>
                            </>
                        }
                        {value?.mode === 'add' &&
                            <>
                                < button className="btn btn-outline-primary" onClick={savePageValue}><i className="fa-solid fa-save" title='Save'></i></button>
                            </>
                        }
                        {value?.mode === 'edit' &&
                            <>
                                < button className="btn btn-outline-primary" onClick={savePageValue}><i className="fa-solid fa-save" title='Save'></i></button>
                                < button className="btn btn-outline-secondary" onClick={cancelPageValue}><i className="fa-solid fa-cancel" title='Cancel'></i></button>
                            </>
                        }
                    </div>
                }
                {
                    schema?.fields?.map((fld, f) => (
                        <React.Fragment key={f}>
                            {fld.type === 'hidden-filter' &&
                                <IUIPageInlineElement
                                    id={`${value?.id}`}
                                    schema={[fld]}
                                    value={value}
                                    errors={errors}
                                    onChange={handleChange}
                                    readonly={value?.readonly}
                                />
                            }
                        </React.Fragment>
                    ))
                }
            </td >}
        </React.Fragment >
    )
}

export default IUIPageInline;