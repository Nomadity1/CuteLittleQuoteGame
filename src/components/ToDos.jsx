import React, { useState, useEffect } from "react";

// Titel: ToDos
// Sökfält input
// Visa resultat
export default function ToDos() {
  // useState för att hålla alla todos, filtrerade todos och sökfältets värde
  const [todos, setTodos] = useState([]); // Tom lista för alla todos
  const [filtered, setFiltered] = useState([]); // Tom lista för filtrerade todos
  const [search, setSearch] = useState(""); // Sökfält för string
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // useEffect för att hämta todos från API:et när komponenten laddas
  // useEffect tar två argument: en function (method) och en dependency array
  useEffect(() => {
    console.log("Hämtar ToDos...");
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Något gick fel med API-anropet"); // Om response inte är ok, kasta ett error
        }
        return response.json(); // .json() = metod som omvandlar svar från API:et till JavaScript-objekt
      })
      .then((data) => {
        setTodos(data); // Tilldela det hämtade todos till state-variabeln "todos"
        setFiltered(data); // Tilldela det hämtade todos till state-variabeln "filtered" (för att visa alla todos innan sökning)
        setLoading(false); // Sätt loading till false när data har hämtats
      })
      .catch((error) => {
        setError(error.message); // Sätt error state till error-meddelandet
        setLoading(false); // Sätt loading till false även om det blev ett error
      });
  }, []);
  // Tom dependency array eftersom vi bara vill att den kör en gång när komponenten laddas

  // STEG 2: useEffect för att filtrera todos varje gång search ändras
  useEffect(() => {
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(search.toLowerCase()),
    ); // search.toLowerCase är vår söksträng
    setFiltered(filteredTodos);
  }, [search, todos]);
  // Dependency array för att köra useEffect när search eller todos ändras

  // Felhantering
  if (loading) {
    return <p>Laddar...</p>;
  } // Om loading = true, visa "Laddar..." istället för data
  if (error) {
    return <p>Fel: {error}</p>;
  } // Om error inte är null, visa error-meddelandet istället för data

  return (
    <div>
      {/* Titel */}
      <h1>ToDos</h1>
      {/* Inputfält bunden till search state */}
      <input
        type="text"
        placeholder="Sök ToDos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Skriv ut alla todos som matchar sökfältet (filtered state) */}
      <ul>
        {filtered.map((todo) => (
          <div key={todo.id}>
            <h3>
              {todo.title} {todo.completed ? "✅" : "❌"}
            </h3>
          </div>
        ))}
      </ul>
    </div>
  );
}
