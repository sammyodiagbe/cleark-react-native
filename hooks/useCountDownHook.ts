import {
  differenceInMinutes,
  differenceInSeconds,
  isBefore,
  isPast,
} from "date-fns";
import { useCallback, useEffect, useState } from "react";
export default function useCountDownHook(
  date: string | Date | null,
  callback?: () => void
) {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    updateDate();
  }, [date]);
  const updateDate = useCallback(() => {
    if (!date) return;
    const now = new Date(Date.now());
    const dt = new Date(date);

    const minutes = differenceInMinutes(dt, now) % 60;
    const seconds = differenceInSeconds(dt, now) % 60;

    setMinutes(minutes);
    setSeconds(seconds);
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (date && isPast(new Date(date))) {
        clearInterval(interval);
        if (callback) {
          callback();
        }
        return;
      }
      updateDate();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [updateDate]);
  return { minutes, seconds };
}
