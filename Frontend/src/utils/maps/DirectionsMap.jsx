import React, { useState, memo} from 'react';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import isEqual from 'lodash/isEqual';
import { TInfo, TWarning } from '../../components/toastify/Toastify';


function DirectionsMap({origin, destination, waypoints}) {
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
          TInfo(`It is ${googleResponse.routes[0].legs[0].distance.text}`)
        } else {
          console.log('response: ', googleResponse)
        }
      } else {
        if (googleResponse.status === 'OK') {
          setResponse(() => googleResponse)
          TInfo(`It is ${googleResponse.routes[0].legs[0].distance.text}`)
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
      return false
  }
  else{
      return true
  }
}


export default memo(DirectionsMap, areEqual);