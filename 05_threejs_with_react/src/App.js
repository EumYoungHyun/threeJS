import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";

import { Html, useGLTFLoader } from "drei";

import Header from "./components/header";
import { Section } from "./components/section";
import "./App.scss";

const Model = ({ modelPath }) => {
  const gltf = useGLTFLoader(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Light = () => {
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <directionalLight position={[0, 10, 0]} intensity={0.3} />
      <spotLight position={[1000, 0, 0]} intensity={0.5} />
    </>
  );
};

const HTMLContent = ({ children, meshPosition, groupPosition, modelPath }) => {
  const ref = useRef();

  useFrame(() => (ref.current.rotation.y += 0.01));
  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, groupPosition, 0]}>
        <mesh ref={ref} position={meshPosition}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html fullscreen>{children}</Html>
      </group>
    </Section>
  );
};

export default function App() {
  return (
    <>
      <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Light />
        <Suspense fallback={null}>
          <HTMLContent
            meshPosition={[0, -5, 100]}
            groupPosition={250}
            modelPath="/pikachu.gltf"
          >
            <div className="container">
              <h1 className="title">Hello</h1>
            </div>
          </HTMLContent>
          {/* <HTMLContent />
          <HTMLContent /> */}
        </Suspense>
      </Canvas>
    </>
  );
}
