import React, { useState, useEffect } from 'react';

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
        console.log("Val: " + value + "Name: " + name)
        if (!props?.readonly) {
            setValue({ ...value, ...e.target.value });
            props.onChange(e);
        }
    };

    return (
        <>
            {!props?.readonly &&
                <label style={{ marginRight: '10px' }}>
                    <input
                        type="radio"
                        name={name} // All radio buttons for the same relation share the same name to be part of the same group
                        value={name}    // The value will be either "Alive" or "Dead"
                        checked={value === name}  // Check if this radio button is selected
                        onChange={(e) => handleChange(e)} // Trigger the onChange function on change
                    />
                    {name}
                </label>
            }
        </>
    );

};

export default IUIRadio;
