const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["candidate","recruiter"], //MongoDB/Mongoose will only accept these two values:
        default:"candidate"
    }
}))


const User = mongoose.model("User",userSchema)

module.exports =User