import React, { useEffect, useRef, useState } from 'react'
import { API_BASE_URL, GOOGLE_MAP_API } from '../../../constant/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useAutocomplete,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import axios from 'axios';
import { TError, TSuccess } from '../../toastify/Toastify';


function BusStop() {
  
  const center = {
    lat: 9.2905715,
    lng: 76.6337262,
  };
  const [Point, setPoint] = useState(null)
  const [stopName, setstopName] = useState('')
  useEffect(()=>{
    console.log('\n check this out\n');
    console.log(Point);
  },[Point])

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
  
  return (
    <>
      <form action="" method="post">
        <div className='p-10'>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
              Stop name 
            </label>
            <input value={stopName} onChange={(e) => setstopName(e.target.value)} class="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" />
          </div>
          <div>

          </div>

          <APIProvider apiKey={GOOGLE_MAP_API} libraries={['places']} >
          <label class="block text-gray-700 text-sm font-bold mb-2 mt-9" for="username">
              Stop Location
            </label>
            <div className='text-center mb-6'>
            <AutoComplete setPoint={setPoint} />
            </div>
            <div className='w-100 h-80' >

              <Map zoom={16} center={Point?Point:center} mapId={'7eded6b9224bb80'} onClick={(e) => {
                console.log(e.detail.latLng.lat);
                setPoint({ lat: e.detail ? e.detail.latLng.lat : null, lng: e.detail ? e.detail.latLng.lng : null })
              }}>

{/* <Marker position={{ lat: Point ? Point.lat : 51.5074, lng: Point ? Point.lng : -0.1278 }} */}
                <AdvancedMarker position={Point} >
                </AdvancedMarker>

                {/* {open && (
            <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )} */}
              </Map>
              <button onClick={handleRouteSubmit} class="mt-10 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-600 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Add Stop
              </button>
            </div>
          </APIProvider>
        </div>

      </form>
    </>

  )
}

export default BusStop



const AutoComplete = ({setPoint}) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    console.log(inputValue);
    handleSelect(inputValue)
  },[inputValue])



  const onPlaceChanged = place => {
    // console.log('asdasd', place);
    if (place) {
      setInputValue(place.formatted_address || place.name);
        }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };


  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged
  });

  const handleSelect = async (address) => {
    // setValue(address, false);
    // clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    console.log({ lat, lng });
    setPoint({ lat, lng });
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  return (
    // <input ref={inputRef} value={inputValue} onChange={handleInputChange} />
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input ref={inputRef} value={inputValue} onChange={handleInputChange} type="search" id="default-search" class="block w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-400 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." />
    </div>
  );
};