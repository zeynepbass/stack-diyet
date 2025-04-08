import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/login.js';
import post from './routes/post.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use('/', userRoutes);
app.use('/', post);

// const startServer = async () => {
  
//   try {
//     // MongoDB bağlantısını kur
//     await Baglan();

//     // Express uygulamasını dinle
//     const PORT = process.env.PORT || 9363;
    

//     app.listen(PORT, () => console.log(`Server ${PORT} üzerinden yayında`));
//   } 
  
//   catch (error) {
//     console.error('Server başlatma hatası:', error);
//     process.exit(1);
//   }
// };
app.listen(process.env.PORT, () => {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database bağlantısı kuruldu"))
  .catch((err) => console.log(err));
});

