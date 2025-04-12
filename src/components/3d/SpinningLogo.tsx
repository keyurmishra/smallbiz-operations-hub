
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Mesh } from 'three';

interface SpinningCubeProps {
  position?: [number, number, number];
  color?: string;
}

const SpinningCube: React.FC<SpinningCubeProps> = ({ 
  position = [0, 0, 0], 
  color = "#2563eb" 
}) => {
  const mesh = useRef<Mesh>(null!);
  
  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.5;
    mesh.current.rotation.x += delta * 0.2;
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

interface SpinningLogoProps {
  className?: string;
}

const SpinningLogo: React.FC<SpinningLogoProps> = ({ className }) => {
  return (
    <div className={`relative w-full h-56 ${className}`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <SpinningCube position={[0, 0, 0]} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
      <div className="absolute top-0 left-0 w-full flex justify-center pt-6 pointer-events-none">
        <div className="bg-white/70 dark:bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm">
          <h2 className="text-lg font-bold text-primary">Zoho Invoice</h2>
        </div>
      </div>
    </div>
  );
};

export default SpinningLogo;
