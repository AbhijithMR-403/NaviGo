import React, { useEffect, useRef, useState } from 'react'
import { API_BASE_URL } from '../../../constant/api';
import {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Autocomplete, GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import { TError, TSuccess } from '../../toastify/Toastify';
const places = ["places"]

function BusStop() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `${import.meta.env.VITE_GOOGLE_MAP_API}`,
    libraries: places
  })

  const center = {
    lat: 9.2905715,
    lng: 76.6337262,
  };
  const [Point, setPoint] = useState(null)
  const [stopName, setstopName] = useState('')
  useEffect(() => {
    console.log(Point);
  }, [Point])

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
      'lon': Point.lng
    }

    await axios.post(API_BASE_URL + '/bus/add', formData).then((res) => {
      TSuccess("Successfully added")

    }).catch((err) => { TError("Something went wrong! Please try again.") })
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
    console.log(searchResult);
    if (searchResult != null) {
      const place = searchResult.getPlace();
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
      // console.log(place);
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
  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }


  return (
    <>
      <form>
        <div className='p-10 w-full'>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Stop name
            </label>
            <input value={stopName} onChange={(e) => setstopName(e.target.value)} class="shadow appearance-none border rounded sm:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" />
          </div>
          {isLoaded ? (
            <div className='relative'>
              <div className='absolute w-4 h-4 top-3 left-2 sm:left-1/3 mx-auto my-auto z-50' id="searchColumn ">
                {/* <h2>Search for place</h2> */}
                <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
                  <div className='relative inline'>

                  <input
                    className='rounded-lg w-48 sm:w-64 h-10 text-center'
                    type="text"
                    placeholder="Search "
                    style={{
                      boxSizing: `border-box`,
                      // border: `1px solid transparent`,
                      // width: `240px`,
                      // height: `32px`,
                      padding: `0 12px`,
                      // borderRadius: `3px`,
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
              </GoogleMap>
            </div>
          ) : <></>}

          <button onClick={handleRouteSubmit} class="mt-10 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-600 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            Add Stop
          </button>
        </div>

      </form>
    </>

  )
}

export default BusStop


