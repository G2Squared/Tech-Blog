const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, { // A user can have many blogs
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
  
Blog.belongsTo(User, { // Each blog can only belong to a user
    foreignKey: 'user_id'
});

Blog.hasMany(Comment, { // A blog can have many comments
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, { // Each comment can only belong to a blog
    foreignKey: 'blog_id',
});

User.hasMany(Comment, { // A user can have many comments
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, { // Each comment can only belong to a user
    foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };