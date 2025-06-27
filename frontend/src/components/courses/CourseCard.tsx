import { motion } from 'framer-motion'
import { Clock, Users, Star, Play, BookOpen } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Progress } from '../ui/Progress'
import { formatDuration } from '../../lib/utils'

interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: string
  duration: number
  level: 'beginner' | 'intermediate' | 'advanced'
  category: string
  rating: number
  studentsCount: number
  progress?: number
  isEnrolled: boolean
}

interface CourseCardProps {
  course: Course
  onEnroll?: (courseId: string) => void
  onContinue?: (courseId: string) => void
}

const levelColors = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800'
}

export const CourseCard = ({ course, onEnroll, onContinue }: CourseCardProps) => {
  const handleAction = () => {
    if (course.isEnrolled) {
      onContinue?.(course.id)
    } else {
      onEnroll?.(course.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge className={levelColors[course.level]}>
              {course.level}
            </Badge>
          </div>
          {course.isEnrolled && course.progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
              <Progress value={course.progress} className="h-2" />
              <span className="text-white text-xs mt-1 block">
                {course.progress}% Complete
              </span>
            </div>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
              {course.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </CardHeader>

        <CardContent className="pb-3">
          <div className="space-y-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>{course.instructor}</span>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{formatDuration(course.duration * 60)}</span>
              </div>
              
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{course.studentsCount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
              
              <Badge variant="outline" className="text-xs">
                {course.category}
              </Badge>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            onClick={handleAction}
            className="w-full"
            variant={course.isEnrolled ? "outline" : "default"}
          >
            {course.isEnrolled ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </>
            ) : (
              'Enroll Now'
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}