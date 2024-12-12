import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../../store/api-db';

const IUILookUpRelation = (props) => {
    const schema = props.schema;
    const module = `${schema.module}#${props.parentId}`;
    const pageLength = schema.paging ? 10 : 0;
    const dataSet = useSelector((state) => state.api[module]);
    const [baseFilter, setBaseFilter] = useState({});
    const [value, setValue] = useState("")
    const [text, setText] = useState("")
    const dispatch = useDispatch();

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
        const newValue = schema?.module
            ? dataSet?.items?.find(item => item.id === value)?.name
            : value
        if (newValue) {
            setText(newValue);
        }
    }, [dataSet?.items, value, schema?.module]);

    useEffect(() => {
        if (props?.value) {
            setValue(props?.value);
        }
    }, [props?.value]);

    const handleChange = (e) => {
        e.preventDefault();
        if (!props?.readonly) {
            setValue({ ...value, [e.target.id]: e.target.value });
            props.onChange(e);
        }
    };

    return (
        <>
            <>
                {props?.readonly &&
                    <>
                        {!props?.textonly &&
                            <Form.Control type="text"
                                aria-label={props.placeholder}
                                id={props.id}
                                value={text}
                                disabled={true}
                                readOnly={true}
                                className={`fs-6 ${props.className}`} />
                        }
                        {props?.textonly &&
                            <>
                                {text}
                            </>
                        }
                    </>
                }
                {!props?.readonly &&
                    <select
                        aria-label={props.placeholder}
                        id={props.id}
                        value={value}
                        name='select'
                        className={`fs-6 form-control ${props.className}`}
                        disabled={props.readonly || false}
                        onChange={(e) => handleChange(e)}>
                        <option>--Select--</option>
                        {
                            (schema?.relationKey === "parentId")
                                ?
                                dataSet?.items?.map((item, i) => (
                                    <option key={i} value={item.id || item.name}>{item.name}</option>
                                ))
                                :
                                dataSet?.items?.filter((item) => item.type === "tower")?.map((item, i) => (
                                    <option key={i} value={item.id || item.name}>{item.name}</option>
                                ))
                        }

                    </select>
                }
            </>
        </>
    )
}

export default IUILookUpRelation;