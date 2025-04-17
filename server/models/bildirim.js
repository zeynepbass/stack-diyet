
import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  type: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  sender: String,
  receiver: String, 
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('Notification', notificationSchema)
