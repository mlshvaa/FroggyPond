import "./StartScreen.css";
import namePlate from "../assets/images/objects/name_plate_icon.png";

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      <img
        src={namePlate}
        alt="табличка с названием игры"
        className="name-plate"
      />
      <p className="press-to-start" onClick={onStart}>
        Press to start!
      </p>
    </div>
  );
}
