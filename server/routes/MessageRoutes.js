const {addMessage, getAllMessages} = require("../controllers/MessagesController")

const router = require("express").Router()

router.post("/addmsg/", addMessage)
router.post("/getmsg", getAllMessages)

module.exports = router

