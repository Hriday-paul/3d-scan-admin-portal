"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

import * as THREE from "three";

import { useProgress } from "@react-three/drei";

function LoaderOverlay() {
  const { progress, active, item } = useProgress();

  if (!active) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-10 transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4 px-8">
        {/* Spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white/40 border-b-transparent border-l-transparent animate-spin" />
        </div>

        {/* Progress bar */}
        <div className="w-56 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-white text-sm font-medium tracking-wide">
            Loading model
          </span>
          <span className="text-white/50 text-xs">
            {progress.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function Models({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.7} />;
}

export default function ObjViewer({ objUrl }: { objUrl: string }) {
  return (
    <div className="w-full h-[calc(80vh)] relative">
      <LoaderOverlay />
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

