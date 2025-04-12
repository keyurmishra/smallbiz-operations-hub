
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Mesh, Group } from 'three';

const CubeAvatar = () => {
  const groupRef = useRef<Group>(null!);
  
  useFrame((state) => {
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
    groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Base cube */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#2563eb" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.5, 0.3, 1.01]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="white" />
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </mesh>
      
      <mesh position={[0.5, 0.3, 1.01]} castShadow>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="white" />
        <mesh position={[0, 0, 0.1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </mesh>
      
      {/* Smile */}
      <mesh position={[0, -0.3, 1.01]} castShadow>
        <torusGeometry args={[0.5, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#FF5555" />
      </mesh>
    </group>
  );
};

interface ProfileSceneProps {
  className?: string;
}

const ProfileScene: React.FC<ProfileSceneProps> = ({ className }) => {
  return (
    <div className={`w-full h-64 ${className}`}>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <CubeAvatar />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};

export default ProfileScene;
