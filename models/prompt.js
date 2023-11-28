const mongoose = require("mongoose")

const PromptSchema = mongoose.Schema({
    prompt:{
        type: String,
        required: [true, "Prompt is required"]
    },
    tag:{
        type: String,
        required: [true, "Tag is required"]
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema)

export default Prompt