import { useRef } from "react"
import type {
  GeoJSONSource,
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  MapRef,
} from "react-map-gl"
import {
  Layer,
  NavigationControl,
  Map as ReactMapGlCluster,
  Source,
} from "react-map-gl"
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

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export const ClusterMap = ({ campgrounds }: Readonly<{ campgrounds: any }>) => {
  const mapRef = useRef<MapRef>(null)

  const onClick = (e: MapLayerMouseEvent) => {
    if (!e.features) return
    const feature = e.features[0] as Feature
    const clusterId = feature.properties.cluster_id
    if (mapRef.current === null) return
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
        if (err || mapRef.current === null) return
        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,
        })
      }
    )
  }

  return (
    <ReactMapGlCluster
      initialViewState={{ latitude: 52.67, longitude: -93.59, zoom: 3 }}
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
    </ReactMapGlCluster>
  )
}
