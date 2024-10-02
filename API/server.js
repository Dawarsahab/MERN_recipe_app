"dawaraakarsh2"
"xZ5BXN0qFYh1PIiZ"
import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/user.js'
import bodyParser from 'express'
import recipeRouter from './routes/recipe.js'
import cors from 'cors'
const app=express();
app.use(cors({
    origin:true,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(bodyParser.json())

app.use('/api',userRouter)

app.use('/api',recipeRouter)

mongoose.connect("mongodb+srv://dawaraakarsh2:xZ5BXN0qFYh1PIiZ@cluster0.jlw55.mongodb.net/",
    {
        dbName:"Mern_recipie",
    }
).then(()=>console.log("MongoDb connected"));
const port=3000;

app.listen(port,()=>console.log(`server is running on ${port}`))