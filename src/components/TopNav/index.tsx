// components/TopNav.tsx

'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300 hidden md:inline">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300 hidden md:inline">
              Contact
            </Link>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm">
              Login
            </button>

            {/* Hamburger menu */}
            <button
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
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
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
        )}
      </div>
    </nav>
  )
}
