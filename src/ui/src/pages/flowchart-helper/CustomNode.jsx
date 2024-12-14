import { Handle, Position } from 'reactflow';
import './styles.css';

const handleStyle = { left: 10 };

function CustomNode({ data, isConnectable }) {
    return (
        <div className="custom-node">
            <Handle
                type="target"
                position={Position.Left}
                id='a'
                isConnectable={isConnectable}
            />
            <Handle
                type="target"
                position={Position.Top}
                id='b'
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Bottom}
                id='c'
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id='d'
                isConnectable={isConnectable}
            />
            {data.label}
        </div>
    );
}

export default CustomNode;