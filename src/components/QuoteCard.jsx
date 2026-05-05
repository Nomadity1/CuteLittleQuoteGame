// CHILD-komponent till QuoteBoard.jsx
// uppgift: presentera ett citat

import React from "react";

export default function QuoteCard({ quote, onSelected }) {
  // STYLING
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
    padding: "0px",
    margin: "15px",
    borderRadius: "15px",
    textAlign: "center",
  };

  // RENDERING AV CITAT-KORT
  return (
    <article className="quoteCard" style={quoteCardStyle}>
      <button
        className="quoteButton"
        type="submit"
        style={quoteCardStyle}
        onClick={onSelected}
        key={quote.id}
      >
        <p className="quoteParagraph">{quote.quote}</p>
        <p className="quoteAuthor">{quote.author}</p>
      </button>
    </article>
  );
}
