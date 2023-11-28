import Prompt from "@models/prompt"
import conn from "@utils/database"

export const GET = async(req, {params})=>{
    try {
        await conn()
        const allPrompts = await Prompt.find({author: params.id}).populate('author')
        return new Response(JSON.stringify(allPrompts), { status: 200 })
    } catch (error) {
        return new Response(`Could not fetch user prompts`, { status: 500 })
    }
}