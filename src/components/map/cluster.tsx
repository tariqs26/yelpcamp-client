import { useRef } from "react"
import type {
  MapGeoJSONFeature,
  MapMouseEvent,
  MapRef,
} from "react-map-gl/mapbox"
import ReactMapGl, {
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl/mapbox"
import type { GeoJSONSource } from "mapbox-gl"
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layers"

import "mapbox-gl/dist/mapbox-gl.css"

type Feature = MapGeoJSONFeature & {
  properties?: { cluster_id: number }
  geometry: { coordinates: [number, number] }
}

type ClusterMapProps = Readonly<{
  campgrounds: {
    type: "FeatureCollection"
    features: {
      type: "Feature"
      properties: { id: string }
      geometry: {
        type: "Point"
        coordinates: [number, number]
      }
    }[]
  }
}>

export const ClusterMap = ({ campgrounds }: ClusterMapProps) => {
  const mapRef = useRef<MapRef>(null)

  const onClick = (e: MapMouseEvent) => {
    const features = mapRef.current?.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    }) as Feature[]
    const clusterId = features[0]?.properties.cluster_id
    if (!clusterId) return
    mapRef.current
      ?.getSource<GeoJSONSource>("campgrounds")
      ?.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err || mapRef.current === null) return
        mapRef.current.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom ?? undefined,
        })
      })
  }

  return (
    <ReactMapGl
      initialViewState={{ latitude: 52.67, longitude: -93.59, zoom: 3 }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={onClick}
      ref={mapRef}
      style={{
        height: "min(50vh, 400px)",
        marginBottom: "1rem",
        borderRadius: "calc(0.375rem - 1px)",
      }}>
      <NavigationControl />
      <Source
        id="campgrounds"
        type="geojson"
        data={campgrounds}
        cluster
        clusterMaxZoom={14}
        clusterRadius={50}>
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </ReactMapGl>
  )
}
