const usersQuery = require('./users/users.query');
const usersMutation = require('./users/users.mutation');

module.exports = {
    Query: {
        users : usersQuery.findAll,
        userCount : usersQuery.userCount,
    },
    Mutation: {
        createUser: usersMutation.createUser
    }
}
