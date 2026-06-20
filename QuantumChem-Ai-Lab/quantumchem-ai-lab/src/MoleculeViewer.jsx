import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";

function Atom({ position, color, label }) {
  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>

      <Text
        position={[position[0], position[1] - 0.7, position[2]]}
        fontSize={0.25}
        color="white"
      >
        {label}
      </Text>
    </>
  );
}

export default function MoleculeViewer({ molecule }) {
  const molecules = {
    water: [
      {
        position: [0, 0, 0],
        color: "#06b6d4",
        label: "O",
      },

      {
        position: [-1.2, 1, 0],
        color: "white",
        label: "H",
      },

      {
        position: [1.2, 1, 0],
        color: "white",
        label: "H",
      },
    ],

    methane: [
      {
        position: [0, 0, 0],
        color: "#22c55e",
        label: "C",
      },

      {
        position: [1.5, 0, 0],
        color: "white",
        label: "H",
      },

      {
        position: [-1.5, 0, 0],
        color: "white",
        label: "H",
      },

      {
        position: [0, 1.5, 0],
        color: "white",
        label: "H",
      },

      {
        position: [0, -1.5, 0],
        color: "white",
        label: "H",
      },
    ],

    co2: [
      {
        position: [0, 0, 0],
        color: "#64748b",
        label: "C",
      },

      {
        position: [-2, 0, 0],
        color: "#ef4444",
        label: "O",
      },

      {
        position: [2, 0, 0],
        color: "#ef4444",
        label: "O",
      },
    ],
  };

  const selected =
    molecules[molecule?.toLowerCase()] || molecules.water;

  return (
    <div className="w-full h-[500px] rounded-3xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7] }}>
        <ambientLight intensity={1} />

        <directionalLight position={[2, 2, 2]} />

        {selected.map((atom, index) => (
          <Atom
            key={index}
            position={atom.position}
            color={atom.color}
            label={atom.label}
          />
        ))}

        <OrbitControls />
      </Canvas>
    </div>
  );
}