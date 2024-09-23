const express=require("express");
const imageGenerator = require("../controllers/imageGenerator");
const chatComplete = require("../controllers/chatComplete");
const router=express.Router();

router.post('/image-generator',imageGenerator)
router.post('/chat-complete',chatComplete)

module.exports=router;