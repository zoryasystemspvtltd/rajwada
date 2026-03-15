import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../store/api-service';

const IUILookUpNullFilter = (props) => {
    const schema = props?.schema;
    const selfId = schema?.selfId;
    const fieldsToFilter = schema?.fieldsToFilter || [];
    const matchAll = schema?.matchAll || false;
    const excludeSelf = schema?.excludeSelf || false;
    const [value, setValue] = useState("");
    const [text, setText] = useState("");
    const [dataSet, setDataSet] = useState(useSelector((state) => state.api[schema?.module]));

    useEffect(() => {
        async function fetchData() {
            const pageOptions = {
                recordPerPage: 0
            }

            const response = await api.getData({ module: schema?.module, options: pageOptions });
            const data = response?.data?.items || [];

            let filtered = (fieldsToFilter?.length > 0) ? data.filter(item => {
                if (matchAll) {
                    // all fields are null
                    return fieldsToFilter.every(field => item[field] === null);
                } else {
                    // any field is null
                    return fieldsToFilter.some(field => item[field] === null);
                }
            }) : data;

            if (excludeSelf) {
                filtered = filtered?.filter(item => item?.id !== parseInt(selfId))
            }

            setDataSet({ items: filtered });
        }

        if (!schema?.module) {
            setDataSet({ items: schema?.items });
        } else {
            fetchData();
        }
    }, [schema?.module, matchAll, fieldsToFilter, excludeSelf]);

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

export default IUILookUpNullFilter;
