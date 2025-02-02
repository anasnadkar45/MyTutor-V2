"use client"
import { Calendar, Star } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ServiceProps } from "@/app/types/service"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"


export function ServiceCard({ service }: { service: ServiceProps }) {
    return (
        <Link href={`/tutor/service/${service.id}`}>
            <Card className="w-full max-w-md bg-card border-2 min-h-[260px] flex flex-col justify-between hover:shadow-lg hover:bg-secondary/50 transition-shadow">
                <CardHeader className="space-y-1 pb-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <Star className="w-5 h-5 fill-primary text-primary" />
                            <span className="font-medium">{service.averageRating ? service.averageRating.toFixed(1) : "N/A"}</span>
                        </div>
                        <Avatar>
                            <AvatarImage src={service.User?.image} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                    </div>
                    <h3 className="text-xl font-semibold tracking-tight line-clamp-2">{service.title}</h3>
                    <p className="text-muted-foreground line-clamp-2">{service.description}</p>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-5 h-5" />
                            <div className="flex gap-2 items-center">
                                <div className="text-sm">{service.serviceType}</div>
                                <div>{service.duration} mins</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                <span className="text-muted-foreground line-through text-sm">₹{(service.price * 1.3).toFixed(2)}</span>
                                <span className="font-semibold text-lg ml-1">₹{service.price}</span>
                            </div>
                            <span className="text-lg">→</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
