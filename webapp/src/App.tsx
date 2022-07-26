import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Routes>
                <Route index element={<h1>Home</h1>} />
                <Route path="dashboard" element={<h1>Dashboard</h1>} />
            </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
