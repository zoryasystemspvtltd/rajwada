import { useState, useEffect } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import api from '../../../store/api-service';


const IUILookUpAsync = (props) => {
    const schema = props?.schema;
    const [value, setValue] = useState(null);


    const handleChange = (e) => {
        e.preventDefault();
        if (!props?.readonly) {
            setValue(e.target.value);
            props.onChange(e);
        }
    };


    useEffect(() => {
        if (props?.value) {
            setValue(props?.value);
        }
    }, [props?.value]);


    // Fetch options from backend
    const loadOptions = async (inputValue) => {
        try {
            let pageOptions = { recordPerPage: 0 };


            if (inputValue && inputValue !== "") {
                const newBaseFilter = {
                    name: "name",
                    value: inputValue,
                }
                pageOptions = { ...pageOptions, searchCondition: newBaseFilter };
            }


            const response = await api.getData({ module: schema?.module, options: pageOptions });


            return response?.data?.items?.map(item => ({
                label: item.name,
                value: item.id
            }));
        } catch (err) {
            console.error(err);
            return [];
        }
    };


    // Create new option in backend
    const handleCreate = async (inputValue) => {
        try {
            const res = await api.addData({ module: schema?.module, data: { name: inputValue } });


            const newOption = {
                label: inputValue,
                value: res
            };


            setValue(newOption);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <AsyncCreatableSelect
            cacheOptions
            defaultOptions
            loadOptions={loadOptions}
            onChange={handleChange}
            onCreateOption={handleCreate}
            value={value}
            isClearable
            placeholder="Select or type to add..."
        />
    );
};


export default IUILookUpAsync;
