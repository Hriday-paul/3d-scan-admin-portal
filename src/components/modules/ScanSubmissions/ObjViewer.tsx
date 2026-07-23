"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

import * as THREE from "three";

function Models({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.7}/>;
}

export default function ObjViewer({ objUrl }: { objUrl: string }) {
  return (
    <div className="w-full h-[calc(80vh)]">
      <Canvas camera={{ position: [3, 3, 3], fov: 30 }} gl={{
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}>

        <hemisphereLight color={"white"} groundColor={"#444"} intensity={2} />
        <ambientLight intensity={1.4} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />

        <Environment preset="warehouse" />

        <Suspense fallback={null}>
          <Center>
            <Models url={objUrl} />
          </Center>
        </Suspense>

        <OrbitControls
          enablePan={false}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          enableZoom={false}
          enableRotate={true}
          screenSpacePanning={false}
        />
      </Canvas>
    </div>
  );
}

