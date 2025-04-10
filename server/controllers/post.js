import Post  from '../models/post.js'
import mongoose from 'mongoose';


const getPosts=async (req,res)=>{

    try {
        const postMessage=await Post.find();
        res.status(200).json(postMessage)
     
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

const CreatePost=async (req,res)=>{

    const post=req.body;

    const newPost=new Post({...post});
    //postun tüm alanlarını getirdik creator kullanıcının ıd tutucak saatı yerel saatı kullandık toıso kısmı saatı aktardık bu creator kısmı burda ekelndı o yuzden form kısmından sildik

    try {

        await newPost.save(); //veritabanına kaydeder
        res.status(201).json(newPost)
        
    } catch (error) {
        res.status(409).json({message:error.message})
    }
	
	//HTTP STATUS CODE ları inceleyelim
	//https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
}

const Delete=async (req,res)=>{
    const {id:_id}=req.params;


    if(!mongoose.Types.ObjectId.isValid(_id))  res.status(404).send('Post silindi') //mongodb object ıd olup olmadıgını kontrol ettık
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
    const { id: email } = req.params;
    const { selectedFile } = req.body;
  
    try {
      const updated = await Post.findOneAndUpdate(
        { email }, 
        { selectedFile },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Kullanıcı bulunamadı" });
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: "Sunucu hatası", error });
    }
  };
  
  
const commentPost= async(req,res)=>{
    const {id}=req.params;
    const {yorum}=req.body;

    const post=await Post.findById(id);

    post.comments.push(yorum);

    const updatedPost=await Post.findByIdAndUpdate(id,post,{new:true});

    res.json(updatedPost);

}
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