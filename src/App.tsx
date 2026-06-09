import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const [flies, setFlies] = useState<number>(0);
  const [isCatching, setIsCatching] = useState<boolean>(false);

  const handleClick = () => {
    if (isCatching) return;

    setIsCatching(true);
    setTimeout(() => {
      setFlies((prevFliesCount) => prevFliesCount + 1);
      setIsCatching(false);
    }, 1000);
  };

  return (
    <div>
      <h1>Froggy Pond</h1>
      <p>Мухи: {flies}</p>
      <button onClick={handleClick}>Поймать муху</button>
    </div>
  );
}

export default App;
