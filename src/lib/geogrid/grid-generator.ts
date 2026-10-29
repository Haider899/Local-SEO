import { Coordinates, GridPoint } from './types';

/**
 * Approximate conversion constants:
 * 1 degree latitude ≈ 69.0 miles (111.0 km)
 * 1 degree longitude ≈ 69.0 * cos(latitude) miles
 */
export class GeoGridGenerator {
  static generateGrid(
    center: Coordinates,
    gridSize: 3 | 5 | 7 = 5,
    radiusMiles: number = 5
  ): GridPoint[] {
    const points: GridPoint[] = [];
    const halfGrid = Math.floor(gridSize / 2);
    
    // Step size in miles between neighboring points
    const stepMiles = radiusMiles / halfGrid;
    
    const latMilesPerDegree = 69.0;
    const radLat = (center.lat * Math.PI) / 180;
    const lngMilesPerDegree = Math.max(0.1, 69.0 * Math.cos(radLat));

    const stepLat = stepMiles / latMilesPerDegree;
    const stepLng = stepMiles / lngMilesPerDegree;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        // row offset from center (positive = North, negative = South)
        const rowOffset = halfGrid - row;
        // col offset from center (negative = West, positive = East)
        const colOffset = col - halfGrid;

        const pointLat = Number((center.lat + rowOffset * stepLat).toFixed(6));
        const pointLng = Number((center.lng + colOffset * stepLng).toFixed(6));

        const dist = this.haversineDistance(center.lat, center.lng, pointLat, pointLng);
        const direction = this.getDirection(rowOffset, colOffset);

        points.push({
          id: `pt_${row}_${col}`,
          row,
          col,
          lat: pointLat,
          lng: pointLng,
          rank: 0, // Will be filled by rank checker/scraper
          distanceMiles: Number(dist.toFixed(2)),
          direction,
        });
      }
    }

    return points;
  }

  private static getDirection(
    rowOffset: number,
    colOffset: number
  ): GridPoint['direction'] {
    if (rowOffset === 0 && colOffset === 0) return 'Center';
    if (rowOffset > 0 && colOffset === 0) return 'N';
    if (rowOffset > 0 && colOffset > 0) return 'NE';
    if (rowOffset === 0 && colOffset > 0) return 'E';
    if (rowOffset < 0 && colOffset > 0) return 'SE';
    if (rowOffset < 0 && colOffset === 0) return 'S';
    if (rowOffset < 0 && colOffset < 0) return 'SW';
    if (rowOffset === 0 && colOffset < 0) return 'W';
    return 'NW';
  }

  private static haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const toRad = (val: number) => (val * Math.PI) / 180;
    const R = 3958.8; // Earth radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
