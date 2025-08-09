import { useRef, useState } from 'react';
import { Layer, Line, Path, Rect, Stage } from 'react-konva';
import { Document, Page, pdfjs } from 'react-pdf';
import pencilMarkerIcon from '../canvas-helper/assets/pencil.png';

const LocationDotIcon = ({ x, y, size = 24, color = 'red' }) => {
    const scale = size / 512; // original Font Awesome viewBox size is 512x512
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

const IUIPdfSample = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [tool, setTool] = useState(null);
    const [annotations, setAnnotations] = useState({});
    const [drawing, setDrawing] = useState(false);
    const [currentLine, setCurrentLine] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#ff0000'); // default red
    const [strokeWidth, setStrokeWidth] = useState(2); // default thin
    const stageRef = useRef();


    const handleFileChange = e => setFile(e.target.files[0]);


    const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);


    const addAnnotation = (page, ann) => {
        setAnnotations(prev => ({
            ...prev,
            [page]: [...(prev[page] || []), ann]
        }));
    };


    const startDraw = e => {
        if (!tool) return;
        const stage = stageRef.current.getStage();
        const point = stage.getPointerPosition();
        setDrawing(true);


        if (tool === 'pen') {
            setCurrentLine([point.x, point.y]);
        } else if (tool === 'dot') {
            addAnnotation(pageNumber, { type: 'dot', x: point.x, y: point.y, size: 32, color: selectedColor });
        } else if (tool === 'rect') {
            setCurrentLine([point.x, point.y, point.x, point.y]);
        }
    };


    const draw = e => {
        if (!drawing) return;
        const stage = stageRef.current.getStage();
        const point = stage.getPointerPosition();


        if (tool === 'pen') {
            setCurrentLine(prev => [...prev, point.x, point.y]);
        } else if (tool === 'rect') {
            setCurrentLine(prev => [prev[0], prev[1], point.x, point.y]);
        }
    };


    const endDraw = () => {
        if (!drawing) return;
        setDrawing(false);


        if (tool === 'pen') {
            addAnnotation(pageNumber, { type: 'pen', points: currentLine, color: selectedColor, strokeWidth: strokeWidth });
        } else if (tool === 'rect') {
            const [x1, y1, x2, y2] = currentLine;
            addAnnotation(pageNumber, {
                type: 'rect',
                x: x1,
                y: y1,
                width: x2 - x1,
                height: y2 - y1,
                color: selectedColor,
                strokeWidth
            });
        }
        setCurrentLine([]);
    };


    const clearPage = () => {
        setAnnotations(prev => ({ ...prev, [pageNumber]: [] }));
    };


    const clearAll = () => setAnnotations({});


    const undoLast = () => {
        setAnnotations(prev => ({
            ...prev,
            [pageNumber]: (prev[pageNumber] || []).slice(0, -1)
        }));
    };


    return (
        <div className="container-fluid py-3">
            <div className="d-flex flex-wrap gap-2 mb-3">
                <input type="file" className="form-control" accept="application/pdf" onChange={handleFileChange} />
            </div>


            {file && (
                <>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <button className={`btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm ${tool === 'rect' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTool('rect')}><i className="bi bi-bounding-box fs-6" title="Rectangle Marker"></i></button>
                        <button className={`btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm ${tool === 'pen' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTool('pen')}><i className="bi bi-pencil fs-6" title="Pencil Marker"></i></button>
                        <button className={`btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm ${tool === 'dot' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTool('dot')}> <i className="fa-solid fa-location-dot fa-md" title="Balloon Marker"></i></button>
                        <button className="btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm btn-warning" onClick={undoLast}>Undo</button>
                        <button className="btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm btn-danger" onClick={clearPage}>Clear Page</button>
                        <button className="btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm btn-danger" onClick={clearAll}>Clear All</button>
                        {/* Color Picker */}
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <input
                                type="color"
                                value={selectedColor}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                style={{ width: 20, height: 20, padding: 0, border: 'none', cursor: 'pointer' }}
                            />
                        </div>


                        {/* Stroke Width Controller */}
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={strokeWidth}
                                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                                style={{ width: 100 }}
                            />
                        </div>
                        <div className="ms-auto d-flex align-items-center gap-2">
                            <button className="btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm btn-secondary" disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)}>Prev</button>
                            <span>Page {pageNumber} / {numPages}</span>
                            <button className="btn btn-wide btn-pill btn-shadow btn-hover-shine bn-sm btn-secondary" disabled={pageNumber >= numPages} onClick={() => setPageNumber(p => p + 1)}>Next</button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div style={{ position: 'relative' }}>
                            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                                <Page pageNumber={pageNumber} width={800} renderTextLayer={false} renderAnnotationLayer={false} />
                            </Document>
                            <Stage
                                width={800}
                                height={1100}
                                style={{ position: 'absolute', top: 0, left: 0, cursor: tool === 'pen' ? `url(${pencilMarkerIcon}) 0 49,auto` : tool === 'rect' ? 'crosshair' : tool === 'dot' ? 'pointer' : 'default' }}
                                // style={{ position: 'absolute', top: 0, left: 0, cursor: tool === 'pen' ? `url(${pencilMarkerIcon}) 0 49,auto` : tool === 'rect' ? 'crosshair' : tool === 'dot' ? `url(${markerIcon}) 30 49,auto` : 'default' }}
                                ref={stageRef}
                                onMouseDown={startDraw}
                                onMouseMove={draw}
                                onMouseUp={endDraw}
                            >
                                <Layer>
                                    {(annotations[pageNumber] || []).map((ann, i) => {
                                        if (ann.type === 'rect') return <Rect key={i} {...ann} stroke={ann.color} strokeWidth={ann.strokeWidth} />;
                                        if (ann.type === 'pen') return <Line key={i} points={ann.points} stroke={ann.color} strokeWidth={ann.strokeWidth} lineCap="round" />;
                                        // if (ann.type === 'dot') return <Circle key={i} x={ann.x} y={ann.y} radius={5} fill="green" />;
                                        if (ann.type === 'dot') return (
                                            <LocationDotIcon
                                                key={i}
                                                x={ann.x}
                                                y={ann.y}
                                                size={ann.size}
                                                color={ann.color}
                                            />
                                        );
                                        return null;
                                    })}
                                    {drawing && tool === 'pen' && <Line points={currentLine} stroke={selectedColor} strokeWidth={strokeWidth} lineCap="round" />}
                                    {drawing && tool === 'rect' && <Rect x={currentLine[0]} y={currentLine[1]} width={currentLine[2] - currentLine[0]} height={currentLine[3] - currentLine[1]} stroke={selectedColor} strokeWidth={strokeWidth} />}
                                </Layer>
                            </Stage>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default IUIPdfSample;