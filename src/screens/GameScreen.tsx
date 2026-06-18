import { useEffect, useState } from "react";
import shopIcon from "../assets/images/objects/shop_icon.png";
import flyCounterPlate from "../assets/images/objects/fly_counter_plate.png";
import frogEyesOpen from "../assets/images/objects/default_frog_eyes_open.png";
import frogEyesClosed from "../assets/images/objects/default_frog_eyes_closed.png";
import fishCounterPlate from "../assets/images/objects/fish_counter_plate.png";
import "./GameScreen.css";

const blinkImages = [frogEyesOpen, frogEyesClosed];

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
  const [currentImg, setCurrentImg] = useState<number>(0);

  // с какой скоростью начисляются мухи
  const fliesPerDrip = 1;

  const dripInterval = Math.max(
    minInterval,
    baseInterval * intervalFactor ** (lilypads - 1),
  );

  const nextLilyPrice = Math.round(lilyPrice * growthPrice ** lilypads);

  // моргание лягушки
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const nextBlink = () => {
      const eyesOpen = 1500 + Math.random() * 2500;

      timeoutId = setTimeout(() => {
        setCurrentImg(1);

        timeoutId = setTimeout(() => {
          setCurrentImg(0);
          nextBlink();
        }, 280);
      }, eyesOpen);
    };

    nextBlink();

    return () => clearInterval(timeoutId);
  }, []);

  // начисление мух
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
        <div className="fish">
          <img
            src={fishCounterPlate}
            alt="табличка с подсчётом рыб"
            className="fish-counter-plate"
          />
        </div>
        <div className="shop">
          <img src={shopIcon} alt="иконка магазина" className="shop-icon" />
          <p>Shop</p>
        </div>
      </div>
      <div className="blinking-frog-default">
        <img
          src={blinkImages[currentImg]}
          alt="анимация моргающей лягушки"
          onClick={handleClick}
        />
      </div>
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
