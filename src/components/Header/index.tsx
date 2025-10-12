// components/Header.tsx
import Image from "next/image"
export default function Header() {
  return (
    <header className="bg-blue-600 flex flex-row items-left">
        <div className=" flex flex-row items-left h-16">
            <Image
                src="https://cdn.worldvectorlogo.com/logos/svg-2.svg"
                alt="Logo"
                width={600}
                height={600}
                className="h-12 w-16 m-2 py-2"
            />
            <h1 className="text-xl font-semibold text-white p-6 ">Welcome to My Website</h1>
        </div>

    </header>
  )
}
