import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SalesList.css';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sales');
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const deleteSale = async (id) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await axios.delete(`http://localhost:5000/api/sales/${id}`);
        fetchSales();
      } catch (error) {
        console.error('Error deleting sale:', error);
      }
    }
  };

  return (
    <div className="sales-container">
      <h1 className="title">Sales Records</h1>
      
      {/* ✅ Use React Router's Link instead of <a href> */}
      <Link to="/sales/new" className="add-sale-button">Add New Sale</Link>

      {sales.length === 0 ? (
        <div className="no-records-container">
          <p className="no-records">No records found.</p>
        </div>
      ) : (
        <div className="sales-list">
          {sales.map((sale) => (
            <div key={sale._id} className="sale-card">
              <div className="sale-details">
                <strong>{sale.items?.[0]?.name || "Unknown Product"}</strong>
                <p>Quantity: {sale.items?.[0]?.quantity || 0}</p>
                <p>Total: ${sale.total.toLocaleString()}</p>
              </div>
              <div className="sale-actions">
                <button 
                  className="edit-button"
                  onClick={() => navigate(`/sales/edit/${sale._id}`, { state: { sale } })}
                >
                  Edit
                </button>
                <button onClick={() => deleteSale(sale._id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SalesList;
