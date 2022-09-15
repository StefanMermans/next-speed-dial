import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./clock.module.css";

const TimeFormatter = Intl.DateTimeFormat("nl", {
  timeStyle: "short",
});

const DateFormatter = Intl.DateTimeFormat("nl", {
  month: "long",
  day: "numeric",
  weekday: "long",
});

export default function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate((date) => {
        const newDate = new Date();

        if (newDate.getUTCMinutes() === date.getUTCMinutes()) {
          return date;
        }

        return newDate;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log("render");

  return (
    <div
      className={classNames(
        styles.clock,
        "text-white flex-shrink-0 flex flex-col justify-end"
      )}
    >
      <div className="text-9xl font-thin">{TimeFormatter.format(date)}</div>
      <div className="text-4xl font-light">{DateFormatter.format(date)}</div>
    </div>
  );
}
