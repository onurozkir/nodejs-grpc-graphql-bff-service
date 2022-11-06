const usersQuery = require('./users/users.query');
const usersMutation = require('./users/users.mutation');
const commentQuery = require('./comments/comments.query');
const commentMutation = require('./comments/comments.mutation');

module.exports = {
    Query: {
        users : usersQuery.findAll,
        userCount : usersQuery.userCount,
        findComment: commentQuery.findComment
    },
    Mutation: {
        createUser: usersMutation.createUser,
        createComment: commentMutation.createComment,
        deleteComment: commentMutation.deleteComment,
    }
}
