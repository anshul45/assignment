import User from "../models/userSchema.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const content = parseInt(req.query.content) || 20;

  if (page < 1) {
    // Handle page number
    page = 1;
  }

  const skip = (page - 1) * content;
  try {
    const count = await User.find();
    const totalPages = Math.ceil(count.length / content);

    const data = await User.find().skip(skip).limit(content);
    if (!data.length) {
      return res.status(200).json({
        currentPage: page,
        totalPages: totalPages,
        data: [], // Return an empty array if no data is found
      });
    }

    res.json({
      currentPage: page,
      totalPages: totalPages,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterUsers = async (req, res) => {
  const filterquery = {};
  const page = parseInt(req.query.page) || 1;
  const content = parseInt(req.query.content) || 20;

  if (page < 1) {
    // Handle page number
    page = 1;
  }

  const skip = (page - 1) * content;

  //for case sensitive

  for (const key in req.query) {
    if (Object.hasOwnProperty.call(req.query, key)) {
      filterquery[key] = { $regex: req.query[key], $options: "i" };
    }
  }

  try {
    const count = await User.find(filterquery);
    const totalPages = Math.ceil(count.length / content);

    const data = await User.find(filterquery).skip(skip).limit(content);
    if (!data.length) {
      return res.status(200).json({
        currentPage: page,
        totalPages: totalPages,
        data: [], // Return an empty array if no data is found
      });
    }

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsersWithId = async (req, res) => {
  const id = req.params.id;

  if (!id || !mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: "Invalid user ID provided",
    });
  }

  try {
    const data = await User.findById(id);
    if (!data) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addUser = async (req, res) => {
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  try {
    const userData = req.body;
    const randomText = generateRandomString(5);

    if (!userData) {
      return res.status(400).json({
        error: "no Data provided",
      });
    }

    const newUser = new User({
      ...userData,
      avatar: `https://robohash.org/${randomText}.png`,
    });
    await newUser.save();

    res.status(201).json({
      data: newUser,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  if (!id || !mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: "Invalid user ID provided",
    });
  }

  try {
    const updatedUserData = req.body;

    if (!updatedUserData) {
      return res.status(400).json({
        error: "No data provided",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletUser = async (req, res) => {
  const id = req.params.id;

  if (!id || !mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      error: "Invalid user ID provided",
    });
  }

  try {
    const data = await User.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.status(200).json({
      msg: "User Deleted Sucessfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
