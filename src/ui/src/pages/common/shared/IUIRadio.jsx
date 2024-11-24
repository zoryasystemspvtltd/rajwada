import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const IUIRadio = (props) => {
    const name = props?.name;
    const [value, setValue] = useState("")

    useEffect(() => {
        if (props?.value) {
            setValue(props?.value);
        }
    }, [props?.value]);

    const handleChange = (e) => {
        e.preventDefault();
        if (!props?.readonly) {
            setValue({ ...value, ...e.target.value });
            props.onChange(e);
        }
    };

    return (
        <div>
            {
                props.options.map((x, i) =>
                    <div key={i} className={`form-check${props.isVertical ? '' : ` form-check-inline`}`}>
                        <Form.Check className='text-capitalize'
                            type="radio"
                            style={{ transform: 'scale(1.2)' }}
                            id={name}
                            value={x.label}
                            checked={value === x.label || false}
                            onChange={(e) => handleChange(e)}
                            disabled={props.readonly}
                            label={x.label}
                        />
                    </div>)
            }
        </div>
    );

};

export default IUIRadio;