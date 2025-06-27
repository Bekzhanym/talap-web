import { motion } from 'framer-motion'
import { Clock, CheckCircle, PlayCircle, BookOpen } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { formatDate } from '../../lib/utils'

interface Activity {
  id: string
  type: 'lesson_completed' | 'quiz_completed' | 'course_started' | 'achievement_earned'
  title: string
  description: string
  timestamp: string
  metadata?: {
    score?: number
    duration?: number
    courseTitle?: string
  }
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'lesson_completed',
    title: 'Introduction to React Hooks',
    description: 'Completed lesson in React Fundamentals',
    timestamp: new Date().toISOString(),
    metadata: { courseTitle: 'React Fundamentals', duration: 25 }
  },
  {
    id: '2',
    type: 'quiz_completed',
    title: 'JavaScript Basics Quiz',
    description: 'Scored 85% on the quiz',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    metadata: { score: 85 }
  },
  {
    id: '3',
    type: 'course_started',
    title: 'Advanced TypeScript',
    description: 'Started new course',
    timestamp: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '4',
    type: 'achievement_earned',
    title: 'First Course Completed',
    description: 'Earned achievement for completing first course',
    timestamp: new Date(Date.now() - 259200000).toISOString()
  }
]

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'lesson_completed':
      return CheckCircle
    case 'quiz_completed':
      return CheckCircle
    case 'course_started':
      return PlayCircle
    case 'achievement_earned':
      return BookOpen
    default:
      return Clock
  }
}

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'lesson_completed':
      return 'text-green-600'
    case 'quiz_completed':
      return 'text-blue-600'
    case 'course_started':
      return 'text-purple-600'
    case 'achievement_earned':
      return 'text-yellow-600'
    default:
      return 'text-gray-600'
  }
}

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type)
            const iconColor = getActivityColor(activity.type)
            
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className={`p-2 rounded-full bg-accent ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium truncate">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(activity.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                  
                  {activity.metadata && (
                    <div className="flex items-center space-x-2 mt-2">
                      {activity.metadata.score && (
                        <Badge variant="secondary" className="text-xs">
                          Score: {activity.metadata.score}%
                        </Badge>
                      )}
                      {activity.metadata.duration && (
                        <Badge variant="outline" className="text-xs">
                          {activity.metadata.duration}min
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}