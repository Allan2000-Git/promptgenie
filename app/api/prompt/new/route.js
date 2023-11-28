import Prompt from "@models/prompt"
import conn from "@utils/database"

export const POST = async(req, res)=>{
    const {prompt, tag, userId} = await req.json()

    try {
        await conn()

        const newPrompt = new Prompt({prompt, tag, author: userId})
        const savedPrompt = await newPrompt.save()

        return new Response(JSON.stringify(savedPrompt), { status: 201 })
    } catch (error) {
        console.log("Couldn't save your prompt");
    }
}