/* eslint-disable react/prop-types */
import { useTexture } from "@react-three/drei";
import EarthTexture from "./assets/earth_day.jpg";
import EarthNormal from "./assets/earth_normal.jpg";
import EarthSpec from "./assets/earth_specular.jpg";
import EarthDisp from "./assets/earth_displacement.jpg";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Earth = ({ displacementScale }) => {
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] = useTexture([EarthTexture, EarthNormal, EarthSpec, EarthDisp]);
  const earthRef = useRef();
  useFrame(() => {
    earthRef.current.rotation.y += 0.001;
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        map={earthTexture}
        normalMap={earthNormalMap}
        specularMap={earthSpecularMap}
        displacementMap={earthDisplacementMap}
        displacementScale={displacementScale}
      />
    </mesh>
  );
};

export default Earth;
