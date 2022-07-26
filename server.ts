import express from "express";
import path from "path";
import { WeatherApi } from "./src/weatherGovApi";
const app = express();
const port = 8080; // default port to listen

// Define the front end routes
const webAppDir = path.join(__dirname, "webapp")
app.use(express.static(webAppDir))

app.get("/", (req, res) => {
    res.sendFile(path.join(webAppDir, "index.html"));
});

// define a route handler for the default home page
app.get("/api", ( req, res ) => {
    res.send( "Hello world!" );
} );

/**
 * Given an activity like this:
 *    {
 *       "name": "",
 *       "location": [lat, lon],
 *       fields: {
 *           "temperature": {
 *               ideal: { min: 40, max: 70 }
 *               acceptable: { min: 0, max: 90 }
 *           },
 *           "windSpeed": {
 *               ideal: { min: 0, max: 5 }
 *               acceptable: { min: 0, max: 20 }
 *           }
 *       }
 *    }
 *
 * Compute a score (method TBD), that says how good it is to do the activity
 *
 * {
 *    scores: [
 *         startTime: "2022-07-22T16:53:00+00:00"
 *         overallScore: 95,
 *         fields: {
 *           "temperature": 20
 *           "windSpeed": 12
 *         }
 *    ]
 * }
 */
app.post("/api/activity", ( req, res ) => {
  res.send({
    scores: [{
      startTime: "2022-07-22T16:53:00+00:00",
      overallScore: 95,
      fields: {
        "temperature": 20,
        "windSpeed": 12
      }
    },
    {
      startTime: "2022-07-22T17:53:00+00:00",
      overallScore: 95,
      fields: {
        "temperature": 20,
        "windSpeed": 12
      }
    }]
  });
});


// Catch-all route sends all non-valid routes to the React root and the
// browser router will determine whether or not to show a 404 page.
app.get("*", (req, res) => {
    res.sendFile(path.join(webAppDir, "index.html"));
});

// Uncomment these to fetch data!
// WeatherApi.point(28.5, -81.4);
// WeatherApi.forecast(25, 66);
// WeatherApi.observations("KORL");


// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
