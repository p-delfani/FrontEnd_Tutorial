import Chart from "./components/Chart/Chart";
import Header from "./components/header";
import Summary from "./components/summary";

function App() {
  return (
    <div id="client">
      <main className="content">
        <Header />
        <Summary />

        <Chart />
      </main>
      <div id="background"></div>
    </div>
  );
}

export default App;
