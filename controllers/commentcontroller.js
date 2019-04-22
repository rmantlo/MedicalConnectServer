let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let Comment = sequelize.import('../models/comment');

router.post('/create', (req, res) => {
    Comment.create({
        comment: req.body.comment,
        owner_id: req.user.id,
        forum_id: req.body.forum_id,
        username: req.user.username
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json(err))
})
router.get('/comment/:forum_id', (req, res) => {
    Comment.findAll({
        where: {
            forum_id: req.params.forum_id
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json(err))
})


router.get('/getmine', (req, res) => {
    Comment.findAll({
        where: {
            owner_id: req.user.id
        },
        order: [['createdAt', 'DESC']]
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json(err))
})

router.get('/usercomments', (req, res) => {
    Comment.findAll({
        where: {
            owner_id: req.user.id
        },
        order: [['createdAt', 'DESC']]
    })
})

router.put('/update/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json(err))
})

router.delete('/delete/:id', (req, res) => {
    Comment.destroy({
        where: {
            owner_id: req.user.id,
            id: req.params.id
        }
    })
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(500).json(err))
})

router.delete('/deleteallbyuser', (req, res) => {
    Comment.destroy({
        where: {
            owner_id: req.user.id
        }
    })
        .then(rep => res.status(200).json({
            message: 'comments by user deleted'
        }))
        .catch(err => res.status(500).json({
            error: err,
            message: 'Comments by user not deleted'
        }))
})

module.exports = router;