// Overview: Application entry point that mounts React into the browser DOM.

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Renders the root App component into the HTML div with id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
