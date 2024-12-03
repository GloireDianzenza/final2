const { sequelize,DataTypes } = require("../init");

const User = sequelize.define("User",{
    id:{type:DataTypes.INTEGER,allowNull:false,primaryKey:true,autoIncrement:true},
    username:{type:DataTypes.STRING,allowNull:false,unique:true,validate:{
        len:[2,255]
    }},
    email:{type:DataTypes.STRING,allowNull:false,unique:true,validate:{
        isEmail:true
    }},
    password:{type:DataTypes.STRING,allowNull:false,unique:false,validate:{
        len:[4,255]
    }},
    admin:{type:DataTypes.TINYINT,allowNull:false,unique:false,defaultValue:0},
});

module.exports = User;