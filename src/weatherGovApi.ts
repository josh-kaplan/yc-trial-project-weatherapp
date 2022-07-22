import https from 'https'

// 28.5, -81.4
export const WeatherApi = {
  point: async (lat: number, lon: number) => {
    const options = {
      method: 'GET',
      hostname: 'api.weather.gov',
      path: `/points/${lat},${lon}`,
      port: 443,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    };
    console.log('options: ', options);

    const req = https.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);

      res.on('data', (d) => {
        console.log('data: ', d);
        const myString = Buffer.from(d).toString('ascii');
        console.log('myString: ', myString);
        // console.log("json: ", JSON.parse(d));
      });
    });

    req.on('error', (error) => {
      console.error(error);
    });

    req.end();

    console.log("End of point request");
  }
}
