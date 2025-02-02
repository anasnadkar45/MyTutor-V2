"use client"
import { completeBooking } from "@/app/actions"
import { SubmitButton } from "@/components/global/SubmitButton"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

interface CompleteBookingButtonProps {
    bookingId: string
}

export function CompleteBookingButton({ bookingId }: CompleteBookingButtonProps) {
    const initialState = { message: "", status: undefined, errors: {} }
    const [state, formAction] = useActionState(completeBooking, initialState);

    useEffect(() => {
        if (state?.status === "success") {
            toast.success(state.message)
        } else if (state?.status === "error") {
            toast.error(state.message)
            console.log(state.errors)
        }
    }, [state]);

    return (
        <form action={formAction}>
            <input type="hidden" name="bookingId" value={bookingId} />
            <SubmitButton text="Complete Booking" />
            {state?.status === "error" && <p className="text-red-500 mt-2">{state.message}</p>}
            {state?.status === "success" && <p className="text-green-500 mt-2">{state.message}</p>}
        </form>
    )
}

