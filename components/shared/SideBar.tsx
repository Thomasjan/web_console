'use client';
import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const pathname = usePathname()

  return (
    <aside className='sidebar'>
       
        <div className='flex size-full flex-col gap-4'>
            <Link href='/' className='sidebar-logo'>
                <Image src='/assets/images/gestimum_banner.png' alt='logo' width={180} height={280} />
            </Link>

            <nav className='sidebar-nav'>
                    <ul className='sidebar-nav_elements'>
                        {navLinks.slice(0, navLinks.length-1).map((link) => {
                            const isActive = link.route === pathname
                            return (
                                <li key={link.route} className={`sidebar-nav_element group ${
                                    isActive? 'bg-primary-100 text-white' : 'text-gray-700'
                                }`}>
                                    <Link className='sidebar-link' href={link.route}>
                                        {link.icon}
                                        {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                        </ul>

                        <ul className='sidebar-nav_elements'>
                            {navLinks.slice(navLinks.length-1).map((link) => {
                                const isActive = link.route === pathname
                                return (
                                    <li key={link.route} className={`sidebar-nav_element group ${
                                        isActive? 'bg-purple-gradient text-white' : 'text-gray-700'
                                    }`}>
                                        <Link className='sidebar-link' href={link.route}>
                                            {link.icon}
                                            {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                            
                        </ul>
            </nav>
        </div>
    </aside>
  )
}

export default Sidebar