import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from "react-bootstrap";
import api from '../../../store/api-service';

const IUICopy = (props) => {
    const module = props?.module;
    const [isCopy, setIsCopy] = useState(false);
    const [allItems, setAllItems] = useState([]);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const pageOptions = {
                recordPerPage: 0
            }

            const response = await api.getData({ module: module, options: pageOptions });
            setAllItems(response?.data?.items);
        }

        fetchData();
    }, [module]);

    const handleCheckBoxChange = (e) => {
        setIsCopy(e.target.checked);
    }

    const handleItemSelection = async (event) => {
        event.preventDefault();
        setSelectedOption(parseInt(event.target.value));
        const item = await api.getSingleData({ module: module, id: parseInt(event.target.value) });
        const customEvent = { target: { id: parseInt(event.target.value), value: item.data }, preventDefault: function () { } };
        props.onChange(customEvent);
    };

    return (
        <>
            <Form.Group className="position-relative form-group">
                <InputGroup>
                    <Form.Check
                        type="checkbox"
                        label={`Copy From Existing ${module}`}
                        className="d-flex align-items-center mr-2"
                        checked={isCopy}
                        onChange={(e) => handleCheckBoxChange(e)}
                    />
                </InputGroup>
            </Form.Group>
            {
                (isCopy && allItems.length > 0) && (
                    <Form.Group className="position-relative form-group">
                        <Form.Label className='text-uppercase mb-2'>
                            Select a {module}
                        </Form.Label>
                        <div>
                            <div className="row">
                            {
                                allItems?.map((item, index) => (
                                    <div className='col' key={`${module}-item-${index}`}>
                                        <Form.Check className='text-capitalize form-check-inline'
                                            type="radio"
                                            value={item.id}
                                            checked={selectedOption == item.id}
                                            onChange={handleItemSelection}
                                            label={item.name}
                                        />
                                        <br />
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </Form.Group>
                )
            }
        </>
    )
}

export default IUICopy;