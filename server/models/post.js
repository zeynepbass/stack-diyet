
import mongoose from 'mongoose';
const postSchema=new mongoose.Schema({
  kullanici:String,
  title: String,
  content: String,
  comments: [
    {
      text: String,
      author:String
    },
  ],
  likeCount:{
    type:Number,
    default:0
}
})
export default mongoose.model('Post',postSchema)
