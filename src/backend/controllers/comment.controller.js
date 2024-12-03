const { where } = require("sequelize");
const Comment = require("../models/comment.model");

async function getAllComments(req,res) {
    try {
        const comments = await Comment.findAll({order:[["id","DESC"]]});
        let result = [];
        for(const c of comments)result.push(c.dataValues);
        res.status(200).json(result);
    } catch (error) {
            res.status(404).json({error});
    }
}

async function getAllCommentsByUser(req,res) {
    try {
        const comments = await Comment.findAll({order:[["id","DESC"]],where:{UserId:req.body.UserId}});
        let result = [];
        for(const c of comments)result.push(c.dataValues);
        res.status(200).json(result);
    } catch (error) {
            res.status(404).json({error});
    }
}

async function getAllCommentsByPost(req,res) {
    try {
        const comments = await Comment.findAll({order:[["id","DESC"]],where:{PostId:req.body.PostId}});
        let result = [];
        for(const c of comments)result.push(c.dataValues);
        res.status(200).json(result);
    } catch (error) {
            res.status(404).json({error});
    }
}

async function addComment(req,res) {
    try {
        const comments = await Comment.create({...req.body});
        res.status(201).json({message:"Comment posted",id:comments.dataValues.id});
    } catch (error) {
            res.status(404).json({error});
    }
}

async function findComment(req,res) {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if(comment === null)throw "Post not found";
        res.status(200).json(comment.dataValues);
    } catch (error) {
            res.status(404).json({error});
    }
}

async function editComment(req,res) {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if(comment === null)throw "Post not found";
        comment.value = req.body.value;
        comment.save();
        res.status(200).json({message:"Comment updated"});
    } catch (error) {
            res.status(404).json({error});
    }
}

async function removeComment(req,res) {
    try {
        const comment = await Comment.findByPk(req.params.id);
        if(comment === null)throw "Post not found";
        comment.destroy();
        res.status(200).json({message:"Comment deleted"});
    } catch (error) {
            res.status(404).json({error});
    }
}


module.exports = {getAllComments,findComment,addComment,editComment,removeComment,getAllCommentsByUser,getAllCommentsByPost};