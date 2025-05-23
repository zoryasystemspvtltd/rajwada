import React, { Fragment, useEffect, useRef, useState } from "react";
import cameraMarker from "./assets/camera-marker.png";
import markerIcon from "./assets/marker-icon.png";
import pencilMarkerIcon from "./assets/pencil.png";
import defaultImage from "./assets/sample-floor-map.jpg";
import { Camera } from "./Camera";
import { Controls } from "./Controls";
import { Marker } from "./Marker";
import { Rectangle } from "./Rectangle";

import { useNavigate } from "react-router-dom";
import {
    TransformComponent,
    TransformWrapper
} from "react-zoom-pan-pinch";
import api from '../../store/api-service';
import { notify } from "../../store/notification";
import ModalComponent from "./Ilab-UnitOfWork";

const markerModalSchema = {
    title: 'Marker',
    fields: [
        { field: 'color', type: 'color', text: 'Marker Color', required: true },
        { field: 'label', type: 'text', text: 'Unit Of Work Label', placeholder: 'Unit Label', required: true },
    ]
};

const pencilModalSchema = {
    title: 'Pencil',
    fields: [
        { field: 'color', type: 'color', text: 'Marker Color', required: true },
        { field: 'label', type: 'text', text: 'Unit Of Work Label', placeholder: 'Unit Label', required: true },
    ]
};

const rectangleModalSchema = {
    title: 'Rectangle',
    fields: [
        { field: 'color', type: 'color', text: 'Rectangle Color', required: true },
        { field: 'label', type: 'text', text: 'Unit Of Work Label', placeholder: 'Unit of Work Label', required: true },
        {
            field: 'room', text: 'Room Type', type: 'lookup', required: true,
            schema: { module: 'room' }
        },
    ]
}

//const m = 'data:image/png;base64,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'

