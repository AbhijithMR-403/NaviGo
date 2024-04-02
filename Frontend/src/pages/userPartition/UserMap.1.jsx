import React, { useEffect, useState } from 'react';
import Map from '../../utils/maps/Map';

export function UserMap() {
    const [mapHeight, setMapHeight] = useState(window.innerHeight * 0.9);

    useEffect(() => {
        const handleResize = () => {
            setMapHeight(window.innerHeight * 0.8);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
            <nav>
                <div className='bg-white h-full w-48'>

                </div>
            </nav>
            <div className='mt-20 w-full'>
                <Map dimension={{ width: 'Auto', height: mapHeight + 'px' }} />
            </div>
        </>
    );
}
