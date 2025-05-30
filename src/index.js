import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';


WebFont.load({
  google: {
    families: ['Work Sans:400,500,700', 'sans-serif']
  }
});


const Index = () => {
  return (
      <App/>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><Index /></React.StrictMode>);