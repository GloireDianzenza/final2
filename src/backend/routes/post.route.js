const { getAllPosts,findPost,addPost,editPost,removePost,getAllPostsByUser } = require("../controllers/post.controller");
const express = require("express");
const router = express.Router();

router.get("/",getAllPosts);
router.post("/",addPost);
router.post("/user",getAllPostsByUser);
router.get("/:id",findPost);
router.put("/:id",editPost);
router.delete("/:id",removePost);

module.exports = router;