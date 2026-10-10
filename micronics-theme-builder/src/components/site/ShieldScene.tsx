import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Mesh, Group } from "three";

function readColor(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

type SceneColors = {
  blue: string;
  navy: string;
  orange: string;
  cyan: string;
};

const fallbackColors: SceneColors = {
  blue: "#29A8F0",
  navy: "#1B2A6B",
  orange: "#F7941D",
  cyan: "#5CC8FF",
};

function useSceneColors() {
  const [colors, setColors] = useState<SceneColors>(fallbackColors);
  useEffect(() => {
    const update = () => setColors({
      blue: readColor("--brand-blue", fallbackColors.blue),
      navy: readColor("--brand-navy", fallbackColors.navy),
      orange: readColor("--brand-orange", fallbackColors.orange),
      cyan: readColor("--brand-cyan", fallbackColors.cyan),
    });
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
    return () => observer.disconnect();
  }, []);
  return colors;
}

function Shield({ colors }: { colors: SceneColors }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.pointer.x * 0.25;
    group.current.rotation.x = -state.pointer.y * 0.12;
  });
  const cubes = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ x: Math.sin(i) * 2.5, y: Math.cos(i * 1.7) * 1.4, z: Math.cos(i) * 1.4 })), []);
  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh scale={[1.25, 1.6, 0.18]}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshPhysicalMaterial color={colors.blue} metalness={0.35} roughness={0.18} transmission={0.35} thickness={0.7} transparent opacity={0.74} />
        </mesh>
        <mesh scale={[1.05, 1.36, 0.2]} position={[0, -0.08, 0.05]}>
          <boxGeometry args={[1.35, 1.55, 0.08]} />
          <meshStandardMaterial color={colors.navy} metalness={0.5} roughness={0.25} transparent opacity={0.54} />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.025, 12, 160]} />
        <meshStandardMaterial color={colors.orange} emissive={colors.orange} emissiveIntensity={0.7} />
      </mesh>
      <mesh rotation={[1.1, 0.5, 0.2]}>
        <torusGeometry args={[1.85, 0.018, 12, 160]} />
        <meshStandardMaterial color={colors.cyan} emissive={colors.blue} emissiveIntensity={0.55} />
      </mesh>
      {cubes.map((cube, index) => <DataCube key={index} colors={colors} position={[cube.x, cube.y, cube.z]} />)}
    </group>
  );
}

function DataCube({ position, colors }: { position: [number, number, number]; colors: SceneColors }) {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * 0.4;
    mesh.current.rotation.y += delta * 0.5;
  });
  return <mesh ref={mesh} position={position} scale={0.14}><boxGeometry /><meshStandardMaterial color={colors.orange} emissive={colors.orange} emissiveIntensity={0.25} /></mesh>;
}

export default function ShieldScene() {
  const colors = useSceneColors();
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={2} />
      <pointLight position={[-3, -2, 3]} color={colors.blue} intensity={2.4} />
      <Shield colors={colors} />
      <Environment preset="city" />
    </Canvas>
  );
}
