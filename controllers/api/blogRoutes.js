const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    await newBlog.save()
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post('/comment', withAuth, async (req,res) => {
  try {
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
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (!updatedBlog) {
      res.status(404).json({ message: 'No blog found with this id' })
      return
    }
    res.json(updatedBlog)
  }
  catch (err) {
    res.status(400).json(err)
  }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;