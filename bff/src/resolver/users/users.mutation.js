exports.createUser = async (parent, { data }, { userService }) => {
    console.log('data createUser', data);

    const emailTaken = (await userService.countUser({where: {email: data.email}})) >= 1;

    if (emailTaken) {
        throw new Error('Email taken')
    }

    const createUser = await userService.createUser(data);

    return {
        user: createUser
    }
}
