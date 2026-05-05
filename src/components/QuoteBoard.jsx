// CHILD-komponent till App.jsx
// PARENT-komponent till QuoteCard.jsx och QuoteFinal.jsx
// Uppgifter: Hhämtar citat från externt API,
// hanterar spel-logiken, state för citat och rundräkning, samt
// hanterar funktion för att spara vinnande citat till VÅRT EGET API
// Anropar QuoteCard (visa två citat genom att anropa två gånger)
// Anropar QuoteFinal (visa vinnande citat efter 5 rundor)

import React, { useState, useEffect } from "react";
import QuoteCard from "./QuoteCard";
import QuoteFinal from "./QuoteFinal";

// Huvudkomponent som hanterar spel-logiken, state och rendering
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

  // VARIABEL för max antal rundor
  let rounds = 5;

  // STATES
  const [quotes, setQuotes] = useState([]); // State array för att lagra hämtade citat från API:et
  const [currentQuotes, setCurrentQuotes] = useState([]); // State för att lagra två aktuella citat som visas i QuoteCard
  const [round, setRound] = useState(1); // State för att hålla reda på runda
  const [gameStatus, setGameStatus] = useState("ongoing"); // State för att avgöra om spelet pågår eller är avslutat
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL till EXTERNT API för att hämta citat
  const EXTERNAL_QUOTES_API_URL = "https://dummyjson.com/quotes/";

  // USE EFFECT-FUNKTION FÖR ATT HÄMTA CITAT FRÅN EXTERNT API NÄR KOMPONENTEN LADDAS
  useEffect(() => {
    console.log("Hämtar citat...");
    fetch(EXTERNAL_QUOTES_API_URL)
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

  // FUNKTION för att slumpa fram två citat från listan av hämtade citat
  function getRandomQuotes(quotes, count = 2) {
    return [...quotes].sort(() => 0.5 - Math.random()).slice(0, count);
  }

  // FUNKTION FÖR ATT HANTERA VAL AV CITAT
  async function handleSelected(selectedQuote) {
    try {
      await saveSelectedQuote(selectedQuote);
    } catch (saveError) {
      setError(saveError.message);
      return;
    }
    if (round === rounds) {
      setGameStatus("finished"); // Sätt gameStatus till "finished" för att visa vinnaren
      return;
    }
    // Hitta nytt citat att visa
    const remainingQuotes = quotes.filter(
      // Filtrera bort de citat som visas just nu från listan av tillgängliga citat
      (quote) =>
        !currentQuotes.some((currentQuote) => currentQuote.id === quote.id),
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
  // URL till VÅRT EGET API för att spara vinnande citat
  const BEST_QUOTES_API_URL = "http://localhost:3001/bestQuotes";

  // FUNKTION FÖR ATT SPARA VALT CITAT TILL VÅRT EGET API
  async function saveSelectedQuote(selectedQuote) {
    // Strippa id så json-server auto-tilldelar nytt id och undviker id-konflikter
    const { id: _id, ...quoteWithoutId } = selectedQuote;
    const response = await fetch(BEST_QUOTES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quoteWithoutId),
    });
    if (!response.ok) {
      throw new Error("Kunde inte spara valt citat");
    }
  }

  // FUNKTION FÖR ATT RADERA ALLA SPARADE CITAT FRÅN VÅRT EGET API
  async function clearSavedQuotes() {
    const response = await fetch(BEST_QUOTES_API_URL);
    if (!response.ok) {
      throw new Error("Kunde inte hämta sparade citat");
    }
    const savedQuotes = await response.json();
    await Promise.all(
      savedQuotes.map(async (quote) => {
        const deleteResponse = await fetch(
          `${BEST_QUOTES_API_URL}/${quote.id}`,
          {
            method: "DELETE",
          },
        );
        if (!deleteResponse.ok) {
          throw new Error("Kunde inte rensa sparade citat");
        }
      }),
    );
  }

  // FUNKTION FÖR ATT HÄMTA VINNANDE CITAT FRÅN VÅRT EGET API OCH VISA I QuoteFinal
  async function handleClearSavedQuotes() {
    try {
      await clearSavedQuotes();
      setError(null);
    } catch (clearError) {
      setError(clearError.message);
      throw clearError;
    }
  }

  // FUNKTION FÖR ATT STARTA OM SPELET (ÅTERSTÄLLA STATE)
  async function handleRestartGame() {
    try {
      setError(null);
      setGameStatus("ongoing");
      setRound(1);
      setCurrentQuotes(getRandomQuotes(quotes));
    } catch (restartError) {
      setError(restartError.message);
    }
  }

  // GENERELL FELHANTERING FÖR ALLA ASYNKRONA FUNKTIONER
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
          <QuoteFinal
            apiUrl={BEST_QUOTES_API_URL}
            onClearSavedQuotes={handleClearSavedQuotes}
            onRestartGame={handleRestartGame}
          />
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
