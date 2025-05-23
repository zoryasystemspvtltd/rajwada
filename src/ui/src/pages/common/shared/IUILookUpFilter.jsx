import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';
import api from '../../../store/api-service'
const IUILookUpFilter = (props) => {
    const schema = props?.schema;
    const [value, setValue] = useState("")
    const [text, setText] = useState("")
    const [baseFilter, setBaseFilter] = useState({})

    const [dataSet, setDataSet] = useState(useSelector((state) => state.api[schema?.module]))
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const newBaseFilter = {
                name: schema?.filter,
                value: schema?.value,
                //operator: 'likelihood' // Default value is equal
            }

            setBaseFilter(newBaseFilter)
            const pageOptions = {
                recordPerPage: 0
                , searchCondition: newBaseFilter
            }

            const response = await api.getData({ module: schema?.module, options: pageOptions });
            setDataSet(response?.data)
        }

        if (!schema?.module) {
            setDataSet({ items: schema?.items });
        } else {
            fetchData();
        }
    }, [schema?.module]);

    useEffect(() => {
        const newValue = schema?.module
            ? dataSet?.items?.find(item => item.id === parseInt(value))?.name
            : value
        if (newValue) {
            setText(newValue);
        }
    }, [dataSet?.items, value]);

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
            {props?.readonly &&
                <>
                    {!props?.textonly &&
                        <Form.Control type="text"
                            aria-label={props.placeholder}
                            id={props.id}
                            value={text}
                            disabled={true}
                            readOnly={true}
                            className={`${props.className}`} />
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
                    className={`form-control ${props.className}`}
                    disabled={props.readonly || false}
                    onChange={(e) => handleChange(e)}>
                    <option>--Select--</option>
                    {dataSet?.items?.map((item, i) => (
                        <option key={i} value={item.id || item.name}>{item.name}</option>
                    ))}

                </select>
            }
        </>
    );
}

export default IUILookUpFilter