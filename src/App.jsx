// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/layout/layout';
import AppRoutes from './routes/routes';

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
