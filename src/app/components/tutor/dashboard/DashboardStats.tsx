import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalBookings: number
    totalServices: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    { title: "Total Bookings", value: stats.totalBookings.toString(), icon: Calendar },
    { title: "Total Services", value: stats.totalServices.toString(), icon: BookOpen },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {statItems.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
