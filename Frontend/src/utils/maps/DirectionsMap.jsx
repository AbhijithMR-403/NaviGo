import React, { useState, memo} from 'react';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';



function DirectionsMap({direction_map}) {
  console.log(direction_map, 'kkkkkkkkkk\n\n');
  const { origin, destination, waypoints} = direction_map;
  console.log(origin, destination);
  console.log('\n\n\n way point :\n\n', waypoints);
  const [response, setResponse] = useState(null);

  const options = {
    // styles: mapStyle,
    disableDefaultUI: true
  }



  const directionsCallback = (googleResponse) => {
    if (googleResponse) {
      if(response) {
        if (googleResponse.status === 'OK' && googleResponse.routes.overview_polyline !== response.routes.overview_polyline) {
          setResponse(() => googleResponse)
        } else {
          console.log('response: ', googleResponse)
        }
      } else {
        if (googleResponse.status === 'OK') {
          setResponse(() => googleResponse)
        } else {
          console.log('response: ', googleResponse)
        }
      }
    } 
  }

  return (
    <div>
        <>
          {destination !== '' && origin !== '' && (
            <DirectionsService 
              options={{
                origin:origin,
                waypoints: waypoints,
                destination:destination,
                travelMode: 'DRIVING'
              }}
              callback={directionsCallback}
            />
          )}

          {response !== null && (
            <DirectionsRenderer 
              options={{
                directions: response
              }}
            />
          )}
        </>
    </div>
  );
}


export default memo(DirectionsMap);