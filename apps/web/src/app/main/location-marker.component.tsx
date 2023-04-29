import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

import markerUrl from '../../assets/marker.png';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LocationMarkerProps {
  location: Location;
}

export default function LocationMarker({ location }: LocationMarkerProps) {
  const iconTexture = new THREE.TextureLoader().load(markerUrl);
  const iconMaterial = new THREE.SpriteMaterial({ map: iconTexture });
  const marker = new THREE.Sprite(iconMaterial);

  marker.scale.set(2, 2, 2);
  marker.position.setFromSphericalCoords(5, THREE.MathUtils.degToRad(location.latitude), THREE.MathUtils.degToRad(location.longitude));

  useFrame(({ camera }) => {
    marker.lookAt(camera.position);
  });

  return (
    <sprite scale={[2, 2, 2]} position={marker.position}>
      <spriteMaterial attach="material" map={iconTexture} />
    </sprite>
  );
}
