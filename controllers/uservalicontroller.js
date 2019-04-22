let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/users');
let bcrypt = require('bcryptjs');

//user info under validated session
router.get('/userinfo', (req, res) => {
    User.findOne({ where: { id: req.user.id } })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
})

router.put('/updateuser', (req, res) => {
    User.update({
        username: req.body.username,
        img: req.body.img
    },
        { where: { id: req.user.id } }
    )
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
})
router.put('/updatepassword', (req, res) => {
    User.update({
        passwordhash: bcrypt.hashSync(req.body.password, 10)
    },
        { where: { id: req.user.id } }
    )
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteuser', (req, res) => {
    User.destroy({ where: { id: req.user.id } })
        .then(user => res.status(200).json('user deleted'))
        .catch(err => res.status(500).json({ error: err, message: 'user not deleted' }))
})

module.exports = router;