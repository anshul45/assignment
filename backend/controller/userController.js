import User from "../models/userSchema.js";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const content = req.query.content;
  const skip = (page - 1) * content;
  try {
    const count = await User.find();
    const totalPages = Math.ceil(count / content);

    const data = await User.find().skip(skip).limit(content);

    res.json({
      currentPage: page,
      totalPages: totalPages,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsersWithId = (req, res) => {};

export const addUser = (req, res) => {};

export const updateUser = (req, res) => {};
export const deletUser = (req, res) => {};

export const filterUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const content = req.query.content;
  const skip = (page - 1) * content;
  try {
    const count = await User.find();
    const totalPages = Math.ceil(count / content);

    const data = await User.find().skip(skip).limit(content);

    res.json({
      currentPage: page,
      totalPages: totalPages,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
