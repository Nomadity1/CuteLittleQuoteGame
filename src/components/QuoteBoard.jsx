// Child-komponent till App.jsx
// Hanterar spel-logiken, state för citat och rundräkning
// ...samt hämtar citat från API
// Anropar QuoteCard (visa två citat genom att anropa två gånger)
// Anropar QuoteFinal (visa vinnande citat efter 5 rundor)

import React, { useState, useEffect } from "react";
import QuoteCard from "./QuoteCard";
import QuoteFinal from "./QuoteFinal";

export default function QuoteBoard() {
  // STYLING
  const quoteBoardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#66045b",
    color: "#c9f9ea",
    fontFamily: "Century Gothic, sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
  };
  const quoteBoardContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  };
  // Variabel för max antal rundor
  let rounds = 5;
  // STATES
  const [quotes, setQuotes] = useState([]); // State array för att lagra hämtade citat från API:et
  const [currentQuotes, setCurrentQuotes] = useState([]); // State för att lagra två aktuella citat som visas i QuoteCard
  const [round, setRound] = useState(1); // State för att hålla reda på runda
  const [winnerQuote, setWinnerQuote] = useState(null); // State för att lagra det vinnande citatet som visas i QuoteFinal
  const [gameStatus, setGameStatus] = useState("ongoing"); // State för att avgöra
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function handleSelected(selectedQuote) {
    if (round === rounds) {
      setWinnerQuote(selectedQuote); // Sätt det vinnande citatet när sista rundan är över
      setGameStatus("finished"); // Sätt gameStatus till "finished" för att visa vinnaren
      return;
    }
    // Hitta nytt citat att visa
    const remainingQuotes = quotes.filter(
      // Filtrera bort det valda citatet från listan av tillgängliga citat
      (quote) => quote.id !== currentQuotes.id,
    );
    // Slumpa index för första citatet
    const randomIndex = Math.floor(Math.random() * remainingQuotes.length);
    // Hämta det nya citatet baserat på det slumpade indexet
    const newQuote = remainingQuotes[randomIndex];
    // Tilldela citat (behåll vinnande citat och lägg till nytt citat)
    setCurrentQuotes([selectedQuote, newQuote]);
    // Räkna upp rundan
    setRound((prev) => prev + 1);
  }

  // useEffect för att hämta (alla) citat från API:et när komponenten laddas
  useEffect(() => {
    console.log("Hämtar citat...");
    fetch("https://dummyjson.com/quotes/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Saknar koppling till API med citat"); // Om response inte är ok, kasta ett error
        }
        return response.json(); // .json() = metod som omvandlar svar från API:et till JavaScript-objekt
      })
      .then((data) => {
        setQuotes(data.quotes); // Tilldela hämtade citat till state-variabeln "quotes"
        // välj slumpmässigt
        const shuffled = data.quotes.sort(() => 0.5 - Math.random());
        setCurrentQuotes(shuffled.slice(0, 2));
        setLoading(false); // Sätt loading till false när data har hämtats
      })
      .catch((error) => {
        setError(error.message); // Sätt error state till error-meddelandet
        setLoading(false); // Sätt loading till false även om det blev ett error
      });
  }, []); // Tom dependency array eftersom vi bara vill att den kör en gång när komponenten laddas

  // Felhantering
  if (loading) {
    return <p>Laddar...</p>;
  } // Om loading = true, visa "Laddar..." istället för data
  if (error) {
    return <p>Fel: {error}</p>;
  } // Om error inte är null, visa error-meddelandet istället för data

  // RENDERING
  return (
    <div className="quoteBoard" style={quoteBoardStyle}>
      {gameStatus === "finished" ? (
        <div className="quoteFinal">
          <QuoteFinal quote={winnerQuote} />
        </div>
      ) : (
        <>
          <h1>Quote Wars</h1>
          <h3>Tap your favourite!</h3>
          {/* behållare för citaten */}
          <div className="quoteBoardContainer" style={quoteBoardContainerStyle}>
            {/* citat-kort */}
            <div className="quoteCard">
              {currentQuotes.map((quote) => (
                <QuoteCard
                  key={quote.id}
                  quote={quote}
                  onSelected={() => handleSelected(quote)}
                />
              ))}
            </div>
          </div>
          {/* rundräknare */}
          <p>
            Round: {round} / {rounds}
          </p>
        </>
      )}
    </div>
  );
}
