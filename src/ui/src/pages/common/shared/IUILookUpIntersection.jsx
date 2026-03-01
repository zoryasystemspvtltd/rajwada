import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../../store/api-service';

const IUILookUpIntersection = (props) => {
    const schema = props?.schema;
    const [value, setValue] = useState("")
    const [text, setText] = useState("")

    const [dataSet, setDataSet] = useState(useSelector((state) => state.api[schema?.module]))

    useEffect(() => {
        async function fetchData() {
            const pageOptions = { recordPerPage: 0 }
            const response = await api.getData({ module: schema?.module, options: pageOptions });
            let baseData = response?.data?.items;

            if (schema?.intersection) {
                const intersectionModule = schema?.intersection?.module;
                const entityId = schema?.intersection?.id;
                const entityField = schema?.intersection?.field;

                const entity = await api.getSingleData({ module: intersectionModule, id: entityId });
                const requiredDataIds = JSON.parse(entity.data?.[entityField])?.map(item => parseInt(item?.[schema?.intersection?.identifier])) || [];

                const filteredData = baseData?.filter(item => requiredDataIds.includes(item?.id));
                setDataSet(filteredData);
            }
            else {
                setDataSet(baseData);
            }
        }

        if (!schema?.module) {
            setDataSet(schema?.items);
        } else {
            fetchData();
        }
    }, [schema?.module]);

    useEffect(() => {
        const newValue = schema?.module
            ? dataSet?.find(item => item.id === parseInt(value))?.name
            : value
        if (newValue) {
            setText(newValue);
        }
    }, [dataSet, value]);

    useEffect(() => {
        if (props?.clearFields) {
            setValue("");
            setText("");
        }
    }, [props?.clearFields]);

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
                            {schema?.path &&
                                <Link to={`/${schema.path}/${value}`}>{text}</Link>
                            }
                            {!schema?.path &&
                                <>
                                    {text}
                                </>
                            }
                        </>
                    }
                </>
            }
            {!props?.readonly && schema?.dynamic &&
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
                        <option key={i} value={item.id || item[props.nameField]}>{item[props.nameField]}</option>
                    ))}


                </select>
            }
            {!props?.readonly && !schema?.dynamic &&
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
                        <option key={i} value={item.id || item.name}>{item.name}</option>
                    ))}
                </select>
            }
        </>
    );
}

export default IUILookUpIntersection;
