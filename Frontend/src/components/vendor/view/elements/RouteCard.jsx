import React from 'react'
import { Link } from "react-router-dom";

const RouteCard= ({ Waypoint, validateSetChosen }) => {
  // Calculate the number of filled stars and the remaining fractional part
  return (
    <Link
      to=""
      className="flex flex-col items-center p-1 mb-2 bg-gray-300 border rounded-xl shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
    >

      <div className="flex flex-col justify-between p-2 leading-normal" onClick={()=>{validateSetChosen(Waypoint)}}>
        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
          {Waypoint.length} waypoint
        </h5>
        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900">
          {Waypoint.length == 1 && (Waypoint[0].stop_name)}
          {Waypoint.length == 2 && (`${Waypoint[0].stop_name} -- ${Waypoint[1].stop_name}`)}
          {Waypoint.length == 3 && (`${Waypoint[0].stop_name} -- ${Waypoint[1].stop_name} -- ${Waypoint[2].stop_name}`)}
          {Waypoint.length == 0 && 'No way points'}
          {Waypoint.length >3 && Waypoint.length < 6 && `${Waypoint[Math.round(Waypoint.length/2) +1].stop_name} -- ${Waypoint[Math.round(Waypoint.length/2)].stop_name} -- ${Waypoint[Math.round(Waypoint.length/2) - 1].stop_name}`}
          {Waypoint.length >=6 && `${Waypoint[Math.round(Waypoint.length/2) +2].stop_name} -- ${Waypoint[Math.round(Waypoint.length/2)].stop_name} -- ${Waypoint[Math.round(Waypoint.length/2) - 2].stop_name}`}
        </h5>
        
        
        <div className="flex flex-col md:flex-row mb-2">
        <button className="btn ml-0 mt-2 md:ml-2 md:mt-0">View Route</button>
        </div>
        
      </div>
    </Link>
  );
};

export default RouteCard

