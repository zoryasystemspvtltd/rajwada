import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../store/api-service';

const IUILookUpCount = (props) => {
    const schema = props?.schema;
    const [value, setValue] = useState("")
    const [text, setText] = useState("")

    const [dataSet, setDataSet] = useState(useSelector((state) => state.api[schema?.module]))

    useEffect(() => {
        async function fetchData() {
            let newBaseFilter = {};

            let filterKeys = Object.keys(schema?.filter);

            if (filterKeys.length === 1) {
                newBaseFilter = {
                    name: filterKeys[0],
                    value: schema?.filter?.[filterKeys[0]]
                    //operator: 'likelihood' // Default value is equal
                }
            }
            else {
                newBaseFilter = {
                    name: filterKeys[0],
                    value: schema?.filter?.[filterKeys[0]],
                    and: {
                        name: filterKeys[1],
                        value: schema?.filter?.[filterKeys[1]],
                    }
                }
            }
            
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
    }, [schema?.module, schema?.filter]);

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

    return (
        <>
            {dataSet?.items?.length}
        </>
    );
}

export default IUILookUpCount;