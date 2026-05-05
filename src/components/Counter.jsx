import React, { useState } from "react";

function Counter() {
  // let count = 0;
  const [count, setCount] = useState(0);
  // count är vår "GET" och setCount är vår "SET"
  // GET är READ-ONLY, SET är WRITE-ONLY

  // Fler exempel på useState:
  // const [name, setName] = useState("");
  // const [isVisible, setIsVisible] = useState(true);
  // const [items, setItems] = useState([]);
  // const [user, setUser] = useState({ name: "", age: 0 });
  // OBS: Objekt i JavaScript: { key: value } anges alltid mellan måsvingar
  // const [form, setForm] = useState({ name: "", email: "", password: "" });

  function incrementCount() {
    setCount(count + 1);
    console.log(count);
  }
  // Funktionen måste anropas i App.js

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={incrementCount}>1+</button>
    </div>
  );
}

export default Counter;

// function Counter() {
//   // let count = 0;
//   const [count, setCount] = useState(0);
//   // count är vår "GET" och setCount är vår "SET"
//   // GET är READ-ONLY, SET är WRITE-ONLY

//   // Fler exempel på useState:
//   // const [name, setName] = useState("");
//   // const [isVisible, setIsVisible] = useState(true);
//   // const [items, setItems] = useState([]);
//   // const [user, setUser] = useState({ name: "", age: 0 });
//   // OBS: Objekt i JavaScript: { key: value } anges alltid mellan måsvingar
//   // const [form, setForm] = useState({ name: "", email: "", password: "" });

// // STATE I KLASSKOMPONENT
// // class CounterClass extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //         count: 0,
// //     };
// //     // ...
// //     }
// //     render () {
// //         return (
// //             <div>
// //                 <h1>{this.state.count}</h1>
// //                 <button onClick={this.incrementCount}>1+</button>
// //             </div>
// //         );
// //     }
// //     export default CounterClass;
