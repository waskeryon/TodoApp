const ToDo=require('../models/todo')
const User=require('../models/users')
const authMiddlewares=require('../middlewares/AuthMiddlewares')
const todo = require('../models/todo')
const { text, json } = require('body-parser')
const getTodo=async(req,res)=>{
    const userid=await authMiddlewares.checkUser(req)
    
    const todolist=await User.find({_id:userid}).populate('todos').then((result)=>{
        console.log(result)
        return result
    }).catch((err)=>{
        console.log(err)
    })
    if(todolist){
        
    }
    
    var todos=[]
     todolistJson=JSON.stringify(todolist)
     console.log(todolistJson[todos])
    
    
    res.render('todo',{title:'todo',todolist:todolist})
    
}
const postTodo=async (req,res)=>{
    const token=req.cookies.jwt
 const text=req.body.text
const userid=await authMiddlewares.checkUser(req)
if(text!=""){
    const todo=new ToDo({text,userid})
   todo.save().then((result)=>{
       User.findOne({_id:userid},(err,user)=>{
           if(user){
               user.todos.push(todo)
               user.save()
               
           }
           else{
               console.log(err)
           }

       })
       res.redirect('/todo')
   }).catch((err)=>{
       console.log(err)
   })
  
}
else{console.log('bos')}
/**/



}
module.exports={
    getTodo,postTodo
}