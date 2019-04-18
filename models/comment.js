module.exports = function(sequelize, DataTypes){
    return sequelize.define('comment', {
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        owner_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        forum_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}