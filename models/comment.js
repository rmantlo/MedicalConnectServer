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
        username:{
            type: DataTypes.STRING,
            aloowNull: false
        },
        forum_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}