const router = require('express').Router()
const withAuth = require('../../utils/auth');

const {Comment} = require('../../models')



router.post('/', withAuth, async (req,res) => {
    try {
        console.log(req.body)
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
      })
      await newComment.save()
      res.status(200).json(newComment)
    } catch (err) {
      res.status(400).json(err)
    }
  })
  module.exports = router;
  