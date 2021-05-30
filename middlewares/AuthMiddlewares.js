const jwt=require('jsonwebtoken')
const User=require('../models/users')
const CookieParser=require('cookie-parser')
const getToken=(req)=>{
   
    return req.cookies.jwt
}
const requireAuth=(req,res,next)=>{
    console.log(req.cookies.jwt)
    const token=getToken(req)
    if(token){
        jwt.verify(token,'secretkey1',(err,decodedtoken)=>{
            if(err){
                console.log(err)
                res.redirect('/')
            }else{
                console.log(decodedtoken)
                next()
            }

        })


    }else{
        res.redirect('/')
    }

}
const checkUser= async(req,res)=>{
    const token=getToken(req)
    if(token){
       return await jwt.verify(token,'secretkey1',async (err,decodedtoken)=>{
            if(err){
                console.log(err)
                res.local.user=null
            }else{
                console.log(decodedtoken)
                const user=await User.findById(decodedtoken.id)
                return user._id
            }
           
        })


    }else{
        res.local.user=null
        return null
    }
    return null

}
module.exports={
    requireAuth,checkUser
}