const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsers(req,res) {
    try {
        const users = await User.findAll();
        let result = [];
        for(const u of users)result.push(u.dataValues);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error});
    }
}

async function getAllAdmins(req,res) {
    try {
        const users = await User.findAll({where:{admin:1}});
        let result = [];
        for(const u of users)result.push(u.dataValues);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({error});
    }
}

async function addUser(req,res) {
    try {
        bcrypt.hash(req.body.password,10)
        .then(async hash=>{
            const user = await User.create({...req.body,password:hash,admin:0});
            res.status(201).json({message:"User added",id:user.dataValues.id});
        })
        .catch(error=>res.status(404).json({error}));
    } catch (error) {
        res.status(404).json({error});
    }
}

async function findUser(req,res) {
    try {
        const user = await User.findByPk(req.params.id);
        if(user === null)throw "User not found";
        res.status(200).json(user.dataValues);
    } catch (error) {
        res.status(404).json({error});
    }
}

async function login(req,res) {
    try {
        const pwd = req.body.password;
        delete req.body.password;
        const user = await User.findOne({where:{...req.body}});
        if(user === null)throw "User not found";
        bcrypt.compare(pwd,user.password)
        .then(valid=>{
            if(!valid){
                res.status(404).json({error:"Invalid password"})
            }
            else{
                const token = jwt.sign({_user:user},"secret",{expiresIn:"1 day"});
                res.status(200).json({user:user.dataValues,token});
            }
        })
        .catch(error=>res.status(404).json({error}))
    } catch (error) {
        res.status(404).json({error});
    }
}

async function removeUser(req,res) {
    try {
        const user = await User.findByPk(req.params.id);
        if(user === null)throw "User not found";
        user.destroy();
        res.status(201).json({message:"User deleted"});
    } catch (error) {
        res.status(404).json({error});
    }
}

async function editUser(req,res) {
    try {
        const user = await User.findByPk(req.params.id);
        if(user === null)throw "User not found";
        const keys = Object.keys(req.body);
        for(const k of keys){
            user[k] = req.body[k];
        }
        if(req.body.password){
            bcrypt.hash(req.body.password,10)
            .then(hash=>{
                user.password = hash;
                user.save();
            })
            .catch(error=>res.status(404).json({error}))
        }
        user.save();
        res.status(201).json({message:"User updated"});
        return;
    } catch (error) {
        res.status(404).json({error});
    }
}

module.exports = {getAllUsers,findUser,addUser,editUser,removeUser,getAllAdmins,login};