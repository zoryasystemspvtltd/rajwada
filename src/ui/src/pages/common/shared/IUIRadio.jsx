import React, { useState } from 'react';
const IUIRadio = (props) => {
    const name = props?.name;
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        e.preventDefault();
        if (!props?.readonly) {
            setValue({ ...value, ...e.target.value });
            props.onChange(e);
        }
    };

    return (
        <>
            {!props?.readonly &&
                <div>
                    {props.options.map((x, i) => <div key={i} className={`form-check${props.isVertical ? '' : ` form-check-inline`}`}>
                        <input
                            type="radio"
                            name={name}
                            className=""
                            id={x.value}
                            value={x.value}
                            onChange={e => handleChange(e)} />
                        <label
                            className="form-check-label"
                            htmlFor={x.value}>
                            {x.label}
                        </label>
                    </div>)}
                </div>
            }
        </>
    );
}

export default IUIRadio