"use client"

import React, { useState } from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from '@components/Form';

const CreatePrompt = () => {

    const {data: session} = useSession()
    const router = useRouter()

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    const createPrompt = async(e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                })
            })

            if(response.ok){
                router.push("/")
            }
        } catch (error) {
            console.log("Error while submitting the form");
        } finally{
            setIsSubmitting(false);
        }
    }

    return (
        <Form handleFormSubmit={createPrompt} post={post} setPost={setPost} type="Create" submitting={submitting} />
    )
}

export default CreatePrompt
