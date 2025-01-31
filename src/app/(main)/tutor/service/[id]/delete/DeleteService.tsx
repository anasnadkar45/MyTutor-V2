"use client"
import React, { useActionState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteService } from "@/app/actions"
import { SubmitButton } from "@/components/global/SubmitButton"
import type { ServiceProps } from "@/app/types/service"

export const DeleteService = ({ service }: { service: ServiceProps }) => {
  const initialState = { message: "", status: undefined, errors: {} }
  const [state, formAction] = useActionState(deleteService, initialState)

  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message)
      return redirect("/tutor/service/")
    } else if (state?.status === "error") {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction}>
      <input type="hidden" name="serviceId" value={service.id} />
      <SubmitButton text="Delete" variant="destructive" />
    </form>
  )
}
