import { useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars";
import Earth from "./Earth";
import { useRef } from "react";
import * as THREE from "three";

const MainContainer = () => {
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "white");
 
  return (
    <>
      <color attach='background' args={["black"]} />
      <AnimatedStars />
      <directionalLight ref={directionalLightRef} position={[0, 0, 10]} />
      <ambientLight color={'0x404040'} intensity={0.05}/>
      <Earth displacementScale={0.05} />
    </>
  );
};

export default MainContainer;
