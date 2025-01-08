import React from 'react';
import ReactDOM from 'react-dom/client'; // Perhatikan perubahan ini
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Membuat root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
