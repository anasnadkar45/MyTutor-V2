import type { ServiceProps } from "@/app/types/service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BookedServicesProps {
  services: ServiceProps[]
}

export function BookedServices({ services }: BookedServicesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booked Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{service.title}</p>
                <p className="text-sm text-muted-foreground">{service.User?.name}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={service.serviceType === "Call" ? "default" : "secondary"}>{service.serviceType}</Badge>
                <span className="text-sm text-muted-foreground">
                  {service._count && service._count.Booking !== undefined
                    ? `${service._count.Booking} booking${service._count.Booking !== 1 ? "s" : ""}`
                    : "N/A"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
