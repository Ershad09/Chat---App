import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({

     email:{
        type: String,
        required: true,
        unique: true,
     },

     fullName:{
        type: String,
        required: true,

     },
     password:{
        type:string,
        required: true,
        minlength: 6,
     },
     profilePic:{
        type: string,
        default: ""
     }
}, {timestamps: true})