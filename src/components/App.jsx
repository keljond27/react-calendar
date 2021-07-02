import React from "react";
import "semantic-ui-css/semantic.min.css";
import "../style.css"

import Calendar from "./Calendar/Calendar";

class App extends React.Component {
  render() {
    return (
      <Calendar />
    )
  }
}

export default App