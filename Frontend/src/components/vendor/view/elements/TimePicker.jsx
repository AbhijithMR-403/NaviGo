import React, { useEffect, useState } from 'react'
import moment from 'moment';


const TimePicker = ({setTime}) => {
  const [hour, setHour] = useState('12')
  const [minute, setMinute] = useState('5')
  useEffect(()=>{
    const fromTimeFormatted = moment().hours(hour).minutes(minute).seconds(0)
    setTime(fromTimeFormatted.format("HH:mm:ss"))
    const newSlot = {
      from_time: fromTimeFormatted.format("HH:mm:ss"),
      end_time: fromTimeFormatted.format("HH:mm:ss"),
    };
  },[hour,minute])
  return (
    <div className="mt-2 p-5 w-24 bg-white rounded-lg shadow-xl">
      <div className="flex">
        <select name="hours" defaultValue={hour} onChange={(e)=>setHour(e.target.value)} className="bg-transparent text-xl appearance-none outline-none">
          {[...Array(24)].map((res, ind) => <option key={ind} value={ind + 1}> {ind + 1} </option>
          )}
        </select>
        <span className="text-xl mr-3">:</span>
        <select name="minutes" defaultValue={minute} onChange={(e)=>setMinute(e.target.value)} className="bg-transparent text-xl appearance-none outline-none mr-4">
        {[...Array(60)].map((res, ind) => <option key={ind} value={ind}> {ind} </option>
          )}
        </select>
  </div>
</div>

  )
}

export default TimePicker