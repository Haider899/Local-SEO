import { Coordinates, GridPoint, GeoGridScan } from './types';
import { GeoGridGenerator } from './grid-generator';

export class GeoGridRankService {
  /**
   * Executes or simulates a ranking check across the geo-grid.
   * Can plug into real SERP API or isolated scraper worker as per Section 2.5 of documentation.
   */
  static async executeScan(params: {
    clientId: string;
    businessName: string;
    keyword: string;
    center: Coordinates;
    gridSize?: 3 | 5 | 7;
    radiusMiles?: number;
  }): Promise<GeoGridScan> {
    const gridSize = params.gridSize || 5;
    const radiusMiles = params.radiusMiles || 5;
    const points = GeoGridGenerator.generateGrid(params.center, gridSize, radiusMiles);

    let totalRank = 0;
    let topThreeCount = 0;

    // Evaluate each grid point
    for (const point of points) {
      // Distance decay model: Businesses rank highest close to center, decay with distance
      // with slight directional variance (e.g. stronger in South, weaker in North)
      const distDecay = Math.floor(point.distanceMiles * 2.5);
      const directionalBias = point.direction.includes('N') ? 4 : point.direction.includes('S') ? -1 : 1;
      const baseRandom = Math.floor(Math.random() * 3);
      
      let rank = Math.max(1, Math.min(21, 1 + distDecay + directionalBias + baseRandom));
      if (point.direction === 'Center') rank = 1;

      point.rank = rank;
      totalRank += rank;
      if (rank <= 3) topThreeCount++;

      // Top competitor simulation when rank is > 3
      if (rank > 3) {
        point.topCompetitor = {
          name: `${params.keyword.split(' ')[0] || 'Local'} Authority Specialists`,
          reviewsCount: Math.floor(80 + Math.random() * 150),
          rating: 4.8,
        };
      }
    }

    const averageRank = Number((totalRank / points.length).toFixed(1));
    const shareOfVoicePercent = Math.round((topThreeCount / points.length) * 100);

    const zoneBreakdown = this.calculateZoneBreakdown(points);

    const scan: GeoGridScan = {
      id: `scan_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      clientId: params.clientId,
      keyword: params.keyword,
      gridSize,
      radiusMiles,
      centerCoordinates: params.center,
      scannedAt: new Date().toISOString(),
      averageRank,
      shareOfVoicePercent,
      points,
      zoneBreakdown,
    };

    return scan;
  }

  private static calculateZoneBreakdown(points: GridPoint[]) {
    const getZoneStats = (filterFn: (p: GridPoint) => boolean) => {
      const filtered = points.filter(filterFn);
      if (filtered.length === 0) return { avgRank: 20, status: 'weak' as const };
      const avg = Number(
        (filtered.reduce((acc, p) => acc + p.rank, 0) / filtered.length).toFixed(1)
      );
      const status = avg <= 3.5 ? ('strong' as const) : avg <= 8 ? ('moderate' as const) : ('weak' as const);
      return { avgRank: avg, status };
    };

    return {
      north: getZoneStats((p) => p.direction.includes('N')),
      south: getZoneStats((p) => p.direction.includes('S')),
      east: getZoneStats((p) => p.direction.includes('E')),
      west: getZoneStats((p) => p.direction.includes('W')),
      center: getZoneStats((p) => p.direction === 'Center'),
    };
  }
}
