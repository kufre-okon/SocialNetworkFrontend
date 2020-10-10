
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';

import 'jquery';

import MainRouter from '../routes/main-route';


function App() {
  
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
