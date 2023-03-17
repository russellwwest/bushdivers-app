import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { Layer, Source, useMap } from 'react-map-gl'
import { selectedContractAtom } from '../../state/contract.state'

export const SelectedContractRoute = () => {
  const [selectedContract] = useAtom(selectedContractAtom)
  const { current: map } = useMap()
  const [routeData, setRouteData] = useState(null)
  useEffect(() => {
    console.log(selectedContract)
    if (selectedContract !== null) {
      const depLngLat = [selectedContract.dep_airport.lon, selectedContract.dep_airport.lat]
      const arrLngLat = [selectedContract.arr_airport.lon, selectedContract.arr_airport.lat]
      map.fitBounds([depLngLat, arrLngLat], { padding: { top: 100, bottom: 100, right: 100, left: 100 } })
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [depLngLat, arrLngLat]
        }
      }
      setRouteData(geojson)
    }
  }, [selectedContract])
  return (
    <>
      {selectedContract && routeData && (
        <Source id="routeData" type="geojson" data={routeData}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              'line-join': 'round',
              'line-cap': 'round'
            }}
            paint={{
              'line-color': '#F97316',
              'line-width': 1
            }}
          />
        </Source>
      )}
    </>
  )
}
