import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

const IUIHiddenState = (props) => {
    useEffect(() => {
        if (props?.value && props?.id) {
            const event = { target: { id: props?.id, value: props?.value }, preventDefault: function () { } }

            if (props.onChange) {
                props.onChange(event);
            }
        }
    }, [props?.value, props?.id]);

    return (
        <></>
    );
}


export default IUIHiddenState