export type UserType = "Tutor" | "Learner" | null
export type WorkType = "mathematics" | "science" | "languages" | "arts" | null
export type LevelType = "beginner" | "intermediate" | "advanced" | "expert" | null

export interface OnboardingState {
  step: number
  userType: UserType
  workType: WorkType
  level: LevelType
}
