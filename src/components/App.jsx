import React from "react";
import "semantic-ui-css/semantic.min.css";
import "../style.css";

import Calendar from "./Calendar/Calendar";

let markedDates = [{ date: [2021, 7, 15], color: "#E9AAA3" }];

class App extends React.Component {
  state = {
    selected: [2021, 7, 16],
  };

  setDateSelected = (value) => {
    this.setState({ selected: value });
  };

  render() {
    return (
      <Calendar
        defaultSelected={this.state.selected}
        locateDate={[2021, 9, 9]}
        markedDates={markedDates}
        markToday={[true, "lightgreen"]}
        setDateSelected={this.setDateSelected}
      />
    );
  }
}

export default App;
