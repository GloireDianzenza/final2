const { sequelize,DataTypes } = require("../init");
const User = require("./user.model");

const Post = sequelize.define("Post",{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    texte:{type:DataTypes.TEXT("medium"),allowNull:false,defaultValue:"",validate:{
        notEmpty:true
    }},
    image:{type:DataTypes.STRING,allowNull:true,defaultValue:""}
});
Post.belongsTo(User);

module.exports = Post;