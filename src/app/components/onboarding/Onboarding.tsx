"use client"
import type React from "react"
import { useActionState, useEffect, useState } from "react"
import Logo from "../../../../public/logo.svg"
import Image from "next/image"
import { toast } from "sonner"
import {
  Book,
  Calculator,
  Check,
  CheckCircle,
  FlaskConical,
  GraduationCap,
  Languages,
  Loader2,
  Palette,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SubmitButton } from "@/components/global/SubmitButton"
import { redirect } from "next/navigation"
import { onboardUser } from "@/app/actions"
import { SuccessStep } from "./success-step"
import { ProgressBar } from "./progress-bar"

export const Onboarding = () => {
  const initialState = { message: "", status: undefined, errors: {} }
  const [state, formAction] = useActionState(onboardUser, initialState)
  const [step, setStep] = useState(1)
  const [accountName, setAccountName] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [subjectIntrested, setSubjectInterested] = useState<string>('')

  const userTypeOptions = [
    {
      id: "Tutor",
      title: "I want to teach",
      description: "Share your knowledge and help others learn",
      icon: <GraduationCap className="h-6 w-6" />,
    },
    {
      id: "Learner",
      title: "I want to learn",
      description: "Expand your knowledge and skills",
      icon: <Book className="h-6 w-6" />,
    },
  ]

  const subjectOptions = [
    {
      id: "mathematics",
      title: "Mathematics",
      icon: <Calculator className="h-6 w-6" />,
    },
    {
      id: "science",
      title: "Science",
      icon: <FlaskConical className="h-6 w-6" />,
    },
    {
      id: "languages",
      title: "Languages",
      icon: <Languages className="h-6 w-6" />,
    },
    {
      id: "arts",
      title: "Arts",
      icon: <Palette className="h-6 w-6" />,
    },
  ]

  const levelOptions = [
    {
      id: "beginner",
      title: "Beginner",
      description: accountName === "Tutor" ? "1-2 years of experience" : "Just starting out",
    },
    {
      id: "intermediate",
      title: "Intermediate",
      description: accountName === "Tutor" ? "2-5 years of experience" : "Some knowledge",
    },
    {
      id: "advanced",
      title: "Advanced",
      description: accountName === "Tutor" ? "5-10 years of experience" : "Considerable experience",
    },
    {
      id: "expert",
      title: "Expert",
      description: accountName === "Tutor" ? "10+ years of experience" : "Deep understanding",
    },
  ]

  useEffect(() => {
    console.log("State updated:", state)
    if (state?.status === "success") {
      toast.success(state.message)
      if (accountName === "Tutor") {
        redirect('/tutor/dashboard')
      }else {
        redirect('/learner/dashboard')
      }
    } else if (state?.status === "error") {
      toast.error(state?.message)
    }
  }, [state])

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1 className="text-3xl font-bold mb-8">What brings you here?</h1>
            <div className="grid gap-4 md:grid-cols-2">
              {userTypeOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`relative cursor-pointer p-6 transition-all hover:bg-secondary ${accountName === option.id ? "border-green-500 bg-secondary" : "bg-card"
                    }`}
                  onClick={() => setAccountName(option.id)}
                >
                  {accountName === option.id && (
                    <div className="absolute right-2 top-2 rounded-full bg-green-500 p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${accountName === option.id ? "bg-green-500" : "bg-gray-100"
                      }`}
                  >
                    <div className={accountName === option.id ? "text-white" : "text-gray-500"}>{option.icon}</div>
                  </div>
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{option.description}</p>
                </Card>
              ))}
            </div>
          </>
        )

      case 2:
        return (
          <>
            <h1 className="text-3xl font-bold mb-8">What subject interests you?</h1>
            <div className="grid gap-4 md:grid-cols-2">
              {subjectOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`relative cursor-pointer p-6 transition-all hover:bg-secondary ${subjectIntrested === option.id ? "border-green-500 bg-secondary" : "bg-card"
                    }`}
                  onClick={() => setSubjectInterested(option.id)}
                >
                  {subjectIntrested === option.id && (
                    <div className="absolute right-2 top-2 rounded-full bg-green-500 p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${subjectIntrested === option.id ? "bg-green-500" : "bg-gray-100"
                      }`}
                  >
                    <div className={subjectIntrested === option.id ? "text-white" : "text-gray-500"}>
                      {option.icon}
                    </div>
                  </div>
                  <h3 className="font-medium">{option.title}</h3>
                </Card>
              ))}
            </div>
          </>
        )

      case 3:
        return (
          <>
            <h1 className="text-3xl font-bold mb-8">
              {accountName === "Tutor" ? "What is your experience level?" : "What is your current level?"}
            </h1>
            <div className="grid gap-4 md:grid-cols-2">
              {levelOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`relative cursor-pointer p-6 transition-all hover:bg-secondary ${experience === option.id ? "border-green-500 bg-secondary" : "bg-card"
                    }`}
                  onClick={() => setExperience(option.id)}
                >
                  {experience === option.id && (
                    <div className="absolute right-2 top-2 rounded-full bg-green-500 p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`mb-2 flex h-12 w-fit items-center justify-center rounded-md p-2 ${experience === option.id ? "bg-green-500" : "bg-gray-100"
                      }`}
                  >
                    <div className={experience === option.id ? "text-white" : "text-gray-500"}>{option.title}</div>
                  </div>
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{option.description}</p>
                </Card>
              ))}
            </div>
          </>
        )

      case 4:
        return <SuccessStep />

      default:
        return null
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return accountName !== null
      case 2:
        return subjectIntrested !== null
      case 3:
        return experience !== null
      default:
        return false
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="flex flex-1 flex-col p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Image src={Logo || "/placeholder.svg"} alt="Messimo" width={40} height={40} />
            <span className="font-bold text-2xl">MyTutor</span>
          </div>
          <div className="mt-4">{step < 4 && <ProgressBar currentStep={step} totalSteps={3} />}</div>
        </div>

        {renderStep()}

        {step < 4 && (
          <form action={formAction}>
            <input type="hidden" name="accountName" value={accountName as string} />
            <input type="hidden" name="subjectIntrested" value={subjectIntrested as string} />
            <input type="hidden" name="experience" value={experience as string} />
            {step < 4 && (
              <div className="mt-auto flex items-center justify-between pt-8">
                <Button variant="ghost" onClick={handleBack} disabled={step === 1}>
                  Back
                </Button>
                {step < 3 ? (
                  <Button className="bg-green-500 hover:bg-green-600" onClick={handleNext} disabled={!canProceed()}>
                    Continue
                  </Button>
                ) : (
                  <SubmitButton text="Submit" />
                )}
              </div>
            )}
          </form>
        )}
      </div>

      <div className="hidden bg-[#c6ff9d] mx-auto lg:flex lg:w-[45%]">{/* Add your illustration here */}</div>
    </div>
  )
}