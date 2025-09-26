"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { Suspense } from "react";

function Model({ objUrl }: { objUrl: string }) {
  const obj = useLoader(OBJLoader, "/models/fdbdd08c-1527-4de2-ad76-2c20b14deb22_reconstructed.obj"); //"/models/fdbdd08c-1527-4de2-ad76-2c20b14deb22_reconstructed.obj"
  obj.rotation.z = Math.PI;
  obj.rotation.x = Math.PI/2;
  obj.rotation.y = Math.PI;

  return <primitive object={obj} scale={1} />;
}

export default function ObjViewer({ objUrl }: { objUrl: string }) {
  return (
    <div className="w-full h-[calc(80vh)]">

      <Canvas camera={{ position: [0, 0, 35], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Center>
            <Model objUrl={objUrl} />
          </Center>
        </Suspense>
        <OrbitControls
          enablePan={false}
          target={[0, 0, 0]} // Center the rotation
          minPolarAngle={Math.PI / 4} // Prevents top view (45° from top)
          maxPolarAngle={Math.PI / 2} // Prevents bottom view (90° from top)
          enableZoom={false} // Disable zoom if you don't want it
          enableRotate={true} // Keep rotation enabled
          screenSpacePanning={false} // Disable horizontal panning
        />
      </Canvas>
    </div>
  );
}
