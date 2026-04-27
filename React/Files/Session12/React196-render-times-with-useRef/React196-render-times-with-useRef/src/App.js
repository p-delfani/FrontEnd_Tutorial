import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [title, setTitle] = useState("");
  // const [rendersCount, setRendersCount] = useState(1)
  const rendersCount = useRef(1) // {current: 1}

  useEffect(() => {
    rendersCount.current = rendersCount.current + 1
  })

  
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <h3>Input Value: {title}</h3>
      <h3>Render Counts: {rendersCount.current}</h3>
    </div>
  );
}
