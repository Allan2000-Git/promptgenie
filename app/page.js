import Feed from '@components/Feed'
import React from 'react'

const Home = () => {
  return (
    <section className="w-full flex items-center flex-col gap-4">
      <h1 className="head_text text-center">
        Your gateway to AI-powered creativity
        <br className="sm:hidden md:block"/>
        <span className="purple_gradient">PromptGenie Prompts</span>
      </h1>
      <p className="desc text-center">Seamlessly generate engaging and diverse prompts for your writing projects, brainstorming sessions, or content creation.</p>
      <Feed/>
    </section>
  )
}

export default Home

