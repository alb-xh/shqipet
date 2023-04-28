import * as THREE from 'three';
import { useThree, extend } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import earthTexture from '../../assets/earth-texture.jpg';
import spaceTexture from '../../assets/space.png';

extend({ OrbitControls });

const Marker: React.FC<{ lat: number; long: number }> = ({ lat, long }) => {
  const markerRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (long + 180) * Math.PI / 180;

    const x = Math.sin(phi) * Math.cos(theta) * 7;
    const y = Math.cos(phi) * 7;
    const z = Math.sin(phi) * Math.sin(theta) * 7;

    if (markerRef.current) {
      markerRef.current.position.set(x, y, z);
    }
  }, [lat, long]);

  return (
    <mesh ref={markerRef}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Earth: React.FC = () => {
  const { camera, gl } = useThree();

  // Create a group that will contain both the Earth and the background
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;

    // Restrict the zoom-in and zoom-out functionality
    controls.minDistance = 10;
    controls.maxDistance = 100;

    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  const earthTextureLoader = new THREE.TextureLoader();
  const earthTextureMap = earthTextureLoader.load(earthTexture);
  const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTextureMap });
  const earthGeometry = new THREE.SphereGeometry(7, 64, 64);

  const spaceTextureLoader = new THREE.TextureLoader();
  const spaceTextureMap = spaceTextureLoader.load(spaceTexture);
  const spaceMaterial = new THREE.MeshBasicMaterial({ map: spaceTextureMap, side: THREE.BackSide });
  const spaceGeometry = new THREE.SphereGeometry(100, 64, 64);

  return (
    <group ref={groupRef}>
      {/* Earth */}
      <mesh geometry={earthGeometry} material={earthMaterial}>
        <meshPhongMaterial attach="material" map={earthTextureMap} />
      </mesh>

      {/* Space background */}
      <mesh geometry={spaceGeometry} material={spaceMaterial} />

      {/* Location markers */}
      <Marker lat={37.7749} long={-122.4194} /> {/* San Francisco */}
      <Marker lat={40.7128} long={-74.0060} /> {/* New York */}
      <Marker lat={51.5074} long={-0.1278} /> {/* London */}

      {/* Rotate the group based on the Earth's rotation */}
      {groupRef.current && (
        groupRef.current.rotation.y = -0.5 * Math.PI // Change this value to adjust the rotation
      )}
    </group>
  );
};

export default Earth;