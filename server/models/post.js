import mongoose from 'mongoose'
const post=new mongoose.Schema({

  nickName:{type:String},
    baslik:{type:String, required:true},
  
  acikla:{type:String,required:true},
   comments:{
    type:[String],
    default:[]
   },
   likeCount:{
    type:Number,
    default:0
}
})
export default mongoose.model('Post',post)
