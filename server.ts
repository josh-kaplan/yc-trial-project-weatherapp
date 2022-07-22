import express from "express";
import { WeatherApi } from "./src/weatherGovApi";
const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// app.post( "/", ( req, res ) => {

// })

// WeatherApi.point(28.5, -81.4);
// WeatherApi.forecast(25, 66);
WeatherApi.observations("KORL");


// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
