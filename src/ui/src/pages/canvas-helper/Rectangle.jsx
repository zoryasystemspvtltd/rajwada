import React, { useEffect, useState } from "react";

export const Rectangle = (props) => {
    const [point, setPoint] = useState({
        x: props?.x,
        y: props?.y,
        width: props?.width,
        height: props?.height,
        type: 'rectangle'
    })
    useEffect(() => {
        setPoint({
            id: props.id,
            x: props?.x,
            y: props?.y,
            width: props?.width,
            height: props?.height,
            type: 'rectangle',
            color: props?.color
        })
    }, [props]);

    const modalSchema = {
        title: 'Rectangle',
        fields: [
            { field: 'color', type: 'color', text: 'Pick a Color', required: true },
            { field: 'label', type: 'text', text: 'Enter Text', placeholder: 'Unit of Work Label', required: true },
            {
                field: 'room', text: 'Room Type', type: 'lookup', required: true,
                schema: { module: 'room' }
            },
        ]
    }

    const selectMarkar = (e) => {
        e.preventDefault();
        // alert(`Marker Selected ${props?.id}`);
        props?.openModal(modalSchema);
    }


    const onMouseDown = (e) => {
        if (props?.onMouseDown) {
            props.onMouseDown(e)
        }
    };

    const onMouseMove = (e) => {
        if (props?.onMouseMove) {
            props.onMouseMove(e)
        }
    };

    const onMouseUp = (e) => {
        if (props?.onMouseUp) {
            props.onMouseUp(e)
        }
    };

    const onClick = (e) => {
        if (props?.onClick) {
            props.onClick(e)
        }
    };

    return (
        <g data-cell-id="1" >
            <a href="./" xlinkHref="./" onClick={selectMarkar}>
                <g>
                    <rect
                        width={point?.width}
                        height={point?.height}
                        x={point?.x}
                        y={point?.y}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        onClick={onClick}
                        style={
                            {
                                fill: point?.color ? point.color : 'blue',
                                stroke: point?.color ? point.color : 'blue',
                                strokeWidth: 5,
                                fillOpacity: 0.3,
                                strokeOpacity: 0.9
                            }
                        }
                    />
                </g>
            </a>
        </g>
    )
};