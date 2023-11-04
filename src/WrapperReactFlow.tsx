import { useCallback, useMemo } from "react";
import "./App.css";

import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
  Panel,
  MarkerType,
  Connection,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";

function WrapperReactFlow({ nodes, edges, setEdges, onNodesChange, onEdgesChange, updateEdgeProperty }) {
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Controls />
      <MiniMap />
      <Background color="orange" gap={12} size={1} />
      <Panel position="top-right">
        <div
          style={{ backgroundColor: "red", width: "40px", height: "40px" }}
        ></div>
      </Panel>
    </ReactFlow>
  );
}
export default WrapperReactFlow;
