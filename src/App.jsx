import { OrbitControls } from "@react-three/drei";
import MainContainer from "./MainContainer";
import { Canvas } from "@react-three/fiber";
function App() {
  return (
    <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [1, 10, 20] }} shadows>
        <color attach='background' args={["black"]} />
       <OrbitControls />
      <MainContainer />
    </Canvas>
  );
}

export default App;
