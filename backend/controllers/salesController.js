const Sale = require("../models/Sale");

// ✅ Create a New Sale
exports.createSale = async (req, res) => {
  try {
    console.log("📥 Incoming Request Body:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty. Ensure Content-Type is application/json" });
    }

    const { time, description, items, total } = req.body;

    if (!time || !description || !items || total === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newSale = new Sale({ time: new Date(time), description, items, total });
    await newSale.save();

    res.status(201).json(newSale);
  } catch (err) {
    console.error("Error creating sale:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Sales
exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (err) {
    console.error("Error fetching sales:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Sale by ID
exports.getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).json({ error: "Sale not found" });
    
    res.status(200).json(sale);
  } catch (err) {
    console.error("Error fetching sale by ID:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateSale = async (req, res) => {
  try {
    console.log("🔄 Received Update Request for ID:", req.params.id);
    console.log("📝 Received Data:", req.body);

    const { items, ...otherFields } = req.body; // Extract `items` separately

    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { ...otherFields, "items": items } // ✅ Ensure `items` array is explicitly updated
      },
      { new: true, runValidators: true }
    );

    if (!updatedSale) {
      console.log("❌ Sale Not Found:", req.params.id);
      return res.status(404).json({ message: "Sale not found" });
    }

    console.log("✅ Updated Sale in DB:", updatedSale);
    res.status(200).json(updatedSale);
  } catch (error) {
    console.error("❌ Error updating sale:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete Sale by ID
exports.deleteSale = async (req, res) => {
  try {
    const deletedSale = await Sale.findByIdAndDelete(req.params.id);
    if (!deletedSale) return res.status(404).json({ error: "Sale not found" });

    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (err) {
    console.error("Error deleting sale:", err);
    res.status(500).json({ error: err.message });
  }
};
