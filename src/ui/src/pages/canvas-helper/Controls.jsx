import React, { useState } from "react";
import {
    useControls
} from "react-zoom-pan-pinch";

export const Controls = (props) => {
    const markerStatus = props?.markerStatus;
    const { zoomIn, zoomOut, resetTransform } = useControls();
    const [color, setColor] = useState('#000000'); // Initial color
    const [thickness, setThickness] = useState(2); // Initial thickness

    const selectMode = (e, mode) => {
        e.preventDefault();
        if (props?.onChange) {
            props.onChange(e, mode);
        }
    }

    const deleteAllMarkers = (e) => {
        e.preventDefault();
        if (props?.deleteAllMarkers) {
            props.deleteAllMarkers(true);
        }
    }

    // Handle color change
    const handleColorChange = (e) => {
        e.preventDefault();
        if (props?.onPencilColorChange) {
            props.onPencilColorChange(e.target.value);
            setColor(e.target.value);
        }
    };

    // Handle thickness change
    const handleThicknessChange = (e) => {
        e.preventDefault();
        if (props?.onPencilThicknessChange) {
            props.onPencilThicknessChange(e.target.value);
            setThickness(e.target.value);
        }
    };

    return (
        <div className="tools" style={{ backgroundColor: '#CCC' }}>
            <a onClick={() => zoomIn()} title="Zoom +" className="btn">
                <i className="bi bi-zoom-in fs-5"></i>
            </a>
            <a onClick={() => zoomOut()} title="Zoom -" className="btn">
                <i className="bi bi-zoom-out fs-5"></i>
            </a>
            <a onClick={() => resetTransform()} title="Reset" className="btn">
                <i className="bi bi-reply fs-5"></i>
            </a>
            <a title="Point Marker" className="btn"
                href="./#" onClick={(e) => markerStatus?.balloon ? selectMode(e, 'marker') : e.preventDefault()}

            >
                {/* <img src={"assets/marker-icon.png"} style={{ height: '22px' }} alt={'Point Marker'} title={'Point Marker'} /> */}
                <i className="fa-solid fa-location-dot fa-lg" style={{ color: "#ff2424" }}></i>
            </a>
            <a title="Draw Rectangle" className="btn"
                href="./#" onClick={(e) => markerStatus?.rectangle ? selectMode(e, 'rectangle') : e.preventDefault()}
            >
                <i className="bi bi-bounding-box fs-5"></i>
            </a>
            <a title="Point Camera" className="btn"
                href="./#" onClick={(e) => markerStatus?.camera ? selectMode(e, 'camera') : e.preventDefault()}
            >
                <i className="bi bi-camera-fill fs-5"></i>
            </a>
            <a title="Pencil" className="btn"
                href="./#" onClick={(e) => markerStatus?.pencil ? selectMode(e, 'pencil') : e.preventDefault()}
            >
                <i className="bi bi-pencil fs-5"></i>
            </a>
            <a title="Pencil" className="btn"
                href="./#"
            >
                <label>
                    <input type="color" value={color} onChange={handleColorChange} />
                </label>
            </a>
            <div title="Pencil" className="btn"
            >
                <label>
                    <input
                        type="range"
                        min="1"
                        max="10"
                        value={thickness}
                        onChange={handleThicknessChange}
                    />
                </label>
            </div>
            <a onClick={deleteAllMarkers} title="Delete All" className="btn">
                <i className="bi bi-trash fs-5"></i>
            </a>
        </div>
    );
};