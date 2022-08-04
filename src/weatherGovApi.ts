import https from 'https'
import { safeParseRaw } from './dataHandler';

const USER_AGENT = "CAN_I_DO_THIS_ACTIVITY_APP"

interface PointsData {
  properties?: {
    forecast: string;
  }
}
interface StationData {
  observationStations?: string[];
}

export const WeatherApi = {
  // https://api.weather.gov/points/28.5,-81.4
  point: async (lat: number, lon: number) => {
    const options = {
      method: 'GET',
      hostname: 'api.weather.gov',
      path: `/points/${lat},${lon}`,
      port: 443,
      headers: { 'User-Agent': USER_AGENT }
    };

    let body: Uint8Array[] = [];
    return new Promise<PointsData>((resolve) => {
      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          body.push(d);
        });

        res.on('end', () => {
          const data = safeParseRaw(body);
          resolve(data);
        });
      });

      req.on('error', (error) => {
        console.error(error);
        resolve(null);
      });

      req.end();
    })

  },

  getGridXYFromPointData: (pointsData: PointsData) => {
    if (!(pointsData && pointsData.properties && pointsData.properties.forecast)) return null;

    const extractRE = new RegExp('https\:\/\/api\.weather\.gov\/gridpoints\/MLB\/(\\d+),(\\d+)\/forecast')
    try {
      const match = pointsData.properties.forecast.match(extractRE);
      const gridX = parseInt(match[1]);
      const gridY = parseInt(match[2]);
      return [gridX, gridY];
    } catch (e) {
      console.log('error getGridXYFromPointData: ', e);
      return null;
    }
  },

  stations: async (gridX: number, gridY: number) => {
    const options = {
      method: 'GET',
      hostname: 'api.weather.gov',
      path: `/gridpoints/MLB/${gridX},${gridY}/stations`,
      port: 443,
      headers: { 'User-Agent': USER_AGENT }
    };

    let body: Uint8Array[] = [];
    return new Promise<StationData>((resolve) => {
      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          body.push(d);
        });

        res.on('end', () => {
          const data = safeParseRaw(body);
          resolve(data);
        });
      });

      req.on('error', (error) => {
        console.error(error);
        resolve(null);
      });

      req.end();
    })
  },

  getStationNameFromStationData: (stationData: StationData) => {
    if(!(stationData && stationData.observationStations && stationData.observationStations[0])) return null;

    const extractRE = new RegExp('https\:\/\/api\.weather\.gov\/stations\/(.+)')
    try {
      const match = stationData.observationStations[0].match(extractRE);
      const stationName = match[1];
      return stationName;
    } catch (e) {
      console.log('error getStationNameFromStationData: ', e);
      return null;
    }
  },

  // https://api.weather.gov/gridpoints/MLB/25,66
  forecast: async (gridX: number, gridY: number) => {
    const options = {
      method: 'GET',
      hostname: 'api.weather.gov',
      path: `/gridpoints/MLB/${gridX},${gridY}`,
      port: 443,
      headers: { 'User-Agent': USER_AGENT }
    };

    let body: Uint8Array[] = [];
    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          body.push(d);
        });

        res.on('end', () => {
          const data = safeParseRaw(body);
          resolve(data);
        });
      });

      req.on('error', (error) => {
        console.error(error);
        resolve(null);
      });

      req.end();
    })
  },

  // https://api.weather.gov/stations/KORL
  // https://api.weather.gov/stations/KORL/observations
  observations: async (stationId: string) => {
    const options = {
      method: 'GET',
      hostname: 'api.weather.gov',
      path: `/stations/${stationId}/observations`,
      port: 443,
      headers: { 'User-Agent': USER_AGENT }
    };

    let body: Uint8Array[] = [];
    return new Promise((resolve) => {
      const req = https.request(options, (res) => {
        res.on('data', (d) => {
          body.push(d);
        });

        res.on('end', () => {
          const data = safeParseRaw(body);
          resolve(data);
        });
      });

      req.on('error', (error) => {
        console.error(error);
        resolve(null);
      });

      req.end();
    })
  }
}
