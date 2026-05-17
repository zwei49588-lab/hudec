// @ts-nocheck
import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, Float, Edges } from '@react-three/drei';
import { Building } from '../data';

interface PartProps {
  shape: 'box' | 'cylinder' | 'roof' | 'arch_wall' | 'balcony' | 'plane';
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  active: boolean;
  color?: string;
}

const BuildingPart = ({ shape, position, scale, rotation = [0, 0, 0], active, color = "#f4f1ea" }: PartProps) => {
  if (!active) return null;

  const material = (
    <meshStandardMaterial 
      color={color} 
      roughness={0.2}
      metalness={0.1}
    />
  );

  return (
    <group
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {shape === 'box' && (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          {material}
          <Edges threshold={15} color="#000000" scale={1.001} opacity={0.3} />
        </mesh>
      )}
      
      {shape === 'cylinder' && (
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
          {material}
          <Edges threshold={15} color="#000000" scale={1.001} opacity={0.3} />
        </mesh>
      )}

      {shape === 'roof' && (
        <mesh castShadow receiveShadow>
          <coneGeometry args={[0.7, 1, 4]} />
          {material}
          <Edges threshold={15} color="#000000" scale={1.001} opacity={0.3} />
        </mesh>
      )}

      {shape === 'plane' && (
        <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          {material}
          <Edges threshold={15} color="#000000" scale={1.001} opacity={0.3} />
        </mesh>
      )}

      {shape === 'arch_wall' && (
        <group>
          <mesh position={[-0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 1, 1]} />
            {material}
            <Edges threshold={15} color="#000000" scale={1.001} opacity={0.3} />
          </mesh>
          <mesh position={[0.4, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 1, 1]} />
            {material}
            <Edges threshold={15} color="#000000" scale={1.001} opacity={0.3} />
          </mesh>
          <mesh position={[0, 0.4, 0]} castShadow>
            <boxGeometry args={[0.6, 0.2, 1]} />
            {material}
            <Edges threshold={15} color="#000000" scale={1.001} opacity={0.3} />
          </mesh>
        </group>
      )}

      {shape === 'balcony' && (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
          <Edges threshold={15} color="#000000" scale={1.001} opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};

interface Props {
  stage: number;
  building: Building;
}

export const Construction3D = ({ stage, building }: Props) => {
  const parts = useMemo(() => {
    if (!building.geometry?.parts) return [];
    
    return building.geometry.parts.map(p => ({
      ...p,
      active: stage >= p.stage
    }));
  }, [stage, building]);

  return (
    <div className="w-full h-full bg-stone-50 rounded-lg overflow-hidden">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={35} />
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.8}
          autoRotate={stage === 3}
          autoRotateSpeed={0.5}
        />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ffd4a3" />
        
        <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.1}>
          <group position={[0, -1, 0]}>
            {parts.map((p, i) => (
              <BuildingPart key={i} {...p as any} />
            ))}
          </group>
        </Float>

        <ContactShadows 
          position={[0, -1, 0]} 
          opacity={0.3} 
          scale={20} 
          blur={2} 
          far={10} 
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
