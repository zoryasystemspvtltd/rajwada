import { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import api from '../../../store/api-service';

const IUILookUpRelationRooms = (props) => {
    const schema = props.schema;
    const [dataSet, setDataSet] = useState([]);
    const [flatTemplateId, setFlatTemplateId] = useState(-1);
    const [value, setValue] = useState("");
    const [text, setText] = useState("");

    const queryConstructor = (fields, data, index) => {
        if (index === 0) {
            return { name: fields[index]?.key, value: fields[index]?.value ? fields[index].value : parseInt(data[fields[index]?.name]) }
        }
        else {
            return {
                name: fields[index]?.key,
                value: fields[index]?.value ? fields[index].value : parseInt(data[fields[index]?.name]),
                and: queryConstructor(fields, data, index - 1)
            }
        }
    }

    useEffect(() => {
        const prepareDataSet = async () => {
            const newBaseFilter = queryConstructor(schema?.parentFilterFields, props?.parentData, schema?.parentFilterFields?.length - 1);

            const pageOptions = {
                recordPerPage: 0
                , searchCondition: newBaseFilter
            }

            const response = await api.getData({ module: schema?.module, options: pageOptions });
            const data = response?.data?.items[0] || {}; // flatData

            if (Object.keys(data).length === 0) {
                setDataSet([]);
                return;
            }
            else {
                const flatTemplateId = data[schema?.field];
                setFlatTemplateId(flatTemplateId);

                const newBaseFilter = {
                    name: schema?.field,
                    value: parseInt(flatTemplateId),
                }

                const pageOptions = {
                    recordPerPage: 0
                    , searchCondition: newBaseFilter
                }

                const response = await api.getData({ module: schema?.parentModule, options: pageOptions });
                const roomsByFlatTemplate = response?.data?.items?.map(templateData => templateData?.roomId) || [];

                const roomsDataResponse = await api.getData({ module: schema?.childModule, options: { recordPerPage: 0 } });
                const allRooms = roomsDataResponse?.data?.items || [];

                const requiredData = allRooms?.filter(room => roomsByFlatTemplate?.includes(room?.id));
                setDataSet(requiredData);
            }
        }

        if (props?.parentData) {
            prepareDataSet();
        }
    }, [props]);

    useEffect(() => {
        const determineValue = async () => {
            const childModuleResponse = await api.getData({ module: schema?.childModule, options: { recordPerPage: 0 } });

            const newValue = schema?.childModule
                ? childModuleResponse?.data?.items?.find(item => item.id === parseInt(value))?.name
                : value
            if (newValue) {
                setText(newValue);
            }
        }

        determineValue();

    }, [value, schema?.childModule]);

    useEffect(() => {
        if (props?.value) {
            setValue(props?.value);
        }
    }, [props?.value]);

    const handleChange = (e) => {
        e.preventDefault();
        if (!props?.readonly) {
            setValue({ ...value, [e.target.id]: e.target.value });
            props.onChange({ ...e, parentValue: { [schema?.field]: flatTemplateId }, preventDefault: () => { } });
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
                        {
                            dataSet?.map((item, i) => (
                                <option key={i} value={item.id || item.name}>{item.name}</option>
                            ))
                        }

                    </select>
                }
            </>
        </>
    )
}

export default IUILookUpRelationRooms;
