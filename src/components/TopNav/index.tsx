// components/TopNav.tsx

import React, { FC, ReactNode } from "react"
// import { useState } from 'react'
import Link from 'next/link'
import { SanityTopNav } from '@/sanity/types/globals/TopNav'
import { getRelativeUrlFromId, getIdFromRelativeUrl } from "@/sanity/helpers/getRelativeUrl"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

            {/* Hamburger menu */}
            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? 'M6 18L18 6M6 6l12 12'
                      : 'M4 6h16M4 12h16M4 18h16'
                  }
                />
              </svg>
            </button> */}
          </div>
        </div>

        {/* Mobile menu */}
        {/* {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link href="/" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Home
            </Link>
            <Link href="/about" className="block px-3 py-2 hover:bg-gray-700 rounded">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 hover:bg-gray-700 rounded">
              Contact
            </Link>
          </div>
        )} */}
      </div>
    </nav>
  )
}

export default TopNav