'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Crown, Globe, HomeIcon, PhoneCallIcon, Settings, UserCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Logo from '../../../../public/logo.svg'
import { ModeToggle } from '@/components/global/ModeToggle'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/utils/auth'
import { handleSignOut } from '@/app/actions'

const sidebarLinks = [
    {
        category: "GENERAL",
        links: [
            { id: 0, name: "Dashboard", href: `/learner/dashboard`, icon: HomeIcon },
            { id: 1, name: "Bookings", href: `/learner/bookings`, icon: PhoneCallIcon },
        ],
    },
    {
        category: "TUTORS",
        links: [
            { id: 1, name: "Discover", href: `/learner/discover`, icon: Globe },
        ],
    },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="hidden md:flex flex-col h-[calc(100vh-1.5rem)] w-[260px] bg-card border-2 rounded-lg">
            <div className="flex items-center border-b h-16 gap-3 p-4">
                <Image src={Logo} alt="Studify" className="size-12" />
                <h1 className="font-bold text-2xl">MyTutor</h1>
                <ModeToggle />
            </div>

            <div className="flex h-full flex-col justify-between p-2">
                <div className="space-y-6 mt-4">
                    {sidebarLinks.map((section) => (
                        <div key={section.category} className="space-y-1">
                            <h2 className="px-4 text-xs font-bold text-zinc-500">{section.category}</h2>
                            <nav className="space-y-1">
                                {section.links.map((link) => (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white",
                                            pathname.includes(link.href) && "bg-primary text-slate-950 hover:bg-primary/90 hover:text-slate-800"
                                        )}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>

                <div className="mx-2 rounded-lg bg-primary p-4 space-y-2">
                    <div className="text-center text-background">
                        <h3 className="text-xl font-bold">Become Pro Access</h3>
                        <p className="mt-1 text-sm">Try your experience for using more features</p>
                    </div>
                    <Button className="mt-4 w-full bg-[#EEB58F] font-medium text-zinc-900 hover:bg-[#d7a07b]">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade Pro
                    </Button>
                    <form action={handleSignOut}>
                        <Button type='submit' className='w-full' variant={'secondary'}>
                            Logout
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}