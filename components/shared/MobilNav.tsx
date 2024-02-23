"use client";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdMenu } from "react-icons/md";

const MobilNav = () => {
    const pathname = usePathname()

  return (
   <header className='header'>
    <Link href='/' className='flex items-center gap-2 md:py-2'>
        <Image src='/assets/images/gestimum_banner.png' alt='logo' width={180} height={280} />
    </Link>
    <nav className='flex gap-2'>
        <Sheet>
            <SheetTrigger>
                <MdMenu size={32} className='cursor-pointer' />
            </SheetTrigger>
            <SheetContent className='sheet-content sm:w-64 bg-gray-200'>
                <>
                  <Image src='/assets/images/gestimum_banner.png' alt='logo' width={152} height={23} />
                  <ul className='header-nav_elements'>
                  {navLinks.map((link) => {
                      const isActive = link.route === pathname
                      return (
                          <li key={link.route} className={`${isActive? 'text-primary-300' : 'text-gray-700'} p-18 flex whitespace-nowrap text-black`}>
                              <Link className='sidebar-link cursor-pointer' href={link.route}>
                                  {link.icon}
                                  {link.label}
                              </Link>
                          </li>
                      )
                  })}
                  </ul>
                </>
            </SheetContent>
        </Sheet>
    </nav>
   </header>
  )
}

export default MobilNav