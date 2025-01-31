import type { ServiceProps } from "@/app/types/service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface YourServicesProps {
  services: ServiceProps[]
}

export function YourServices({ services }: YourServicesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{service.title}</p>
                <p className="text-sm text-muted-foreground">
                  ${service.price} / {service.duration} min
                </p>
              </div>
              <Badge variant={service.serviceType === "Call" ? "default" : "secondary"}>
                {service.serviceType === "Call" ? "Call" : "Message"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
