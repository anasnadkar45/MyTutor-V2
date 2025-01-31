import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

export const Footer = () => {
  const footerLinks = {
    RESOURCES: [
      { name: "About", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "Status", href: "#" },
      { name: "Blog", href: "#" },
    ],
    SUPPORT: [
      { name: "Help Center", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Community", href: "#" },
      { name: "Contact us", href: "#" },
    ],
    PARTNERS: [
      { name: "Become a Tutor", href: "#" },
      { name: "Partner Program", href: "#" },
      { name: "Affiliate Program", href: "#" },
      { name: "Success Stories", href: "#" },
    ],
    LEGAL: [
      { name: "Terms", href: "#" },
      { name: "Privacy", href: "#" },
      { name: "Security", href: "#" },
      { name: "Cookies", href: "#" },
    ],
  }

  return (
    <footer className="w-full bg-[#151515] text-white pt-20 pb-12 px-4 md:px-6" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-12">
          {/* Logo and subscription */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">MYTUTOR</h2>
            </div>
            <div className="w-full md:w-auto">
              <div className="relative max-w-md">
                <Input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  className="w-full bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 pl-4 pr-12 py-6 rounded-full"
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-zinc-700 rounded-full transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Links grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-zinc-400 mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href={link.href} className="text-zinc-300 hover:text-white transition-colors text-sm">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}


