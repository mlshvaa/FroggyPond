import { useEffect, useState } from "react";
import shopIcon from "../assets/images/objects/shop_icon.png";
import flyCounterPlate from "../assets/images/objects/fly_counter_plate.png";
import "./GameScreen.css";

const lilyPrice = 10;
const growthPrice = 1.5;
const liliesMax = 5;

const baseInterval = 20000;
const intervalFactor = 0.8;
const minInterval = 5000;

export function GameScreen() {
  const [flies, setFlies] = useState<number>(0);
  const [isCatching, setIsCatching] = useState<boolean>(false);
  const [lilypads, setLilypads] = useState<number>(0);

  // с какой скоростью начисляются мухи
  const fliesPerDrip = 1;

  const dripInterval = Math.max(
    minInterval,
    baseInterval * intervalFactor ** (lilypads - 1),
  );

  const nextLilyPrice = Math.round(lilyPrice * growthPrice ** lilypads);

  useEffect(() => {
    if (lilypads === 0) return;

    const intervalId = setInterval(() => {
      setFlies((prev) => prev + fliesPerDrip);
    }, dripInterval);

    return () => clearInterval(intervalId);
  }, [lilypads, dripInterval, fliesPerDrip]);

  const handleClick = () => {
    if (isCatching) return;
    setIsCatching(true);
    setTimeout(() => {
      setFlies((prev) => prev + 1);
      setIsCatching(false);
    }, 100);
  };

  // покупка кувшинки
  const buyLily = () => {
    if (lilypads >= liliesMax) {
      alert("Достигнуто максимальное количество кувшинок!");
      return;
    }
    if (flies < nextLilyPrice) {
      alert("Не хватает мух :(");
      return;
    }
    setFlies((prev) => prev - nextLilyPrice);
    setLilypads((prev) => prev + 1);
  };

  return (
    <div className="game-screen">
      <div className="game-icons">
        <div className="flies">
          <img
            src={flyCounterPlate}
            alt="табличка с подсчётом мух"
            className="fly-counter-plate"
          />
          <p className="fly-counter">{flies}</p>
        </div>
        <div className="shop">
          <img src={shopIcon} alt="иконка магазина" className="shop-icon" />
          <p>Shop</p>
        </div>
      </div>
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
