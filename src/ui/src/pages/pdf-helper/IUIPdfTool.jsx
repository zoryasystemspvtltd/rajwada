import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Layer, Line, Path, Rect, Stage, Text, Group } from 'react-konva';
import { Document, Page, pdfjs } from 'react-pdf';
import api from '../../store/api-service';
import { notify } from '../../store/notification';
import pencilMarkerIcon from '../canvas-helper/assets/pencil.png';

const LocationDotIcon = ({ x, y, size = 24, color = 'red' }) => {
    const scale = size / 512;
    return (
        <Path
            x={x - (512 * scale) / 2}
            y={y - (512 * scale) / 2}
            data="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            fill={color}
            scale={{ x: scale, y: scale }}
        />
    );
};

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const IUIPdfTool = (props) => {
    const schema = props?.schema;
    const [file, setFile] = useState(null);

    // incoming preferred size (acts as maxs on large screens)
    const maxWidth = props?.width || 800;
    const maxHeight = props?.height || 1100;

    // responsive container + stage/page sizes
    const containerRef = useRef(null);
    const pageBoxRef = useRef(null); // wraps the Page so we can read its canvas size
    const [containerWidth, setContainerWidth] = useState(maxWidth);
    const [stageW, setStageW] = useState(maxWidth);
    const [stageH, setStageH] = useState(maxHeight);

    // PDF
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    // Tools & style
    const [tool, setTool] = useState(null); // 'rectangle' | 'pencil' | 'marker'
    const [selectedColor, setSelectedColor] = useState('#ff0000');
    const [strokeWidth, setStrokeWidth] = useState(2);
    const [dotSize, setDotSize] = useState(28);

    // Drawing drafts
    const stageRef = useRef();
    const [drawing, setDrawing] = useState(false);
    const [currentLine, setCurrentLine] = useState([]); // for pencil
    const [draftRect, setDraftRect] = useState(null); // {x,y,w,h}

    // BACKEND-INTEGRATED SOURCE OF TRUTH
    const [markers, setMarkers] = useState([]); // all markers across pages
    const [unitOfWorks, setUnitOfWorks] = useState([]);
    const [existingParentMarkers, setExistingParentMarkers] = useState([]);
    const [parent, setParent] = useState({});

    // Label modal
    const [labelOpen, setLabelOpen] = useState(false);
    const [labelText, setLabelText] = useState('');
    const [pendingMarker, setPendingMarker] = useState(null);
    const [editingId, setEditingId] = useState(null);

    // ====== Responsive container width ======
    useEffect(() => {
        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const cw = entry.contentRect.width;
                // keep within your preferred maxWidth on large screens
                setContainerWidth(Math.min(cw, maxWidth));
            }
        });
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [maxWidth]);

    // After each render (page change or width change), sync Stage to actual <canvas> size that react-pdf rendered
    const syncStageToPdfCanvas = () => {
        const canvas = pageBoxRef.current?.querySelector('canvas');
        if (canvas) {
            setStageW(canvas.clientWidth);
            setStageH(canvas.clientHeight);
        } else {
            // fallback if canvas not found yet
            setStageW(containerWidth);
            setStageH(Math.min(maxHeight, window.innerHeight - 220));
        }
    };

    useEffect(() => {
        syncStageToPdfCanvas();
        // also re-check shortly after to catch late canvas paint
        const t = setTimeout(syncStageToPdfCanvas, 60);
        return () => clearTimeout(t);
    }, [pageNumber, containerWidth, numPages]);

    // also when PDF page finishes rendering, re-sync
    const onPageRenderSuccess = () => {
        syncStageToPdfCanvas();
    };

    // ====== Data Fetch ======
    useEffect(() => {
        async function fetchParentData() {
            const item = await api.getSingleData({
                module: schema?.parent?.module,
                id: parseInt(schema?.parentId),
            });
            setParent(item.data);
        }
        if (schema?.parent?.module && schema?.parentId) fetchParentData();
    }, [schema?.parent?.module, schema?.parentId]);

    useEffect(() => {
        if (props?.file) setFile(props?.file);
    }, [props?.file]);

    useEffect(() => {
        async function fetchExistingMarkerData() {
            const pageOptions = { recordPerPage: 0 };
            const response = await api.getData({
                module: schema?.module,
                options: pageOptions,
            });

            const items = response?.data?.items || [];
            const filtered = items.filter(
                (item) => item?.[schema?.parent?.filter] === parseInt(schema?.parentId)
            );

            const markerInfo = filtered.map((item) => JSON.parse(item?.markerJson));
            setUnitOfWorks(filtered);
            setMarkers(markerInfo); // render directly from backend markers
            setExistingParentMarkers(markerInfo);
        }
        if (schema?.module && schema?.parent?.filter && schema?.parentId) {
            fetchExistingMarkerData();
        }
    }, [schema?.module, schema?.parent?.filter, schema?.parentId]);

    // ====== PDF ======
    const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

    // ====== Tool handlers ======
    const changeTool = (e, t) => {
        e.preventDefault();
        setTool((prev) => (prev === t ? null : t));
    };

    const getPointer = () =>
        stageRef.current?.getStage()?.getPointerPosition() || { x: 0, y: 0 };

    const startDraw = () => {
        if (!tool) return;
        const point = getPointer();

        if (tool === 'pencil') {
            setDrawing(true);
            setCurrentLine([point.x, point.y]);
        } else if (tool === 'rectangle') {
            setDrawing(true);
            setDraftRect({ x: point.x, y: point.y, w: 0, h: 0 });
        } else if (tool === 'marker') {
            const newMarker = {
                id: Date.now(),
                type: 'marker',
                page: pageNumber,
                x: point.x,
                y: point.y,
                size: dotSize,
                color: selectedColor,
                label: '',
            };
            setPendingMarker(newMarker);
            setLabelText('');
            setEditingId(null);
            setLabelOpen(true);
        }
    };

    const draw = () => {
        if (!drawing) return;
        const point = getPointer();

        if (tool === 'pencil') {
            setCurrentLine((prev) => [...prev, point.x, point.y]);
        } else if (tool === 'rectangle' && draftRect) {
            setDraftRect((r) => ({ ...r, w: point.x - r.x, h: point.y - r.y }));
        }
    };

    const endDraw = () => {
        if (!drawing) return;
        setDrawing(false);

        if (tool === 'pencil' && currentLine.length >= 2) {
            const newMarker = {
                id: Date.now(),
                type: 'pencil',
                page: pageNumber,
                points: currentLine,
                color: selectedColor,
                strokeWidth,
                label: '',
            };
            setCurrentLine([]);
            setPendingMarker(newMarker);
            setLabelText('');
            setEditingId(null);
            setLabelOpen(true);
        } else if (tool === 'rectangle' && draftRect) {
            const { x, y, w, h } = draftRect;
            const norm = {
                x: w < 0 ? x + w : x,
                y: h < 0 ? y + h : y,
                width: Math.abs(w),
                height: Math.abs(h),
            };

            const newMarker = {
                id: Date.now(),
                type: 'rectangle',
                page: pageNumber,
                x: norm.x,
                y: norm.y,
                width: norm.width,
                height: norm.height,
                color: selectedColor,
                strokeWidth,
                label: '',
            };
            setDraftRect(null);
            setPendingMarker(newMarker);
            setLabelText('');
            setEditingId(null);
            setLabelOpen(true);
        }
    };

    // ====== Label Modal actions ======
    const saveLabel = () => {
        if (!pendingMarker) {
            setLabelOpen(false);
            return;
        }
        const labeled = { ...pendingMarker, label: labelText || '' };

        if (editingId != null) {
            setMarkers((prev) => {
                const idx = prev.findIndex((m) => m.id === editingId);
                if (idx === -1) return prev;
                const next = [...prev];
                next[idx] = labeled;
                return next;
            });
        } else {
            setMarkers((prev) => [...prev, labeled]);
        }

        setPendingMarker(null);
        setEditingId(null);
        setLabelText('');
        setLabelOpen(false);
    };

    const cancelLabel = () => {
        setPendingMarker(null);
        setEditingId(null);
        setLabelText('');
        setLabelOpen(false);
    };

    // ====== Editing existing ======
    const openEditLabel = (marker) => {
        if (schema?.readonly) return;
        setPendingMarker(marker);
        setEditingId(marker.id);
        setLabelText(marker.label || '');
        setLabelOpen(true);
    };

    // ====== Actions ======
    const undoLast = (e) => {
        e.preventDefault();
        setMarkers((prev) => {
            const lastIdx = [...prev]
                .map((m, i) => ({ m, i }))
                .filter(({ m }) => m.page === pageNumber)
                .map(({ i }) => i)
                .pop();
            if (lastIdx == null) return prev;
            const next = [...prev];
            next.splice(lastIdx, 1);
            return next;
        });
    };

    const clearPage = (e) => {
        e.preventDefault();
        setMarkers((prev) => prev.filter((m) => m.page !== pageNumber));
    };

    const clearAll = (e) => {
        e.preventDefault();
        setMarkers([]);
    };

    // ====== Backend save ======
    const deleteUnitOfWork = async (unitOfWorkId) => {
        const response = await api.deleteData({ module: schema?.module, id: unitOfWorkId });
        return response.data;
    };

    const addUnitOfWork = async (markerJson, activityId) => {
        const response = await api.addData({
            module: schema?.module,
            data: {
                [schema?.parent?.filter]: parseInt(schema?.parentId),
                markerJson: JSON.stringify(markerJson),
                name: markerJson?.label,
                activityId: (activityId !== -1) ? activityId : null
            },
        });
        return response.data;
    };

    const savePageValue = async (e) => {
        e.preventDefault();
        try {
            // console.log(markers);
            // console.log(unitOfWorks);
            // console.log(parent);
            // console.log(existingParentMarkers);
            let activityId = -1;

            if (JSON.stringify(existingParentMarkers) === JSON.stringify(markers)) return;

            if (unitOfWorks.length > 0) {
                activityId = unitOfWorks[0]?.activityId;
                const deletePromises = unitOfWorks.map((unit) => deleteUnitOfWork(unit.id));
                await Promise.all(deletePromises);
            }

            const addPromises = markers.map((marker) => addUnitOfWork(marker, activityId));
            await Promise.all(addPromises);

            const parentPayload = { ...parent, markerJson: JSON.stringify(markers) };
            await api.editData({ module: schema?.parent?.module, data: parentPayload });

            notify('success', 'Saved successfully');
            if (!props?.readonly) {
                const modifiedEvent = {
                    target: {
                        id: props?.id,
                        // modifiedImage: `data:image/svg+xml;base64,${base64Encoded}`,
                        value: file
                    },
                    preventDefault: function () { }
                };
                props.onChange(modifiedEvent);
            }
        } catch (e) {
            notify('error', 'Units of Work Creation Failed!');
        }
    };

    // ====== Render helpers ======
    const pageMarkers = markers.filter((m) => m.page === pageNumber);

    const renderLabel = (m) => {
        if (!m.label) return null;

        if (m.type === 'rectangle') {
            return (
                <Text
                    text={m.label}
                    x={m.x + 6}
                    y={m.y - 18}
                    fontSize={16}
                    fill={m.color}
                    onClick={() => openEditLabel(m)}
                />
            );
        }

        if (m.type === 'marker') {
            const lx = m.x + (m.size || dotSize) / 2 + 6;
            const ly = m.y - (m.size || dotSize) / 2 - 6;
            return (
                <Text
                    text={m.label}
                    x={lx}
                    y={ly}
                    fontSize={16}
                    fill={m.color}
                    onClick={() => openEditLabel(m)}
                />
            );
        }

        if (m.type === 'pencil') {
            const [sx, sy] = m.points || [0, 0];
            return (
                <Text
                    text={m.label}
                    x={(sx || 0) + 6}
                    y={(sy || 0) - 18}
                    fontSize={16}
                    fill={m.color}
                    onClick={() => openEditLabel(m)}
                />
            );
        }

        return null;
    };

    return (
        <div className="container-fluid py-2">
            {/* Top bar (desktop & tablets) */}
            {
                (!props?.readonly) && (
                    <>
                        <div className="bg-light border rounded-3 p-2 mb-2 d-none d-sm-block">
                            <div className="d-flex flex-wrap align-items-center gap-2">
                                {/* Tool buttons */}
                                <div className={props?.displayToolbar ? 'd-flex align-items-center gap-1 flex-wrap' : 'd-none'}>
                                    <button
                                        className={`btn btn-pill btn-sm ${tool === 'rectangle' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={(e) => changeTool(e, 'rectangle')}
                                        title="Rectangle"
                                    >
                                        <i className="bi bi-bounding-box" />
                                    </button>

                                    <button
                                        className={`btn btn-pill btn-sm ${tool === 'pencil' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={(e) => changeTool(e, 'pencil')}
                                        title="Pencil"
                                    >
                                        <i className="bi bi-pencil" />
                                    </button>

                                    <button
                                        className={`btn btn-pill btn-sm ${tool === 'marker' ? 'btn-primary' : 'btn-outline-primary'}`}
                                        onClick={(e) => changeTool(e, 'marker')}
                                        title="Location Dot"
                                    >
                                        <i className="fa-solid fa-location-dot" />
                                    </button>

                                    <button className="btn btn-pill btn-sm btn-warning" onClick={undoLast}>Undo</button>
                                    <button className="btn btn-pill btn-sm btn-danger" onClick={clearPage}>Clear Page</button>
                                    <button className="btn btn-pill btn-sm btn-danger" onClick={clearAll}>Clear All</button>
                                    <button className="btn btn-pill btn-sm btn-primary" onClick={savePageValue}>Save</button>

                                    {/* Color */}
                                    <div className="d-flex align-items-center ms-2">
                                        <small className="me-2 text-muted d-none d-md-inline">Color</small>
                                        <input
                                            type="color"
                                            value={selectedColor}
                                            onChange={(e) => setSelectedColor(e.target.value)}
                                            className="form-control form-control-color p-0"
                                            style={{ width: 34, height: 34 }}
                                        />
                                    </div>

                                    {/* Stroke width */}
                                    <div className="d-flex align-items-center">
                                        <small className="mx-2 text-muted d-none d-md-inline">Stroke</small>
                                        <input
                                            type="range"
                                            min="1"
                                            max="20"
                                            value={strokeWidth}
                                            onChange={(e) => setStrokeWidth(Number(e.target.value))}
                                            style={{ width: 120 }}
                                        />
                                    </div>

                                    {/* Dot size */}
                                    <div className="d-flex align-items-center">
                                        <small className="mx-2 text-muted d-none d-md-inline">Dot</small>
                                        <input
                                            type="range"
                                            min="12"
                                            max="64"
                                            value={dotSize}
                                            onChange={(e) => setDotSize(Number(e.target.value))}
                                            style={{ width: 120 }}
                                            title="Dot size"
                                        />
                                    </div>
                                </div>

                                {/* Pager */}
                                <div className="ms-auto d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-pill btn-sm btn-secondary"
                                        disabled={pageNumber <= 1}
                                        onClick={() => setPageNumber((p) => p - 1)}
                                    >
                                        Prev
                                    </button>
                                    <span className="text-nowrap">Page {pageNumber} / {numPages || '-'}</span>
                                    <button
                                        className="btn btn-pill btn-sm btn-secondary"
                                        disabled={!!numPages && pageNumber >= numPages}
                                        onClick={() => setPageNumber((p) => p + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Mobile toolbar (XS) – collapses into dropdown */}
                        <div className="bg-light border rounded-3 p-2 mb-2 d-sm-none">
                            <div className="d-flex align-items-center">
                                <div className="dropdown">
                                    <button className="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown">
                                        Tools
                                    </button>
                                    <div className="dropdown-menu p-3" style={{ minWidth: 260 }}>
                                        <div className="d-flex flex-wrap gap-2 mb-2">
                                            <button
                                                className={`btn btn-pill btn-sm ${tool === 'rectangle' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={(e) => changeTool(e, 'rectangle')}
                                                title="Rectangle"
                                            >
                                                <i className="bi bi-bounding-box" />
                                            </button>
                                            <button
                                                className={`btn btn-pill btn-sm ${tool === 'pencil' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={(e) => changeTool(e, 'pencil')}
                                                title="Pencil"
                                            >
                                                <i className="bi bi-pencil" />
                                            </button>
                                            <button
                                                className={`btn btn-pill btn-sm ${tool === 'marker' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                onClick={(e) => changeTool(e, 'marker')}
                                                title="Location Dot"
                                            >
                                                <i className="fa-solid fa-location-dot" />
                                            </button>

                                            <button className="btn btn-pill btn-sm btn-warning" onClick={undoLast}>Undo</button>
                                            <button className="btn btn-pill btn-sm btn-danger" onClick={clearPage}>Clear Page</button>
                                            <button className="btn btn-pill btn-sm btn-danger" onClick={clearAll}>Clear All</button>
                                            <button className="btn btn-pill btn-sm btn-primary" onClick={savePageValue}>Save</button>
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label mb-1 small">Color</label>
                                            <input
                                                type="color"
                                                value={selectedColor}
                                                onChange={(e) => setSelectedColor(e.target.value)}
                                                className="form-control form-control-color p-0"
                                            />
                                        </div>

                                        <div className="mb-2">
                                            <label className="form-label mb-1 small">Stroke</label>
                                            <input
                                                type="range"
                                                min="1"
                                                max="20"
                                                value={strokeWidth}
                                                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                                                className="form-range"
                                            />
                                        </div>

                                        <div>
                                            <label className="form-label mb-1 small">Dot size</label>
                                            <input
                                                type="range"
                                                min="12"
                                                max="64"
                                                value={dotSize}
                                                onChange={(e) => setDotSize(Number(e.target.value))}
                                                className="form-range"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="ms-auto d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-pill btn-sm btn-secondary"
                                        disabled={pageNumber <= 1}
                                        onClick={() => setPageNumber((p) => p - 1)}
                                    >
                                        Prev
                                    </button>
                                    <span className="text-nowrap small">Page {pageNumber} / {numPages || '-'}</span>
                                    <button
                                        className="btn btn-pill btn-sm btn-secondary"
                                        disabled={!!numPages && pageNumber >= numPages}
                                        onClick={() => setPageNumber((p) => p + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

            {/* Viewer */}
            <div
                className="position-relative mx-auto w-100 border rounded-3"
                ref={containerRef}
                style={{
                    maxWidth: maxWidth,           // don't exceed your preferred width on desktops
                    maxHeight: 'calc(100vh - 220px)',
                    overflow: 'auto',
                    background: '#fff'
                }}
            >
                {file && (
                    <div className="position-relative" ref={pageBoxRef}>
                        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page
                                pageNumber={pageNumber}
                                width={containerWidth}           // responsive width
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                onRenderSuccess={onPageRenderSuccess}
                            />
                        </Document>

                        {/* KONVA overlay */}
                        <Stage
                            width={stageW}
                            height={stageH}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                cursor:
                                    tool === 'pencil'
                                        ? `url(${pencilMarkerIcon}) 0 49,auto`
                                        : tool === 'rectangle'
                                            ? 'crosshair'
                                            : tool === 'marker'
                                                ? 'pointer'
                                                : 'default',
                            }}
                            ref={stageRef}
                            onMouseDown={startDraw}
                            onMouseMove={draw}
                            onMouseUp={endDraw}
                        >
                            <Layer>
                                {/* Existing markers (current page) */}
                                {pageMarkers.map((m) => {
                                    if (m.type === 'rectangle') {
                                        return (
                                            <Group key={m.id}>
                                                <Rect
                                                    x={m.x}
                                                    y={m.y}
                                                    width={m.width}
                                                    height={m.height}
                                                    stroke={m.color}
                                                    strokeWidth={m.strokeWidth || 2}
                                                    onClick={() => openEditLabel(m)}
                                                />
                                                {renderLabel(m)}
                                            </Group>
                                        );
                                    }
                                    if (m.type === 'pencil') {
                                        return (
                                            <Group key={m.id}>
                                                <Line
                                                    points={m.points || []}
                                                    stroke={m.color}
                                                    strokeWidth={m.strokeWidth || 2}
                                                    lineCap="round"
                                                    lineJoin="round"
                                                    tension={0.25}
                                                    onClick={() => openEditLabel(m)}
                                                />
                                                {renderLabel(m)}
                                            </Group>
                                        );
                                    }
                                    if (m.type === 'marker') {
                                        return (
                                            <Group key={m.id}>
                                                <LocationDotIcon
                                                    x={m.x}
                                                    y={m.y}
                                                    size={m.size || dotSize}
                                                    color={m.color}
                                                />
                                                {renderLabel(m)}
                                            </Group>
                                        );
                                    }
                                    return null;
                                })}

                                {/* Draft previews */}
                                {tool === 'pencil' && drawing && currentLine.length > 0 && (
                                    <Line
                                        points={currentLine}
                                        stroke={selectedColor}
                                        strokeWidth={strokeWidth}
                                        lineCap="round"
                                        lineJoin="round"
                                        tension={0.25}
                                    />
                                )}

                                {tool === 'rectangle' && draftRect && (
                                    <Rect
                                        x={draftRect.x}
                                        y={draftRect.y}
                                        width={draftRect.w}
                                        height={draftRect.h}
                                        stroke={selectedColor}
                                        strokeWidth={strokeWidth}
                                        dash={[6, 4]}
                                    />
                                )}
                            </Layer>
                        </Stage>
                    </div>
                )}
            </div>

            {/* Label modal */}
            {labelOpen && (
                <>
                    <Modal size="md" show={labelOpen} onHide={() => setLabelOpen(false)}>
                        <Modal.Header closeButton>
                            <h5 className="modal-title">
                                {editingId != null ? 'Edit Label' : 'Add Label'}
                            </h5>
                        </Modal.Header>
                        <Modal.Body>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter label"
                                value={labelText}
                                onChange={(e) => setLabelText(e.target.value)}
                                autoFocus
                            />
                        </Modal.Body>
                        <Modal.Footer className="d-flex justify-content-between w-100">
                            <button type="button" className="btn btn-pill btn-secondary" onClick={cancelLabel}>
                                Cancel
                            </button>
                            <button type="button" className="btn btn-pill btn-primary" onClick={saveLabel}>
                                Save
                            </button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default IUIPdfTool;
