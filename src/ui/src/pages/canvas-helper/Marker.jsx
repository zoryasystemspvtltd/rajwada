import React, { useEffect, useRef, useState } from "react";

export const Marker = (props) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMove, setIsMove] = useState(false);
    const [modeStyle, setModeStyle] = useState({});
    const [point, setPoint] = useState({
        x: props?.x - props?.width / 2,
        y: props?.y - props?.height,
        width: props?.width,
        height: props?.height,
        color: props?.color,
        label: props?.label,
        type: 'marker'
    });

    const modalSchema = {
        title: 'Marker',
        fields: [
            { field: 'color', type: 'color', text: 'Marker Color', required: true },
            { field: 'label', type: 'text', text: 'Unit Of Work Label', placeholder: 'Unit Label', required: true },
        ]
    }

    // Track hover state and drag state
    const [cursorMove, setCursorMove] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const hoverTimeoutRef = useRef(null);  // Timeout reference for hover delay
    const initialMouseOffset = useRef({ x: 0, y: 0 }); // For calculating drag offset

    useEffect(() => {
        setPoint({
            id: props.id,
            x: props?.x - props?.width / 2,
            y: props?.y - props?.height,
            width: props?.width,
            height: props?.height,
            color: props?.color,
            label: props?.label,
            type: 'marker'
        });
    }, [props]);

    // Handle clicking to display the color picker modal
    const selectMarker = (e) => {
        e.preventDefault();
        if (!isMove) {
            props?.openModal(modalSchema, props?.id, (props?.color && props?.label) ? {color: props?.color, label: props?.label} : null);  // Notify parent (if needed) for color picker display
        }
        setIsMove(false);  // Reset move flag on click
    };

    // Handle mouse down event (start dragging)
    const onMouseDown = ({ nativeEvent }) => {
        initialMouseOffset.current = {
            x: nativeEvent.offsetX - point.x,
            y: nativeEvent.offsetY - point.y
        };
        setIsMouseDown(true);
        setCursorMove(false);  // Reset cursor move state during mouse down
        setHasDragged(false);  // Reset drag flag
    };

    // Handle mouse move event (dragging logic)
    const onMouseMove = ({ nativeEvent }) => {
        if (!isMouseDown) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        const newPoint = {
            id: point.id,
            x: offsetX - initialMouseOffset.current.x,
            y: offsetY - initialMouseOffset.current.y,
            width: point?.width,
            height: point?.height,
            color: point?.color,
            label: point?.label,
            type: 'marker'
        };

        setPoint(newPoint);  // Update point's position during drag
        setIsMove(true);  // Indicate dragging is in progress
        setModeStyle({ cursor: 'move' });  // Change cursor to "move" during drag
        setHasDragged(true);  // Mark that dragging occurred
    };

    // Handle mouse up event (end dragging)
    const onMouseUp = (e) => {
        setIsMouseDown(false);  // Reset mouse down state
        setIsMove(false);  // Reset move state
        setModeStyle({});  // Reset cursor style

        // Only open modal if no drag occurred
        if (!hasDragged) {
            selectMarker(e);  // Open color picker modal if not dragged
        }

        // Notify parent component with updated position if the marker was dragged
        if (props?.onChange) {
            props.onChange(e, {
                id: point.id,
                x: point.x + point?.width / 2,
                y: point.y + point?.height,
                width: point?.width,
                height: point?.height,
                color: point?.color,
                label: point?.label,
                type: 'marker'
            });
        }
    };

    // Handle hover and cursor change after delay
    const handleMouseEnter = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setCursorMove(true);  // Change cursor to "move" after hover delay
        }, 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeoutRef.current);  // Cancel hover timeout if mouse leaves
        setCursorMove(false);  // Reset cursor state when mouse leaves
    };

    const onClick = (e) => {
        if (props?.onClick) {
            props.onClick(e)
        }
    };

    // Set cursor style based on whether dragging is allowed
    const cursorStyle = cursorMove ? 'move' : 'default';

    return (
        <g data-cell-id="1" className="drag-exclude">
            <a href="./" xlinkHref="./" onClick={(e) => e.preventDefault()}>
                <g>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        style={{ cursor: cursorStyle }}
                        x={point?.x}
                        y={point?.y}
                        width={point?.width + 3}
                        height={point?.height}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        onClick={onClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        preserveAspectRatio="none"
                    >
                        <path fill={point?.color || "#ff2424"} d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <title>{point?.label}</title>
                </g>
            </a>
        </g>
    );
};