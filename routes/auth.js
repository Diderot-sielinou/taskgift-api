import express from 'express'


const router = express.Router()

router.post('/register',(req,res,next)=>{
  res.send('welcome to register reouter')
})

export default router