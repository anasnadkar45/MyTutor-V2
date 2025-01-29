import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function SuccessStep() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-green-100 p-3">
        <CheckCircle className="h-12 w-12 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold">Welcome aboard!</h2>
      <p className="text-gray-500">Your profile has been successfully created. You're all set to begin your journey.</p>
      <Button className="mt-4 bg-green-500 hover:bg-green-600">Get Started</Button>
    </div>
  )
}
