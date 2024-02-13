import React, { useState, memo} from 'react';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import isEqual from 'lodash/isEqual';


function DirectionsMap({origin, destination, waypoints}) {
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
        if (googleResponse.status === 'OK' && googleResponse.routes[0].overview_polyline !== response.routes[0].overview_polyline) {
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
function areEqual(prevProps, nextProps){
  if (prevProps.origin != nextProps.origin || prevProps.destination != nextProps.destination || prevProps.waypoints != nextProps.waypoints)
  {
    console.log('inside false statement');
      return false
  }
  else{
    console.log('inside true statement if it needs not rendered');
      return true
  }
}


export default memo(DirectionsMap, areEqual);