const Post = require("../models/post.model");
const User = require("../models/user.model");

async function getAllPosts(req,res) {
    try {
        const posts = await Post.findAll({order:[["id","DESC"]]});
        let result = [];
        for(const p of posts)result.push(p.dataValues);
        res.status(200).json(result);
    } catch (error) {
            res.status(404).json({error});
    }
}

async function getAllPostsByUser(req,res) {
    try {
        const posts = await Post.findAll({order:[["id","DESC"]],where:{UserId:req.body.UserId||req.body.userId}});
        let result = [];
        for(const p of posts)result.push(p.dataValues);
        res.status(200).json(result);
    } catch (error) {
            res.status(404).json({error});
    }
}

async function addPost(req,res) {
    try {
        const post = await Post.create({...req.body});
        res.status(201).json({message:"Post posted",id:post.dataValues.id});
    } catch (error) {
            res.status(404).json({error});
    }
}

async function findPost(req,res) {
    try {
        const posts = await Post.findByPk(req.params.id);
        if(posts === null)throw "Post not found";
        res.status(200).json(posts.dataValues);
    } catch (error) {
            res.status(404).json({error});
    }
}

async function removePost(req,res) {
    try {
        const posts = await Post.findByPk(req.params.id);
        if(posts === null)throw "Post not found";
        posts.destroy();
        res.status(201).json({message:"Post deleted"});
    } catch (error) {
            res.status(404).json({error});
    }
}

async function editPost(req,res) {
    try {
        delete req.body.UserId;
        const post = await Post.findByPk(req.params.id);
        if(post === null)throw "Post not found";
        const keys = Object.keys(req.body);
        for(const k of keys){
            post[k] = req.body[k];
        }
        post.save();
        res.status(201).json({message:"Post updated"});
    } catch (error) {
            res.status(404).json({error});
    }
}

module.exports = {getAllPosts,findPost,addPost,editPost,removePost,getAllPostsByUser};