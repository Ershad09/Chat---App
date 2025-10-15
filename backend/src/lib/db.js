import mongoose from 'mongoose'

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDB Connectrd Successfully!")
    } catch (error) {
        console.log("mongoDb connection error:", error)
    }
}