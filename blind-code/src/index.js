import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import NewApp from './NewApp';

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

ReactDOM.render(<NewApp />, document.getElementById('root'));
registerServiceWorker();
