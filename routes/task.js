const express = require("express");
const router = express.Router();
const Task = require("../models/task");



router.get("/task/:id", async (req, res) => {
  try {

    const { id } = req.params
    console.log('reqforwl', req.body, id)


    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Cannot Find Wallet.",
      });
    }

    //1. Find if any account with that email exists in DB
    const wl = await Wl.findOne({ wallet: id });
    console.log('wlnew', wl, id)

    // NOT FOUND - Throw error
    if (!wl) {
      return res.status(404).json({
        error: true,
        message: "Not Etherlisted",
      });
    }

    // const updatedTask = await Task.findOneAndUpdate({wallet:id},{wl:true}, {
    //   new: true,
    // });

    //Success
    return res.send({
      success: true,
      message: "Wallet is Etherlisted",
      activeTask: wl,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.get("/:id", async (req, res) => {
  try {

    const { id } = req.params
    console.log('req', req.body, id)


    if (!id) {
      return res.status(400).json({
        error: true,
        message: "Cannot Find Wallet.",
      });
    }

    //1. Find if any account with that email exists in DB
    const task = await Task.findOne({ wallet: id });

    // NOT FOUND - Throw error
    if (!task) {
      return res.status(404).json({
        error: true,
        message: "Not Registered Yet",
      });
    }



    //Success
    return res.send({
      success: true,
      message: "Task",
      activeTask: task,
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Couldn't login. Please try again later.",
    });
  }
});
router.post("/", async (req, res) => {
  try {


    const { email, address } = req.body
    const task = new Task({
      email: req.body.email,
      walletAddress: req.body.address,

    });

    const existingUser = await Task.findOne({ walletAddress: address });

    if (existingUser) {
      return res.status(201).json({
        message: "This Wallet is already registered",
        error: true,
      });
    }
    const existingEmail = await Task.findOne({ email: email });

    if (existingEmail) {
      return res.status(201).json({
        message: "This Email is already registered",
        error: true,
      });
    }


    if (!email || !address) {
      return res.status(200).json({
        error: true,
        message: "Enter All Fields",
      })
    } else {


      console.log('task',"line121",  task)

      const newTask = await task.save();

      return res.status(200).json({
        success: true,
        message: 'Submitted Successfully',
        task: newTask
      })
    };
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
