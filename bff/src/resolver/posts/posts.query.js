exports.findPosts = async (parent, query , { postService }) =>  await postService.getPosts(query)
