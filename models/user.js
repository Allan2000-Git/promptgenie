const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    email:{
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    username:{
        type: String,
        required: [true, "Username is required"]
    },
    image:String
})

const User = mongoose.models.User || mongoose.model("User", UserSchema)

export default User