"use client"

import type { ServiceProps } from "@/app/types/service"
import { Button } from "@/components/ui/button"
import React from "react"
import { useRouter } from "next/navigation"
import { ServiceCard } from "./service-card"

export const ServicesPagination = ({
  services,
  totalCount,
  pageSize,
  currentPage,
}: {
  services: ServiceProps[]
  totalCount: number
  pageSize: number
  currentPage: number
}) => {
  const router = useRouter()

  const totalPages = Math.ceil(totalCount / pageSize)

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`)
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto">
        {services.map((service: ServiceProps) => (
          <ServiceCard key={service.id} service={service} parentRoute={"learner/discover"} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}
