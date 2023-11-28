"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import Form from '@components/Form';

const UpdatePrompt = () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    const updatePrompt = async(e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
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

    useEffect(()=>{
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`);
            const data = await response.json();

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            });
        };

        if (promptId){
            getPromptDetails();
        }
    },[promptId])

    return (
        <Form handleFormSubmit={updatePrompt} post={post} setPost={setPost} type="Update" submitting={submitting} />
    )
}

export default UpdatePrompt
