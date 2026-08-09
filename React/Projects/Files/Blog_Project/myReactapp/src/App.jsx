import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";

function App() {
  const [temp, setTemp] = useState(10);

  const increaseTemp = () => {
    setTemp(temp + 1);
  };

  const decreaseTemp = () => {
    setTemp(temp - 1);
  };

  return (
    <section id="wrapper" className={temp > 15 ? "too-warm" : "too-cold"}>
      <header></header>
      <main id="main" className="">
        <p id="temp">{temp}C</p>
        <div id="buttons">
          <Button id="decrease" clickHandler={decreaseTemp}>
            Decrease
          </Button>

          <Button id="increase" clickHandler={increaseTemp}>
            Increase
          </Button>
        </div>
      </main>
      <footer></footer>
      <div id="bg-bolor"></div>
    </section>
  );
}

export default App;
