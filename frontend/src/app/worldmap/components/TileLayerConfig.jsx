/**
 * TileLayerConfig Component
 * Configures and manages the base tile layer for the map
 */

import { TileLayer } from 'react-leaflet';

/**
 * Available tile layer configurations
 */
export const TILE_LAYERS = {
  cartoVoyager: {
    name: 'Carto Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  },
  cartoPositron: {
    name: 'Carto Positron',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  },
  cartoDark: {
    name: 'Carto Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  },
  openStreetMap: {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abc',
    maxZoom: 19
  },
  stamenTerrain: {
    name: 'Stamen Terrain',
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    maxZoom: 18
  }
};

/**
 * Default tile layer configuration
 */
const DEFAULT_TILE_LAYER = TILE_LAYERS.cartoVoyager;

/**
 * TileLayerConfig Component
 * Renders the base tile layer for the map
 * 
 * @param {Object} props - Component props
 * @param {string} props.tileLayer - Name of the tile layer to use
 * @param {Object} props.customConfig - Custom tile layer configuration
 * @param {boolean} props.showAttribution - Whether to show attribution
 * @returns {JSX.Element} TileLayer component
 */
const TileLayerConfig = ({ 
  tileLayer = 'cartoVoyager', 
  customConfig = null,
  showAttribution = true 
}) => {
  // Get the tile layer configuration
  const config = customConfig || TILE_LAYERS[tileLayer] || DEFAULT_TILE_LAYER;

  return (
    <TileLayer
      url={config.url}
      attribution={showAttribution ? config.attribution : ''}
      subdomains={config.subdomains}
      maxZoom={config.maxZoom}
      // Performance optimizations
      updateWhenZooming={false}
      updateWhenIdle={true}
      keepBuffer={3}
      // Prevent tile loading issues
      noWrap={false}
      // Enable retina tiles for high-DPI displays
      detectRetina={true}
      // Smooth scrolling optimizations
      zoomOffset={0}
      tileSize={256}
      // Faster loading
      crossOrigin={true}
      // Smooth transitions
      opacity={1}
    />
  );
};

export default TileLayerConfig;


