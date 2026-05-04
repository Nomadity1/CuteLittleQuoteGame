// Visa vinnar-vy efter sista rundan

import React from "react";

export default function QuoteFinal({ quote }) {
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

  const onRestart = () => {
    window.location.reload(); // Laddar om sidan för att starta om spelet
  };

  if (!quote) {
    return null;
  }

  return (
    <article className="quoteFinal" style={quoteFinalStyle}>
      <h2>Vinnande citat</h2>
      <div className="quoteCard" style={quoteCardStyle}>
        <p className="quoteParagraph">{quote.quote}</p>
        <p className="quoteAuthor">{quote.author}</p>
        <button onClick={onRestart} style={buttonStyle}>
          Spela igen!
        </button>
      </div>
    </article>
  );
}
