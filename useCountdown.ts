import { useEffect, useState } from 'react';
import moment from 'moment';

/**
 * It takes a target date, and returns an object with the time left until that date in days, hours,
 * minutes, and seconds.
 * @param _targetDate - The date you want to count down to.
 * @returns An object with the following properties:
 */
const useCountdown = (_expiryDate: number | string, _targetDate: number | string) => {
  const countDownDate = moment.utc(_targetDate).valueOf() // for server - in local it will show +4 hours
  const expiryDataTime = new Date(_expiryDate).getTime() // for server - in local it will show +4 hours
  
  const [countDown, setCountDown] = useState(
    //  (countDownDate + 60000) - expiryDataTime
     (expiryDataTime + 60000) - countDownDate
  );

  useEffect(() => {
    const interval = setInterval(() => {
      // setCountDown((countDownDate + 60000) - expiryDataTime );
        setCountDown((prevVal) => {
          if(!prevVal) return (expiryDataTime + 60000) - countDownDate
          // if(!prevVal) return (countDownDate + 60000) - expiryDataTime 
          return prevVal - 1000});
        }, 1000);   
        
    return () => clearInterval(interval);
  }, [countDownDate]);
  
return getReturnValues(countDown);
};

/**
 * It takes a number of milliseconds and returns an array of the number of days, hours, minutes, and
 * seconds that number of milliseconds represents.
 * @param countDown - The time left in milliseconds
 * @returns An array of the days, hours, minutes, and seconds.
 */
const getReturnValues = (countDown: number): number[] => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
