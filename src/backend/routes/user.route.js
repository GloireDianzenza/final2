const { getAllUsers,findUser,addUser,editUser,removeUser,getAllAdmins,login } = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.get("/",getAllUsers);
router.post("/",addUser);
router.post("/admin",getAllAdmins);
router.post("/login",login);
router.get("/:id",findUser);
router.put("/:id",editUser);
router.delete("/:id",removeUser);

module.exports = router;