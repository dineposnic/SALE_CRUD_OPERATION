import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const EditSale = () => {
  const { id } = useParams(); // Get Sale ID from URL
  const navigate = useNavigate();
  const location = useLocation();
  const refreshSales = location.state?.refreshSales; // Callback to update SalesList
  const [sale, setSale] = useState(location.state?.sale || null);
  const [loading, setLoading] = useState(!sale);

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/sales/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        console.log("Fetched Sale Details:", response.data); // Log fetched data
        setSale(response.data);
      } catch (error) {
        console.error("Error fetching sale details:", error);
      }
    };
  
    fetchSaleDetails();
  }, [id]); // Fetch data when component mounts or ID changes
  

  const handleUpdate = async () => {
    try {
        console.log("Edited Sale Data Before Sending:", sale);
      const response = await axios.put(`http://localhost:5000/api/sales/${id}`, sale, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is included
        },
      });
  
      console.log("Response from API:", response.data); // Debugging
  
      if (response.status === 200) {
        alert("Sale updated successfully!");
        navigate("/sales"); // Redirect to Sales List after updating
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating sale:", error);
      alert("Error updating sale. Check the console for details.");
    }
  };

    // Handle input changes for sale fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSale((prevSale) => ({
          ...prevSale,
          [name]: value, // Update top-level sale field
        }));
      };
    
      // Handle input changes for items array
      const handleItemChange = (index, field, value) => {
        setSale((prevSale) => ({
          ...prevSale,
          items: prevSale.items.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
          ),
        }));
      };
  

  if (loading) return <p>Loading...</p>;
  if (!sale) return <p>Sale not found!</p>;

  return (
    <div>
      <h2>Edit Sale</h2>
      <label>
        Product Name:
        <input
          type="text"
          value={sale.items?.[0]?.name || ""}
          onChange={(e) => setSale({ ...sale, items: [{ ...sale.items[0], name: e.target.value }] })}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={sale.items?.[0]?.quantity || 0}
          onChange={(e) => setSale({ ...sale, items: [{ ...sale.items[0], quantity: e.target.value }] })}
        />
      </label>
      <label>
        Total:
        <input
          type="number"
          value={sale.total || 0}
          onChange={(e) => setSale({ ...sale, total: Number(e.target.value) })}
        />
      </label>
      <button onClick={handleUpdate}>Update Sale</button>
    </div>
  );
};

export default EditSale;
