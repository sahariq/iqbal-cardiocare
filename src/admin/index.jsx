import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminApp from './pages/AdminApp';
import '../index.css';

ReactDOM.createRoot(document.getElementById('admin-root')).render(
  <React.StrictMode>
    <Router>
      <AdminApp />
    </Router>
  </React.StrictMode>
); 