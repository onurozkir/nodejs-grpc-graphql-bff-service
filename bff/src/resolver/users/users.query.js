exports.users = async (parent, data, { userService }) => {
    console.log('data',data);
    console.log('userService',userService);
    return await userService.findAll(data);
}

exports.findById = async (parent, data, { userService }) => await userService.findById(data);

exports.userCount = async (parent, data, { userService }) => await userService.countUser(data.filterBy)




