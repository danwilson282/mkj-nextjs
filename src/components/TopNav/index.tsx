// components/TopNav.tsx

import React, { FC, ReactNode } from "react"
// import { useState } from 'react'
import Link from 'next/link'
import { SanityTopNav } from '@/sanity/types/globals/TopNav'
import { getRelativeUrlFromId } from "@/sanity/helpers/getRelativeUrl"
interface TopNavProps {
  topNav: SanityTopNav
}
const TopNav: FC<TopNavProps> = async ({ topNav }) => {
  // const [isOpen, setIsOpen] = useState(false)
  const navItems = await Promise.all(
    topNav.navLinks?.map(async (link) => {
      const id = link.internalLink?._id;
      let url: ReactNode;

      switch (link.linkType) {
        case "external":
          url = link.externalUrl ?? "/";
          url = (
            <a href={link.externalUrl ?? "/"} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          )
          break;

        case "internal":
          const relativeUrl = id ? await getRelativeUrlFromId(id) : "/";
          url = (
            <Link href={relativeUrl ?? "/"} className="text-white hover:text-gray-300">
                {link.label}
            </Link>
            )
          break;

        default:
          url = (
            <Link href={"/"} className="text-white hover:text-gray-300">
                {link.label}
            </Link>
            )
          break;
      }

      return {
        text: link.label,
        url: url
      };
    }) ?? [] // handle undefined navLinks
  );

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto w-full">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center space-x-4">
              {
                navItems?.map((nav, key)=> (
                  <div key={key}>
                    {nav.url}
                  </div>
              )
              )}
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default TopNav