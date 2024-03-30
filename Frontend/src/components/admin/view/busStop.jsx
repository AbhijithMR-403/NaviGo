import React, { useEffect, useState } from 'react'
import {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Autocomplete, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import { TError, TSuccess } from '../../toastify/Toastify';
import { AdminBusAxios } from '../../api/api_instance';
const places = ["places"]

function BusStop() {
  const [StopNames, setStopNames] = useState([])
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_API}`,
    libraries: places
  })

  const [center, setCenter] = useState({
    lat: 9.2905715,
    lng: 76.6337262,
  });
  const [Point, setPoint] = useState(null)
  const [stopName, setStopName] = useState('')

  // Fetching  all bus stops data
  useEffect(() => {
    const token = localStorage.getItem('access');

    MarkPoint()
  }, [])

  const MarkPoint = () => {
    AdminBusAxios.get('/bus/stop/list').then(res => {
      const bus_stop_length = res.data.length
      setStopNames(res.data)
      let lat = 0
      let lng = 0;
      res.data.forEach((val) => {
        lat += val.lat
        lng += val.lng
      })
      setCenter({
        lat: lat / bus_stop_length,
        lng: lng / bus_stop_length,
      })

    }).catch((err) => {
      if(err.response.status  == 401){
        window.location.reload();
    }
      console.log("Error: " + err)
    });
  }

  const handleRouteSubmit = async () => {
    if (!Point) {
      TError("Please choice stop")
      return
    }
    if (stopName.length < 3) {
      TError("Enter a valid stop name")
      return
    }
    const formData = {
      'stop_name': stopName,
      'lat': Point.lat,
      'lng': Point.lng
    }

    await AdminBusAxios.post('/bus/stop/add', formData).then((res) => {
      TSuccess("Successfully added")
      setStopName('')
      MarkPoint()
    }).catch((err) => {
      TError("Something went wrong! Please try again.")
    })
  }


  const setCoordinate = (event) => {
    setPoint({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }



  //  ? For Searching purpose

  const [searchResult, setSearchResult] = useState("Result: none");

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      getGeocode({ address: name }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        setPoint({ lat, lng })
        console.log("📍 Coordinates: ", { lat, lng });
      }).catch((err) => console.log(err))

      console.log(`Name: ${name}`);
      console.log(`Business Status: ${status}`);
      console.log(`Formatted Address: ${formattedAddress}`);
    } else {
      alert("Please enter text");
    }
  }
  const customMarker = {
    url: "/assets/Map/Pointers/bus-station34.png",
    scaledSize: { height: 30, width: 30 },
  };

  return (
    <>
      <form>
        <div className='p-10 w-full'>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Stop name
            </label>
            <input value={stopName} onChange={(e) => setStopName(e.target.value)} className="shadow appearance-none border rounded sm:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" />
          </div>
          {isLoaded ? (
            <div className='relative'>
              <div className='absolute w-4 h-4 top-3 left-2 sm:left-1/3 mx-auto my-auto z-50' id="searchColumn ">
                <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                  <div className='relative inline'>

                    <input
                      className='rounded-lg w-48 sm:w-64 h-10 text-center'
                      type="text"
                      placeholder="Search "
                      style={{
                        boxSizing: `border-box`,
                        padding: `0 12px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`
                      }}
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/735px-Magnifying_glass_icon.svg.png"
                      className='w-5 h-5 left-3'
                      // alt="Search"
                      style={{ position: 'absolute', top: '60%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                    />
                  </div>

                </Autocomplete>
              </div>

              <GoogleMap
                mapContainerStyle={{
                  width: 'Auto',
                  height: '400px'
                }}
                onClick={setCoordinate}
                center={Point ? Point : center}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                }}
                zoom={15}
              >

                {Point && <MarkerF position={Point} />}
                {StopNames.map((data, index) => {
                  let pointer = { lat: data.lat, lng: data.lng }

                  console.log(data.lat, data.lng);
                  return (<MarkerF key={index} position={pointer}
                    icon={customMarker}
                  />)
                })}
              </GoogleMap>
            </div>
          ) : <></>}

          <button onClick={handleRouteSubmit} className="mt-10 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-600 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            Add Stop
          </button>
        </div>

      </form>
    </>

  )
}

export default BusStop


