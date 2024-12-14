import React from 'react';
import { getBezierPath } from 'reactflow';

const CustomEdge = React.forwardRef(({ id, sourceX, sourceY, targetX, targetY }, ref) => {
    const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });

    // Calculate the angle of the edge based on the source and target positions
    const deltaX = targetX - sourceX;
    const deltaY = targetY - sourceY;
    const angle = Math.atan2(deltaY, deltaX); // Angle in radians

    return (
        <g ref={ref}>
            <path
                id={id}
                style={{ stroke: '#222', strokeWidth: 1 }}
                d={path}
                markerEnd="url(#arrowhead)"
                fill="none"
            />
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="10"
                    refY="3.5"
                    orient="auto"
                >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#222" transform={`rotate(${angle})`} transformOrigin='center' />
                </marker>
            </defs>
        </g>
    );
});

export default CustomEdge;