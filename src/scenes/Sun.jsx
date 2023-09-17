/* eslint-disable react/prop-types */
import { useTexture } from "@react-three/drei";
import SunTexture from "../assets/sun.jpg";
import { useFrame } from "@react-three/fiber";
import { memo,useRef } from "react";

const Sun = memo(() => {
  const [sunTexture] = useTexture([SunTexture]);
  const sunRef = useRef();
  useFrame(() => {
    sunRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]} >
      <sphereGeometry args={[5, 32, 32]} />
      <meshPhongMaterial map={sunTexture} emissiveMap={sunTexture} emissiveIntensity={0.6} emissive={0xffffff} />
      <pointLight castShadow intensity={1} />
    </mesh>
  );
});

Sun.displayName

export default Sun;
