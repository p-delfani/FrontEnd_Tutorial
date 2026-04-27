import React, { useEffect, useState } from "react";

export default function Test() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(title);
  }, [title]);

  const titleHandler = (e) => {
    setTitle(e.target.value); // Async
    
  };

  return (
    <div>
      <input type="text" value={title} onChange={titleHandler} />

      <h3>{title}</h3>
    </div>
  );
}
