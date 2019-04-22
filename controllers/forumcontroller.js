let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Forum = sequelize.import('../models/forum');
let User = sequelize.import('../models/users');
let bcrypt = require('bcryptjs');

router.post('/create', (req, res) => {
    Forum.create({
        title: req.body.title,
        forumMessage: req.body.forumMessage,
        url: req.body.url,
        keyword: req.body.keyword,
        owner_id: req.user.id
    })
        .then(mes => res.status(200).json({
            mes: mes,
            message: 'post created',
            owner: req.user.id
        }),
            (err) => {
                res.status(500).json(err)
            })
})

//forum GETs//
router.get('/', (req, res) => {
    Forum.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(user => res.status(200).json(user),
            err => res.status(500).json(err))
})

router.get('/getmine', (req, res) => {
    Forum.findAll({ where: { owner_id: req.user.id }, order: [['createdAt', 'DESC']] })
        .then(user => {
            res.status(200).json(user)
        },
            err => res.status(500).json(err))
})
router.get('/mostrecent', (req, res) => {
    Forum.findAll({ limit: 1 }, { order: [['createdAt', 'DESC']] })
        .then(post => res.status(200).json(post))
        .catch(err => res.status(500).json(err))
})

router.get('/search/:keyword', (req, res) => {
    Forum.findAll({
        where: {
            keyword: req.params.keyword
        }
    }, { order: [['createdAt', 'DESC']] })
    .then( post => res.status(200).json(post))
    .catch(err => res.status(500).json(err))
})



router.put('/update/:id', (req, res) => {
    Forum.update(req.body, { where: { id: req.params.id, owner_id: req.user.id } })
        .then(user => {
            res.status(200).json({
                message: 'post updated',
                edits: user
            })
        },
            err => res.status(500).json(err)
        )
        .catch(err => res.status(500).json(err))
})

router.delete('/delete/:id', (req, res) => {
    Forum.destroy({ where: { id: req.params.id, owner_id: req.user.id } })
        .then(deleted => {
            res.status(200).json('post deleted')
        },
            err => {
                res.status(500).json(err)
            })
})
router.delete('/deleteallbyuser', (req, res) => {
    Forum.destroy({where: {owner_id: req.user.id}})
    .then( deleted => res.status(200).json('all posts by user deleted'))
    .catch(err => res.status(500).json(err))
})


module.exports = router;