import React, { useState } from "react";

export default function MyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault(); // Förhindrar att hela sidan laddas om när formuläret skickas
    console.log("Formuläret skickades! Name: ", name, "Email: ", email);
    setName(""); // Tömmer input-fält efter submit
    setEmail(""); // Tömmer input-fält efter submit
  } // Här kan en göra VAD EN VILL!! Visa, spara, skicka data till API, etc.

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Skriv ditt namn"
      />
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Skriv din email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
