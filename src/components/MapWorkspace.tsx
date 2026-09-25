import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TerritoryCase, MonitoringStation, SpatialFeature } from '../types';
import { Layers, Compass, Satellite, Map as MapIcon, Crosshair, AlertCircle } from 'lucide-react';

interface MapWorkspaceProps {
  territory: TerritoryCase;
  selectedStation: MonitoringStation | null;
  onSelectStation: (station: MonitoringStation | null) => void;
  selectedFeature: SpatialFeature | null;
  onSelectFeature: (feature: SpatialFeature | null) => void;
}

type BasemapType = 'dark' | 'satellite' | 'positron';

export const MapWorkspace: React.FC<MapWorkspaceProps> = ({
  territory,
  selectedStation,
  onSelectStation,
  selectedFeature,
  onSelectFeature
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const [basemap, setBasemap] = useState<BasemapType>('dark');
  const [showStations, setShowStations] = useState(true);
  const [showSpatialFeatures, setShowSpatialFeatures] = useState(true);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [tileLoadError, setTileLoadError] = useState(false);

  // Basemap URLs
  const basemapUrls: Record<BasemapType, { url: string; attribution: string }> = {
    dark: {
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO &copy; OpenStreetMap'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri &mdash; Earthstar Geographics'
    },
    positron: {
      url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; CARTO &copy; OpenStreetMap'
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: territory.center,
        zoom: territory.zoom,
        zoomControl: false,
        attributionControl: true
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Feature group for overlays
      featureGroupRef.current = L.featureGroup().addTo(map);

      // Mousemove event for coordinates
      map.on('mousemove', (e) => {
        setCursorCoords({
          lat: Number(e.latlng.lat.toFixed(5)),
          lng: Number(e.latlng.lng.toFixed(5))
        });
      });

      map.on('mouseout', () => {
        setCursorCoords(null);
      });

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update territory view bounds when territory changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView(territory.center, territory.zoom, { animate: true });
  }, [territory.id]);

  // Update basemap as a complete layer so provider attribution always matches the active tiles.
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    const config = basemapUrls[basemap];
    const tileLayer = L.tileLayer(config.url, {
      maxZoom: 18,
      attribution: config.attribution
    });

    tileLayer.on('tileerror', () => setTileLoadError(true));
    tileLayer.on('tileload', () => setTileLoadError(false));
    tileLayer.addTo(map);
    tileLayerRef.current = tileLayer;
    setTileLoadError(false);
  }, [basemap]);

  // Render Overlays (Polygons & Stations)
  useEffect(() => {
    if (!mapInstanceRef.current || !featureGroupRef.current) return;

    featureGroupRef.current.clearLayers();

    // 1. Render Spatial Features (Polygons)
    if (showSpatialFeatures && territory.features) {
      territory.features.forEach((feat) => {
        const isMadrid = territory.id === 'madrid-hati';
        let fillColor = '#d97706';
        let strokeColor = '#b45309';

        if (isMadrid) {
          if (feat.category === 'heat_corridor') {
            fillColor = '#dc2626';
            strokeColor = '#b91c1c';
          } else if (feat.category === 'green_infrastructure' || feat.category === 'refuge_area') {
            fillColor = '#059669';
            strokeColor = '#047857';
          }
        } else {
          // Guadarrama
          if (feat.category === 'subalpine_zone') {
            fillColor = '#65a30d';
            strokeColor = '#4d7c0f';
          } else if (feat.category === 'trail_buffer') {
            fillColor = '#ea580c';
            strokeColor = '#c2410c';
          }
        }

        const isSelected = selectedFeature?.id === feat.id;

        const polygon = L.polygon(feat.coordinates, {
          color: isSelected ? '#ffffff' : strokeColor,
          weight: isSelected ? 2.5 : 1.5,
          opacity: 0.85,
          fillColor: fillColor,
          fillOpacity: isSelected ? 0.55 : 0.3
        });

        polygon.on('click', () => {
          onSelectFeature(feat);
          onSelectStation(null);
        });

        polygon.bindTooltip(
          `<div class="text-xs font-sans">
            <div class="font-semibold text-zinc-100">${feat.name}</div>
            <div class="text-[11px] text-zinc-400 font-mono mt-0.5">
              ${feat.properties.lstAnomalyC ? `Observed LST Δ: +${feat.properties.lstAnomalyC}°C (demo)` : ''}
              ${feat.properties.ndviDelta ? `NDVI Δ: ${feat.properties.ndviDelta} (demo)` : ''}
              ${feat.properties.shadeIndex ? ` · Est. Shade: ${feat.properties.shadeIndex}%` : ''}
            </div>
            <div class="text-[10px] text-zinc-400 font-mono mt-0.5">DEMONSTRATION GEOMETRY</div>
          </div>`,
          { className: 'leaflet-tooltip-dark', sticky: true }
        );

        featureGroupRef.current?.addLayer(polygon);
      });
    }

    // 2. Render published/reference points (for evidence cases such as HATI).
    if (showStations && territory.referencePoints) {
      territory.referencePoints.forEach((point) => {
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: 5,
          color: '#f59e0b',
          weight: 1.5,
          opacity: 0.95,
          fillColor: '#18181b',
          fillOpacity: 0.9
        });

        const metadata = Object.entries(point.metadata)
          .map(([key, value]) => `<div><span class="text-zinc-400">${key}:</span> <span class="text-zinc-200">${value}</span></div>`)
          .join('');

        marker.bindTooltip(
          `<div class="text-xs font-sans min-w-[180px]">
            <div class="font-semibold text-zinc-100">${point.name}</div>
            <div class="text-[11px] font-mono text-zinc-400">${point.code}</div>
            <div class="mt-1.5 border-t border-zinc-800 pt-1.5 text-[10px] font-mono">${metadata}</div>
            <div class="mt-1.5 text-[10px] text-emerald-300 font-mono">LOCKED PILOT REFERENCE ASSET</div>
          </div>`,
          { className: 'leaflet-tooltip-dark', sticky: true }
        );

        featureGroupRef.current?.addLayer(marker);
      });
    }

    // 3. Render In-Situ Stations (Markers)
    if (showStations && territory.stations) {
      territory.stations.forEach((station) => {
        const isSelected = selectedStation?.id === station.id;

        const iconHtml = `
          <div style="
            width: ${isSelected ? '24px' : '18px'};
            height: ${isSelected ? '24px' : '18px'};
            background-color: ${isSelected ? '#10b981' : '#27272a'};
            border: 2px solid ${isSelected ? '#ffffff' : '#34d399'};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 6px rgba(0,0,0,0.5);
            transition: all 0.15s ease;
          ">
            <div style="
              width: 5px;
              height: 5px;
              background-color: ${isSelected ? '#ffffff' : '#34d399'};
              border-radius: 50%;
            "></div>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-station-icon',
          iconSize: [isSelected ? 24 : 18, isSelected ? 24 : 18],
          iconAnchor: [isSelected ? 12 : 9, isSelected ? 12 : 9]
        });

        const marker = L.marker([station.lat, station.lng], { icon: customIcon });

        marker.on('click', () => {
          onSelectStation(station);
          onSelectFeature(null);
        });

        const readingsSummary = Object.entries(station.readings)
          .slice(0, 3)
          .map(([k, v]) => `<div><span class="text-zinc-400 capitalize">${k}:</span> <span class="font-mono text-zinc-200 font-semibold">${v}</span></div>`)
          .join('');

        marker.bindPopup(
          `<div class="p-2 text-xs font-sans min-w-[200px]">
            <div class="font-semibold text-zinc-100">${station.name}</div>
            <div class="text-[11px] font-mono text-zinc-400 mb-2">${station.code} · ${station.elevationMeters}m a.s.l.</div>
            <div class="border-t border-zinc-800 pt-2 space-y-1">
              ${readingsSummary}
            </div>
            <div class="mt-2 pt-1 border-t border-zinc-800 text-[10px] text-zinc-400 font-mono">
              Status: <span class="text-zinc-300 uppercase">${station.status}</span> · DEMONSTRATION PROXY
            </div>
          </div>`
        );

        featureGroupRef.current?.addLayer(marker);
      });
    }
  }, [territory.id, showStations, showSpatialFeatures, selectedStation, selectedFeature]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col">
      {/* Top Map Toolbar */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2">
        {/* Basemap Switcher */}
        <div className="flex items-center p-0.5 bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 rounded-md text-xs">
          <button
            onClick={() => setBasemap('dark')}
            className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${
              basemap === 'dark' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="CartoDB Dark Matter GIS Mode"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => setBasemap('satellite')}
            className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${
              basemap === 'satellite' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Satellite Imagery"
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>Satellite</span>
          </button>
          <button
            onClick={() => setBasemap('positron')}
            className={`px-2.5 py-1 rounded font-medium transition-colors flex items-center gap-1 ${
              basemap === 'positron' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200'
            }`}
            title="Positron Neutral Mode"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Positron</span>
          </button>
        </div>

        {/* Layer Toggles */}
        <div className="flex items-center p-0.5 bg-zinc-900/95 backdrop-blur-sm border border-zinc-800 rounded-md text-xs">
          {territory.features.length > 0 && (
            <button
              onClick={() => setShowSpatialFeatures(!showSpatialFeatures)}
              className={`px-2 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
                showSpatialFeatures ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-500 line-through'
              }`}
              title="Toggle Earth Observation Zonal Layers"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>NDVI Buffer Zone</span>
            </button>
          )}
          <button
            onClick={() => setShowStations(!showStations)}
            className={`px-2 py-1 rounded font-medium transition-colors flex items-center gap-1.5 ${
              showStations ? 'bg-zinc-800 text-zinc-200' : 'text-zinc-500 line-through'
            }`}
            title={territory.referencePoints?.length ? 'Toggle locked pilot study assets' : 'Toggle Sampling Locations'}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>
              {territory.referencePoints?.length
                ? `Study Assets (${territory.referencePoints.length})`
                : `Sampling Nodes (${territory.stations.length})`}
            </span>
          </button>
        </div>
      </div>

      {/* Top Right: Spatial evidence label */}
      <div className="absolute top-3 right-3 z-[400]">
        <div className="px-2.5 py-1 rounded bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/80 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${territory.referencePoints?.length ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
          <span>{territory.referencePoints?.length ? 'LOCKED PILOT ASSET LOCATIONS' : 'DEMONSTRATION GEOMETRY'}</span>
        </div>
      </div>

      {/* Fallback Warning if Tiles Fail to Load */}
      {tileLoadError && (
        <div className="absolute top-14 left-3 right-3 z-[400] p-2 bg-zinc-900/90 border border-zinc-700 rounded text-xs text-zinc-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Notice: Network connectivity to basemap tiles is limited. Vector geometry and spatial boundaries remain active.</span>
        </div>
      )}

      {/* Leaflet Map Canvas */}
      <div ref={mapContainerRef} className="w-full flex-1 z-0" />

      {/* Bottom Coordinates & Legend Bar */}
      <div className="bg-zinc-900/95 border-t border-zinc-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
        {/* Dynamic Coordinate Readout */}
        <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">PROJECTION:</span>
            <span className="text-zinc-300">WGS84 (EPSG:4326)</span>
          </div>
          <span className="text-zinc-700">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">CURSOR:</span>
            {cursorCoords ? (
              <span className="text-zinc-200 font-medium">
                {cursorCoords.lat}° N, {cursorCoords.lng}° W
              </span>
            ) : (
              <span className="text-zinc-400">Hover over map</span>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] font-mono">
          {territory.referencePoints?.length ? (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 inline-block border border-amber-400"></span>
              <span className="text-zinc-400">Published HATI Study Asset</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-orange-600/70 inline-block border border-orange-500"></span>
                <span className="text-zinc-400">Trail Buffer Zone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-lime-600/70 inline-block border border-lime-500"></span>
                <span className="text-zinc-400">Subalpine Scrub Zone</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block border border-white"></span>
                <span className="text-zinc-400">Sampling Node</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selected Entity Inspector Strip */}
      {(selectedStation || selectedFeature) && (
        <div className="bg-zinc-950 border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px] uppercase">
              {selectedStation ? 'Sampling Node Inspector' : 'Spatial Zone Inspector'}
            </span>
            <span className="font-semibold text-zinc-100">
              {selectedStation ? selectedStation.name : selectedFeature?.name}
            </span>
            <span className="text-zinc-400 font-mono">
              {selectedStation ? selectedStation.code : selectedFeature?.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {selectedStation && (
              <div className="flex items-center gap-3">
                {Object.entries(selectedStation.readings).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="text-zinc-400">
                    <span className="text-zinc-400 capitalize">{key}: </span>
                    <span className="text-zinc-200 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            )}
            {selectedFeature && (
              <div className="flex items-center gap-3">
                {selectedFeature.properties.lstAnomalyC && (
                  <span className="text-zinc-300">LST Δ: +{selectedFeature.properties.lstAnomalyC}°C</span>
                )}
                {selectedFeature.properties.ndviDelta && (
                  <span className="text-zinc-300">NDVI Δ: {selectedFeature.properties.ndviDelta}</span>
                )}
              </div>
            )}
            <button
              onClick={() => {
                onSelectStation(null);
                onSelectFeature(null);
              }}
              className="text-zinc-400 hover:text-zinc-200 text-xs px-1.5 py-0.5 hover:bg-zinc-800 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
