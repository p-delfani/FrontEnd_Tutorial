import React, {
  Profiler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [divStyle, setDivStyle] = useState({});
  const sectionRef = useRef();

  useLayoutEffect(() => {
    const randomValue = Math.floor(Math.random() * 500);

    for (let i = 0; i <= 100000000; i++) {
      if (i === 100000000) {
        setDivStyle({ paddingTop: `${randomValue}px` });
      }
    }
  }, [number]);

  const numberUpdateLogs = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime, interactions, 'Number Update');
  }

  return (
    <main className="App">
      <section ref={sectionRef} style={divStyle}>
        <Profiler id="Number-P-Tag" onRender={numberUpdateLogs}>
          <p>{number}</p>
        </Profiler>
        <div>
          <button onClick={() => setNumber((prevNumber) => prevNumber - 1)}>
            -
          </button>
          <button onClick={() => setNumber((prevNumber) => prevNumber + 1)}>
            +
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
