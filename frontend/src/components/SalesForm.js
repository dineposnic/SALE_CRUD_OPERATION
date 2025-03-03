import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Salesform.css';

const SalesForm = () => {
  const [formData, setFormData] = useState({
    time: '',
    description: '',
    items: [],
    total: 0
  });

  const [item, setItem] = useState({ name: '', quantity: 1, total: 0 });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: name === "quantity" || name === "total" ? parseFloat(value) || 0 : value,
    }));
  };

  const addItem = () => {
    if (!item.name || item.total <= 0) {
      alert("Please enter valid item details.");
      return;
    }

    const newItem = { ...item, quantity: parseInt(item.quantity, 10), total: parseFloat(item.total) };

    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData.items, newItem];
      console.log("✅ Updated Items Array:", updatedItems); // Debugging log
      return {
        ...prevFormData,
        items: updatedItems,
        total: prevFormData.total + newItem.total,
      };
    });

    setItem({ name: '', quantity: 1, total: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const saleData = {
      ...formData,
      time: new Date(formData.time),
    };

    console.log("🚀 Final Sale Data Before Sending:", saleData); // ✅ Debugging log

    try {
      const response = await fetch('http://localhost:5000/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saleData),
      });

      const responseData = await response.json();
      console.log("📩 Response Data:", responseData);

      if (response.ok) {
        console.log('✅ Sale added successfully');
        navigate('/sales');
      } else {
        console.error('❌ Error adding sale');
      }
    } catch (error) {
      console.error('❌ Fetch Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Sale</h2>
      <input
        type="datetime-local"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <h3>Add Items</h3>
      <input
        type="text"
        name="name"
        placeholder="Item Name"
        value={item.name}
        onChange={handleItemChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={item.quantity}
        onChange={handleItemChange}
        required
      />
      <input
        type="number"
        name="total"
        placeholder="Total Price"
        value={item.total}
        onChange={handleItemChange}
        required
      />
      <button type="button" onClick={addItem}>Add Item</button>

      <ul>
        {formData.items.map((it, index) => (
          <li key={index}>{it.name} - {it.quantity} - ${it.total}</li>
        ))}
      </ul>

      <h3>Total: ${formData.total}</h3>

      <button type="submit">Save Sale</button>
    </form>
  );
};

export default SalesForm;
