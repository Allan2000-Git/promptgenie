import Prompt from "@models/prompt"
import conn from "@utils/database"


export const GET = async(req, {params})=>{
    try {
        await conn()
        const prompt = await Prompt.findById(params.id).populate('author')
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Not prompt found", { status: 500 })
    }
}

export const PATCH = async(req, {params})=>{
    const {prompt, tag} = await req.json()

    try {
        await conn()
        const updatedPrompt = await Prompt.findByIdAndUpdate(params.id, {prompt, tag}).populate('author')
        return new Response(JSON.stringify(updatedPrompt), { status: 200 })
    } catch (error) {
        return new Response("Not prompt found", { status: 500 })
    }
}


export const DELETE = async(req, {params})=>{
    try {
        await conn()

        const deletedPrompt = await Prompt.findByIdAndDelete(params.id)
        return new Response(JSON.stringify(deletedPrompt), { status: 200 })
    } catch (error) {
        return new Response("Could not delete the prompt", { status: 500 })
    }
}