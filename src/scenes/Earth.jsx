/* eslint-disable react/prop-types */
import { useTexture } from '@react-three/drei';
import EarthTextureDay from '../assets/earth_day.jpg';
import EarthTextureNight from '../assets/earth_night.jpg';
import EarthNormal from '../assets/earth_normal.jpg';
import EarthSpec from '../assets/earth_specular.jpg';
import EarthDisp from '../assets/earth_displacement.jpg';
// eslint-disable-next-line no-unused-vars
import { useFrame, useThree } from '@react-three/fiber';
import { memo, useCallback, useRef, useEffect, useState } from 'react';
import UFO from './UFO';
import * as THREE from 'three';
import Moon from './Moon';

const Earth = memo(({ displacementScale }) => {
  const [
    earthTexture,
    earthEmissiveMap,
    earthNormalMap,
    earthSpecularMap,
    earthDisplacementMap,
  ] = useTexture([
    EarthTextureDay,
    EarthTextureNight,
    EarthNormal,
    EarthSpec,
    EarthDisp,
  ]);
  const earthRef = useRef();
  const clockRef = useRef(new THREE.Clock());
  const [hovered, setHovered] = useState(false);
  const [followingEarth, setFollowingEarth] = useState(false);

  //const earthGroupPositionRef = useRef(new THREE.Vector3(8, 0, 0));

  const updateEarthPosition = useCallback(() => {
    const angle = clockRef.current.getElapsedTime() * 0.2;
    const distance = 16;
    const x = Math.sin(angle) * distance;
    const z = Math.cos(angle) * distance;

    earthRef.current.position.set(x, 0, z);
    earthRef.current.rotation.y += 0.001;
  }, []);

  const toggleFollow = () => {
    setFollowingEarth((prevFollowingEarth) => !prevFollowingEarth);
  };

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame(({ camera }) => {
    updateEarthPosition();
    const earthPositionRef = earthRef.current.position;
    const earthTargetPosition = new THREE.Vector3(
      earthPositionRef.x + 10,
      earthPositionRef.y + 2,
      earthPositionRef.z + 5
    );
    if (followingEarth){ 
      camera.lookAt(earthPositionRef)
      camera.position.copy(earthTargetPosition)
    }else{
      const originalCameraPosition = new THREE.Vector3(1, 10, 20)
      const originalCameraTarget = new THREE.Vector3(0, 0, 0)
      camera.lookAt(originalCameraTarget)
      camera.position.copy(originalCameraPosition)
    }
  });

  return (
    <group ref={earthRef}>
      <mesh
        castShadow
        receiveShadow
        onClick={toggleFollow}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={earthNormalMap}
          specularMap={earthSpecularMap}
          shininess={100}
          displacementMap={earthDisplacementMap}
          displacementScale={displacementScale}
          emissiveMap={earthEmissiveMap}
          emissive={0xffffff}
          emissiveIntensity={hovered ? 20 : 1}
        />
      </mesh>
      <UFO />
      <Moon />
    </group>
  );
});

Earth.displayName;

export default Earth;
