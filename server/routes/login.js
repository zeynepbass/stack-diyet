import express from "express"
import { signin,signup,users,Delete,duzenle,Detay,signPassword } from "../controllers/login.js"

const router=express.Router()
router.get('/users',users);
router.delete('/users/:email',Delete);
router.post('/signin',signin);
router.post('/uye-ol',signup);
router.put('/duzenle/:id',duzenle);
router.get('/detay/:id',Detay);
router.put('/sifre',signPassword)
export default router;