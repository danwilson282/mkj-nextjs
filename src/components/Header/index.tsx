// components/Header.tsx
import { FC } from "react"
import Image from "next/image"
import { SanityHeader } from "@/sanity/types/globals/Header"
import { cn } from "@/sanity/helpers/className"
interface HeaderProps {
  header: SanityHeader
}
const Header: FC<HeaderProps> = ({ header }) => {
  return (
    <header style={{backgroundColor: header.backgroundColour?.hex ?? ""}} className={cn(
      "flex flex-row items-left ",
      !header.backgroundColour?.hex && "bg-blue-600"
      )}>
        <div className="flex flex-row h-16">
            <Image
                src={header.logo ?? ""}
                alt="Logo"
                width={600}
                height={600}
                className="h-12 w-16 m-2 py-2"
            />
            <div className="w-full container mx-auto max-w-7xl">
                <h1 className="text-xl font-semibold text-white p-6 ">{header.siteTitle}</h1>
            </div>
            
        </div>

    </header>
  )
}

export default Header
