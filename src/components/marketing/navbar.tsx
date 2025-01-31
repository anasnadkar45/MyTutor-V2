import Link from "next/link"
import { Wrapper } from "../global/Wrapper"
import Image from "next/image"
import Logo from "../../../public/logo.svg"
import { Button } from "../ui/button"

export const NAV_LINKS = [
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "How it Works",
    href: "#how-it-works",
  },
  {
    name: "FAQ",
    href: "#faq",
  },
  {
    name: "Contact",
    href: "#contact",
  },
]

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full h-20 bg-black/50 border-b border-zinc-800 backdrop-blur-md z-50">
      <Wrapper className="h-full max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src={Logo || "/placeholder.svg"}
                  alt="MyTutor Logo"
                  width={40}
                  height={40}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
              <span className="text-xl font-semibold hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                MyTutor
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link, index) => (
                <li
                  key={index}
                  className="relative text-sm font-medium text-zinc-400 hover:text-white transition-colors group"
                >
                  <Link href={link.href}>{link.name}</Link>
                  <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-200 group-hover:w-full"></div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden lg:block">
              <Button className="relative px-6 overflow-hidden group bg-transparent hover:bg-transparent border-primary border text-white">
                <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                <span className="relative">Get Started</span>
              </Button>
            </Link>
            {/* <MobileMenu /> */}
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default Navbar

