"use client"

import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({prompts, handleTagClick}) =>{
  return(
    <div className="prompt_layout mt-16">
      {
        prompts.map(prompt => (
          <PromptCard key={prompt._id} prompt={prompt} handleTagClick={handleTagClick}/>
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [prompts, setPrompts] = useState([])

  const [searchInput, setSearchInput] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);


  useEffect(()=>{
    const fetchPrompts = async() =>{
      const response = await fetch("/api/prompts")
      const data = await response.json()
      setPrompts(data)
    }

    fetchPrompts()
  },[])

  const filterPromptsBySearchInput = (search) =>{
    const regex = new RegExp(search, "i")
    const newPrompts = prompts.filter(prompt => regex.test(prompt.author.username) || regex.test(prompt.tag) || regex.test(prompt.prompt))

    return newPrompts
  }

  const handleSearch = (e) =>{
    clearTimeout(searchTimeout)
    setSearchInput(e.target.value)

    // use of debounce method
    setSearchTimeout(setTimeout(()=>{
      const results = filterPromptsBySearchInput(e.target.value)
      setSearchedResults(results)
    },500))
  }

  const handleTagClick = (tagName) =>{
    setSearchInput(tagName)

    const results = filterPromptsBySearchInput(tagName)
    setSearchedResults(results)
  }

  console.log(searchedResults);

  return (
    <section className="feed">
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchInput}
          onChange={handleSearch}
          required
          className='search_input'
        />
      </form>

      {
        searchInput ? (
          <PromptCardList prompts={searchedResults} handleTagClick={handleTagClick} />
        ):(
          <PromptCardList prompts={prompts} handleTagClick={handleTagClick} />
        )
      }
    </section>
  )
}

export default Feed
