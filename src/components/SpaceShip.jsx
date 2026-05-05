// INTERGALACTIC-ÖVNING
// CHILD-KOMPONENT

import React from "react";

export default function SpaceShip({ ship, logSpeed }) {
  return (
    <div className="spaceship">
      <h2>{ship.name}</h2>
      <p>Maxhastighet: {ship.speed} km/h</p>
      <button onClick={() => logSpeed(ship)}>Logga hastighet</button>
    </div>
  );
}
