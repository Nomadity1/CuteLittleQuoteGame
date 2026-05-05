import React from "react";

function Person(props) {
  return (
    <div>
      <h2>Namn: {props.name}</h2>
      <p>Ålder: {props.age}</p>
      <button onClick={HandleRemove}>Ta bort</button>
    </div>
  );
  function HandleRemove() {
    props.onRemove(props.name);
  }
}

export default Person;
