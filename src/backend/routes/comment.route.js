const { getAllComments,findComment,addComment,editComment,removeComment,getAllCommentsByUser,getAllCommentsByPost } = require("../controllers/comment.controller");
const express = require("express");
const router = express.Router();

router.get("/",getAllComments);
router.post("/",addComment);
router.post("/user",getAllCommentsByUser);
router.post("/post",getAllCommentsByPost);
router.get("/:id",findComment);
router.put("/:id",editComment);
router.delete("/:id",removeComment);

module.exports = router;