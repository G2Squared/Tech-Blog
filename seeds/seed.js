const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => { 
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, { // Create the users
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) { 
    await Blog.create({ // Create the blogs
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const blogs = await Blog.findAll(); // get the blogs

  for (const comment of commentData) {
    await Comment.create({ // Create the comments
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();