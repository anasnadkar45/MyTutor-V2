"use client"

import { useActionState, useEffect, useState } from "react"
import { Star } from "lucide-react"
import { submitRating } from "@/app/actions"
import { toast } from "sonner"
import { SubmitButton } from "@/components/global/SubmitButton"

interface StarRatingProps {
    bookingId: string
}

export function StarRating({ bookingId }: StarRatingProps) {
    const [rating, setRating] = useState(0)
    const initialState = { message: "", status: undefined, errors: {} }
    const [state, formAction] = useActionState(submitRating, initialState);

    useEffect(() => {
        if (state?.status === "success") {
            toast.success(state.message)
        } else if (state?.status === "error") {
            toast.error(state.message)
            console.log(state.errors)
        }
    }, [state]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
            <form action={formAction}>
                <input type="hidden" name="bookingId" value={bookingId} />
                <input type="hidden" name="stars" value={rating} />
                <SubmitButton
                    text="Submit Rating"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                />
            </form>
            {state?.status === "error" && <p className="text-red-500 mt-2">{state.message}</p>}
            {state?.status === "success" && <p className="text-green-500 mt-2">{state.message}</p>}
        </div>
    )
}

