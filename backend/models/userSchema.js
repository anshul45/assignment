import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    require: true,
  },
  last_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  },
  domain: {
    type: String,
    require: true,
  },
  available: {
    type: Boolean,
    require: true,
  },
});

export default mongoose.model("User", UserSchema);
