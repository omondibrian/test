/**
 * @fileOverview  the postController contains the functions needed
 * to manege all the posts
 * @author Eucossa
 * @version 0.0.1
 */

const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  try {
      const posts = await Post.find({});
      res.json({
          posts: posts,
          user: req.user
      }).status(200)
  } catch (error) {
    res.status(400).json({message:error})
  }
}

exports.makeNewPost = async (req, res) => {
  console.log(req)

    //create a new post
    const post = new Post({
        title: req.body.title,
        mainContent: req.body.mainContent,
        imageUrl: req.file.path,
        userId: req.user
    })
    try {//save the post
        const savedpost = await post.save()
        res.status(200).send({ post_id: savedpost._id });
    } catch (error) {//catch errors if any
        res.status(400).send(error)
    }

}
exports.getSinglePost = async (req, res) => {
    const postId = req.params.id
    const posts = await Post.findOne({_id:postId});
    res.json({
        posts: posts,
        user: req.user
    }).status(200)
}
exports.deleteSinglePost = async (req, res) => {
    const postId = req.params.id
    const posts = await Post.findOneAndRemove({ _id: postId }, { useFindAndModify: false });
    res.json({
        posts: posts,
        user: req.user
    }).status(200)
}
exports.editPost = async (req,res,next) =>{

    try {
        id = req.params.id
        if (req.body.title) {
            await Post.updateOne({ _id: id }, { $set: { title: req.body.title } });
        }
        if (req.body.mainContent) {
            await Post.updateOne({ _id: id }, { $set: { mainContent: req.body.mainContent } });

        }
        if (req.file) {
            await Post.updateOne({ _id: id }, { $set: { imageUrl: req.file.path } });
            console.log(req.file)
        }
        const updatedPost = await Post.findOne({ _id:id });
        res.json({ updatedPost }).status(200);

            next();
        } catch (error) {
            res.status(400).json({ message: error });
        }
   
}
