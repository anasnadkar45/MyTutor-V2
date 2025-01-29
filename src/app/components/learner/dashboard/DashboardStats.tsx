import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar } from "lucide-react"

interface DashboardStatsProps {
  stats: {
    totalBookings: number
    upcomingBookings: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    { title: "Total Bookings", value: stats.totalBookings.toString(), icon: BookOpen },
    { title: "Upcoming Bookings", value: stats.upcomingBookings.toString(), icon: Calendar },
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
