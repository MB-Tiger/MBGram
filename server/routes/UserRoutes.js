const {register, login, setAvatar, getAllUsers} = require("../controllers/UserControllers.js")

const router = require("express").Router()

const asynchandler = fn => (req,res,next) => {
  return Promise.resolve(fn(req,res,next)).catch(next)
}

router.post("/register", register)
router.post("/login", login)
router.post("/setAvatar/:id", setAvatar)
router.get("/allusers/:id", getAllUsers)

module.exports = router

