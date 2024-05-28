import React from 'react';

const NextStopCard = ({ nextStop, distance, duration, name }) => {
  return (
    <div className="next-stop-card">
      <h3>Next Stop: {name || nextStop}</h3>
      <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
    </div>
  );
};

export default NextStopCard;
