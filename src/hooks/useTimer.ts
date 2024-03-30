import { useEffect, useState } from "react";

const useTimer = (): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return [timer, setTimer];
};

export default useTimer;
