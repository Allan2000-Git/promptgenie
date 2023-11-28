"use client";

import { useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = () => {

    const {data: session} = useSession()
    const [prompts, setPrompts] = useState([])
    const router = useRouter(); 

    const handleEdit = (prompt) =>{
        router.push(`/update-prompt?id=${prompt._id}`)
    }

    const handleDelete = async(prompt) =>{
        const confirmDelete = confirm("Are you sure you want to delete this prompt?")

        if(confirmDelete){
            try {
                const response = await fetch(`/api/prompt/${prompt._id}`, {
                    method: "DELETE",
                })

                const newPosts = prompts.filter(p => p._id === prompt._id)
                setPrompts(newPosts)
            } catch (error) {
                console.log("Error while deleting the prompt");
            } 
        }
    }

    useEffect(()=>{
        const fetchPrompts = async() =>{
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setPrompts(data)
        }
    
        if(session?.user.id){
            fetchPrompts()
        }
    },[session?.user.id])

    return (
        <Profile
            name={session?.user.name}
            desc={`Welcome to ${session?.user.name}'s personalized profile page. Explore ${session?.user.name}'s exceptional prompts and be inspired by the power of their imagination`}
            data={prompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile
