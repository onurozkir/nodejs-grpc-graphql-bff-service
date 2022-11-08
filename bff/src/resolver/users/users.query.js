exports.users = async (parent, data, { userService }) => await userService.findAll(data);

exports.findById = async (parent, data, { userService }) => await userService.findById(data);

exports.userCount = async (parent, data, { userService }) => await userService.countUser(data.filterBy)

exports.getUserWithComment = async (parent, data, { userService }) => await userService.getUserWithComment(data);




