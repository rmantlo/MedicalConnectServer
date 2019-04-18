module.exports = function(sequelize, DataTypes){
    return sequelize.define('forum', {
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        forumMessage: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        url: {
            type:DataTypes.STRING,
            allowNull:true,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        keyword:{
            type: DataTypes.STRING,
            allowNull:false
        }
    })
}