import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';
import api from '../../../store/api-service'
const IUILookUpModule = (props) => {
    const schema = props?.schema;
    const [value, setValue] = useState("")
    const [text, setText] = useState("")
    const [dataSet, setDataSet] = useState(useSelector((state) => state.api[schema?.module]))
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const response = await api.getModules();
            const items = response?.data
            const moduleData = [
                { id: 0, name: '--Select--' },
            ].concat(items.map((item, index) => {
                return {
                    id: index,
                    name: item.name
                }
            }))

            setDataSet(moduleData)
        }
        if (!schema?.module) {
            setDataSet({ items: schema?.items });
        } else {
            fetchData();
        }

    }, [schema?.module]);

    useEffect(() => {
        const newValue = schema?.module
            ? dataSet?.find(p => p.name === value.module)?.name
            : value.module
        if (newValue) {
            setText(newValue);
        }
    }, [dataSet, value.module]);

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
                    data-name={props.nameField}
                    name='select'
                    className={`form-control ${props.className}`}
                    disabled={props.readonly || false}
                    onChange={(e) => handleChange(e)}>
                    <option>--Select--</option>
                    {dataSet?.map((item, i) => (
                        <option key={i} value={item.value || item.name}>{item.name}</option>
                    ))}

                </select>
            }
        </>
    );
}

export default IUILookUpModule