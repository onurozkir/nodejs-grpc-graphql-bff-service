exports.findAll = {
    resolve : async (...args) =>  {
        const { req, res, userService } = args[2];
        return await userService.findAll({req, res});
    }
}

exports.findById = async (parent, data, { userService }) => await userService.findById(data);

exports.userCount = async (parent, data, { userService }) => await userService.countUser(data.filterBy)




