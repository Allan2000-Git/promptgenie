"use client"

import Profile from '@components/Profile'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserProfile = ({params}) => {

  const searchParams = useSearchParams()
  const username = searchParams.get("name")

  const [prompts, setPrompts] = useState([])

  useEffect(()=>{
    const fetchPrompts = async() =>{
      const response = await fetch(`/api/users/${params.id}/posts`)
      const data = await response.json()
      setPrompts(data)
    }

    fetchPrompts()
  },[params.id])

  return (
    <Profile
        name={username}
        desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
        data={prompts}
    />
  )
}

export default UserProfile
