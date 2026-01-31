const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const upload = require("../middleware/uploadItemPhoto");

const {
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
  uploadProfilePicture,
} = require("../controller/customer_controller");

// Signup
router.post("/signup", createCustomer);

// Login
router.post("/login", loginCustomer);

// Update
router.put("/:id", protect, updateCustomer);

// Delete
router.delete("/:id", protect, deleteCustomer);

// Upload profile picture
router.post(
  "/:id/profile-picture",
  protect,
  upload.single("photo"),
  uploadProfilePicture
);

// Get all customers
router.get("/", protect, async (req, res) => {
  const Customer = require("../models/customer_model");
  const customers = await Customer.find().select("-password");
  res.status(200).json({ success: true, data: customers });
});

// Get customer by ID
router.get("/:id", protect, async (req, res) => {
  const Customer = require("../models/customer_model");
  const customer = await Customer.findById(req.params.id).select("-password");

  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }

  res.status(200).json({ success: true, data: customer });
});

module.exports = router;
