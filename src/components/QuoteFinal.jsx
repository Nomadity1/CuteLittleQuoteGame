// CHILD-komponent till QuoteBoard.jsx
// Uppgifter: Presentera vinnande citat,
// hämta vinnande citat från VÅRT EGET API,
// hantera funktion för "Spela igen" och
// hantera funktion för "Rensa sparade citat"

import React, { useEffect, useState } from "react";

export default function QuoteFinal({
  apiUrl,
  onRestartGame,
  onClearSavedQuotes,
}) {
  // STYLING
  const quoteFinalStyle = {
    backgroundImage:
      'url("https://media.giphy.com/media/2V1MJzOCizr9u/giphy.gif")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#c9f9ea",
    textAlign: "center",
    padding: "24px",
    minHeight: "420px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  const quoteCardStyle = {
    border: "1px solid #c9f9ea",
    backgroundColor: "#c9f9ea",
    fontFamily: "Century Gothic, sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#66045b",
    textWrap: "wrap",
    minHeight: "200px",
    maxWidth: "300px",
    padding: "8px",
    margin: "15px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  };
  const buttonStyle = {
    fontFamily: "Century Gothic, sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 20px",
    backgroundColor: "#66045b",
    color: "#c9f9ea",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginTop: "20px",
  };
  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#c9f9ea",
    color: "#66045b",
    border: "1px solid #66045b",
    marginTop: "12px",
  };

  // STATES
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // USE EFFECT-FUNKTION FÖR ATT HÄMTA VINNANDE CITAT FRÅN VÅRT EGET API NÄR KOMPONENTEN LADDAS
  useEffect(() => {
    let isActive = true;
    async function fetchWinningQuote() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Kunde inte hämta vinnande citat");
        }
        const savedQuotes = await response.json();
        if (isActive) {
          // Ta det sista sparade citatet (senast valt)
          setQuote(savedQuotes[savedQuotes.length - 1] ?? null);
        }
      } catch (fetchError) {
        if (isActive) {
          setError(fetchError.message);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }
    fetchWinningQuote();
    return () => {
      isActive = false;
    };
  }, [apiUrl]);

  // FUNKTION FÖR ATT STARTA OM SPELET (ÅTERSTÄLLA STATE)
  async function handleRestart() {
    try {
      await onRestartGame();
    } catch (restartError) {
      setError(restartError.message);
    }
  }
  // FUNKTION FÖR ATT RENSA SPARADE CITAT
  async function handleClear() {
    try {
      await onClearSavedQuotes();
      setQuote(null);
      setError(null);
    } catch (clearError) {
      setError(clearError.message);
    }
  }

  // GENERELL FELHANTERING FÖR ALLA ASYNKRONA FUNKTIONER
  if (loading) {
    return <p>Laddar vinnande citat...</p>;
  }
  if (error) {
    return <p>Fel: {error}</p>;
  }
  if (!quote) {
    return (
      <article className="quoteFinal" style={quoteFinalStyle}>
        <h2>Vinnande citat</h2>
        <div className="quoteCard" style={quoteCardStyle}>
          <p>Det finns inga sparade citat just nu.</p>
          <button onClick={handleRestart} style={buttonStyle}>
            Spela igen!
          </button>
        </div>
      </article>
    );
  }

  // RENDERING AV VINNANDE CITAT
  return (
    <article className="quoteFinal" style={quoteFinalStyle}>
      <h2>Vinnande citat</h2>
      <div className="quoteCard" style={quoteCardStyle}>
        <p className="quoteParagraph">{quote.quote}</p>
        <p className="quoteAuthor">{quote.author}</p>
        <button onClick={handleRestart} style={buttonStyle}>
          Spela igen!
        </button>
        <button onClick={handleClear} style={secondaryButtonStyle}>
          Rensa sparade citat
        </button>
      </div>
    </article>
  );
}
