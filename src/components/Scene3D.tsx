import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group, Mesh } from "three";

function heartShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.1);
  s.bezierCurveTo(0.1, 0.26, 0.3, 0.2, 0.3, 0.06);
  s.bezierCurveTo(0.3, -0.06, 0.04, -0.22, 0, -0.3);
  s.bezierCurveTo(-0.04, -0.22, -0.3, -0.06, -0.3, 0.06);
  s.bezierCurveTo(-0.3, 0.2, -0.1, 0.26, 0, 0.1);
  return s;
}

function Cappuccino() {
  const group = useRef<Group>(null);
  const steamA = useRef<Mesh>(null);
  const steamB = useRef<Mesh>(null);
  const steamC = useRef<Mesh>(null);
  const heart = useMemo(() => heartShape(), []);

  useFrame((state, d) => {
    if (group.current) group.current.rotation.y += d * 0.22;
    const t = state.clock.elapsedTime;
    const waft = (mesh: Mesh | null, offset: number) => {
      if (!mesh) return;
      mesh.position.y = 1.35 + Math.sin(t * 1.6 + offset) * 0.1;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.12 + Math.sin(t * 2 + offset) * 0.08;
    };
    waft(steamA.current, 0);
    waft(steamB.current, 1.2);
    waft(steamC.current, 2.1);
  });

  return (
    <Float speed={1.35} rotationIntensity={0.18} floatIntensity={0.4}>
      <group ref={group} position={[0, -0.55, 0]} scale={1.15}>
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <cylinderGeometry args={[1.15, 1.2, 0.07, 64]} />
          <meshStandardMaterial color="#f3ead8" roughness={0.28} metalness={0.12} />
        </mesh>
        <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.16, 0.035, 12, 64]} />
          <meshStandardMaterial color="#c6a75e" metalness={0.85} roughness={0.18} />
        </mesh>

        <mesh position={[0.95, 0.12, 0.15]} rotation={[0, 0.4, 0.15]}>
          <cylinderGeometry args={[0.035, 0.028, 1.05, 12]} />
          <meshStandardMaterial color="#c6a75e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[1.38, 0.14, 0.32]} rotation={[0.2, 0.4, 0.4]}>
          <sphereGeometry args={[0.09, 16, 12]} />
          <meshStandardMaterial color="#c6a75e" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.48, 0]} castShadow>
          <cylinderGeometry args={[0.62, 0.5, 0.82, 64]} />
          <meshStandardMaterial color="#f7f1e6" roughness={0.32} metalness={0.08} />
        </mesh>
        <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.62, 0.04, 12, 64]} />
          <meshStandardMaterial color="#c6a75e" metalness={0.88} roughness={0.16} />
        </mesh>
        <mesh position={[0.78, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.26, 0.045, 14, 40, Math.PI]} />
          <meshStandardMaterial color="#c6a75e" metalness={0.85} roughness={0.18} />
        </mesh>

        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.52, 0.52, 0.08, 48]} />
          <meshStandardMaterial color="#3a2418" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.86, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.1, 48]} />
          <meshStandardMaterial color="#f4efe4" roughness={0.55} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0.15]} position={[0, 0.92, 0]}>
          <shapeGeometry args={[heart]} />
          <meshStandardMaterial color="#4a2c1a" roughness={0.6} />
        </mesh>

        <mesh ref={steamA} position={[-0.08, 1.35, 0]}>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial color="#f5ebdd" transparent opacity={0.18} />
        </mesh>
        <mesh ref={steamB} position={[0.12, 1.5, 0.05]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#f5ebdd" transparent opacity={0.14} />
        </mesh>
        <mesh ref={steamC} position={[0.02, 1.68, -0.04]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#f5ebdd" transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  );
}

function Croissant() {
  const ref = useRef<Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.18;
  });
  return (
    <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.55}>
      <group ref={ref} rotation={[0.45, 0.2, -0.15]} scale={1.15}>
        <mesh>
          <torusGeometry args={[1.15, 0.38, 24, 72, Math.PI * 1.35]} />
          <meshStandardMaterial color="#c6a75e" metalness={0.62} roughness={0.28} />
        </mesh>
      </group>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 7, 4]} intensity={1.55} color="#fff6e8" />
      <pointLight position={[-2.5, 2.4, 2]} intensity={10} color="#c6a75e" distance={14} />
      <pointLight position={[2, -0.5, 3]} intensity={3.5} color="#8a5a2b" distance={10} />
    </>
  );
}

export default function Scene3D({ variant = "cappuccino" }: { variant?: "croissant" | "cup" | "cappuccino" }) {
  return (
    <div className="h-full w-full">
      <Canvas dpr={[1, 1.6]} camera={{ position: [1.15, 1.35, 3.4], fov: 38 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <Lights />
          {variant === "croissant" ? <Croissant /> : <Cappuccino />}
          <Sparkles count={46} scale={6.5} size={2} speed={0.32} color="#e4c98a" opacity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
