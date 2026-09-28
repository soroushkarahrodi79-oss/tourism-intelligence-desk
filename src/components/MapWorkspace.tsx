import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { TerritoryCase, MonitoringStation, SpatialFeature } from '../types';
import { Layers, Compass, Satellite, Map as MapIcon, Crosshair, AlertCircle } from 'lucide-react';
import { useLocale } from '../i18n/LocaleProvider';

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
  const { locale, t } = useLocale();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const [basemap, setBasemap] = useState<BasemapType>('dark');
  const [showStations, setShowStations] = useState(true);
  const [showSpatialFeatures, setShowSpatialFeatures] = useState(true);
  const [cursorCoords, setCursorCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [tileLoadError, setTileLoadError] = useState(false);

  // CARTO requires an API key for external basemap use.
  // The key is injected at build time by GitHub Actions and restricted by CARTO
  // to the GitHub Pages host. It is intentionally never hard-coded in the repo.
  const cartoBasemapKey = import.meta.env.VITE_CARTO_BASEMAP_KEY?.trim();

  const cartoRasterUrl = (style: 'dark_all' | 'light_all') => {
    const base = `https://basemaps.cartocdn.com/rastertiles/${style}/{z}/{x}/{y}{r}.png`;
    return cartoBasemapKey ? `${base}?key=${encodeURIComponent(cartoBasemapKey)}` : base;
  };

  // Basemap URLs
  const basemapUrls: Record<BasemapType, { url: string; attribution: string }> = {
    dark: {
      url: cartoRasterUrl('dark_all'),
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        '&copy; <a href="https://carto.com/attribution/">CARTO</a>'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri &mdash; Earthstar Geographics'
    },
    positron: {
      url: cartoRasterUrl('light_all'),
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        '&copy; <a href="https://carto.com/attribution/">CARTO</a>'
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
              ${feat.properties.lstAnomalyC ? `${t('map.tooltipObservedLst')}: +${feat.properties.lstAnomalyC}°C (demo)` : ''}
              ${feat.properties.ndviDelta ? `${t('map.tooltipNdvi')}: ${feat.properties.ndviDelta} (demo)` : ''}
              ${feat.properties.shadeIndex ? ` · ${t('map.tooltipEstShade')}: ${feat.properties.shadeIndex}%` : ''}
            </div>
            <div class="text-[10px] text-zinc-400 font-mono mt-0.5">${t('map.tooltipDemonstrationGeometry')}</div>
          </div>`,
          { className: 'leaflet-tooltip-dark', sticky: true }
        );

        featureGroupRef.current?.addLayer(polygon);
      });
    }

    // 2. Render published/reference points (for evidence cases such as HATI).
    if (showStations && territory.referencePoints) {
      territory.referencePoints.forEach((point) => {
        const referenceColor = territory.id === 'madrid-hati' ? '#f59e0b' : '#34d399';
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: 5,
          color: referenceColor,
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
            <div class="mt-1.5 text-[10px] text-emerald-300 font-mono">${territory.id === 'madrid-hati' ? t('map.tooltipLockedPilotAsset') : t('map.tooltipRealCampaignAsset')}</div>
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
            <div class="text-[11px] font-mono text-zinc-400 mb-2">${station.code} · ${station.elevationMeters}${t('map.popupMetersAsl')}</div>
            <div class="border-t border-zinc-800 pt-2 space-y-1">
              ${readingsSummary}
            </div>
            <div class="mt-2 pt-1 border-t border-zinc-800 text-[10px] text-zinc-400 font-mono">
              ${t('map.popupStatus')} <span class="text-zinc-300 uppercase">${station.status}</span> · ${t('map.popupDemonstrationProxy')}
            </div>
          </div>`
        );

        featureGroupRef.current?.addLayer(marker);
      });
    }
  }, [territory.id, showStations, showSpatialFeatures, selectedStation, selectedFeature, locale]);

  const spatialChip =
    'bg-spatial/85 backdrop-blur-sm border border-white/15 text-white/90';
  const tabBase =
    'px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5';

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] rounded-2xl overflow-hidden border border-hairline shadow-[var(--shadow-card)] bg-spatial flex flex-col">
      {/* Top toolbar */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center gap-2">
        {/* Basemap switcher */}
        <div className={`flex items-center p-0.5 rounded-lg text-xs ${spatialChip}`}>
          <button
            onClick={() => setBasemap('dark')}
            className={`${tabBase} ${basemap === 'dark' ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'}`}
            title={t('map.darkTitle')}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>{t('map.dark')}</span>
          </button>
          <button
            onClick={() => setBasemap('satellite')}
            className={`${tabBase} ${basemap === 'satellite' ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'}`}
            title={t('map.satelliteTitle')}
          >
            <Satellite className="w-3.5 h-3.5" />
            <span>{t('map.satellite')}</span>
          </button>
          <button
            onClick={() => setBasemap('positron')}
            className={`${tabBase} ${basemap === 'positron' ? 'bg-white/15 text-white' : 'text-white/60 hover:text-white'}`}
            title={t('map.lightTitle')}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t('map.light')}</span>
          </button>
        </div>

        {/* Layer toggles */}
        <div className={`flex items-center p-0.5 rounded-lg text-xs ${spatialChip}`}>
          {territory.features.length > 0 && (
            <button
              onClick={() => setShowSpatialFeatures(!showSpatialFeatures)}
              className={`${tabBase} ${showSpatialFeatures ? 'bg-white/15 text-white' : 'text-white/45 line-through'}`}
              title={t('map.ndviBufferZoneTitle')}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t('map.ndviBufferZone')}</span>
            </button>
          )}
          <button
            onClick={() => setShowStations(!showStations)}
            className={`${tabBase} ${showStations ? 'bg-white/15 text-white' : 'text-white/45 line-through'}`}
            title={
              territory.referencePoints?.length
                ? territory.id === 'madrid-hati'
                  ? t('map.studyAssetsToggleHati')
                  : t('map.studyAssetsToggleSnto')
                : t('map.studyAssetsToggleGeneric')
            }
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>
              {territory.referencePoints?.length
                ? t('map.studyAssetsLabel').replace('{n}', String(territory.referencePoints.length))
                : t('map.samplingNodesLabel').replace('{n}', String(territory.stations.length))}
            </span>
          </button>
        </div>

        {/* Spatial evidence label */}
        <div className={`ml-auto px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 ${spatialChip}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${territory.referencePoints?.length ? 'bg-snto' : 'bg-hati'}`} />
          <span>
            {territory.referencePoints?.length
              ? territory.id === 'madrid-hati'
                ? t('map.lockedPilotAssetLocations')
                : t('map.realCampaignAssets')
              : t('map.demonstrationGeometry')}
          </span>
        </div>
      </div>

      {/* Tile fallback warning */}
      {tileLoadError && (
        <div className="absolute top-16 left-3 right-3 z-[400] p-2.5 rounded-lg bg-spatial/90 border border-white/15 text-xs text-white/85 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-hati shrink-0" />
          <span>{t('map.tileConnectivityWarning')}</span>
        </div>
      )}

      {/* Leaflet canvas */}
      <div ref={mapContainerRef} className="w-full flex-1 z-0" />

      {/* Bottom coordinates & legend */}
      <div className="bg-spatial border-t border-white/10 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
        <div className="flex items-center gap-3 font-mono text-[11px] text-white/55">
          <span>
            <span className="text-white/45">{t('map.projection')} </span>
            <span className="text-white/80">WGS84 (EPSG:4326)</span>
          </span>
          <span className="text-white/20">·</span>
          <span>
            <span className="text-white/45">{t('map.cursor')} </span>
            {cursorCoords ? (
              <span className="text-white/90 font-medium">
                {cursorCoords.lat}° N, {cursorCoords.lng}° W
              </span>
            ) : (
              <span className="text-white/45">{t('map.hoverOverMap')}</span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-white/60">
          {territory.referencePoints?.length ? (
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full bg-spatial inline-block border ${
                territory.id === 'madrid-hati' ? 'border-hati' : 'border-snto'
              }`} />
              <span>{territory.id === 'madrid-hati' ? t('map.legendHatiAsset') : t('map.legendSntoAsset')}</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-orange-500/70 inline-block border border-orange-400" />
                <span>{t('map.legendTrailBuffer')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-lime-500/70 inline-block border border-lime-400" />
                <span>{t('map.legendSubalpineZone')}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block border border-white" />
                <span>{t('map.legendSamplingNode')}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Selected entity inspector */}
      {(selectedStation || selectedFeature) && (
        <div className="bg-[#0a1215] border-t border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded-md bg-white/10 text-white/70 font-mono text-[10px]">
              {selectedStation ? t('map.samplingNode') : t('map.spatialZone')}
            </span>
            <span className="font-semibold text-white">
              {selectedStation ? selectedStation.name : selectedFeature?.name}
            </span>
            <span className="text-white/55 font-mono">
              {selectedStation ? selectedStation.code : selectedFeature?.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {selectedStation && (
              <div className="flex items-center gap-3">
                {Object.entries(selectedStation.readings).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="text-white/55">
                    <span className="capitalize">{key}: </span>
                    <span className="text-white/90 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            )}
            {selectedFeature && (
              <div className="flex items-center gap-3 text-white/80">
                {selectedFeature.properties.lstAnomalyC && (
                  <span>LST Δ: +{selectedFeature.properties.lstAnomalyC}°C</span>
                )}
                {selectedFeature.properties.ndviDelta && (
                  <span>NDVI Δ: {selectedFeature.properties.ndviDelta}</span>
                )}
              </div>
            )}
            <button
              onClick={() => {
                onSelectStation(null);
                onSelectFeature(null);
              }}
              className="text-white/60 hover:text-white text-xs px-2 py-0.5 hover:bg-white/10 rounded-md"
            >
              {t('map.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