export const IlabMarkerCanvas = (props) => {
    const [mode, setMode] = useState('')
    const schema = props?.schema;
    const [modeStyle, setModeStyle] = useState({})
    const [scale, setScale] = useState(1)
    const size = { height: 49, width: 30 }
    const [markers, setMarker] = useState([]);
    const [unitOfWorks, setUnitOfWorks] = useState([]);
    const [deletedMarkers, setDeletedMarkers] = useState([])
    const [existingParentMarkers, setExistingParentMarkers] = useState([]);
    const [start, setStart] = useState()
    const [temp, setTemp] = useState()
    const [pallet, setPallet] = useState({ height: 600, width: 800 })
    const [currentId, setCurrentId] = useState(1);
    const [currentMarkerData, setCurrentMarkerData] = useState(null);
    const [planImage, setPlanImage] = useState(null);
    const parentRef = useRef(null)
    // Pencil Properties
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000'); // Initial color
    const [thickness, setThickness] = useState(2); // Initial thickness
    const [lastPos, setLastPos] = useState(null);  // To track last position
    // const [base64SVG, setBase64SVG] = useState(""); // Variable to store the Base64 SVG
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [formFields, setFormFields] = useState([]);
    const [baseFilter, setBaseFilter] = useState({});
    const [parent, setParent] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchParentData() {
            const item = await api.getSingleData({ module: schema?.parent?.module, id: parseInt(schema?.parentId) });
            setParent(item.data);
        }

        fetchParentData();
    }, [schema?.parent?.module, schema?.parentId]);

    useEffect(() => {
        async function fetchExistingMarkerData() {
            // Define pageOptions based on schema type
            let pageOptions = {
                recordPerPage: 0,
            };

            const response = await api.getData({ module: schema?.module, options: pageOptions });

            const markerInfo = response?.data?.items?.filter(item => item?.[schema?.parent?.filter] === parseInt(schema?.parentId))?.map(item => JSON.parse(item?.markerJson));
            // console.log(markerInfo)
            setUnitOfWorks(response?.data?.items?.filter(item => item?.[schema?.parent?.filter] === parseInt(schema?.parentId)));
            setMarker(markerInfo);
            setExistingParentMarkers(markerInfo);
        }

        fetchExistingMarkerData();
    }, [schema?.filter, schema?.parentId, schema?.module]);

    const handleOpenModal = (markerSchema, markerId, markerData) => {
        if (schema?.readonly) {
            return;
        }
        setFormFields(markerSchema?.fields); // Receive form fields from child
        setModalTitle(`${markerSchema?.title}-${markerId}`);
        setShowModal(true);
        setCurrentId(markerId);
        setCurrentMarkerData(markerData);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleSaveData = (data) => {
        const marker = markers?.filter(item => `${item.id}` === `${currentId}`);
        const index = markers?.findIndex(item => `${item.id}` === `${currentId}`);

        if (index >= 0) {
            let newMarker = marker[0];
            if (marker?.type !== "pencil") {
                newMarker.color = data?.color;
            }
            if (marker?.type === "pencil") {
                newMarker.pathData = marker[0]?.pathData;
            }
            newMarker.label = data?.label;
            if (data?.room) {
                newMarker.room = data?.room;
            }

            const newMarkers = [
                ...markers?.slice(0, index), // everything before array
                newMarker,
                ...markers?.slice(index + 1), // everything after array
            ];
            setMarker(newMarkers);
        }
        // console.log(markers);
    };

    const handleDelete = (data) => {
        const newMarkers = markers?.filter(marker => marker?.label !== data?.label)
        setMarker(newMarkers);
    }

    useEffect(() => {
        if (props?.value)
            setPlanImage(props?.value);
    }, [props?.value]);

    // Start drawing on mouse down
    const startDrawing = (e) => {
        e.preventDefault(); // Prevent any default behavior (like dragging)
        const { offsetX, offsetY } = e.nativeEvent;
        setLastPos({ x: offsetX, y: offsetY });  // Store last position
        setIsDrawing(true);

        // Create a new path for the current drawing
        const newPath = {
            id: markers.length + 1,
            color,
            thickness,
            pathData: `M${offsetX} ${offsetY}`,  // Start the path at the mouse position
            label: null,
            type: "pencil"
        };
        setCurrentId(markers.length + 1);
        setMarker((prevMarkers) => [...prevMarkers, newPath]);
    };

    // Draw on mouse move
    const draw = () => {

        if (!isDrawing) return;

        //const { offsetX, offsetY } = e.nativeEvent;

        // If the last position exists, we can create a smooth curve
        if (lastPos) {
            const cx = (lastPos.x + temp.x) / 2;  // Control point x
            const cy = (lastPos.y + temp.y) / 2;  // Control point y

            // Update the last path with a cubic Bezier curve (C)
            const marker = markers?.filter(item => `${item.id}` === `${currentId}`);
            const index = markers?.findIndex(item => `${item.id}` === `${currentId}`);

            if (index >= 0) {
                let newMarker = marker[0];
                newMarker.pathData += ` C${cx} ${cy} ${cx} ${cy} ${temp.x} ${temp.y}`;
                newMarker.color = color;
                newMarker.type = "pencil";
                const newMarkers = [
                    ...markers?.slice(0, index), // everything before array
                    newMarker,
                    ...markers?.slice(index + 1), // everything after array
                ]
                setMarker(newMarkers);
            }
        }

        // Update the last position for the next movement
        setLastPos({ x: temp.x, y: temp.y });
    };
    // Stop drawing on mouse up or mouse leave
    const stopDrawing = () => {
        setIsDrawing(false);
        setLastPos(null); // Clear last position after drawing
        setMode('');
        setModeStyle({});
    };

    // Handle color change
    const handleColorChange = (color) => {
        setColor(color);
    };

    // Handle thickness change
    const handleThicknessChange = (thickness) => {
        setThickness(thickness);
    };

    const handleDeleteAllMarkers = (flag) => {
        if (flag) {
            setMarker([]);
        }
    };

    const resetToOriginal = (flag) => {
        if (flag) {
            setMarker(existingParentMarkers);
        }
    };

    // Convert the SVG to Base64 and store it in a variable
    const convertSVGToBase64 = async (e) => {
        e.preventDefault();
        // const svgElement = document.getElementById("drawing-svg");

        // Serialize the SVG to a string
        // const svgString = new XMLSerializer().serializeToString(svgElement);

        // Encode the SVG string to Base64
        // const base64Encoded = btoa(unescape(encodeURIComponent(svgString)));

        // Store the Base64 string in the state
        // setBase64SVG(base64Encoded);

        // Optionally, log the Base64 string for debugging
        // console.log(base64Encoded);
        await savePageValue();
        notify("success", 'Save Successful!');
        // if (schema?.goBack) {
        //     navigate(`/reporting`);
        // }
        // else {
        //     navigate(0);
        // }
        if (!props?.readonly) {
            const modifiedEvent = {
                target: {
                    id: props?.id,
                    // modifiedImage: `data:image/svg+xml;base64,${base64Encoded}`,
                    value: planImage
                },
                preventDefault: function () { }
            };
            props.onChange(modifiedEvent);
        }
    };

    const deleteUnitOfWork = async (unitOfWorkId) => {
        const response = await api.deleteData({ module: schema?.module, id: unitOfWorkId });
        return response.data;
    }

    const addUnitOfWork = async (markerJson) => {
        const response = await api.addData({ module: schema?.module, data: { [schema?.parent?.filter]: parseInt(schema?.parentId), markerJson: JSON.stringify(markerJson), name: markerJson?.label } });
        return response.data;
    }

    const savePageValue = async () => {
        // Find existing markers for the selected plan
        // if no markers exist no problem
        // if editing then delete existing markers in both Unit Of Work and Plan
        // after that save markers in Unit of Work and Plan
        try {
            if (JSON.stringify(existingParentMarkers) === JSON.stringify(markers)) {
                return;
            }
            else {
                if (unitOfWorks.length > 0) {
                    const deletePromises = unitOfWorks.map(unit => deleteUnitOfWork(unit.id));
                    await Promise.all(deletePromises);
                }
                // Create fresh entries in Unit Of Work
                const addPromises = markers.map(marker => addUnitOfWork(marker));
                await Promise.all(addPromises);

                // Update Parent
                let parentPayload = { ...parent, markerJson: JSON.stringify(markers) };
                let response = await api.editData({ module: schema?.parent?.module, data: parentPayload });
                return response.data;
            }
        }
        catch (e) {
            notify("error", 'Units of Work Creation Failed!');
            // console.log(e);
        }
    }

    // useEffect(() => {
    //     if (parentRef.current) {
    //         setPallet({ height: parentRef.current.offsetHeight, width: parentRef.current.offsetWidth })
    //     }
    // }, []);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const handlePlanImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageContent = await convertBase64(file);
            setPlanImage(imageContent);
            setMarker([]);
            if (!props?.readonly) {
                const modifiedEvent = {
                    target: {
                        id: props?.id,
                        // modifiedImage: `data:image/svg+xml;base64,${base64Encoded}`,
                        value: imageContent
                    },
                    preventDefault: function () { }
                };
                props.onChange(modifiedEvent);
            }
        }
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setStart({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })

        if (mode === 'pencil') {
            startDrawing(e)
        }
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        //alert("Yooo");
        if (mode === 'marker') {

            setMarker([...markers, ...[{
                id: markers.length + 1,
                x: e.nativeEvent.offsetX - size.width / (scale * 2) + 3.5,
                y: e.nativeEvent.offsetY + 2,
                width: size.width,
                height: size.height,
                type: mode
            }]])
            setMode('');
            setModeStyle({});
            handleOpenModal(markerModalSchema, markers.length + 1, null);
        }

        if (mode === 'rectangle') {

            setMarker([...markers, ...[{
                id: markers.length + 1,
                x: start.x,
                y: start.y,
                width: (e.nativeEvent.offsetX + start.x - 1) > 0 ? (e.nativeEvent.offsetX - start.x - 1) : 0,
                height: (e.nativeEvent.offsetY + start.y - 1) > 0 ? (e.nativeEvent.offsetY - start.y - 1) : 0,
                type: mode
            }]])
            setMode('');
            setModeStyle({})
            setStart(null)
            setTemp(null);
            stopDrawing();
            handleOpenModal(rectangleModalSchema, markers.length + 1, null);
        }
        if (mode === 'pencil') {
            stopDrawing();
        }

        if (mode === 'pencil') {
            stopDrawing();
            handleOpenModal(pencilModalSchema, markers.length, null);
        }

        if (mode === 'camera') {

            setMarker([...markers, ...[{
                id: markers.length + 1,
                x: e.nativeEvent.offsetX - size.width / (scale * 2) + 3.5,
                y: e.nativeEvent.offsetY + 2,
                width: size.width,
                height: size.height,
                type: mode
            }]])
            setMode('');
            setModeStyle({})
        }
        setStart({})
    }

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (mode === 'rectangle' && start) {

            setTemp({
                id: markers.length + 1,
                x: start.x,
                y: start.y,
                width: (e.nativeEvent.offsetX + start.x - 1) > 0 ? (e.nativeEvent.offsetX - start.x - 1) : 0,
                height: (e.nativeEvent.offsetY + start.y) - 1 > 0 ? (e.nativeEvent.offsetY - start.y - 1) : 0,
                type: mode
            })

        }

        if (mode === 'pencil') {
            setTemp({
                id: markers.length + 1,
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY,
                width: 0,
                height: 0,
                type: mode
            })

            draw();
        }
    }


    const handleSelectionMode = (e, mode) => {
        //e.preventDefault();
        setMode(mode);
        switch (mode) {
            case 'marker': setModeStyle({ cursor: `url(${markerIcon}) 30 49,auto` })
                break;
            case 'camera': setModeStyle({ cursor: `url(${cameraMarker}) 30 49,auto` })
                break;
            case 'rectangle': setModeStyle({ cursor: `crosshair` })
                break;
            case 'pencil': setModeStyle({ cursor: `url(${pencilMarkerIcon}) 0 49,auto` })
                break;
            case 'move':
                setModeStyle({ cursor: `move` })
                break;
            default:
                setModeStyle({})
                break;
        }

    }

    function updateMarker(e, m) {
        const index = markers?.findIndex(item => `${item.id}` === `${m.id}`)

        if (index >= 0) {
            const newMarkers = [
                ...markers?.slice(0, index), // everything before array
                m,
                ...markers?.slice(index + 1), // everything after array
            ]
            setMarker(newMarkers)
        }
    }

    function handleTransform(e) {
        const newScale = e.instance.transformState.scale;
        setScale(e.instance.transformState.scale)
        if (e.instance.transformState.scale >= 1) {
            setModeStyle({ cursor: `move` })
        } else {
            setModeStyle({ cursor: `zoom-in` })
        }
        const newMarkers = markers.map((m, i) => {
            return {
                id: m.id,
                x: m.x,
                y: m.y,
                width: (m.type === 'marker' || m.type === 'camera') ? (size.width / newScale) : m.width,
                height: (m.type === 'marker' || m.type === 'camera') ? (size.height / newScale) : m.height,
                type: m.type,
                color: m?.color,
                label: m?.label,
                pathData: m?.pathData ? m?.pathData : null,
                room: m?.room ? m?.room : null,
                thickness: m?.thickness ? m?.thickness : null
            }
        })
        setMarker(newMarkers);
    }

    const listStyles = {
        list: {
            listStyleType: 'none',
            padding: 0,
        },
        listItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
        },
        icon: {
            marginRight: '10px',
            fontSize: '16px', // Adjust the size of the icon
        },
        text: {
            fontSize: '16px', // Size of the text
        },
    };

    return (
        <div className="tab-content">
            <div className="tabs-animation">
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-card mb-3 card">
                            <div className={`card-body ${props.className}`}>
                                <div className='row'>
                                    <div className='col-md-9'>
                                        {
                                            (schema?.upload) && (
                                                <div className="mb-2">
                                                    {/* <h6>Image Upload</h6> */}
                                                    <input type="file" accept="image/*" onChange={handlePlanImageChange} />
                                                </div>
                                            )
                                        }
                                        <div ref={parentRef} style={{ border: '1px solid #CCC' }}>
                                            <TransformWrapper
                                                panning={{ excluded: ['drag-exclude'] }}
                                                pinch={{ excluded: ['drag-exclude'] }}
                                                wheel={{ excluded: ['drag-exclude'] }}
                                                initialScale={1}
                                                minScale={.5}
                                                initialPositionX={0}
                                                initialPositionY={0}
                                                onTransformed={(e) => handleTransform(e)}                >
                                                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                                    <>
                                                        <Controls
                                                            onChange={handleSelectionMode}
                                                            onPencilColorChange={handleColorChange}
                                                            onPencilThicknessChange={handleThicknessChange}
                                                            deleteAllMarkers={handleDeleteAllMarkers}
                                                            resetToOriginal={resetToOriginal}
                                                            markerStatus={schema?.controls}
                                                        />
                                                        <TransformComponent>
                                                            <svg
                                                                id="drawing-svg"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                style={modeStyle}
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                                                version="1.1"
                                                                width={`${pallet.width}px`}
                                                                height={`${pallet.height}px`}
                                                                viewBox={`0 0 ${pallet.width} ${pallet.height}`}
                                                            >
                                                                <defs />
                                                                <rect fill="#ffffff" width="100%" height="100%" x="0" y="0" />
                                                                <g>
                                                                    <image x="0" y="0" width="100%" height="100%"
                                                                        className={(mode === 'rectangle' || mode === 'pencil') ? 'drag-exclude' : ''}
                                                                        onMouseUp={(e) => handleMouseUp(e)}
                                                                        onMouseDown={(e) => handleMouseDown(e)}
                                                                        onMouseMove={(e) => handleMouseMove(e)}
                                                                        xlinkHref={planImage ? planImage : defaultImage}
                                                                    />
                                                                    <g data-cell-id="0">
                                                                        {temp &&
                                                                            <Rectangle
                                                                                id={0}
                                                                                x={temp.x}
                                                                                y={temp.y}
                                                                                width={temp.width}
                                                                                color={temp?.color}
                                                                                label={temp?.label}
                                                                                room={temp?.room}
                                                                                height={temp.height}
                                                                                onChange={updateMarker}
                                                                                onMove={handleSelectionMode}
                                                                                onMouseUp={handleMouseUp}
                                                                                onMouseDown={handleMouseDown}
                                                                                onMouseMove={handleMouseMove}
                                                                                onClick={(e) => setCurrentId(0)}
                                                                                style={modeStyle}
                                                                                openModal={handleOpenModal}
                                                                            />
                                                                        }
                                                                        {markers?.map((m, i) => (
                                                                            <Fragment key={i}>

                                                                                {m.type === 'rectangle' &&
                                                                                    <Rectangle
                                                                                        id={m?.id ? m?.id : i + 1}
                                                                                        x={m.x}
                                                                                        y={m.y}
                                                                                        width={m.width}
                                                                                        height={m.height}
                                                                                        color={m?.color}
                                                                                        label={m?.label}
                                                                                        room={m?.room}
                                                                                        onChange={updateMarker}
                                                                                        onMove={handleSelectionMode}
                                                                                        onMouseUp={handleMouseUp}
                                                                                        onMouseDown={handleMouseDown}
                                                                                        onMouseMove={handleMouseMove}
                                                                                        onClick={(e) => m?.id ? setCurrentId(m?.id) : setCurrentId(i + 1)}
                                                                                        style={modeStyle}
                                                                                        openModal={handleOpenModal}
                                                                                    />
                                                                                }
                                                                            </Fragment>

                                                                        ))}
                                                                    </g>
                                                                    <g data-cell-id="01">

                                                                        {markers?.map((m, i) => (
                                                                            <Fragment key={i}>
                                                                                {m.type === 'marker' &&
                                                                                    <Marker
                                                                                        id={m?.id ? m?.id : i + 1}
                                                                                        x={m.x}
                                                                                        y={m.y}
                                                                                        color={m?.color}
                                                                                        label={m?.label}
                                                                                        width={m.width}
                                                                                        height={m.height}
                                                                                        onChange={updateMarker}
                                                                                        onMove={handleSelectionMode}
                                                                                        onClick={(e) => m?.id ? setCurrentId(m?.id) : setCurrentId(i + 1)}
                                                                                        openModal={handleOpenModal}
                                                                                    />
                                                                                }

                                                                            </Fragment>

                                                                        ))}
                                                                    </g>
                                                                    <g data-cell-id="02">

                                                                        {markers?.map((m, i) => (
                                                                            <Fragment key={i}>
                                                                                {m.type === 'camera' &&
                                                                                    <Camera
                                                                                        id={i + 1}
                                                                                        x={m.x}
                                                                                        y={m.y}
                                                                                        width={m.width}
                                                                                        height={m.height}
                                                                                        onChange={updateMarker}
                                                                                        onMove={handleSelectionMode}
                                                                                        onClick={(e) => m?.id ? setCurrentId(m?.id) : setCurrentId(i + 1)}
                                                                                    />
                                                                                }

                                                                            </Fragment>

                                                                        ))}
                                                                    </g>
                                                                    <g data-cell-id="03">

                                                                        {markers?.map((path, index) => (
                                                                            <Fragment key={index}>
                                                                                {path.type === 'pencil' &&
                                                                                    <path
                                                                                        key={path?.id ? path?.id : index + 1}
                                                                                        d={path.pathData}
                                                                                        stroke={path.color}
                                                                                        strokeWidth={path.thickness}
                                                                                        fill="transparent"
                                                                                        onClick={(e) => { path?.id ? setCurrentId(path?.id) : setCurrentId(index + 1); handleOpenModal(pencilModalSchema, path?.id ? path?.id : index + 1, path) }}
                                                                                        cursor="pointer"
                                                                                    />
                                                                                }

                                                                            </Fragment>

                                                                        ))}
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                        </TransformComponent>
                                                    </>
                                                )}
                                            </TransformWrapper>
                                        </div>
                                    </div>
                                    <div className='col-md-3'>
                                        <ol style={listStyles.list}>
                                            {markers?.map((m, i) => {
                                                if (m.type === 'marker') {
                                                    return (
                                                        <li key={i} style={listStyles.listItem}>
                                                            <i
                                                                className="fa-solid fa-location-dot fa-lg"
                                                                style={{ ...listStyles.icon, color: m?.color ? m.color : "#ff2424" }}
                                                                title={m?.label ? m.label : m.type}>
                                                            </i>
                                                            <span style={listStyles.text}>
                                                                {/* {m?.label ? m.label : m.type} - (x:{parseInt(m.x)}, y:{parseInt(m.y)}) {parseInt(m.height)} {parseInt(m.width)} */}
                                                                {m?.label ? m.label : m.type}
                                                            </span>
                                                        </li>
                                                    )
                                                }
                                                else if (m.type === 'rectangle') {
                                                    return (
                                                        <li key={i} style={listStyles.listItem}>
                                                            <i className="bi bi-bounding-box fs-5" style={{ ...listStyles.icon, color: m?.color ? m.color : "blue" }} title={m?.label ? m.label : m.type}></i>
                                                            <span style={listStyles.text}>
                                                                {/* {m.type} - (x:{parseInt(m.x)}, y:{parseInt(m.y)}) {parseInt(m.height)} {parseInt(m.width)} */}
                                                                {m?.label ? m.label : m.type}
                                                            </span>
                                                        </li>
                                                    )
                                                }
                                                else if (m.type === 'camera') {
                                                    return (
                                                        <li key={i} style={listStyles.listItem}>
                                                            <span style={listStyles.text}>
                                                                <i className="bi bi-camera-fill fs-5" style={listStyles.icon} title={m.type}></i>
                                                                {/* {m.type} - (x:{parseInt(m.x)}, y:{parseInt(m.y)}) {parseInt(m.height)} {parseInt(m.width)} */}
                                                                {m.type}
                                                            </span>
                                                        </li>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <li key={i} style={listStyles.listItem}>
                                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                                <div style={{ width: "20px", height: `${m?.thickness}px`, backgroundColor: m?.color }}></div>
                                                                <div style={{ fontSize: "16px", marginLeft: "10px" }}>{m?.label ? m.label : m.type}</div>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ol>
                                        {
                                            (schema?.save) && (
                                                <div className="row mt-2">
                                                    <div className="col d-flex justify-content-center">
                                                        <button className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-success" onClick={convertSVGToBase64}>Save Image</button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        {/* <div className="row mt-2">
                                            <h4>Saved Data:</h4>
                                            <pre>{JSON.stringify(markers, null, 2)}</pre>
                                        </div> */}
                                    </div>
                                    <ModalComponent
                                        show={showModal}
                                        title={modalTitle}
                                        handleClose={handleCloseModal}
                                        formFields={formFields}
                                        value={currentMarkerData}
                                        handleSubmit={handleSaveData}
                                        handleDelete={handleDelete}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

//<img src={`data:image/svg+xml;base64,${base64SVG}`} />