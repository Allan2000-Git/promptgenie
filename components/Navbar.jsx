"use client"

import React, { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import {useSession, signIn, signOut, getProviders} from "next-auth/react"

const Navbar = () => {
    
    const {data: session} = useSession()

    const [providers, setProviders] = useState(null) // Google, Facebook, Github etc...
    const [toggleDropdown, setToggleDropdown] = useState(false); 

    useEffect(()=>{
        const fetchProviders = async() =>{
            const response = await getProviders();
            setProviders(response)
        }

        fetchProviders()
    },[])

    return (
        <nav className="w-full mb-16 pt-7 flex items-center justify-between">
            <Link href="/" className="flex gap-2 items-center">
                <Image src="/assets/images/logo.svg" width="30" height="30" alt="PromptGenie logo" />
                <span className="logo_text">PromptGenie</span>
            </Link>

            {/* desktop view */}
            <div className="sm:flex hidden">
                {
                    session?.user ? <div className="flex gap-3 md:gap-5 items-center">
                        <Link href="/create-prompt" className="black_btn">
                            Create Prompt
                        </Link>
            
                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>

                        <Link href="/profile">
                            <Image src={session.user.image} width="40" height="40" alt="profile" className="rounded-full" />
                        </Link>
                    </div> 
                    : 
                    <>
                    {
                        providers && 
                        Object.values(providers).map(provider => (
                            <button onClick={() => signIn(provider.id)} key={provider.name} className="black_btn" type="button">Sign In</button>
                        ))
                    }
                    </>
                }
            </div>

            {/* mobile view */}
            <div className="sm:hidden flex relative">
                {
                    session?.user ? <div className="flex">
                        <Image onClick={() => setToggleDropdown(prev => !prev)} src={session.user.image} width="40" height="40" alt="profile" className="rounded-full" />
                        {toggleDropdown && (
                        <div className="dropdown">
                            <Link
                                href='/profile'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                            My Profile
                            </Link>

                            <Link
                                href='/create-prompt'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                            Create Prompt
                            </Link>
                            
                            <button
                                type='button'
                                onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                                className='mt-3 w-full black_btn'
                            >
                            Sign Out
                            </button>
                        </div>
                        )}
                    </div> 
                    : 
                    <>
                    {
                        providers && 
                        Object.values(providers).map(provider => (
                            <button onClick={() => signIn(provider.id)} key={provider.name} className="black_btn" type="button">Sign In</button>
                        ))
                    }
                    </>
                }
            </div>
        </nav>
    )
}

export default Navbar
