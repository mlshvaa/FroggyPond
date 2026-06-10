import "./StartScreen.css";

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen" onClick={onStart}>
      <p>Нажми на экран, чтобы начать!</p>
    </div>
  );
}
