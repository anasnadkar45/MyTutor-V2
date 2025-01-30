import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export default function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-[1px] rounded-3xl bg-gradient-to-b from-[#434343] to-[#37373725]">
      <Card className="w-full max-w-[320px] bg-[#080808] border-0 backdrop-blur-sm rounded-3xl p-4 min-h-[250px]">
        <CardContent className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#141414] from-50% to-[#3a3a3a8b] flex items-center justify-center">
            <Icon className="w-6 h-6 text-zinc-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-medium text-zinc-300">{title}</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

