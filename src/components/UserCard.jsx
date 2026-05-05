// tre inputfält: name, email, password
// knapp för sign up
// Lista alla användare
// Visa input i realtid
// Styla med CSS
// Validera input innan data sparas
// Knapp och funktion för Ta bort
// Använd localStorage för att spara användare även när sidan laddas om
// Använd useState för att hantera input och lista användare
// Använd useEffect för att spara till localStorage

import React, { useState, useEffect } from "react";

export default function UserCard() {
  // STYLING
  const userCardStyle = {
    border: "1px solid #00CED1",
    backgroundColor: "#f2ffff",
    fontFamily: "Century Gothic, sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#00CED1",
    padding: "15px",
    margin: "15px",
    borderRadius: "15px",
    textAlign: "center",
  };
  const previewStyle = {
    fontFamily: "Century Gothic, sans-serif",
    fontSize: "16px",
    padding: "10px",
    margin: "10px",
    textAlign: "left",
  };
  const userButtonStyle = {
    fontFamily: "Century Gothic, sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px",
    margin: "10px",
    borderRadius: "10px",
    backgroundColor: "#00CED1",
    color: "white",
    border: "#00CED1",
    cursor: "pointer",
  };
  const userSuggestionStyle = {
    border: "1px solid #00CED1",
    background: "#00CED1",
    color: "white",
    maxHeight: "150px",
    overflowY: "auto",
    marginBottom: "10px",
  };

  // STATES
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false); // State för att visa/dölja användarförslag
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    password: false,
  }); // State för att spåra om input-fält har "touched" (fått fokus och sedan tappat fokus)
  const [submitted, setSubmitted] = useState(false); // State för att spåra om formuläret har skickats (för att visa valideringsmeddelanden även efter submit)

  // LOCAL STORAGE + USE EFFECT
  // Hämta från localStorage när komponenten laddas
  // Lägger denna redan här - vi vill att befintlig data hämtas när sidan laddas
  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []); // Kör useEffect bara en gång när komponenten laddas
  // Spara till localStorage varje gång users ändras
  useEffect(() => {
    // Spara till localstorage
    localStorage.setItem("users", JSON.stringify(users)); // Spara users-objektet som strings i localStorage
  }, [users]); // Dependency array för att köra useEffect varje gång users (och relaterad data) ändras

  // Funktioner för EVENT relaterade till INPUT-FÄLT och SKICKA-KNAPP
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // VALIDERING AV INPUT
  const isUsernameValid = username.trim() !== "" && username.length >= 4;

  const isEmailValid = email.trim() !== "" && email.includes("@");

  const isPasswordValid = password.trim() !== "" && password.length >= 6;

  const isValidInput = isUsernameValid && isEmailValid && isPasswordValid;

  // Funktion för att LÄGGA TILL användare i listan
  const addUser = (e) => {
    e.preventDefault(); // Förhindrar att hela sidan laddas om när formuläret skickas
    if (isValidInput) {
      const newUser = { id: Date.now(), username, email, password };
      setUsers((prevUsers) => [...prevUsers, newUser]); // Lägg till newUser i users-arrayen
    }
    // Töm fälten efter submit
    setUsername("");
    setEmail("");
    setPassword("");
    // console.log("Formuläret skickades! Namn: ", username, "E-post: ", email);
    setTouched({
      username: false,
      email: false,
      password: false,
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000); // Visa "Formuläret skickades!" i 3 sekunder
  }; // Här kan en göra VAD EN VILL!! Visa, spara, skicka data till API, etc.

  // Funktion för att TA BORT användare från listan
  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id)); // Ta bort user med matchande id från users-arrayen
  };

  // RENDERING
  return (
    <form onSubmit={addUser} style={userCardStyle}>
      <h1>Registrering</h1>
      {/* Input - användarnamn */}
      <input
        // Stilsättning av input-fältet med validering och om fältet har "touched" eller formuläret har skickats (submitted) */}
        style={{
          ...userCardStyle,
          border:
            !isUsernameValid && touched.username
              ? "2px solid #8B0000"
              : "1px solid #00CED1",
          backgroundColor:
            !isUsernameValid && (touched.username || submitted)
              ? "#fff5ff"
              : "#f2ffff",
        }}
        // Inputfältets typ och bindning till username state
        type="text"
        value={username}
        placeholder="Skriv ditt namn"
        // Metoder för att hantera förändringar
        onChange={(e) => {
          handleUsernameChange(e);
          setShowSuggestions(true);
        }}
        // Metoder för att visa användarförslag när användaren skriver i input-fälten
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, username: true }));
          setTimeout(() => setShowSuggestions(false), 150);
        }}
      />
      {/* Felhantering */}
      {!isUsernameValid && (touched.username || submitted) && (
        <p style={{ color: "#8B0000", fontSize: "14px", margin: "5px 0" }}>
          Namn måste anges
        </p>
      )}
      {/* Input - e-post */}
      <input
        // Stilsättning av input-fältet med validering och om fältet har "touched" eller formuläret har skickats (submitted) */}
        style={{
          ...userCardStyle,
          border:
            !isEmailValid && touched.email
              ? "2px solid #8B0000"
              : "1px solid #00CED1",
          backgroundColor:
            (!isEmailValid && touched.email) || submitted
              ? "#fff5ff"
              : "#f2ffff",
        }}
        // Inputfältets typ och bindning till email state
        type="email"
        value={email}
        // Metoder för att hantera förändringar
        onChange={(e) => {
          handleEmailChange(e);
          setShowSuggestions(true);
        }}
        // Metoder för att visa användarförslag när användaren skriver i input-fälten
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => {
          setTouched((prev) => ({ ...prev, email: true }));
          setTimeout(() => setShowSuggestions(false), 150);
        }}
        placeholder="Skriv din e-postadress"
      />
      {/* Felhantering */}
      {!isEmailValid && (touched.email || submitted) && (
        <p style={{ color: "#8B0000", fontSize: "14px", margin: "5px 0" }}>
          Ange en giltig e-postadress
        </p>
      )}
      {/* Input - lösenord */}
      <input
        style={{
          ...userCardStyle,
          border:
            !isPasswordValid && touched.password
              ? "2px solid #8B0000"
              : "1px solid #00CED1",
          backgroundColor:
            (!isPasswordValid && touched.password) || submitted
              ? "#fff5ff"
              : "#f2ffff",
        }}
        type="password"
        value={password}
        onChange={handlePasswordChange}
        // Inga metoder för att visa användarförslag - av säkerhetsskäl
        placeholder="Ange lösenord"
      />
      {/* Felhantering */}
      {!isPasswordValid && (touched.password || submitted) && (
        <p style={{ color: "#8B0000", fontSize: "14px", margin: "5px 0" }}>
          Lösenord måste anges
        </p>
      )}
      {/* Förslag på användare */}
      {showSuggestions && users.length > 0 && (
        <div style={userSuggestionStyle}>
          {users.map((user, index) => (
            <div
              key={index}
              style={{ padding: "8px", cursor: "pointer" }}
              onClick={() => {
                setUsername(user.username);
                setEmail(user.email);
                setShowSuggestions(false);
              }}
            >
              {user.username} ({user.email})
            </div>
          ))}
        </div>
      )}
      {/* Förhandsvisning av inmatad info */}
      <div className="preview" style={previewStyle}>
        <h3>Förhandsvisning</h3>
        <p>Namn: {username}</p>
        <p>E-post: {email}</p>
        <p>Lösenord: {password}</p>
        <p>Om informationen är korrekt, klicka på Skicka!</p>
      </div>
      {/* Skicka-knapp */}
      <button
        className="register-btn"
        style={userButtonStyle}
        type="submit"
        disabled={!isValidInput}
      >
        Skicka
      </button>
      {/* LISTA över registrerade användare + TA BORT-knapp */}
      <h2>Registrerade användare</h2>
      {users.map((user, index) => (
        <div key={index} style={userCardStyle}>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
          <button
            className="delete-btn"
            style={userButtonStyle}
            type="reset"
            onClick={() => deleteUser(user.id)}
          >
            Ta bort
          </button>
        </div>
      ))}
    </form>
  );
}
