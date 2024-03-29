const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        User ,
       {
        model: Comment,
        include: [
          User
        ]
      }
      ],

    });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('all-blog', {
      layout: 'main',
      blogs,
      //logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attribute: ['username'],
        },
        {
          model: Comment,
          include: [
            User
          ]
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id)
    const blog = blogData.get({ plain: true });

    res.render('edit-blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  }
  catch (err) {
    res.status(500).json(err);
  }
})
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: [{
        model: Blog,
      }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})
// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({
//       where: {user_id: req.session.user_id}
//     })
//     // Find the logged in user based on the session ID
//     //const userData = await User.findByPk(req.session.user_id, {
//     //   attributes: { exclude: ['password'] },
//     //   include: [{ model: Blog }],
//      //});

//      const blog = blogData.get({ plain: true });
//      console.log(blog)


//     res.render('profile', {
//        ...blog,
//       logged_in: true
//     });
//     console.log(req.sessionID)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup')
})
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
