import { GoogleMap, InfoWindowF, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import React, { memo, useEffect, useState } from 'react'
import { UserAxios } from '../../components/api/api_instance'
import DirectionsMap from './DirectionsMap'
const GOOGLE_MAP_API = import.meta.env.VITE_GOOGLE_MAP_API


const libraries = ['places',]

function MapUsers({ PointA, PointB, dimension = {
    width: 'Auto',
    height: '400px'
} }) {
    
    const [stopNames, setStopNames] = useState([])
    const [PointACoordinate, setPointACoordinate] = useState('')
    const [PointBCoordinate, setPointBCoordinate] = useState('')

    const [center, setCenter] = useState({
        lat: 10.0765715,
        lng: 76.3237262,
    });

    // Fetching  all bus stops data
    useEffect(() => {
        if (PointA && PointB) {
            setPointACoordinate({ lat: PointA.lat, lng: PointA.lng })
            setPointBCoordinate({ lat: PointB.lat, lng: PointB.lng })
        }

        UserAxios.get('/bus/stop/list').then(res => {
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
            console.log("Error: " + err)
        });
    }, [PointA, PointB])

    // Custom icon for the marker
    const customMarker = {
        url: "/assets/Map/Pointers/bus-station34.png",
        scaledSize: { height: 30, width: 30 },
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${GOOGLE_MAP_API}`,
        libraries: libraries
    })

    const [selectedMarker, setSelectedMarker] = useState(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
        setInfoWindowOpen(true);
      };
      
      

    return (
        <div>
            {isLoaded ? (
                <div>

                    <GoogleMap
                        mapContainerStyle={dimension}
                        center={center}
                        options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                        }}
                        zoom={14}
                    >
                        {PointBCoordinate &&
                            <DirectionsMap origin={PointACoordinate} destination={PointBCoordinate} />}
                        {stopNames.map((data, index) => {
                            let pointer = { lat: data.lat, lng: data.lng }
                            return (
                                <div key={index}>
                                    <MarkerF
                                        key={data.lat + data.lng} position={pointer}
                                        icon={customMarker}
                                        value={'Location Marker info here!'}
                                        onClick={() => handleMarkerClick(data)}
                                    />
                                        {infoWindowOpen && selectedMarker &&
                                            (<InfoWindowF
                                                position={{lat: selectedMarker.lat, lng: selectedMarker.lng}}
                                                onCloseClick={() => {
                                                    setInfoWindowOpen(false), setSelectedMarker(null)}}
                                            >
                                                <div>
                                                    <h1>{selectedMarker.stop_name}</h1>
                                                </div>
                                            </InfoWindowF>)}
                                </div>
                            )
                        })}

                        {/* {Point && <MarkerF position={Point} />} */}
                    </GoogleMap>
                </div>
            ) : <></>}
        </div>
    )
}

function areEqual(prevProps, nextProps) {
    if (prevProps.PointA != nextProps.PointA || prevProps.PointB != nextProps.PointB) {
        return false
    }
    else {
        return true
    }
}
export default memo(MapUsers, areEqual)