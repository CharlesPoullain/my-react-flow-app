import { useCallback, useState } from "react";
import "./App.css";
import WrapperReactFlow from "./WrapperReactFlow";
import { MarkerType, useEdgesState, useNodesState } from "reactflow";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 100, y: 100 }, data: { label: "2" } },
  {
    id: "3",
    position: { x: 200, y: 200 },
    data: { label: "3" },
    type: "customNode",
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "step",
    animated: true,
    markerEnd: {
      color: "#FF0072",
      type: MarkerType.ArrowClosed,
    },
    style: {
      strokeWidth: 2,
      stroke: "#FF0072",
    },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [animated, setAnimated] = useState(false);

  const updateEdgeProperty = useCallback(
    (edgeId, animationIsActive) => {
      setEdges((eds) =>
        eds.map((edge) => {
          if (edge.id !== edgeId) return edge;
          return {
            ...edge,
            animated: animationIsActive,
            ...(animationIsActive
              ? {
                  markerEnd: {
                    color: `#FF0072`,
                    type: MarkerType.ArrowClosed,
                  },
                  style: {
                    strokeWidth: 2,
                    stroke: `#FF0072`,
                  },
                }
              : {
                  markerEnd: {},
                  style: {},
                }),
          };
        })
      );
    },
    [setEdges]
  );

  return (
    <>
      <div className="card">
        <button
          onClick={() => {
            const newAnimatedState = !animated;
            setAnimated(newAnimatedState);
            updateEdgeProperty("e1-2", newAnimatedState);
          }}
          style={{ backgroundColor: "orange" }}
        >
          Enable animation {JSON.stringify(animated)}
        </button>
        <div
          style={{
            marginTop: "20px",
            width: "800px",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          <WrapperReactFlow
            nodes={nodes}
            edges={edges}
            setEdges={setEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            updateEdgeProperty={updateEdgeProperty}
          />
        </div>
      </div>
    </>
  );
}

export default App;
