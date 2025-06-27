import { create } from 'zustand'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  duration: number // in minutes
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  rating: number
  studentsCount: number
  progress: number
  isEnrolled: boolean
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  type: 'video' | 'text' | 'quiz' | 'assignment'
  isCompleted: boolean
  isLocked: boolean
  videoUrl?: string
  content?: string
}

interface Quiz {
  id: string
  title: string
  questions: Question[]
  timeLimit?: number
  attempts: number
  maxAttempts: number
  score?: number
  isCompleted: boolean
}

interface Question {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  options?: string[]
  correctAnswer: string | number
  explanation?: string
}

interface LearningStore {
  courses: Course[]
  currentCourse: Course | null
  currentLesson: Lesson | null
  quizzes: Quiz[]
  searchQuery: string
  selectedCategory: string
  selectedLevel: string
  
  // Actions
  setCourses: (courses: Course[]) => void
  setCurrentCourse: (course: Course | null) => void
  setCurrentLesson: (lesson: Lesson | null) => void
  updateLessonProgress: (courseId: string, lessonId: string, isCompleted: boolean) => void
  setSearchQuery: (query: string) => void
  setSelectedCategory: (category: string) => void
  setSelectedLevel: (level: string) => void
  enrollInCourse: (courseId: string) => void
  getFilteredCourses: () => Course[]
}

export const useLearningStore = create<LearningStore>((set, get) => ({
  courses: [],
  currentCourse: null,
  currentLesson: null,
  quizzes: [],
  searchQuery: '',
  selectedCategory: 'all',
  selectedLevel: 'all',

  setCourses: (courses) => set({ courses }),
  setCurrentCourse: (course) => set({ currentCourse: course }),
  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
  
  updateLessonProgress: (courseId, lessonId, isCompleted) => {
    const courses = get().courses.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, isCompleted } : lesson
        )
        const completedLessons = updatedLessons.filter(l => l.isCompleted).length
        const progress = Math.round((completedLessons / updatedLessons.length) * 100)
        
        return { ...course, lessons: updatedLessons, progress }
      }
      return course
    })
    set({ courses })
  },

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),
  
  enrollInCourse: (courseId) => {
    const courses = get().courses.map(course =>
      course.id === courseId ? { ...course, isEnrolled: true } : course
    )
    set({ courses })
  },

  getFilteredCourses: () => {
    const { courses, searchQuery, selectedCategory, selectedLevel } = get()
    
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
      
      return matchesSearch && matchesCategory && matchesLevel
    })
  }
}))