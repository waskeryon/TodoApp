const mongoose=require('mongoose')
const Scheme=mongoose.Schema

const ToDoScheme=new Scheme({
    text:{type:String,required:true},
    owner:{type:Scheme.Types.ObjectId,ref:"User"}
})


module.exports=mongoose.model("ToDo",ToDoScheme)