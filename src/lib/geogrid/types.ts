export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GridPoint {
  id: string;
  row: number;
  col: number;
  lat: number;
  lng: number;
  rank: number; // 1-20+ position in Local 3-Pack / Local Finder
  distanceMiles: number;
  direction: 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'Center';
  topCompetitor?: {
    name: string;
    reviewsCount: number;
    rating: number;
  };
}

export interface GeoGridScan {
  id: string;
  clientId: string;
  keyword: string;
  gridSize: 3 | 5 | 7;
  radiusMiles: number;
  centerCoordinates: Coordinates;
  scannedAt: string;
  averageRank: number;
  shareOfVoicePercent: number; // % of grid points where rank is <= 3
  points: GridPoint[];
  zoneBreakdown: {
    north: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    south: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    east: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    west: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
    center: { avgRank: number; status: 'strong' | 'moderate' | 'weak' };
  };
}
