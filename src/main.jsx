
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WatchContextProvider } from './context/Context.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppRoutes from './Routes/Routes.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import 'suneditor/dist/css/suneditor.min.css';
import "react-responsive-pagination/themes/classic.css";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/Store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <WatchContextProvider>
            <Router>
              <AppRoutes />
              <ToastContainer
                autoClose={3000}
                hideProgressBar />
            </Router>
          </WatchContextProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
