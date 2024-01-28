import React, { useState } from 'react'
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

  const handleRouteSubmit = async() => {
    if (!Point ){
      TError("Please choice stop")
    }
    if(stopName.length<3){
      TError("Enter a valid stop name")
    }
    const formData = {
      'stop_name' : stopName,
      'lat' : Point.lat,
      'lon' : Point.lng
    }

    await axios.post(API_BASE_URL+'/bus/add', formData).then((res)=>{
      TSuccess("Successfully added")

    }).catch((err)=>{TError("Something went wrong! Please try again.")})
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
          
          <APIProvider apiKey={GOOGLE_MAP_API}>
            <div className='w-100 h-80' >
              <Map zoom={11} center={center} mapId={'7eded6b9224bb80'} onClick={(e) => {
                console.log(e.detail.latLng.lat);
                setPoint({ lat: e.detail ? e.detail.latLng.lat : null, lng: e.detail ? e.detail.latLng.lng : null })
              }}>
                <AdvancedMarker position={Point} >
                </AdvancedMarker>

                {/* {open && (
            <InfoWindow position={center} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )} */}
              </Map>
              <button onClick={handleRouteSubmit} class="mt-10 flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-600 hover:border-red-900 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                Sign Up
              </button>
            </div>
          </APIProvider>
        </div>

      </form>
    </>

  )
}

export default BusStop
