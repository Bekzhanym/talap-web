import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { StatsCards } from '../components/dashboard/StatsCards'
import { RecentActivity } from '../components/dashboard/RecentActivity'
import { ProgressChart } from '../components/dashboard/ProgressChart'
import { CourseCard } from '../components/courses/CourseCard'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ArrowRight, BookOpen } from 'lucide-react'

// Mock data for featured courses
const featuredCourses = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, props, and state management.',
    thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'John Doe',
    duration: 120,
    level: 'beginner' as const,
    category: 'Programming',
    rating: 4.8,
    studentsCount: 1250,
    progress: 65,
    isEnrolled: true
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts and patterns for large-scale applications.',
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    instructor: 'Jane Smith',
    duration: 180,
    level: 'advanced' as const,
    category: 'Programming',
    rating: 4.9,
    studentsCount: 890,
    isEnrolled: false
  }
]

export const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.displayName || user?.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Ready to continue your learning journey? Let's see what's new today.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <StatsCards />

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Charts and Activity */}
              <div className="lg:col-span-2 space-y-6">
                <ProgressChart />
                <RecentActivity />
              </div>

              {/* Right Column - Quick Actions and Recommendations */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Browse All Courses
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Continue Last Lesson
                    </Button>
                  </CardContent>
                </Card>

                {/* Learning Streak */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Streak</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">7</div>
                      <p className="text-sm text-muted-foreground">
                        Days in a row! Keep it up! 🔥
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Featured Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Continue Learning</h2>
                <Button variant="outline">
                  View All Courses
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {featuredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEnroll={(id) => console.log('Enroll in course:', id)}
                    onContinue={(id) => console.log('Continue course:', id)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}