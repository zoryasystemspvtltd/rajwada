import React, { useEffect, useState, useRef } from 'react';

const IlabCanvas = (props) => {
    const width = "600"
    const hight = "400"
    const imgRef = useRef(null);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const parentRef = useRef(null);
    const rectRef = useRef({
        startX: null,
        startY: null,
        width: null,
        height: null
    });
    const [isMouseDown, setIsMouseDown] = useState(false);
    const scale = 1;
    const color = "#5299D3";

    function imageUrlChangeEffect() {
        imgRef.current.src = props.url;
    }

    //function componentMountEffect() {
        // imgRef.current.onload = handleImageLoad;
        // canvasRef.current.onmouseup = handleMouseUp;
        // canvasRef.current.onmousedown = handleMouseDown;
        // canvasRef.current.onmousemove = handleMouseMove;
    //}

    // function handleImageLoad() {
    //     drawImage();
    // }

    useEffect(imageUrlChangeEffect, [props.url]);

    useEffect(() => {

        const canvas = canvasRef.current;
        canvas.width = parentRef.current.offsetWidth * scale;
        canvas.height = hight * scale;
        canvas.style.width = `${parentRef.current.offsetWidth}px`;
        canvas.style.height = `${hight}px`;

        const context = canvas.getContext("2d");
        context.scale(scale, scale);
        context.lineCap = "round";
        context.strokeStyle = "#CCCCCC";
        context.setLineDash([1, 1]);
        context.lineWidth = 1;
        contextRef.current = context;
    }, []);

    const onMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const rect = rectRef.current;
        rect.startX = offsetX;
        rect.startY = offsetY;
        setIsMouseDown(true);
    };

    const onMouseMove = ({ nativeEvent }) => {
        if (!isMouseDown) {
            return;
        }

        const { offsetX, offsetY } = nativeEvent;
        const canvas = canvasRef.current;
        const context = contextRef.current;
        const rect = rectRef.current;

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Set the coordinates for the current rect
        rect.width = offsetX - rect.startX;
        rect.height = offsetY - rect.startY;

        // Draw the dashed stroke to indicate editing
        drawStroke(rect, context);

        // Draw the current rect
        context.fillStyle = color;
        context.globalAlpha = 0.3;
        context.fillRect(rect.startX, rect.startY, rect.width, rect.height);
        context.globalAlpha = 1.0;
    };

    const onMouseUp = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        const rect = rectRef.current;

        setIsMouseDown(false);

        // Clear the canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the current rect
        context.fillStyle = color;
        context.globalAlpha = 0.3;
        context.fillRect(rect.startX, rect.startY, rect.width, rect.height);
        context.globalAlpha = 1.0;
    };

    // When drawing the stroke around the shape, negative width/height must be considered
    const drawStroke = (rect, context) => {
        const strokeGap = context.lineWidth;
        // Case 1: Rectangle is drawn to the right and below the origin
        if (rect.width > 0 && rect.height > 0) {
            context.strokeRect(
                rect.startX - strokeGap,
                rect.startY - strokeGap,
                rect.width + strokeGap * 2,
                rect.height + strokeGap * 2
            );
        }
        // Case 2: Rectangle is drawn to the right and above the origin
        if (rect.width > 0 && rect.height < 0) {
            context.strokeRect(
                rect.startX - strokeGap,
                rect.startY + strokeGap,
                rect.width + strokeGap * 2,
                rect.height - strokeGap * 2
            );
        }
        // Case 3: Rectangle is drawn to the left and below the origin
        if (rect.width < 0 && rect.height > 0) {
            context.strokeRect(
                rect.startX + strokeGap,
                rect.startY - strokeGap,
                rect.width - strokeGap * 2,
                rect.height + strokeGap * 2
            );
        }

        // Case 4: Rectangle is drawn to the left and above the origin
        if (rect.width < 0 && rect.height < 0) {
            context.strokeRect(
                rect.startX + strokeGap,
                rect.startY + strokeGap,
                rect.width - strokeGap * 2,
                rect.height - strokeGap * 2
            );
        }
    };

    const drawImage = () => {
        const context = canvasRef.current.getContext("2d");
        context.drawImage(imgRef.current, 0, 0, imgRef.current.width, imgRef.current.height);
    };

    return (


        <div className="image-viewer" ref={parentRef}>
            <canvas
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                ref={canvasRef}
                style={{ border: '1px solid #CCC' }}
            />
            <img
                ref={imgRef}
                onLoad={drawImage}
                style={{ display: 'none' }} />
        </div>
    );
}

const ILab = ({ children }) => <>{children}</>;
ILab.Canvas = IlabCanvas
export default ILab