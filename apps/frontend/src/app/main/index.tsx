import { Canvas } from '@react-three/fiber';

import LocationMarker, { Location } from './location-marker.component';
import Earth from './earth.component';
import GroupChat from './group-chat.component';

import { pageStyle } from './styles';

function MainPage() {
  const markers: Location[] = [];

  for (let i = 0; i < 10; i++) {
    const latitude = Math.random() * 180 - 90;
    const longitude = Math.random() * 360 - 180;
    markers.push({ latitude, longitude });
  }

  return (
    <div style={pageStyle}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={1} />
        <directionalLight intensity={1} position={[0, 1, 1]} />
        <Earth />
        {/* {markers.map((location, index) => (<LocationMarker key={index} location={location} />))} */}
      </Canvas>
      <GroupChat />
    </div>
  );
}

export default MainPage;


