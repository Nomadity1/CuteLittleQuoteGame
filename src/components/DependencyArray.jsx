import React, { useState, useEffect } from "react";

function DependencyArray() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  // UseEffect (Vad ska hända?), [Vilket state ska kollas])
  useEffect(() => {
    console.log("useEffect för count ändrades till: ", count);
  }, [count]); // useEffect körs varje gång count ändras
  useEffect(() => {
    console.log("useEffect för name ändrades till: ", name);
  }, [name]); // useEffect körs varje gång name ändras
  useEffect(() => {
    console.log("Count eller name ändrades: ", count, name);
  }, [count, name]); // useEffect körs varje gång count eller name ändras
  // MEN useEffect körs ALLTID EN GÅNG NÄR KOMPONENTEN LADDAS, OAVSETT DEPENDENCY ARRAY
  // OM DEPENDENCY ARRAY ÄR TOM, KÖRS useEffect BARA EN GÅNG NÄR KOMPONENTEN LADDAS
  return (
    <div>
      {/* Knapp för count */}
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <input
        type="text"
        value={name}
        placeholder="Skriv ditt namn"
        onChange={(e) => setName(e.target.value)}
        // <input>.value används för att hämta värdet från input-fältet
      />
      {/* onChange-eventet används för att uppdatera name varje gång användaren skriver i input-fältet */}
    </div>
  );
}

export default DependencyArray;
