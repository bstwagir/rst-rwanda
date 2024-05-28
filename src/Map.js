// // src/Map.js
// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const Map = () => {
//   const [directions, setDirections] = useState(null);
//   const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });

//   useEffect(() => {
//     // Get the current location of the user
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCenter({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error getting location: ", error);
//           // Handle error case here (optional)
//         }
//       );
//     }
//   }, []);

//   const directionsCallback = (response) => {
//     if (response !== null) {
//       if (response.status === 'OK') {
//         setDirections(response);
//       } else {
//         console.log('response: ', response);
//       }
//     }
//   };
//   console.log('API key', process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

//   return (
//     <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//         <DirectionsService
//           options={{
//             destination: {lat:-1.9365670876910166, lng:30.13020167024439},
//             origin: {lat:-1.939826787816454
//               , lng:30.0445426438232},
//             travelMode: 'DRIVING',
//             waypoints: [
//               { location: {lat:-1.9355377074007851, lng:30.060163829002217}, stopover: true },
//               { location: {lat:-1.9358808342336546, lng:30.08024820994666}, stopover: true },
//               { location: {lat:-1.9489196023037583, lng:30.092607828989397}, stopover: true },
//               { location: {lat:-1.9592132952818164, lng:30.106684061788073}, stopover: true },
//               { location: {lat:-1.9487480402200394, lng:30.126596781356923}, stopover: true }
//             ]
//           }}
//           callback={directionsCallback}
//         />
//         {directions && <DirectionsRenderer directions={directions} />}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default Map;


// import React, { useState, useEffect } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
// import NextStopCard from './NextStopCard';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const waypoints = [
//   { name: "Stop 1", location: { lat: -1.9355377074007851, lng: 30.060163829002217 }, stopover: true },
//   { name: "Stop 2", location: { lat: -1.9358808342336546, lng: 30.08024820994666 }, stopover: true },
//   { name: "Stop 3", location: { lat: -1.9489196023037583, lng: 30.092607828989397 }, stopover: true },
//   { name: "Stop 4", location: { lat: -1.9592132952818164, lng: 30.106684061788073 }, stopover: true },
//   { name: "Stop 5", location: { lat: -1.9487480402200394, lng: 30.126596781356923 }, stopover: true }
// ];

// const Map = () => {
//   const [directions, setDirections] = useState(null);
//   const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });
//   const [nextStopInfo, setNextStopInfo] = useState({ nextStop: '', distance: '', duration: '' });

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setCenter({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error("Error getting location: ", error);
//         }
//       );
//     }
//   }, []);

//   const directionsCallback = (response) => {
//     if (response !== null) {
//       if (response.status === 'OK') {
//         setDirections(response);
//         const route = response.routes[0];
//         const nextLeg = route.legs[0];
//         setNextStopInfo({
//           nextStop: `${nextLeg.end_location.lat}, ${nextLeg.end_location.lng}`,
//           distance: nextLeg.distance.text,
//           duration: nextLeg.duration.text,
//           name: nextLeg.end_address.split(",")[0],
//         });
//         console.log('response: ', response)
//       } else {
//         console.log('response: ', response);
//       }
//     }
//   };

//   console.log('API key', process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 'nextStopInfo',nextStopInfo);

//   return (
//     <div>
//       <NextStopCard nextStop={nextStopInfo.nextStop} distance={nextStopInfo.distance} duration={nextStopInfo.duration} name={nextStopInfo.name} />
//       <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
//           <DirectionsService
//             options={{
//               destination: { lat: -1.9365670876910166, lng: 30.13020167024439 },
//               origin: { lat: -1.939826787816454, lng: 30.0445426438232 },
//               travelMode: 'DRIVING',
//               waypoints: waypoints.map((stop) => ({
//                 location: stop.location,
//                 stopover: stop.stopover
//               }))
//             }}
//             callback={directionsCallback}
//           />
//           {directions && <DirectionsRenderer directions={directions} />}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Map;

// src/Map.js
// src/Map.js
// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const libraries = ['geometry']; // Define the libraries array outside the component

// const stops = [
//   { name: "Stop 1", location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
//   { name: "Stop 2", location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
//   { name: "Stop 3", location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
//   { name: "Stop 4", location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
//   { name: "Stop 5", location: { lat: -1.9487480402200394, lng: 30.126596781356923 } }
// ];

// const Map = () => {
//   const [directions, setDirections] = useState(null);
//   const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });
//   const [currentStopIndex, setCurrentStopIndex] = useState(0);
//   const [distanceInfo, setDistanceInfo] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const mapRef = useRef(null);

//   const directionsCallback = (response) => {
//     if (response !== null) {
//       if (response.status === 'OK') {
//         setDirections(response);
//       } else {
//         console.log('response: ', response);
//       }
//     }
//   };

//   const calculateDistance = (google, originLat, originLng, destLat, destLng) => {
//     const service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//       {
//         origins: [{ lat: originLat, lng: originLng }],
//         destinations: [{ lat: destLat, lng: destLng }],
//         travelMode: 'DRIVING',
//       },
//       (response, status) => {
//         if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
//           setDistanceInfo(response.rows[0].elements[0]);
//         } else {
//           console.error('Error calculating distance:', response, status);
//         }
//       }
//     );
//   };

//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     const selectedPos = { lat, lng };
//     console.log(selectedPos)

//     // Check if the selected position is within the itinerary
//     const itineraryBounds = new window.google.maps.LatLngBounds();
//     stops.forEach(stop => itineraryBounds.extend(stop.location));

//     if (itineraryBounds.contains(selectedPos)) {
//       setSelectedPosition(selectedPos);

//       // Find the nearest stop
//       let nearestStopIndex = -1;
//       let nearestDistance = Infinity;
//       stops.forEach((stop, index) => {
//         const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
//           new window.google.maps.LatLng(lat, lng),
//           new window.google.maps.LatLng(stop.location.lat, stop.location.lng)
//         );

//         if (distance < nearestDistance) {
//           nearestDistance = distance;
//           nearestStopIndex = index;
//         }
//       });

//       setCurrentStopIndex(nearestStopIndex);

//       // Calculate distance and time to the next stop
//       calculateDistance(window.google, lat, lng, stops[nearestStopIndex].location.lat, stops[nearestStopIndex].location.lng);
//     } else {
//       alert("Selected position is outside the itinerary.");
//     }
//   };

//   return (
//     <div>
//       {distanceInfo && (
//         <div className="card">
//           <h3>Next Stop: {stops[currentStopIndex].name}</h3>
//           <p>Distance: {distanceInfo.distance.text}</p>
//           <p>Estimated Time: {distanceInfo.duration.text}</p>
//         </div>
//       )}
//       <LoadScript
//         googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
//         libraries={libraries} // Use the constant libraries array
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//           onClick={handleMapClick}
//           onLoad={(map) => {
//             mapRef.current = window.google;
//           }}
//         >
//           {selectedPosition && <Marker position={selectedPosition} label="Selected Position" />}
//           <DirectionsService
//             options={{
//               destination: { lat: -1.9365670876910166, lng: 30.13020167024439 }, 
//               origin: { lat: -1.939826787816454, lng: 30.0445426438232 },
//               travelMode: 'DRIVING',
//               waypoints: stops.map(stop => ({ location: stop.location, stopover: true }))
//             }}
//             callback={directionsCallback}
//           />
//           {directions && <DirectionsRenderer directions={directions} />}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Map;


// src/Map.js
// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const libraries = ['geometry']; // Define the libraries array outside the component

// const stops = [
//   { location: { lat: -1.939826787816454, lng: 30.0445426438232 } },
//   { location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
//   { location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
//   { location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
//   { location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
//   { location: { lat: -1.9487480402200394, lng: 30.126596781356923 } },
//   { location:  { lat: -1.9365670876910166, lng: 30.13020167024439 }},
  
// ];

// const Map = () => {
//   const [directions, setDirections] = useState(null);
//   const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });
//   const [currentStopIndex, setCurrentStopIndex] = useState(0);
//   const [distanceInfo, setDistanceInfo] = useState(null);
//   const [stopName, setStopName] = useState(null);
//   const [isOutsideOfItinerary, setIsOutsideOfItinerary] = useState(false);
//   const [nearestStopInfo, setNearestStopInfo] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [stopNames, setStopNames] = useState({});
//   const mapRef = useRef(null);


//   useEffect(() => {
//     if (window.google) {
//       stops.forEach((stop, index) => {
//         getStopName(stop.location, index);
//       });
//       console.log('The firsat function works')
//     }
//   }, []);

//     // useEffect(() => {
//     //     // Get the current location of the user
//     //     if (navigator.geolocation) {
//     //       navigator.geolocation.getCurrentPosition(
//     //         (position) => {
//     //           setCenter({
//     //             lat: position.coords.latitude,
//     //             lng: position.coords.longitude,
//     //           });
//     //         },
//     //         (error) => {
//     //           console.error("Error getting location: ", error);
//     //           // Handle error case here (optional)
//     //         }
//     //       );
//     //     }
//     //   }, []);

//   const directionsCallback = (response) => {
//     if (response !== null) {
//       if (response.status === 'OK') {
//         setDirections(response);
//         //console.log('response: ', response);
//       } else {
//         console.log('response: ', response);
//       }
//     }
//   };

//   const calculateDistance = (google, originLat, originLng, destLat, destLng) => {
//     const service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//       {
//         origins: [{ lat: originLat, lng: originLng }],
//         destinations: [{ lat: destLat, lng: destLng }],
//         travelMode: 'DRIVING',
//       },
//       (response, status) => {
//         if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
//           setDistanceInfo(response.rows[0].elements[0]);
//           setStopName(response.destinationAddresses[0].split(",").splice(0,2)
//           );
//           console.log(response.rows[0].elements[0], response)
//         } else {
//           console.error('Error calculating distance:', response, status);
//         }
//       }
//     );
//   };

//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     const selectedPos = { lat, lng };

//     // Check if the selected position is within the itinerary
//     const itineraryBounds = new window.google.maps.LatLngBounds();
//     stops.forEach(stop => itineraryBounds.extend(stop.location));

//     if (itineraryBounds.contains(selectedPos)) {
//       setSelectedPosition(selectedPos);
//       setNearestStopInfo(null);

//       // Find the next stop ahead
//       let nextStopIndex = stops.findIndex((stop, index) => {
//         const stopLatLng = new window.google.maps.LatLng(stop.location.lat, stop.location.lng);
//         const selectedLatLng = new window.google.maps.LatLng(lat, lng);
//         return window.google.maps.geometry.spherical.computeDistanceBetween(selectedLatLng, stopLatLng) > 0 && index > currentStopIndex;
//       });

//       // If no next stop is found, set the last stop as the next stop
//       if (nextStopIndex === -1) {
//         nextStopIndex = stops.length - 1;
//       }

//       setCurrentStopIndex(nextStopIndex);

//       // Calculate distance and time to the next stop
//       calculateDistance(
//         window.google,
//         lat,
//         lng,
//         stops[nextStopIndex].location.lat,
//         stops[nextStopIndex].location.lng,
//         (distanceInfo) => setDistanceInfo(distanceInfo)
//       );

//     } else {
//       // Find the nearest stop
//       let nearestStopIndex = -1;
//       let nearestDistance = Infinity;
//       stops.forEach((stop, index) => {
//         const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
//           new window.google.maps.LatLng(lat, lng),
//           new window.google.maps.LatLng(stop.location.lat, stop.location.lng)
//         );

//         if (distance < nearestDistance) {
//           nearestDistance = distance;
//           nearestStopIndex = index;
//         }
//       });

//       setSelectedPosition(selectedPos);
//       setNearestStopInfo({
//         stop: stops[nearestStopIndex],
//         distance: nearestDistance,
//       });
//       setDistanceInfo(null);
//     }
//   };

//   const getStopName = (location, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         setStopNames(prevNames => ({ ...prevNames, [index]: results[0].formatted_address }));
//         console.log(`Stop ${index} address: ${results[0].formatted_address}`);
//       } else {
//         console.error('Error getting stop name:', status);
//       }
//     });
//   };

//   useEffect(() => {
//     if (selectedPosition && mapRef.current) {
//       // Add a marker at the selected position using google.maps.Marker
//       new window.google.maps.Marker({
//         position: selectedPosition,
//         map: mapRef.current,
//         title: "Selected Position"
//       });
//     }
//   }, [selectedPosition]);

//   return (
//     <div>
//       {distanceInfo && (
//         <div className="card">
//           <h3>Next Stop: {stopNames[currentStopIndex] }</h3>
//           <p>Distance: {distanceInfo.distance.text}</p>
//           <p>Estimated Time: {distanceInfo.duration.text}</p>
//         </div>
//       )}
//       {nearestStopInfo && (
//         <div className="card">
//           <h3>Selected Position is outside the itinerary</h3>
//           <p>Nearest Stop: {stopNames[stops.indexOf(nearestStopInfo.stop)] || 'Loading...'}</p>
//           <p>Distance to Nearest Stop: {nearestStopInfo.distance.toFixed(2)} meters</p>
//         </div>
//       )}
//       <LoadScript
//         googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
//         libraries={libraries} // Use the constant libraries array
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={16}
//           onClick={handleMapClick}
//           onLoad={(map) => {
//             mapRef.current = map;
//           }}
//         >
//           <DirectionsService
//             options={{
//               destination: { lat: -1.9365670876910166, lng: 30.13020167024439 },
//               origin: { lat: -1.939826787816454, lng: 30.0445426438232 },
//               travelMode: 'DRIVING',
//               waypoints: stops.map(stop => ({ location: stop.location, stopover: true }))
//             }}
//             callback={directionsCallback}
//           />
//           {directions && <DirectionsRenderer directions={directions} />}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Map;


// src/Map.js
// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const stops = [
//   { location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
//   { location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
//   { location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
//   { location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
//   { location: { lat: -1.9487480402200394, lng: 30.126596781356923 } }
// ];

// const Map = () => {
//   const [directions, setDirections] = useState(null);
//   const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });
//   const [currentStopIndex, setCurrentStopIndex] = useState(0);
//   const [distanceInfo, setDistanceInfo] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [nearestStopInfo, setNearestStopInfo] = useState(null);
//   const [stopNames, setStopNames] = useState({});
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (window.google) {
//       stops.forEach((stop, index) => {
//         getStopName(stop.location, index);
//       });
//     }
//   }, []);

//   const libraries=['places', 'geometry']


//   const directionsCallback = (response) => {
//     if (response !== null) {
//       if (response.status === 'OK') {
//         console.log('Directions response OK:', response);
//         setDirections(response);

//         // Check if the selected position is within the itinerary
//         if (selectedPosition) {
//           const path = response.routes[0].overview_path;
//           const isOnPath = path.some(
//             point => window.google.maps.geometry.spherical.computeDistanceBetween(
//               new window.google.maps.LatLng(point.lat(), point.lng()),
//               new window.google.maps.LatLng(selectedPosition.lat, selectedPosition.lng)
//             ) < 50 // 50 meters tolerance
//           );

//           if (isOnPath) {
//             // Find the next stop ahead
//             let nextStopIndex = stops.findIndex((stop, index) => {
//               const stopLatLng = new window.google.maps.LatLng(stop.location.lat, stop.location.lng);
//               const selectedLatLng = new window.google.maps.LatLng(selectedPosition.lat, selectedPosition.lng);
//               return window.google.maps.geometry.spherical.computeDistanceBetween(selectedLatLng, stopLatLng) > 0 && index > currentStopIndex;
//             });

//             // If no next stop is found, set the last stop as the next stop
//             if (nextStopIndex === -1) {
//               nextStopIndex = stops.length - 1;
//             }

//             setCurrentStopIndex(nextStopIndex);

//             // Calculate distance and time to the next stop
//             calculateDistance(
//               window.google,
//               selectedPosition.lat,
//               selectedPosition.lng,
//               stops[nextStopIndex].location.lat,
//               stops[nextStopIndex].location.lng,
//               (distanceInfo) => setDistanceInfo(distanceInfo)
//             );
//           } else {
//             // Handle the case where the selected position is not on the itinerary
//             setNearestStopInfo({
//               message: 'Selected position is outside the itinerary.'
//             });
//           }
//         }
//       } else {
//         console.log('Directions response not OK:', response);
//       }
//     }
//   };

//   const calculateDistance = (google, originLat, originLng, destLat, destLng, callback) => {
//     const service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//       {
//         origins: [{ lat: originLat, lng: originLng }],
//         destinations: [{ lat: destLat, lng: destLng }],
//         travelMode: 'DRIVING',
//       },
//       (response, status) => {
//         if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
//           console.log('Distance calculation OK:', response.rows[0].elements[0]);
//           callback(response.rows[0].elements[0]);
//         } else {
//           console.error('Error calculating distance:', response, status);
//         }
//       }
//     );
//   };

//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     const selectedPos = { lat, lng };

//     setSelectedPosition(selectedPos);
//     setNearestStopInfo(null);

//     // Trigger DirectionsService to update the directions and check the new position
//     if (directions) {
//       directionsCallback(directions);
//     }
//   };

//   const getStopName = (location, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         console.log(`Stop ${index} address: ${results[0].formatted_address}`);
//         setStopNames(prevNames => ({ ...prevNames, [index]: results[0].formatted_address }));
//       } else {
//         console.error('Error getting stop name:', status);
//       }
//     });
//   };

//   return (
//     <div>
//       {distanceInfo && (
//         <div className="card">
//           <h3>Next Stop: {stopNames[currentStopIndex] || 'Loading...'}</h3>
//           <p>Distance: {distanceInfo.distance.text}</p>
//           <p>Estimated Time: {distanceInfo.duration.text}</p>
//         </div>
//       )}
//       {nearestStopInfo && (
//         <div className="card">
//           <h3>{nearestStopInfo.message}</h3>
//         </div>
//       )}
//       <LoadScript
//         googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
//         libraries={libraries}
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//           onClick={handleMapClick}
//           onLoad={(map) => {
//             mapRef.current = window.google;
//           }}
//         >
//           {selectedPosition && <Marker position={selectedPosition} label="Selected Position" />}
//           <DirectionsService
//             options={{
//               destination: { lat: -1.9365670876910166, lng: 30.13020167024439 },
//               origin: { lat: -1.939826787816454, lng: 30.0445426438232 },
//               travelMode: 'DRIVING',
//               waypoints: stops.map(stop => ({ location: stop.location, stopover: true }))
//             }}
//             callback={directionsCallback}
//           />
//           {directions && <DirectionsRenderer directions={directions} />}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Map;



// src/Map.js
// import React, { useState, useEffect, useRef } from 'react';
// import { GoogleMap, LoadScript, DirectionsService, Polyline, Marker } from '@react-google-maps/api';

// const containerStyle = {
//   width: '100%',
//   height: '400px'
// };

// const stops = [
//   { location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
//   { location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
//   { location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
//   { location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
//   { location: { lat: -1.9487480402200394, lng: 30.126596781356923 } }
// ];

// const libraries = ['places', 'geometry'];

// const Map = () => {
//   const [directions, setDirections] = useState(null);
//   const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });
//   const [currentStopIndex, setCurrentStopIndex] = useState(0);
//   const [distanceInfo, setDistanceInfo] = useState(null);
//   const [selectedPosition, setSelectedPosition] = useState(null);
//   const [nearestStopInfo, setNearestStopInfo] = useState(null);
//   const [stopNames, setStopNames] = useState({});
//   const [traveledPath, setTraveledPath] = useState([]);
//   const [remainingPath, setRemainingPath] = useState([]);
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (window.google) {
//       stops.forEach((stop, index) => {
//         getStopName(stop.location, index);
//       });
//     }
//   }, []);

//   const directionsCallback = (response) => {
//     if (response !== null) {
//       if (response.status === 'OK') {
//         setDirections(response);
//         if (selectedPosition) {
//           const path = response.routes[0].overview_path;
//           splitRoute(path, selectedPosition);
//         }
//       } else {
//         console.log('Directions response not OK:', response);
//       }
//     }
//   };

//   const calculateDistance = (google, originLat, originLng, destLat, destLng, callback) => {
//     const service = new google.maps.DistanceMatrixService();
//     service.getDistanceMatrix(
//       {
//         origins: [{ lat: originLat, lng: originLng }],
//         destinations: [{ lat: destLat, lng: destLng }],
//         travelMode: 'DRIVING',
//       },
//       (response, status) => {
//         if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
//           callback(response.rows[0].elements[0]);
//         } else {
//           console.error('Error calculating distance:', response, status);
//         }
//       }
//     );
//   };

//   const handleMapClick = (event) => {
//     const lat = event.latLng.lat();
//     const lng = event.latLng.lng();
//     const selectedPos = { lat, lng };

//     setSelectedPosition(selectedPos);
//     setNearestStopInfo(null);

//     if (directions) {
//       directionsCallback(directions);
//     }
//   };

//   const getStopName = (location, index) => {
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         setStopNames(prevNames => ({ ...prevNames, [index]: results[0].formatted_address }));
//       } else {
//         console.error('Error getting stop name:', status);
//       }
//     });
//   };

//   const splitRoute = (path, selectedPosition) => {
//     const traveled = [];
//     const remaining = [];
//     let found = false;

//     path.forEach((point, index) => {
//       const pointLatLng = new window.google.maps.LatLng(point.lat(), point.lng());
//       if (!found) {
//         traveled.push(point);
//         if (window.google.maps.geometry.spherical.computeDistanceBetween(pointLatLng, new window.google.maps.LatLng(selectedPosition.lat, selectedPosition.lng)) < 50) {
//           found = true;
//         }
//       } else {
//         remaining.push(point);
//       }
//     });

//     setTraveledPath(traveled);
//     setRemainingPath(remaining);

//     // Update next stop and distance info
//     if (found) {
//       let nextStopIndex = stops.findIndex((stop, index) => {
//         const stopLatLng = new window.google.maps.LatLng(stop.location.lat, stop.location.lng);
//         return window.google.maps.geometry.spherical.computeDistanceBetween(new window.google.maps.LatLng(selectedPosition.lat, selectedPosition.lng), stopLatLng) > 0 && index > currentStopIndex;
//       });

//       if (nextStopIndex === -1) {
//         nextStopIndex = stops.length - 1;
//       }

//       setCurrentStopIndex(nextStopIndex);

//       calculateDistance(
//         window.google,
//         selectedPosition.lat,
//         selectedPosition.lng,
//         stops[nextStopIndex].location.lat,
//         stops[nextStopIndex].location.lng,
//         (distanceInfo) => setDistanceInfo(distanceInfo)
//       );
//     }
//   };

//   return (
//     <div>
//       {distanceInfo && (
//         <div className="card">
//           <h3>Next Stop: {stopNames[currentStopIndex] || 'Loading...'}</h3>
//           <p>Distance: {distanceInfo.distance.text}</p>
//           <p>Estimated Time: {distanceInfo.duration.text}</p>
//         </div>
//       )}
//       {nearestStopInfo && (
//         <div className="card">
//           <h3>{nearestStopInfo.message}</h3>
//         </div>
//       )}
//       <LoadScript
//         googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
//         libraries={libraries}
//       >
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={center}
//           zoom={12}
//           onClick={handleMapClick}
//         >
//           {selectedPosition && <Marker position={selectedPosition} label="Selected Position" />}
//           <DirectionsService
//             options={{
//               destination: { lat: -1.9365670876910166, lng: 30.13020167024439 },
//               origin: { lat: -1.939826787816454, lng: 30.0445426438232 },
//               travelMode: 'DRIVING',
//               waypoints: stops.map(stop => ({ location: stop.location, stopover: true }))
//             }}
//             callback={directionsCallback}
//           />
//           {directions && (
//             <>
//               <Polyline path={traveledPath} options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 4 }} />
//               <Polyline path={remainingPath} options={{ strokeColor: '#0000FF', strokeOpacity: 1.0, strokeWeight: 4 }} />
//             </>
//           )}

//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default Map;


import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Polyline, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const stops = [
  { location: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
  { location: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
  { location: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
  { location: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
  { location: { lat: -1.9487480402200394, lng: 30.126596781356923 } }
];

const libraries = ['places', 'geometry'];

const Map = () => {
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: -1.94995, lng: 30.05885 });
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [distanceInfo, setDistanceInfo] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [nearestStopInfo, setNearestStopInfo] = useState(null);
  const [stopNames, setStopNames] = useState({});
  const [traveledPath, setTraveledPath] = useState([]);
  const [remainingPath, setRemainingPath] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      stops.forEach((stop, index) => {
        getStopName(stop.location, index);
      });
    }
  }, []);

  useEffect(() => {
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      const origin = stops[0].location;
      const destination = stops[stops.length - 1].location;
      const waypoints = stops.slice(1, -1).map(stop => ({ location: stop.location, stopover: true }));

      directionsService.route(
        {
          origin,
          destination,
          waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            const path = result.routes[0].overview_path;
            setRemainingPath(path);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, []);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.log('Directions response not OK:', response);
      }
    }
  };

  const calculateDistance = (google, originLat, originLng, destLat, destLng, callback) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [{ lat: originLat, lng: originLng }],
        destinations: [{ lat: destLat, lng: destLng }],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
          callback(response.rows[0].elements[0]);
        } else {
          console.error('Error calculating distance:', response, status);
        }
      }
    );
  };

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const selectedPos = { lat, lng };

    setSelectedPosition(selectedPos);
    setNearestStopInfo(null);

    if (directions) {
      const path = directions.routes[0].overview_path;
      splitRoute(path, selectedPos);
    }
  };

  const getStopName = (location, index) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setStopNames(prevNames => ({ ...prevNames, [index]: results[0].formatted_address }));
      } else {
        console.error('Error getting stop name:', status);
      }
    });
  };

  const splitRoute = (path, selectedPosition) => {
    const traveled = [];
    const remaining = [];
    let found = false;

    path.forEach((point) => {
      const pointLatLng = new window.google.maps.LatLng(point.lat(), point.lng());
      if (!found) {
        traveled.push(point);
        if (window.google.maps.geometry.spherical.computeDistanceBetween(pointLatLng, new window.google.maps.LatLng(selectedPosition.lat, selectedPosition.lng)) < 50) {
          found = true;
        }
      } else {
        remaining.push(point);
      }
    });

    setTraveledPath(traveled);
    setRemainingPath(remaining);

    // Update next stop and distance info
    if (found) {
      let nextStopIndex = stops.findIndex((stop, index) => {
        const stopLatLng = new window.google.maps.LatLng(stop.location.lat, stop.location.lng);
        return window.google.maps.geometry.spherical.computeDistanceBetween(new window.google.maps.LatLng(selectedPosition.lat, selectedPosition.lng), stopLatLng) > 0 && index > currentStopIndex;
      });

      if (nextStopIndex === -1) {
        nextStopIndex = stops.length - 1;
      }

      setCurrentStopIndex(nextStopIndex);

      calculateDistance(
        window.google,
        selectedPosition.lat,
        selectedPosition.lng,
        stops[nextStopIndex].location.lat,
        stops[nextStopIndex].location.lng,
        (distanceInfo) => setDistanceInfo(distanceInfo)
      );
    }
  };

  return (
    <div>
      {/* {distanceInfo && ( */}
        {/* <div className="card">
          <h3>Next Stop: {stopNames[currentStopIndex] || 'Loading...'}</h3>
          <p>Distance: {distanceInfo.distance?.text || 'Loading...'}</p>
          <p>Estimated Time: {distanceInfo.duration?.text || 'Loading...'}</p>
        </div> */}
        <div className="card">
          <h3>Next Stop: {stopNames[currentStopIndex] || 'Loading...'}</h3>
          <p>Distance: { 'Loading...'}</p>
          <p>Estimated Time: { 'Loading...'}</p>
        </div>
      {/* )} */}
      {nearestStopInfo && (
        <div className="card">
          <h3>{nearestStopInfo.message}</h3>
        </div>
      )}
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onClick={handleMapClick}
        >
          {selectedPosition && <Marker position={selectedPosition} label="Selected Position" />}
          <DirectionsService
            options={{
              destination: { lat: stops[stops.length - 1].location.lat, lng: stops[stops.length - 1].location.lng },
              origin: { lat: stops[0].location.lat, lng: stops[0].location.lng },
              travelMode: 'DRIVING',
              waypoints: stops.slice(1, -1).map(stop => ({ location: stop.location, stopover: true }))
            }}
            callback={directionsCallback}
          />
          {directions && (
            <>
              <Polyline path={traveledPath} options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 4 }} />
              <Polyline path={remainingPath} options={{ strokeColor: '#0000FF', strokeOpacity: 1.0, strokeWeight: 4 }} />
              <DirectionsRenderer directions={directions} />
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;


