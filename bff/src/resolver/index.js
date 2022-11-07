const usersQuery = require('./users/users.query');
const usersMutation = require('./users/users.mutation');
const commentQuery = require('./comments/comments.query');
const commentMutation = require('./comments/comments.mutation');
const postQuery = require('./posts/posts.query');

module.exports = {
    Query: {
        users : usersQuery.findAll,
        userCount : usersQuery.userCount,
        findUser: usersQuery.findById,
        findComment: commentQuery.findComment,
        findPosts: postQuery.findPosts,
    },
    Mutation: {
        createUser: usersMutation.createUser,
        createComment: commentMutation.createComment,
        deleteComment: commentMutation.deleteComment,
    },
    Post : {
        comments: async (parent, query, { commentService }) =>  await commentService.findComment(query),
        author: async (parent, query, { userService }) =>  await userService.findById({ id : parent.userId })
    }


}
