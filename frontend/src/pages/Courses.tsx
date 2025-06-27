import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { CourseCard } from '../components/courses/CourseCard'
import { CourseFilters } from '../components/courses/CourseFilters'
import { useLearningStore } from '../stores/useLearningStore'
import { Button } from '../components/ui/Button'
import { Grid, List } from 'lucide-react'

// Mock courses data
const mockCourses = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, props, and state management.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'John Doe',
    duration: 120,
    level: 'beginner' as const,
    category: 'programming',
    rating: 4.8,
    studentsCount: 1250,
    progress: 65,
    isEnrolled: true,
    lessons: []
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts and patterns for large-scale applications.',
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'Jane Smith',
    duration: 180,
    level: 'advanced' as const,
    category: 'programming',
    rating: 4.9,
    studentsCount: 890,
    isEnrolled: false,
    lessons: []
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'Sarah Johnson',
    duration: 90,
    level: 'beginner' as const,
    category: 'design',
    rating: 4.7,
    studentsCount: 2100,
    isEnrolled: true,
    progress: 30,
    lessons: []
  },
  {
    id: '4',
    title: 'Digital Marketing Strategy',
    description: 'Comprehensive guide to digital marketing including SEO, social media, and analytics.',
    thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'Mike Wilson',
    duration: 150,
    level: 'intermediate' as const,
    category: 'marketing',
    rating: 4.6,
    studentsCount: 1800,
    isEnrolled: false,
    lessons: []
  },
  {
    id: '5',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning with Python.',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'Dr. Emily Chen',
    duration: 240,
    level: 'intermediate' as const,
    category: 'data science',
    rating: 4.9,
    studentsCount: 950,
    isEnrolled: false,
    lessons: []
  },
  {
    id: '6',
    title: 'Business Strategy Fundamentals',
    description: 'Essential concepts in business strategy, planning, and execution.',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'Robert Davis',
    duration: 100,
    level: 'beginner' as const,
    category: 'business',
    rating: 4.5,
    studentsCount: 1600,
    isEnrolled: true,
    progress: 80,
    lessons: []
  }
]

export const Courses = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { courses, setCourses, getFilteredCourses, enrollInCourse } = useLearningStore()

  useEffect(() => {
    // Initialize with mock data
    setCourses(mockCourses)
  }, [setCourses])

  const filteredCourses = getFilteredCourses()

  const handleEnroll = (courseId: string) => {
    enrollInCourse(courseId)
  }

  const handleContinue = (courseId: string) => {
    console.log('Continue course:', courseId)
    // Navigate to course page
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl font-bold">All Courses</h1>
                <p className="text-muted-foreground mt-2">
                  Discover and enroll in courses to advance your skills
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CourseFilters />
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-muted-foreground">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </motion.div>

            {/* Courses Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
                  : 'space-y-4'
              }
            >
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard
                    course={course}
                    onEnroll={handleEnroll}
                    onContinue={handleContinue}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}