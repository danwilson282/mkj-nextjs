// components/Header.tsx
import { FC } from "react"
import Image from "next/image"
import { SanityHeader } from "@/sanity/types/globals/Header"
interface HeaderProps {
  header: SanityHeader
}
const Header: FC<HeaderProps> = ({ header }) => {
  return (
    <header className="bg-blue-600 flex flex-row items-left">
        <div className=" flex flex-row items-left h-16">
            <Image
                src={header.logo ?? ""}
                alt="Logo"
                width={600}
                height={600}
                className="h-12 w-16 m-2 py-2"
            />
            <h1 className="text-xl font-semibold text-white p-6 ">{header.siteTitle}</h1>
        </div>

    </header>
  )
}

export default Header
