import { useEffect, useState } from "react";
import { HHMMSSFromMilliseconds } from "../../../utils/helpers";

function Countdown({ onTimeUp }) {
  const [duration, setDuration] = useState(300);

  useEffect(() => {
    if (duration === 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setDuration(duration - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [duration]);

  return <div>{HHMMSSFromMilliseconds(duration * 1000)}</div>;
}

export default Countdown;
