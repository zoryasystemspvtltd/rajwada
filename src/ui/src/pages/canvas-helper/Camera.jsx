import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import cameraIcon from "./assets/camera.png";
import customBeforeAfter from "./assets/custom-before-after.jpg";

export const Camera = (props) => {
    const [isMouseDown, setIsMouseDown] = useState(false);  // Track mouse down state
    const [isMove, setIsMove] = useState(false);  // Track if it's currently in move state
    const [modeStyle, setModeStyle] = useState({});  // Style for cursor
    const [displayImageBeforeAfter, setDisplayImageBeforeAfter] = useState(false);
    const [currentCameraId, setCurrentCameraId] = useState(null);
    const [point, setPoint] = useState({
        x: props?.x - props?.width / 2,
        y: props?.y - props?.height,
        width: props?.width,
        height: props?.height,
        type: 'camera'
    });
    const [cursorMove, setCursorMove] = useState(false); // Track if cursor should change to 'move'
    const [hasDragged, setHasDragged] = useState(false); // Track if a drag has occurred
    const hoverTimeoutRef = useRef(null); // To manage hover duration
    const initialMouseOffset = useRef({ x: 0, y: 0 }); // To track initial mouse offset during drag

    useEffect(() => {
        setPoint({
            id: props.id,
            x: props?.x - props?.width / 2,
            y: props?.y - props?.height,
            width: props?.width,
            height: props?.height,
            type: 'camera'
        });
    }, [props]);

    // Handle clicking on the marker to open the modal
    const selectMarker = (e) => {
        e.preventDefault();
        // console.log("Camera selected");
        if (!isMove) {
            setCurrentCameraId(props?.id);
            setDisplayImageBeforeAfter(true);
        }
        setIsMove(false);
    };

    // Handle mouse down event for dragging
    const onMouseDown = ({ nativeEvent }) => {
        // console.log("Camera Mouse Down");

        // Track initial mouse position when the user clicks on the marker
        initialMouseOffset.current = {
            x: nativeEvent.offsetX - point.x, // Save the offset difference from the marker's position
            y: nativeEvent.offsetY - point.y
        };

        setIsMouseDown(true);  // Set mouse down state
        setCursorMove(false);  // Reset the cursor move state during mouse down
        setHasDragged(false);  // Reset drag flag
    };

    // Handle mouse move event for dragging and hovering
    const onMouseMove = ({ nativeEvent }) => {
        if (!isMouseDown) {
            return;  // Only update position when mouse is down (dragging)
        }

        // console.log("Camera Mouse Moving...");
        const { offsetX, offsetY } = nativeEvent;

        // Calculate new position based on the mouse movement and initial mouse offset
        const newPoint = {
            id: point.id,
            x: offsetX - initialMouseOffset.current.x, // Adjust with the initial offset
            y: offsetY - initialMouseOffset.current.y, // Adjust with the initial offset
            width: point?.width,
            height: point?.height,
            type: 'camera'
        };

        setPoint(newPoint);  // Update point's position
        setIsMove(true);  // Set the move flag to true
        setModeStyle({ cursor: 'move' });  // Set cursor to move while dragging
        setHasDragged(true); // Mark that dragging occurred
    };

    // Handle mouse up event to stop dragging
    const onMouseUp = (e) => {
        // console.log("Camera Mouse Up");
        setIsMouseDown(false);  // Reset mouse down state
        setIsMove(false);  // Reset move state
        setModeStyle({});  // Reset cursor style

        // Only trigger modal if no drag occurred
        if (!hasDragged) {
            selectMarker(e); // Open the modal if the marker wasn't dragged
        }

        // If the marker was dragged, update the position
        if (props?.onChange) {
            props.onChange(e, {
                id: point.id,
                x: point.x + point?.width / 2,
                y: point.y + point?.height,
                width: point?.width,
                height: point?.height,
                type: 'camera'
            });
        }
    };

    // Handle hover and cursor change (delayed hover)
    const handleMouseEnter = () => {
        // Start hover effect with a timeout to change cursor after 500ms
        hoverTimeoutRef.current = setTimeout(() => {
            setCursorMove(true);  // Enable dragging after 500ms hover
        }, 500);
    };

    const handleMouseLeave = () => {
        // Clear timeout if mouse leaves before the duration
        clearTimeout(hoverTimeoutRef.current);
        setCursorMove(false);  // Reset cursor state if mouse leaves
    };

    // Set cursor style based on whether dragging is enabled
    const cursorStyle = cursorMove ? 'move' : 'default';

    return (
        <g data-cell-id="1" className="drag-exclude">
            <a href="./" xlinkHref="./" onClick={(e) => e.preventDefault()}>
                <g>
                    <image
                        style={{ cursor: cursorStyle }}
                        x={point?.x}
                        y={point?.y}
                        width={point?.width + 15}
                        height={point?.height - 2}
                        onMouseDown={onMouseDown}
                        onMouseUp={onMouseUp}
                        onMouseMove={onMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        xlinkHref={cameraIcon}
                        preserveAspectRatio="none"
                    />
                </g>
            </a>
            <Modal
                size="lg"
                show={displayImageBeforeAfter}
                onHide={() => setDisplayImageBeforeAfter(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        {`Camera Position #${currentCameraId}`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-12 col-md-8">
                                <img x="0" y="0" width="100%" height="100%" src={customBeforeAfter} />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </g>
    );
};