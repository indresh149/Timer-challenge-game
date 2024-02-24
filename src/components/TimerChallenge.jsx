import React, { useState, useRef } from "react";
import ResultModal from "./ResultModal";

//let timer;

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  //   const [timerStarted, setTimerStarted] = useState(false);
  //   const [timerExpired, setTimerExpired] = useState(false);

  const [timeRemianing, setTimeRemaining] = useState(targetTime * 1000);

  const timerActive = timeRemianing > 0 && timeRemianing < targetTime * 1000;

  //   function handleStart() {
  //     timer.current = setTimeout(() => {
  //       setTimerExpired(true);
  //        // dialog.current.showModal();
  //          dialog.current.open();
  //     }, targetTime * 1000);

  //     setTimerStarted(true);
  //   }

  if (timeRemianing <= 0) {
    clearInterval(timer.current);
   // setTimeRemaining(targetTime * 1000);
    dialog.current.open();
  }

  function handleReset(){
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemianing) => prevTimeRemianing - 10);
    }, 10);

    //setTimerStarted(true);
  }

  //   function handleStop() {
  //     clearTimeout(timer.current);
  //   }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remaimingTime={timeRemianing}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>

        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerActive ? handleStop : handleStart}>
            {timerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerActive ? "active" : undefined}>
          {timerActive ? "Time is running.." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
