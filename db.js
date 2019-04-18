let Sequelize = require('sequelize')

const sequelize = new Sequelize('BiologyConnects', 'postgres', 'awesome11', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function(){
        console.log('connected to db')
    },
    function(err){
        console.log(err)
    }
)

module.exports = sequelize;