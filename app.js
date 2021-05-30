const express=require('express')
const app=express();
const UserRouter=require('./router/UserRouter')
const TodoRouter=require('./router/TodoRouter')
const AuthMiddlewares=require('./middlewares/AuthMiddlewares')
const mongoose=require('mongoose')
const CookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const {requireAuth}=require('./middlewares/authMiddlewares')
dbURL='mongodb+srv://dbAdmin:TLLcU7DwES26GGfU@trial1.c7b4d.mongodb.net/TodoApp?retryWrites=true&w=majority' /* connection url  */
mongoose.connect(dbURL,{ useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true }).then((res)=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
})

app.set('view engine','ejs')
app.use(bodyParser.json())
app.use(CookieParser())
app.use(bodyParser.urlencoded({extended:true}))
const cssfile=__dirname+'/views/css/styles.css'
console.log(__dirname)
app.use('/css',express.static(__dirname +'/views/css'));
app.use(TodoRouter)
app.use(UserRouter)