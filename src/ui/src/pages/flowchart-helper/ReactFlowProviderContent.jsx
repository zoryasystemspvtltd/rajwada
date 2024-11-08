import { toPng } from "html-to-image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    getRectOfNodes,
    getTransformForBounds,
    MiniMap,
    ReactFlowProvider,
    updateEdge,
    useEdgesState,
    useNodesState,
    useReactFlow
} from "reactflow";
import CustomNode from "./CustomNode";
import CustomEdge from './CustomEdge';
import "reactflow/dist/style.css";
import { useSelector } from "react-redux";
import ContextMenu from "./ContextMenu";
import "./styles.css";

function downloadImage(dataUrl) {
    const a = document.createElement("a");

    a.setAttribute("download", "flowchart.png");
    a.setAttribute("href", dataUrl);
    a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

const edgeTypes = {
    custom: CustomEdge,
};

const nodeTypes = { customNode: CustomNode };

const Content = () => {
    const module = 'dependency';
    const dataSet = useSelector((state) => state.api[module]);
    const isSidebarOpen = true;
    const [defaultNodeTemplates, setDefaultNodeTemplates] = useState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodeName, setNodeName] = useState();
    const [nodeId, setNodeId] = useState();
    const [nodeColor, setNodeColor] = useState("#ffffff");
    const [nodeType, setNodeType] = useState("customNode");
    const [selectedElements, setSelectedElements] = useState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const edgeUpdateSuccessful = useRef(true);
    const [menu, setMenu] = useState(null);
    const ref = useRef(null);

    const [newNodeInput, setNewNodeInput] = useState({
        id: "",
        name: "",
        type: 'customNode',
        color: "#ffffff",
    });
    const { setViewport } = useReactFlow();
    const { getNodes } = useReactFlow();
    const download = (event) => {
        // we calculate a transform for the nodes so that all nodes are visible
        // we then overwrite the transform of the `.react-flow__viewport` element
        // with the style option of the html-to-image library
        event.preventDefault();
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(
            nodesBounds,
            imageWidth,
            imageHeight,
            0.5,
            2
        );

        toPng(document.querySelector(".react-flow__viewport"), {
            backgroundColor: "#eef",
            width: imageWidth,
            height: imageHeight,
            style: {
                width: imageWidth,
                height: imageHeight,
                transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
            },
        }).then(downloadImage);
    };

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds)),
        [setEdges]
    );
    const [id, setId] = useState(0);

    const getRandomLightColor = () => {
        // Generate random RGB values
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        // Adjust brightness to ensure the color is light
        const lightShade = `rgb(${Math.min(r + 100, 255)}, ${Math.min(g + 100, 255)}, ${Math.min(b + 100, 255)})`;

        return lightShade;
    };

    useEffect(() => {
        let nodeTemplates = dataSet?.items?.map((item) => {
            return {
                data: { label: item?.name },
                type: 'customNode',
                color: getRandomLightColor(),
            }
        });
        setDefaultNodeTemplates(nodeTemplates);
    }, []);

    const getId = useCallback(() => {
        setId((prevId) => prevId + 1);
        return `node_${id}`;
    }, [id]);

    const onNodeContextMenu = useCallback(
        (event, node) => {
            // Prevent native context menu from showing
            event.preventDefault();

            // Calculate position of the context menu. We want to make sure it
            // doesn't get positioned off-screen.
            const pane = ref.current.getBoundingClientRect();
            setMenu({
                id: node.id,
                top: event.clientY < pane.height - 200 && event.clientY - 60,
                left:
                    event.clientX < pane.width - 200 &&
                    (isSidebarOpen ? event.clientX - 300 : event.clientX),
                right:
                    event.clientX >= pane.width - 200 &&
                    pane.width - (isSidebarOpen ? event.clientX - 300 : event.clientX),
                bottom:
                    event.clientY >= pane.height - 200 &&
                    pane.height - event.clientY + 70,
            });
        },
        [setMenu, isSidebarOpen]
    );

    // Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

    // Handle node click
    const onNodeClick = useCallback((event, node) => {
        setSelectedElements([node]);
        setNodeName(node.data.label);
        setNodeId(node.id);
        setNodeType("customNode");
        setNodeColor(node.style.background);
    }, []);

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback(
        (oldEdge, newConnection) => {
            alert("1")
            edgeUpdateSuccessful.current = true;
            setEdges((els) => updateEdge(oldEdge, newConnection, els));
        },
        [setEdges]
    );

    const onEdgeUpdateEnd = useCallback(
        (_, edge) => {
            if (!edgeUpdateSuccessful.current) {
                setEdges((eds) => eds.filter((e) => e.id !== edge.id));
            }

            edgeUpdateSuccessful.current = true;
        },
        [setEdges]
    );

    const handleCreateNode = (event) => {
        event.preventDefault();
        const newNode = {
            id: newNodeInput.id.length > 0 ? newNodeInput.id : getId(),
            type: 'customNode',
            position: { x: 400, y: 50 }, // You can set the initial position as needed
            data: {
                label:
                    newNodeInput.name.length > 0 ? newNodeInput.name : "Default Name",
            },
            style: {
                background:
                    newNodeInput.color.length > 0 ? newNodeInput.color : nodeColor, // Default color
                borderRadius: "25px"
            },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
        setNewNodeInput({ id: "", name: "", color: "#ffffff", type: 'customNode' });
    };
    useEffect(() => {
        if (selectedElements.length > 0) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === selectedElements[0]?.id) {
                        node.data = {
                            ...node.data,
                            label: nodeName,
                        };
                        node.style = {
                            ...node.style,
                            background: nodeColor,
                            borderRadius: "25px"
                        };
                        node.type = 'customNode';
                    }
                    return node;
                })
            );
        } else {
            setNodeName(""); // Clear nodeName when no node is selected
            setNodeColor("#ffffff");
        }
    }, [nodeName, nodeColor, selectedElements, setNodes]);

    const handleUpdateNode = (event) => {
        const { name, value } = event.target;

        // Update the corresponding state based on the input name

        if (name === "name") setNodeName(value);
        else if (name === "background") setNodeColor(value.background);

        // Find the selected node and update its data
        setNodes((prevNodes) =>
            prevNodes.map((n) =>
                n.id === nodeId
                    ? {
                        ...n,
                        data: { ...n.data, [name]: value },
                        style: {
                            ...n.style,
                            [name]: value,
                        },
                    }
                    : n
            )
        );
    };

    const onDragStart = (event, nodeDetails) => {
        event.dataTransfer.setData("application/reactflow", JSON.stringify(nodeDetails));
        event.dataTransfer.effectAllowed = "move";
    };

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const node = JSON.parse(event.dataTransfer.getData("application/reactflow"));

            // check if the dropped element is valid
            if (typeof node === "undefined" || !node) {
                return;
            }

            // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                node,
                position,
                type: 'customNode',
                data: { label: `${node.data.label}` },
                style: {
                    background: node.color,
                    borderRadius: "25px"
                },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance, getId, setNodes]
    );

    const flowKey = "example-flow";

    const onSave = useCallback((event) => {
        event.preventDefault();
        if (reactFlowInstance) {
            const flow = reactFlowInstance.toObject();
            localStorage.setItem(flowKey, JSON.stringify(flow));
        }
    }, [reactFlowInstance]);

    const onRestore = useCallback((event) => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }

            setEdges([]);
            setNodes([]);
        };
        event.preventDefault();
        restoreFlow();
    }, [setNodes, setViewport, setEdges]);

    return (
        <div className="flow-container">
            <div className={`sidebar ${isSidebarOpen ? "left-0" : "-left-64"}`}>
                <div className="relative flex flex-col w-70 px-4 py-8 overflow-y-auto bg-white border-r" style={{ height: "85vh" }}>
                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-700 ">
                            DEPENDENCIES
                        </h2>
                    </div>
                    <hr className="mt-2" />
                    {/* Drag and Drop Section */}
                    <div className="flex flex-col space-y-3">
                        <div className="text-sm font-bold text-black">
                            DRAG AND DROP
                        </div>
                        <div className="flex flex-col p-1 space-y-3 rounded outline outline-2">
                            {
                                defaultNodeTemplates.map((node, index) => {
                                    return (
                                        <div
                                            key={`node_${node.data.label}_${index}`}
                                            className="font-medium text-center rounded cursor-grab"
                                            onDragStart={(event) => onDragStart(event, node)}
                                            draggable
                                            style={{ backgroundColor: node.color }}
                                        >
                                            {node.data.label}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <hr className="my-0 mt-[0.20rem]" />
                    <div className="flex flex-col justify-between flex-1 mt-3">
                        <div className="flex flex-col justify-start space-y-5 h-[calc(100vh-135px)]">
                            {/* Create Node Section */}
                            {/* <div className="flex flex-col space-y-3 ">
                                <div className="mt-3 text-sm font-bold text-black">
                                    CREATE NODE
                                </div>
                                <div className="flex flex-col space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="p-[1px] border pl-1 "
                                        onChange={(e) =>
                                            setNewNodeInput((prev) => ({
                                                ...prev,
                                                name: e.target.value,
                                            }))
                                        }
                                        value={newNodeInput.name}
                                    />
                                    <div className="flex flex-row gap-x-2">
                                        <label className="font-semibold ">Color:</label>
                                        <input
                                            type="color"
                                            placeholder="Color"
                                            className="p-[1px] border pl-1"
                                            onChange={(e) =>
                                                setNewNodeInput((prev) => ({
                                                    ...prev,
                                                    color: e.target.value,
                                                }))
                                            }
                                            value={newNodeInput.color}
                                        />
                                    </div>
                                    <button
                                        className="p-[4px]  text-white bg-slate-700 hover:bg-slate-800 active:bg-slate-900 rounded"
                                        onClick={handleCreateNode}
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            <hr className="my-2" /> */}
                            {/* Update Node Section */}
                            <div className="flex flex-col space-y-3">
                                <div className="text-sm font-bold text-black">UPDATE NODE</div>
                                <div className="flex flex-col space-y-3">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={nodeName}
                                        onChange={handleUpdateNode}
                                        className="p-[1px] border pl-1 "
                                    />
                                    <div className="flex flex-row gap-x-5">
                                        <div className="flex flex-row gap-x-2">
                                            <label className="font-semibold ">Color:</label>
                                            <input
                                                type="color"
                                                placeholder="bgColor"
                                                name="background"
                                                value={nodeColor}
                                                onChange={handleUpdateNode}
                                                className="p-[1px] border pl-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-2" />
                            {/* Save and Restore Buttons */}
                            <div className="flex flex-col space-y-3">
                                <div className="text-sm font-bold text-black">CONTROLS</div>
                                <div className="flex flex-row space-x-1">
                                    {/* <button
                                        className="flex-1 p-2 text-sm text-white transition duration-300 ease-in-out rounded bg-slate-700 hover:bg-slate-800 active:bg-slate-900"
                                        onClick={onSave}
                                    >
                                        Save
                                    </button> */}
                                    <button
                                        className="flex-1 p-2 text-sm text-white rounded bg-slate-700 hover:bg-slate-800 active:bg-slate-900"
                                        onClick={onRestore}
                                    >
                                        Reset{" "}
                                    </button>
                                    {/* <button
                                        className="flex-1 p-2 text-sm text-white rounded bg-slate-700 hover:bg-slate-800 active:bg-slate-900"
                                        onClick={download}
                                    >
                                        Download{" "}
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ReactFlow
                ref={ref}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onNodeClick={onNodeClick}
                edgeTypes={edgeTypes}
                onInit={setReactFlowInstance}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onEdgeUpdate={onEdgeUpdate}
                onEdgeUpdateStart={onEdgeUpdateStart}
                onEdgeUpdateEnd={onEdgeUpdateEnd}
                onPaneClick={onPaneClick}
                onNodeContextMenu={onNodeContextMenu}
            >
                {/* sidebar */}
                <Controls />
                <MiniMap zoomable pannable />
                <Background variant="dots" gap={12} size={1} />
                {/* context menu */}
                {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
            </ReactFlow>
        </div>
    );
};

const ReactFlowProviderContent = () => {
    return (
        <ReactFlowProvider>
            <div
                className={`h-[calc(100vh-74px)] flex flex-col`}
            >
                <Content />
            </div>
        </ReactFlowProvider>
    );
};
export default ReactFlowProviderContent;
