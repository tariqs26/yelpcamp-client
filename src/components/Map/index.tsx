import { useState } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Props = {
  coordinates: {
    longitude: number;
    latitude: number;
  };
  title: string;
  location: string;
};

export default function Map({ coordinates, title, location }: Props) {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <ReactMapGL
      initialViewState={{
        longitude: coordinates.longitude,
        latitude: coordinates.latitude,
        zoom: 9,
      }}
      style={{ height: '300px', borderRadius: 'calc(0.375rem - 1px)' }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    >
      <NavigationControl/>
      <Marker
        {...coordinates}
        anchor='bottom'
        onClick={() => setShowPopup(true)}
      />
      {showPopup && (
        <Popup {...coordinates} onClose={() => setShowPopup(false)}>
          <div>
            <h4>{title}</h4>
            <p>{location}</p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
}
