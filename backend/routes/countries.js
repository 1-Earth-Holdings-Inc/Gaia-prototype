const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();

/**
 * GET /api/countries
 * Serves the world countries GeoJSON data
 */
router.get('/', async (req, res) => {
  try {
    // Path to the world GeoJSON file in the frontend public directory
    const geoJsonPath = path.join(__dirname, '../../frontend/public/data/world.geojson');
    
    // Read the GeoJSON file
    const geoJsonData = await fs.readFile(geoJsonPath, 'utf8');
    const parsedData = JSON.parse(geoJsonData);
    
    // Validate that it's a proper GeoJSON FeatureCollection
    if (!parsedData.type || parsedData.type !== 'FeatureCollection') {
      return res.badRequest('Invalid GeoJSON format: Expected FeatureCollection');
    }
    
    if (!parsedData.features || !Array.isArray(parsedData.features)) {
      return res.badRequest('Invalid GeoJSON format: Missing or invalid features array');
    }
    
    // Log successful data retrieval
    console.log(`Successfully served world GeoJSON with ${parsedData.features.length} countries`);
    
    // Return the GeoJSON data with proper headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.success(parsedData, `World countries data retrieved successfully (${parsedData.features.length} countries)`);
    
  } catch (error) {
    console.error('Error serving world GeoJSON:', error);
    
    if (error.code === 'ENOENT') {
      return res.notFound('World GeoJSON file not found');
    }
    
    if (error instanceof SyntaxError) {
      return res.badRequest('Invalid JSON format in world GeoJSON file');
    }
    
    res.serverError('Failed to retrieve world countries data');
  }
});

/**
 * GET /api/countries/stats
 * Returns statistics about the world countries data
 */
router.get('/stats', async (req, res) => {
  try {
    const geoJsonPath = path.join(__dirname, '../../frontend/public/data/world.geojson');
    const geoJsonData = await fs.readFile(geoJsonPath, 'utf8');
    const parsedData = JSON.parse(geoJsonData);
    
    if (!parsedData.features || !Array.isArray(parsedData.features)) {
      return res.badRequest('Invalid GeoJSON format');
    }
    
    // Calculate statistics
    const stats = {
      totalCountries: parsedData.features.length,
      geometryTypes: {},
      properties: new Set(),
      lastModified: (await fs.stat(geoJsonPath)).mtime
    };
    
    // Analyze geometry types and properties
    parsedData.features.forEach(feature => {
      // Count geometry types
      const geomType = feature.geometry?.type || 'unknown';
      stats.geometryTypes[geomType] = (stats.geometryTypes[geomType] || 0) + 1;
      
      // Collect property names
      if (feature.properties) {
        Object.keys(feature.properties).forEach(prop => stats.properties.add(prop));
      }
    });
    
    stats.properties = Array.from(stats.properties);
    
    res.success(stats, 'World countries statistics retrieved successfully');
    
  } catch (error) {
    console.error('Error getting countries stats:', error);
    res.serverError('Failed to retrieve countries statistics');
  }
});

module.exports = router;
