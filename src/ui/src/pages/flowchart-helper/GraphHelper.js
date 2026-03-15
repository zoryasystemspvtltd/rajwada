exports.bfsTraversal = (nodes, edges, startNodeId) => {
    // Create a map of nodes
    const nodeMap = {};
    nodes.forEach(node => {
        nodeMap[node.id] = node;
    });

    // Create an adjacency list from the edges
    const adjacencyList = {};
    edges.forEach(edge => {
        if (!adjacencyList[edge.source]) {
            adjacencyList[edge.source] = [];
        }
        adjacencyList[edge.source].push(edge.target);
    });

    // Initialize BFS queue and visited set
    const queue = [startNodeId];
    const visited = new Set();
    const bfsSequence = [];

    // Perform BFS traversal
    while (queue.length > 0) {
        const nodeId = queue.shift(); // dequeue the first element
        if (!visited.has(nodeId)) {
            visited.add(nodeId);
            bfsSequence.push(nodeMap[nodeId]); // Store the node in BFS sequence

            // Enqueue all unvisited neighbors
            if (adjacencyList[nodeId]) {
                adjacencyList[nodeId].forEach(neighborId => {
                    if (!visited.has(neighborId)) {
                        queue.push(neighborId);
                    }
                });
            }
        }
    }

    return bfsSequence;
}

exports.findSourceNodes = ({ nodes, edges }) => {
    const targetNodeIds = new Set(edges.map(edge => edge.target));

    const sourceNodes = nodes.filter(node => !targetNodeIds.has(node.id));

    return sourceNodes; // returns an array of node objects with no incoming edges
}
