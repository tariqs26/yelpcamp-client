import { useRef } from "react"
import {
  Map,
  Source,
  Layer,
  MapLayerMouseEvent,
  NavigationControl,
  type MapRef,
  type GeoJSONSource,
  type MapGeoJSONFeature,
} from "react-map-gl"

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers"

import "mapbox-gl/dist/mapbox-gl.css"

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

type Feature = MapGeoJSONFeature & {
  properties?: {
    cluster_id: number
  }
  geometry: {
    coordinates: [number, number]
  }
}

export default function ClusterMap({ campgrounds }: { campgrounds: any }) {
  const mapRef = useRef<MapRef>(null)

  const onClick = (e: MapLayerMouseEvent) => {
    if (!e.features) return
    const feature = e.features[0] as Feature
    if (!feature.properties) return
    const clusterId = feature.properties.cluster_id
    if (!mapRef.current) return
    const mapboxSource = mapRef.current.getSource(
      "campgrounds"
    ) as unknown as GeoJSONSource & {
      getClusterExpansionZoom: (
        clusterId: number,
        callback: (err: any, zoom: number) => void
      ) => void
    }
    mapboxSource.getClusterExpansionZoom(
      clusterId,
      (err: any, zoom: number) => {
        if (err || !mapRef.current) return
        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,
        })
      }
    )
  }

  return (
    <Map
      initialViewState={{
        latitude: 52.67,
        longitude: -93.59,
        zoom: 3,
      }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={[clusterLayer.id as unknown as string]}
      onClick={onClick}
      ref={mapRef}
      style={{
        height: "min(50vh, 400px)",
        width: "100%",
        marginBottom: "1rem",
        borderRadius: "calc(0.375rem - 1px)",
      }}
    >
      <NavigationControl />
      <Source
        id="campgrounds"
        type="geojson"
        data={campgrounds}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  )
}
