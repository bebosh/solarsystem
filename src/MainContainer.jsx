import { useHelper } from "@react-three/drei";
import AnimatedStars from "./AnimatedStars";
import Earth from "./scenes/Earth";
import Sun from "./scenes/Sun";
import { useRef } from "react";
import * as THREE from "three";
import { Perf } from 'r3f-perf'
import CameraPositionLogging from "./helpers/CameraPositionLogging";

const MainContainer = () => {
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1, "white");
 
  return (
    <>
    <Perf />
    <CameraPositionLogging event="mousedown" />
      <AnimatedStars />
      {/* <directionalLight ref={directionalLightRef} position={[0, 0, 10]} /> */}
      <ambientLight intensity={0.08}/>
      <Sun />
      <Earth displacementScale={0.05} />
    </>
  );
};

export default MainContainer;
