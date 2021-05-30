const User=require('../models/users')
const jwt=require('jsonwebtoken')
const maxAge=60*60*24*7
const createToken=(id)=>{
    return jwt.sign({id},'secretkey1',{expiresIn:maxAge})
}
const getLogin=(req,res)=>{
    res.render('index',{title:'Login'})
}
const postLogin=async(req,res)=>{
    const {username,password}=req.body
    try{
        const user=await User.login(username,password)
        const token=createToken(user._id)
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
        res.redirect('/todo')
    }
    catch(e){
        console.log(e)
        res.redirect('/')
    }
}
const getSignup=(req,res)=>{
    res.render('signup',{title:'Sign Up'})
}
const postSignup=async (req,res)=>{
    
    const user=new User(req.body)
    user.save().then((result)=>{
        res.redirect('/')
    }).catch((err)=>{
        console.log(err)
    })

}
module.exports={
    getLogin,
    postLogin,
    getSignup,
    postSignup
}