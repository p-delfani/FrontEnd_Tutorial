import React from "react";
import "./App.css";

class App extends React.Component {

  constructor () {
    super()

    this.state = {

    }
  }

  componentDidUpdate () {
    
  }

  render() {

    return (
      <div className="app-wrap">
        <header>
          <input type="text" autocomplete="off" className="search-box" placeholder="Search for a city..." />
        </header>
        <main>
          <section className="location">
            <div className="city">Northampton, GB</div>
            <div className="date">Thursday 10 January 2020</div>
          </section>
          <div className="current">
            <div className="temp">15<span>°c</span></div>
            <div className="weather">Sunny</div>
            <div className="hi-low">13°c / 16°c</div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
