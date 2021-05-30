const express=require('express')
const router=express()
const TodoController=require('../controller/TodoController')
const {requireAuth}=require('../middlewares/AuthMiddlewares')
router.get('/todo',requireAuth,TodoController.getTodo)
router.post('/todo',TodoController.postTodo)
router.get('/todol',(req,res)=>{
    res.redirect('/todo')
})
module.exports=router