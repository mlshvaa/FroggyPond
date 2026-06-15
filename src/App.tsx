import { useState } from "react";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import "./App.css";

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // стартовый экран
  if (gameStarted === false) {
    return <StartScreen onStart={() => setGameStarted(true)} />;
  }

  return <GameScreen />;
}

export default App;
