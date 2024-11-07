import React from 'react';
import { getBezierPath } from 'reactflow';

const CustomEdge = React.forwardRef(({ id, sourceX, sourceY, targetX, targetY }, ref) => {
    const [path] = getBezierPath({ sourceX, sourceY, targetX, targetY });

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
                    <polygon points="0 0, 10 3.5, 0 7" fill="#222" />
                </marker>
            </defs>
        </g>
    );
});

export default CustomEdge;
