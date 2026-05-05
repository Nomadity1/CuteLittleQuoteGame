import React, { useState, useEffect } from "react";

// VI anvnder för att hämta data från ett API (fejk-API:et JSONPlaceholder)
function UseEffectExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // Vi definierar useEffect här för att berätta när och
  // hur vi vill hämta data från API:et. useEffect körs
  // när komponenten laddas, och varje gång någon av de
  // variabler som står i dependency array ändras (i det
  // här fallet, ingen, eftersom dependency array är tom).
  useEffect(() => {
    // useEffect tar två argument:
    // en function (method) och en dependency array
    console.log("Komponenten laddar - hämtar data från API");
    // Kan ha async-await i useEffect
    fetch("https://jsonplaceholder.typicode.com/users/2")
      .then((response) => response.json()) // .json() = metod som omvandlar svar från API:et till JavaScript-objekt
      .then((user) => {
        setData(user); // Tilldelar det hämtade användarobjektet till state-variabeln "data"
        setLoading(false); // Sätter loading till false när data har hämtats
      });
  }, []); // Om dependency array är tom, körs useEffect bara en gång när komponenten laddas
  // Alternativet är att ange en variabel (t ex [count]), då körs useEffect varje gång den variabeln ändras
  // ... eller två variabler (t ex [count, name]), då körs useEffect varje gång någon av de variablerna ändras
  if (loading) {
    return <p>Laddar...</p>;
  } // Om loading = true, visa "Laddar..." istället för data

  return (
    <div>
      <h2>{data?.name}</h2>
      <p>{data?.email}</p>
    </div>
  );
}

export default UseEffectExample;

// useEffect används för att hantera biverkningar i en komponent, t.ex. API-anrop, timers
