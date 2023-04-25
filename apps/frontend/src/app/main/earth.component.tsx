import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import earthTexture from '../../assets/earth-texture.jpg';

export default function Earth() {
  const { camera, gl } = useThree();

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

  const texture = new THREE.TextureLoader().load(earthTexture);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.SphereGeometry(7, 64, 64);

  return (
    <mesh geometry={geometry} material={material}>
      <meshPhongMaterial attach="material" map={texture} />
    </mesh>
  );
};
