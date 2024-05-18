// src/Map.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const Map = () => {
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });

  useEffect(() => {
    // Get the current location of the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          // Handle error case here (optional)
        }
      );
    }
  }, []);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.log('response: ', response);
      }
    }
  };
  console.log('API key', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        <DirectionsService
          options={{
            destination: {lat:-1.939826787816454, lng:30.0445426438232},
            origin: {lat:-1.9365670876910166, lng:30.13020167024439},
            travelMode: 'DRIVING',
            waypoints: [
              { location: {lat:-1.9355377074007851, lng:30.060163829002217}, stopover: true },
              { location: {lat:-1.9358808342336546, lng:30.08024820994666}, stopover: true },
              { location: {lat:-1.9489196023037583, lng:30.092607828989397}, stopover: true },
              { location: {lat:-1.9592132952818164, lng:30.106684061788073}, stopover: true },
              { location: {lat:-1.9487480402200394, lng:30.126596781356923}, stopover: true }
            ]
          }}
          callback={directionsCallback}
        />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
