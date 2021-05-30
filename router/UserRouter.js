const express=require('express')
const router=express()
const UserController=require('../controller/UserController')
router.get('/',UserController.getLogin)
router.post('/',UserController.postLogin)
router.get('/signup',UserController.getSignup)
router.post('/signup',UserController.postSignup)
module.exports=router