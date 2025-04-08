import express from "express"
import { signin,signup,yönetici,users,Delete,duzenle,Detay,signPassword } from "../controllers/login.js"

const router=express.Router()
router.get('/users',users);
router.delete('/users/:email',Delete);
router.post('/signin',signin);
router.post('/uye-ol',signup);
router.post('/admin',yönetici);
router.put('/duzenle/:email',duzenle);
router.get('/duzenle/:email',Detay);
router.put('/sifre',signPassword)
export default router;