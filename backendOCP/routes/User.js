const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/User");

router.post("/signUp",LoginController.signUpUser);
router.post("/Login",LoginController.LoginUser);
router.get("/getUserById/:id",LoginController.getUserById);

module.exports = router;