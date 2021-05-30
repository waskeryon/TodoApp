const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Scheme=mongoose.Schema

const UserSchema=new Scheme({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    todos:[{type:Scheme.Types.ObjectId,ref:"ToDo"}]
})

UserSchema.statics.login=async function(username,password){
    const user=await this.findOne({username})
    if(user){
        const auth=await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        else{
            throw Error('password is incorrect')
        }
    }
    else{
        throw Error('User not found')
    }
}
UserSchema.pre('save',async function (next){
    const salt=await bcrypt.genSalt()
    console.log(salt)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
const User=new mongoose.model('User',UserSchema)
module.exports=User