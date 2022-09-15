import { Player } from "../models/Player";
import { useState, useRef, useEffect } from "react";
import { Colors } from "../models/Colors";
interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

function Timer({ currentPlayer, restart }: TimerProps) {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  function handleRestart() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div className="timer">
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Black player - {blackTime}</h2>
      <h2>White player - {whiteTime}</h2>
    </div>
  );
}

export default Timer;
