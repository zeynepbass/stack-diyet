import Post  from '../models/post.js'
import mongoose from 'mongoose';
import Notification from '../models/bildirim.js'
const getPosts=async (req,res)=>{

    try {
        const postMessage=await Post.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const CreatePost = async (req, res) => {
    const post = req.body;
  
    
    const newPost = new Post({
      ...post,
      kullanici: post.kullanici 
    });
  
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  };
  

const Delete=async (req,res)=>{
    const {id:_id}=req.params;


    if(!mongoose.Types.ObjectId.isValid(_id))  res.status(404).send('Post silindi')
  await Post.findByIdAndRemove(_id);
  res.status(200).json({message:'post silindi'})
  
  }
  const Detay=async (req,res)=>{
    const {id}=req.params;

    try {
        const post=await Post.findById(id)

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}
const duzenle = async (req, res) => {
    const { id } = req.params;
    const { selectedFile } = req.body;
  
    try {
      const updated = await Post.findOneAndUpdate(
        { id }, 
        { selectedFile },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası", error });
    }
  };
  const commentPost = async (req, res) => {
    const { id } = req.params;
    const { text, author } = req.body;
  
    try {
      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: "Post bulunamadı" });
  
      post.comments.push({ text, author });
      const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  
      const notification = new Notification({
        type: 'comment',
        postId: post._id,
        sender: author,
        receiver: post.kullanici, 
        message: `${author}: ${text}`
      });
      await notification.save();

      res.status(200).json({ message: 'Yorum ve bildirim eklendi.', updatedPost });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  
const likePost = async (req, res) => {
    const { id } = req.params;  
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("Post Bulunamadı");
    }
    const post = await Post.findById(id);
    if (!post) {
        return res.status(404).send("Post Bulunamadı");
    }
    const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likeCount: post.likeCount + 1 },
        { new: true }
    );
    res.status(200).json(updatedPost);
};



export {
    getPosts,
    CreatePost,
    Delete,
    Detay,
    duzenle,
    commentPost,
    likePost

}