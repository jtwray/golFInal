import { useEffect, useRef } from "react";

export const useAniFrame = (aniCallback, interval) => {
  const requestRef = useRef(null);
  const startTimeRef = useRef(0);
  const callbackRef = useRef(aniCallback);
  const intervalRef = useRef(interval);

  callbackRef.current = aniCallback;
  intervalRef.current = interval;

  const animateRecursively = (timestamp) => {
    if (timestamp - startTimeRef.current >= intervalRef.current) {
      callbackRef.current();
      startTimeRef.current = timestamp;
    }
    requestRef.current = requestAnimationFrame(animateRecursively);
  };

  const step = () => callbackRef.current();
  const start = () => {
    if (requestRef.current === null) {
      startTimeRef.current = 0;
      requestRef.current = requestAnimationFrame(animateRecursively);
    }
  };
  const stop = () => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  useEffect(() => () => {
    if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
  }, []);

  return [step, start, stop];
};
