"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({prompt, handleEdit, handleDelete, handleTagClick}) => {

  const {data: session} = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 2000);
  };

  const getUserProfile = async() =>{

    if(prompt.author._id === session?.user.id){
      router.push("/profile")
      return;
    }

    router.push(`/profile/${prompt.author._id}?name=${prompt.author.username}`)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div onClick={getUserProfile} className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.author.image}
            alt={prompt.author.username}
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className="flex flex-col">
            <h3 className="font-opensans font-semibold text-gray-900">
              {prompt.author.username}
            </h3>
            <p className="font-opensans text-sm text-gray-500">
              {prompt.author.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === prompt.prompt ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-opensans text-sm text-gray-700">{prompt.prompt}</p>
      <p className="font-opensans text-sm text-[#be5df8] cursor-pointer" onClick={()=> handleTagClick && handleTagClick(prompt.tag)}><span className="bg-slate-600/5 px-2 py-1 rounded-md">#{prompt.tag}</span></p>
      {
        session?.user.id === prompt.author._id && pathname === "/profile" && (
          <div className="mt-5 flex items-center gap-4 border-t border-gray-100 pt-3">
            <p className="font-opensans text-sm text-green-600 cursor-pointer" onClick={handleEdit}>Edit</p>
            <p className="font-inter text-sm text-red-600 cursor-pointer" onClick={handleDelete}>Delete</p>
          </div>
        )
      }
    </div>
  )
}

export default PromptCard
