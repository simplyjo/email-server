const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
  {
    email: { type: String , required: true, unique: true},
    walletAddress: { type: String, required: true, unique: true },



  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);



module.exports = mongoose.model("Task", taskSchema);

