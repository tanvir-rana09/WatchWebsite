
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WatchContextProvider } from './context/Context.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRoutes from './Routes/Routes.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <WatchContextProvider>
        <Router>
          <AppRoutes />
          <ToastContainer
            autoClose={3000}
            hideProgressBar />
        </Router>
      </WatchContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
