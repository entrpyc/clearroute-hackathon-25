"use client"
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { Vector3, Mesh, CatmullRomCurve3 } from 'three';
import * as THREE from 'three';


interface AnimatedSphereProps {
  path: CatmullRomCurve3;
}

function AnimatedSphere({ path }: AnimatedSphereProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const [visible, setVisible] = useState(true);
  const speed = useRef(15);
  const totalLength = useRef(path.getLength());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useFrame((_, delta) => {
    if (!sphereRef.current || !visible) return;

    const cappedDelta = Math.min(delta, 0.033);
    const progressDelta = (speed.current * cappedDelta) / totalLength.current;
    
    progress.current = Math.min(progress.current + progressDelta, 1);
    
    if (progress.current >= 1) {
      setVisible(false);
      timeoutRef.current = setTimeout(() => {
        progress.current = 0;
        setVisible(true);
      }, 200);
      return;
    }

    const position = path.getPointAt(progress.current);
    sphereRef.current.position.copy(position);
  });

  useEffect(() => {
    totalLength.current = path.getLength();
    if (sphereRef.current) {
      sphereRef.current.position.copy(path.getPointAt(0));
    }
  }, [path]);

  return visible ? (
    <mesh ref={sphereRef}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color="red" 
        metalness={0.3}
        roughness={0.1}
      />
    </mesh>
  ) : null;
}



interface ModelProps {
  url: string;
}

function PathModel({ url, onPathCreated }: { url: string; onPathCreated: (curve: CatmullRomCurve3) => void }) {
  const obj = useLoader(OBJLoader, url);
  
  useEffect(() => {
    if (obj) {
      const pathPoints: THREE.Vector3[] = [];
      const scaleFactorModel = 0.92;
      const scaleFactorPath = 5;
      const offset = new THREE.Vector3(3.1,1,2.1);
      
      // Extract vertices from OBJ line geometry
      obj.traverse(child => {
        if (child instanceof THREE.Line) {
          const geometry = child.geometry;
          const positions = geometry.attributes.position.array;
          for (let i = 0; i < positions.length; i += 3) {
            // Convert from Blender's Z-up to Three.js Y-up
            pathPoints.push(new Vector3(
              positions[i],
              positions[i + 2], 
              positions[i + 1] 
            ));
          }
        }
      });

      const adjustedPoints = pathPoints.map( pt => {
        const scaledPt = new THREE.Vector3(pt.x * scaleFactorModel / scaleFactorPath, pt.y * scaleFactorModel / scaleFactorPath, pt.z * scaleFactorModel / scaleFactorPath);
        return scaledPt.add(offset);
      })
      if (pathPoints.length > 3) {
        const curve = new THREE.CatmullRomCurve3(adjustedPoints, false);
        onPathCreated(curve);
      }
    }
  }, [obj, onPathCreated]);

  return null;
}

function Model({ url }: ModelProps) {
  useCameraFocus();
  const geom = useLoader(STLLoader, url);
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current && geom?.attributes?.position) {
      const positionAttr = geom.attributes.position as THREE.BufferAttribute;
      const box = new THREE.Box3().setFromBufferAttribute(positionAttr);
      const center = box.getCenter(new Vector3());
      const maxSize = Math.max(...box.getSize(new Vector3()).toArray());
      const scale = 38 / maxSize;

      // Transform vertices
      for (let i = 0; i < positionAttr.count; i++) {
        positionAttr.setX(i, (positionAttr.getX(i) - center.x) * scale);
        positionAttr.setY(i, (positionAttr.getY(i) - center.y) * scale);
        positionAttr.setZ(i, (positionAttr.getZ(i) - center.z) * scale);
      }
      positionAttr.needsUpdate = true;
      meshRef.current.scale.set(scale, scale, scale);

      // Extract surface path points
      const pathPoints: Vector3[] = [];
      const yThreshold = box.max.y * 0.9; // Get top 10% of vertices
      
      for (let i = 0; i < positionAttr.count; i++) {
        const y = positionAttr.getY(i);
        if (y >= yThreshold) {
          pathPoints.push(new Vector3(
            positionAttr.getX(i),
            positionAttr.getY(i),
            positionAttr.getZ(i)
          ));
        }
      }

      // Sort points by proximity to create continuous path
      const sortedPoints = [pathPoints[0]];
      const remainingPoints = [...pathPoints.slice(1)];
      
      while (remainingPoints.length > 0) {
        const lastPoint = sortedPoints[sortedPoints.length - 1];
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        remainingPoints.forEach((point, index) => {
          const distance = lastPoint.distanceTo(point);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        
        sortedPoints.push(remainingPoints[closestIndex]);
        remainingPoints.splice(closestIndex, 1);
      }

      if (sortedPoints.length > 3) {
        const curve = new CatmullRomCurve3(sortedPoints);
        curve.closed = false; // Open path from start to finish
      }
    }
  }, [geom]);


    return (
    <mesh ref={meshRef}>
      <primitive object={geom} attach="geometry" />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

function useCameraFocus() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0); // Align with OrbitControls target
    camera.updateProjectionMatrix();
  }, []);
}

function Skybox({ color = 0x95A2A5 }) {
  const size = 200;
  const raiseAmount = 75; // Bottom face at Y=0
  return (
    <>
      <mesh
        position={[0, raiseAmount, 0]}
        rotation={[0, Math.PI/4, 0]} // 45° Y-axis rotation
      >
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={color} side={THREE.BackSide} transparent opacity={0.8} />
      </mesh>
      <lineSegments
        position={[0, raiseAmount, 0]}
        rotation={[0, Math.PI/4, 0]} // Match rotation
      >
        <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
        <lineBasicMaterial attach="material" color="black" linewidth={1} />
      </lineSegments>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export default function Track() {
  const [path, setPath] = useState<THREE.CatmullRomCurve3 | null>(null);
  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        style={{ height: '100vh' }}
        camera={{
          position: [35, 35, 0],
          rotation: [-Math.PI/8, Math.PI/4, 0],
          fov: 35,
          near: 1,
          far: 1000,
        }}
      >
        <Skybox color={0x747E80} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={1000}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <Suspense fallback={null}>
          <Model url="/models/lemans_circuit.stl" />
          <PathModel url="/models/track_path.obj" onPathCreated={setPath} />
          {path && <AnimatedSphere path={path} />}
          {/* {path && (
  <mesh>
    <tubeGeometry args={[path, 64, 0.1]} />
    <meshBasicMaterial color="blue" />
  </mesh>
)} */}
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI/3}
          maxPolarAngle={Math.PI/4}
          target={[0, 0, 0]}
        />
      </Canvas>
    </div>
  );
}
