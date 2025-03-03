import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SalesList from './components/SalesList';
import SalesForm from './components/SalesForm';
import EditSale from "././components/EditSale";
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/sales/new" element={<SalesForm />} />
        <Route path="/sales/edit/:id" element={<EditSale />} />
      </Routes>
    </Router>
  );
}

export default App;
