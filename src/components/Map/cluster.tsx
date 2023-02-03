import React, { useRef } from 'react';
import {
  Map,
  Source,
  Layer,
  MapLayerMouseEvent,
  NavigationControl,
} from 'react-map-gl';
import type { MapRef, GeoJSONSource } from 'react-map-gl';

import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from './layers';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default function ClusterMap({ campgrounds }: { campgrounds: any }) {
  const mapRef = useRef<MapRef>(null);

  const onClick = (e: MapLayerMouseEvent) => {
    if (!e.features) return;
    const feature = e.features[0];
    if (!feature.properties) return;
    const clusterId = feature.properties.cluster_id;
    if (!mapRef.current) return;
    const mapboxSource = mapRef.current.getSource(
      'campgrounds'
    ) as GeoJSONSource;
    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err || !mapRef.current) return;
      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 500,
      });
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: 52.67,
        longitude: -93.59,
        zoom: 3,
      }}
      mapStyle='mapbox://styles/mapbox/dark-v9'
      mapboxAccessToken={MAPBOX_TOKEN}
      interactiveLayerIds={[clusterLayer.id as unknown as string]}
      onClick={onClick}
      ref={mapRef}
      style={{ height: '400px', width: '100%', marginBottom: '1rem' }}
    >
        <NavigationControl />
      <Source
        id='campgrounds'
        type='geojson'
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
  );
}
