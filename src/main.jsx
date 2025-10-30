import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LoaderProvider } from './Components/User_Dashboard/context/Loaders.jsx';
import { LoaderProviders } from './Components/Admin_Dashboard/context/Loaders.jsx';
createRoot(document.getElementById('root')).render(
  <LoaderProviders>
    <LoaderProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </LoaderProvider>
  </LoaderProviders>
);
