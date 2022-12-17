const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// Associates blog posts to users
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
});

// Associates comments to users
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, BlogPost, Comment };