import https from 'https'

const USER_AGENT = "CAN_I_DO_THIS_ACTIVITY_APP"

// https://api.weather.gov/points/28.5,-81.4
export const WeatherApi = {
  point: async (lat: number, lon: number) => {
    const options = {
      method: 'GET',
      hostname: 'api.weather.gov',
      path: `/points/${lat},${lon}`,
      port: 443,
      headers: { 'User-Agent': USER_AGENT }
    };

    const req = https.request(options, (res) => {

      res.on('data', (d) => {
        const dataString = Buffer.from(d).toString('ascii');
        console.log('Data from lat long: ', dataString);
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

    const req = https.request(options, (res) => {

      res.on('data', (d) => {
        const dataString = Buffer.from(d).toString('ascii');
        console.log('Forecast data: ', dataString);
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();

    console.log("End of grid request");
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

    const req = https.request(options, (res) => {

      res.on('data', (d) => {
        const dataString = Buffer.from(d).toString('ascii');
        console.log('Station observations: ', dataString);
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();

    console.log("End of grid request");
  }
}
