import React, { useState} from 'react';
import { DirectionsRenderer, DirectionsService } from '@react-google-maps/api';



function DirectionsMap(props) {

  const { origin, destination } = props;
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
                origin,
                destination,
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


export default DirectionsMap;