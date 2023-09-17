import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useMemo, useCallback, useRef } from 'react';
import * as THREE from 'three';

const UFO = React.memo(() => {
  const UFORef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const memoizedUFO = useMemo(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useGLTF('/UFOmodel/UFO.gltf')
  });

  const updateUfoPosition = useCallback(() => {
    // orbit rotation
    UFORef.current.position.x =
      Math.sin(clockRef.current.getElapsedTime() * -2) * 2;
    UFORef.current.position.z =
      Math.cos(clockRef.current.getElapsedTime() * -2) * 2;
    //Axis rotation
    UFORef.current.rotation.y +=0.05
  }, []);

  useFrame(() => {
    updateUfoPosition();
  });

  return (
    <mesh castShadow receiveShadow>
      <primitive
        ref={UFORef}
        object={memoizedUFO.scene}
        position={[2, 0, 0]}
        scale={0.2}
      />
    </mesh>
  );
});

UFO.displayName;
useGLTF.preload('/UFOmodel/UFO.gltf');
export default UFO;
