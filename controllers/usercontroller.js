let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/users');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

router.post('/createuser', (req, res) => {
    User.create({
        username: req.body.username,
        img: req.body.img,
        passwordhash: bcrypt.hashSync(req.body.password, 10)
    })
        .then(user => {
            let token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
            res.status(200).json({
                user: user,
                'sessionToken': token,
                message: 'user created'
            })
        })
        .catch(err => res.status(500).json('user not created'))
})

router.post('/login', (req, res) => {
    User.findOne({ where: { username: req.body.username } })
        .then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.password, user.passwordhash, (err, matches) => {
                        if (matches) {
                            let token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })
                            res.status(200).json({
                                user: user,
                                'sessionToken': token,
                                message: 'User signed in'
                            })
                        } else {
                            res.status(500).json('password not correct')
                        }
                    })
                } else {
                    res.status(500).json('user does not exist')
                }
            },
            function (err) {
                res.status(500).json('cannot find anything')
            }
        )
})


module.exports = router;