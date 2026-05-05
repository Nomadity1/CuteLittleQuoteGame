// INTERGALACTIK-ÖVNING
// FUNKTIONELL KOMPONENT
import React, { useState } from "react";
import SpaceShip from "./SpaceShip";

export default function SpaceOut() {
  // Variabel för objekt
  const [spaceships, setSpaceships] = useState([
    { id: 1, name: "Millennium Falcon", speed: 1050 },
    { id: 2, name: "Naboo N-1 Starfighter", speed: 920 },
    { id: 3, name: "TIE Interceptor", speed: 1200 },
  ]);

  const logSpeed = (selectedShip) => {
    console.log(
      `${selectedShip.name} har en maxhastighet på ${selectedShip.speed} km/h!`,
    );
    // Kopia av listan
    let updatedSpaceshipList = spaceships.filter(
      (ship) => ship !== selectedShip,
    );

    // FLytta valt överst i listan
    updatedSpaceshipList.unshift(selectedShip);

    // Uppdatera STATE
    setSpaceships(updatedSpaceshipList);
  };
  // RENDERING
  return (
    <div>
      {/* Listar rymdskepp */}
      <h1>Intergalactic</h1>
      {spaceships.map((ship) => (
        <SpaceShip key={ship.id} ship={ship} logSpeed={logSpeed} />
      ))}
    </div>
  );
}
