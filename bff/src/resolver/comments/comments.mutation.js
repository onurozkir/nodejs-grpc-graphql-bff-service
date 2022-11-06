exports.createComment = async (parent, { data }, { commentService }) => {

    const createComment = await commentService.createComment(data);

    return {
        comment : createComment
    }
};

exports.deleteComment = async (parent, { data }, { commentService }) => await commentService.deleteComment(data);
