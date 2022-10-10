const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 4,
    unique: true
  },
  isAvatarImageSet: {
    type: Boolean,
    defualt: false,
  },
  avatarImage: {
    type: String,
    defualt: "",
  }
})

module.exports = mongoose.model("Users", userSchema)