"use client";

// import { Canvas, useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Center, useGLTF, Environment } from "@react-three/drei";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Suspense } from "react";

import * as THREE from "three";

// function Model({ objUrl }: { objUrl: string }) {
//   const gltf = useLoader(GLTFLoader, objUrl);
//   const model = gltf.scene;

//   return <primitive object={model} scale={5} />;
// }

// function GLBViewer({ objUrl }: { objUrl: string }) {
//   return (
//     <div className="w-full h-[calc(80vh)]">
//       <Canvas camera={{ position: [0, 0, 35], fov: 30 }}>
//         {/* Pure white lights only */}
//         <ambientLight intensity={1} color="#ffffff" />
//         <directionalLight
//           position={[10, 10, 10]}
//           intensity={0.5}
//           color="#ffffff"
//         />

//         {/* No Environment component to avoid color casting */}

//         <Suspense fallback={null}>
//           <Center>
//             <Model objUrl={objUrl} />
//           </Center>
//         </Suspense>

//         <OrbitControls
//           enablePan={false}
//           target={[0, 0, 0]}
//           minPolarAngle={Math.PI / 4}
//           maxPolarAngle={Math.PI / 2}
//           enableZoom={false}
//           enableRotate={true}
//           screenSpacePanning={false}
//         />
//       </Canvas>
//     </div>
//   );
// }

function Models({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
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

