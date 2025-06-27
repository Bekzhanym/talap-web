import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  avatar?: string
  role: 'student' | 'teacher' | 'admin'
  preferences: {
    language: string
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
  }
}

interface UserProgress {
  totalCourses: number
  completedCourses: number
  totalLessons: number
  completedLessons: number
  totalQuizzes: number
  completedQuizzes: number
  streakDays: number
  totalStudyTime: number // in minutes
}

interface UserStore {
  profile: UserProfile | null
  progress: UserProgress | null
  setProfile: (profile: UserProfile) => void
  setProgress: (progress: UserProgress) => void
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      profile: null,
      progress: null,
      setProfile: (profile) => set({ profile }),
      setProgress: (progress) => set({ progress }),
      updatePreferences: (preferences) => {
        const currentProfile = get().profile
        if (currentProfile) {
          set({
            profile: {
              ...currentProfile,
              preferences: { ...currentProfile.preferences, ...preferences }
            }
          })
        }
      },
      clearUser: () => set({ profile: null, progress: null })
    }),
    {
      name: 'user-storage'
    }
  )
)