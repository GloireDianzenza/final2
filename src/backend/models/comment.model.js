const { sequelize,DataTypes } = require("../init");
const Post = require("./post.model");
const User = require("./user.model");

const Comment = sequelize.define("Comment",{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    value:{type:DataTypes.TEXT("long"),allowNull:false,unique:false}
});
Comment.belongsTo(User);
Comment.belongsTo(Post);

module.exports = Comment;