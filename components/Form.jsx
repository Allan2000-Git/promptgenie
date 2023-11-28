import React from 'react'
import Link from "next/link"

const Form = ({handleFormSubmit, post, setPost, type, submitting}) => {
  return (
    <section className="w-full max-w-full flex items-start flex-col">
      <h1 className="head_text"><span className="blue_gradient">{type} Prompt</span></h1>
      <p className="desc max-w-md">
        {type} and streamline your creative process with PromptGenie, your ultimate companion for AI-driven inspiration.
      </p>
      <form onSubmit={handleFormSubmit} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI Prompt</span>
          <textarea value={post.prompt} onChange={(e) => setPost({...post, prompt: e.target.value})} placeholder="Write your prompt here" required className="form_textarea"></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Tag</span>
          <input value={post.tag} onChange={(e) => setPost({...post, tag: e.target.value})} placeholder="#product, #webdevelopment, #ai, etc." required className="form_input"></input>
        </label>
        <div className="flex items-center justify-end mx-3 mb-5 gap-10">
          <Link href='/' className="text-gray-500 text-md">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="px-10 py-3 text-md bg-primary-purple rounded-full text-white font-medium">
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
