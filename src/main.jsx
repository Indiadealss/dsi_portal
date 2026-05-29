import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import store from "./component/Redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from 'react-helmet-async';
import '@fontsource/manrope'; // Default weight 400
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/700.css';
import { LocationProvider } from "./component/LocationContext";

// window.onerror = function (msg, url, line, col, error) {
//   document.body.innerHTML = `
//     <div style="padding:20px; color:red; font-size:16px;">
//       <h2>JS Error</h2>
//       <p><b>${msg}</b></p>
//       <p>Line: ${line}</p>
//     </div>
//   `;
// };

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <HelmetProvider>
      <BrowserRouter>
      <LocationProvider>
      <App />
      </LocationProvider>
    </BrowserRouter>
    </HelmetProvider>
    </Provider>,
)
