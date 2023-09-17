/* eslint-disable react/prop-types */
import { useTexture } from "@react-three/drei";
import MoonTexture from "../assets/moon.jpg";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { memo, useCallback, useRef } from "react";

const Moon = memo(() => {
  const [moonTexture] = useTexture([MoonTexture]);
  const moonRef = useRef();
  const clockRef = useRef(new THREE.Clock());

  const updateMoonPosition = useCallback(() => {
    moonRef.current.rotation.y += 0.001;
    moonRef.current.position.x = Math.sin(clockRef.current.getElapsedTime() * -1) * 4;
    moonRef.current.position.z = Math.cos(clockRef.current.getElapsedTime() * -1) * 4;
    //Axis rotation
    moonRef.current.rotation.y +=0.002
  }, []);

  useFrame(() => {
    updateMoonPosition();
  });

  return (
    <mesh castShadow receiveShadow ref={moonRef} position={[5, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshPhongMaterial map={moonTexture} />
    </mesh>
  );
});

Moon.displayName;

export default Moon;
