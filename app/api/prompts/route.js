import Prompt from "@models/prompt"
import conn from "@utils/database"

export const GET = async(req, res)=>{
    try {
        await conn()
        const allPrompts = await Prompt.find({}).populate('author')
        return new Response(JSON.stringify(allPrompts), { status: 200 })
    } catch (error) {
        console.log("Could not fetch your prompts");
    }
}