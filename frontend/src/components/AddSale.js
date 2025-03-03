// import React, { useState } from "react";
// import axios from "axios";
// // import "./AddSale.css";

// const AddSale = () => {
//   const [productName, setProductName] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [total, setTotal] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     console.log("🔄 Sale Data:", { productName, quantity, total }); // Debugging

//     try {
//       const response = await axios.post("http://localhost:5000/api/sales", {
//         productName,
//         quantity,
//         total,
//       }, {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });

//       console.log("✅ Sale Added Successfully:", response.data);
//       alert("Sale added successfully!");
//     } catch (error) {
//       console.error("❌ Error adding sale:", error.response?.data || error);
//       alert("Error adding sale. Check the console for details.");
//     }
//   };

//   return (
//     <div className="add-sale-form-container">
//       <form onSubmit={handleSubmit} className="add-sale-form">
//         <h2>Add New Sale</h2>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Total"
//           value={total}
//           onChange={(e) => setTotal(e.target.value)}
//           required
//         />
//         <button type="submit">Add Sale</button>
//       </form>
//     </div>
//   );
// };

// export default AddSale;
