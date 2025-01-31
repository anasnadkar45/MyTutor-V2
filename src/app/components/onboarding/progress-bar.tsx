interface ProgressBarProps {
    currentStep: number
    totalSteps: number
  }
  
  export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    return (
      <div className="space-y-2">
        <div className="flex gap-1">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-12 rounded ${
                i === currentStep - 1 ? "bg-green-500" : i < currentStep - 1 ? "bg-gray-800" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500">
          {currentStep} of {totalSteps}
        </p>
      </div>
    )
  }
  
  