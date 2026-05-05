import React from "react";

function MyComponent() {
  const myStyle = {
    color: "white",
    backgroundColor: "forestgreen",
    padding: "10px",
    borderRadius: "20px",
    fontSize: "20px",
  };

  return (
    <>
      <h1 style={myStyle}>Hej, jag är MyComponent!</h1>
    </>
  );
}

export default MyComponent;
