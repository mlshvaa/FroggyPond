import { useEffect, useState } from "react";
import "./App.css";

const lilyPrice = 10;
const growthPrice = 1.5;
const liliesMax = 5;

const baseInterval = 20000;
const intervalFactor = 0.8;
const minInterval = 5000;

function App() {
  const [flies, setFlies] = useState<number>(0);
  const [isCatching, setIsCatching] = useState<boolean>(false);
  const [lilypads, setLilypads] = useState<number>(0);

  const fliesPerDrip = 1;

  const dripInterval = Math.max(
    minInterval,
    baseInterval * intervalFactor ** (lilypads - 1),
  );

  const nextLilyPrice = Math.round(lilyPrice * growthPrice ** lilypads);

  useEffect(() => {
    if (lilypads === 0) return;

    const intervalID = setInterval(() => {
      setFlies((prev) => prev + fliesPerDrip);
    }, dripInterval);

    return () => clearInterval(intervalID);
  }, [lilypads, dripInterval, fliesPerDrip]);

  const handleClick = () => {
    if (isCatching) return;
    setIsCatching(true);
    setTimeout(() => {
      setFlies((prev) => prev + 1);
      setIsCatching(false);
    }, 100);
  };

  const buyLily = () => {
    if (lilypads >= liliesMax)
      alert("Достигнуто максимальное количество кувшинок!");
    if (flies < nextLilyPrice) alert("Не хватает мух :(");
    setFlies((prev) => prev - nextLilyPrice);
    setLilypads((prev) => prev + 1);
  };

  return (
    <div>
      <h1>Froggy Pond</h1>
      <p>Мухи: {flies}</p>
      <button onClick={handleClick}>Поймать муху</button>

      {lilypads < liliesMax ? (
        <button onClick={buyLily} disabled={flies < nextLilyPrice}>
          Купить кувшинку ({nextLilyPrice} мух)
        </button>
      ) : (
        "Достигнуто максимальное количество кувшинок!"
      )}
    </div>
  );
}

export default App;
