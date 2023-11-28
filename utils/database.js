import mongoose from "mongoose";

const conn = async () =>{
    await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error connecting to database", err))
}

export default conn