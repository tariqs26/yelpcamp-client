import type { LayerProps } from "react-map-gl"

export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "campgrounds",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      10,
      "#2196f3",
      30,
      "#3f51b5",
    ],
    "circle-radius": ["step", ["get", "point_count"], 15, 10, 20, 30, 40],
  },
}

export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "campgrounds",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
}

export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "circle",
  source: "campgrounds",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
}
