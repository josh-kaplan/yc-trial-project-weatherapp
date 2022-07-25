import https from 'https'
import { safeParseRaw } from './dataHandler';

const USER_AGENT = "CAN_I_DO_THIS_ACTIVITY_APP"

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
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        body.push(d);
      });

      res.on('end', () => {
        const data = safeParseRaw(body);
        console.log('Points data: ', JSON.stringify(data));
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();
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
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        body.push(d);
      });

      res.on('end', () => {
        const data = safeParseRaw(body);
        console.log('Forecast data: ', JSON.stringify(data));
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();
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
    const req = https.request(options, (res) => {
      res.on('data', (d) => {
        body.push(d);
      });

      res.on('end', () => {
        const data = safeParseRaw(body);
        console.log('Station observations: ', JSON.stringify(data));
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();
  }
}
