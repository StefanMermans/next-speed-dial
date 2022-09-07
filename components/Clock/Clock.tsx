import {useEffect, useState} from 'react';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const timeString = `${(hours < 10 ? '0' : '') + hours}:${
    (minutes < 10 ? '0' : '') + minutes
  }`;
  const clockContent = `${DAYS[time.getDay()]}, ${time.getDate()} ${
    MONTHS[time.getMonth()]
  } `;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='text-white flex-shrink-0 flex flex-col justify-end'>
      <div className='text-9xl font-thin'>{timeString}</div>
      <div className='text-4xl font-light'>{clockContent}</div>
    </div>
  );
}
