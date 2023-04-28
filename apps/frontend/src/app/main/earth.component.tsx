import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import earthTexture from '../../assets/earth-texture.jpg';
import spaceTexture from '../../assets/space.png';

const Earth: React.FC = () => {
  const { scene, camera, gl } = useThree();

  // Create a group that will contain both the Earth and the background
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;

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

      {/* Rotate the group based on the Earth's rotation */}
      {groupRef.current && (
        groupRef.current.rotation.y = -0.5 * Math.PI // Change this value to adjust the rotation
      )}
    </group>
  );
};

export default Earth;