import React from "react";

// Kan skicka in props när vi inte har alldeles för många olika props
function Greeting(props) {
  return (
    <div>
      <h2>
        Välkommen {props.name}, {props.email}!
      </h2>
    </div>
  );
}

// // Skriver den som en klass i stället
// class Greeting extends React.Component {
//   render() {
//     return (
//       <div>
//         <h2>
//           Välkommen {this.props.name}, {this.props.email}!
//         </h2>
//       </div>
//     );
//   }
// }

export default Greeting;
