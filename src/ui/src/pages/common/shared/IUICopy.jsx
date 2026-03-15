import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from "react-bootstrap";
import api from '../../../store/api-service';


const IUICopy = (props) => {
    const schema = props?.schema;
    const module = schema?.module;
    const [isCopy, setIsCopy] = useState(false);
    const [allItems, setAllItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);


    useEffect(() => {
        async function fetchData() {
            let pageOptions = {
                recordPerPage: 0
            }
            if (props?.schema?.filterKey) {
                pageOptions.searchCondition = {
                    name: props?.schema?.filterKey,
                    value: props?.schema?.filterValue
                    //operator: 'likelihood' // Default value is equal
                }
            }


            const response = await api.getData({ module: module, options: pageOptions });
            setAllItems(response?.data?.items);
        }


        fetchData();
    }, [module, props?.schema]);


    const handleCheckBoxChange = (e) => {
        setIsCopy(e.target.checked);
    }


    const handleItemSelection = async (event) => {
        event.preventDefault();
        setSelectedOption(parseInt(event.target.value));
        let item = null;
        if (schema?.dataCopy) {
            item = await api.getDataCopy({ id: parseInt(event.target.value), type: props?.schema?.filterValue });
        }
        else {
            item = await api.getSingleData({ module: module, id: parseInt(event.target.value) });
        }
        let copiedData = item.data;
        delete copiedData.id;
        const customEvent = { target: { id: parseInt(event.target.value), value: copiedData }, preventDefault: function () { } };
        props.onChange(customEvent);
    };


    return (
        <>
            <Form.Group className="position-relative form-group">
                <InputGroup>
                    <Form.Check
                        type="checkbox"
                        label={`Copy From Existing ${schema?.copyLabel}`}
                        className="d-flex align-items-center mr-2"
                        checked={isCopy}
                        onChange={(e) => handleCheckBoxChange(e)}
                    />
                </InputGroup>
            </Form.Group>
            {
                (isCopy && allItems?.length > 0) && (
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <Form.Group className="position-relative form-group">
                                <Form.Label className='text-uppercase mb-2'>
                                    Select a {schema?.copyLabel}
                                </Form.Label>

                                < select
                                    aria-label={`copy-${module}`}
                                    id={`copy-select-${module}`}
                                    value={selectedOption}
                                    data-name={props.nameField}
                                    name='select'
                                    className={`form-control ${props.className}`}
                                    disabled={props.readonly || false}
                                    onChange={(e) => handleItemSelection(e)}>
                                    <option>--Select--</option>
                                    {allItems?.map((item, i) => (
                                        <option key={i} value={item.id}>{item.name}</option>
                                    ))}
                                </select>

                            </Form.Group >
                        </div>
                    </div>
                )
            }
        </>
    )
}


export default IUICopy;
