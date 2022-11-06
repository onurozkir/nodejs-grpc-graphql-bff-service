exports.findAll = {
    resolve : async (...args) =>  {
        const { req, res, userService } = args[2];
        return await userService.findAll({req, res});
    }
}

exports.userCount = {
    resolve: async (...args) => {
        const { userService } = args[2];
        const { data } = args[1];

        return userService.countUser(data)
    }
}
