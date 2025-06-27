import { motion } from 'framer-motion'
import { BookOpen, Clock, Trophy, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import { useUserStore } from '../../stores/useUserStore'
import { formatDuration } from '../../lib/utils'

export const StatsCards = () => {
  const { progress } = useUserStore()

  const stats = [
    {
      title: 'Courses Completed',
      value: progress?.completedCourses || 0,
      total: progress?.totalCourses || 0,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Study Time',
      value: formatDuration((progress?.totalStudyTime || 0) * 60),
      subtitle: 'This month',
      icon: Clock,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Current Streak',
      value: progress?.streakDays || 0,
      subtitle: 'Days',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Progress Rate',
      value: progress ? Math.round((progress.completedLessons / progress.totalLessons) * 100) : 0,
      subtitle: '% Complete',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {typeof stat.value === 'string' ? stat.value : stat.value}
                {stat.total && <span className="text-sm text-muted-foreground">/{stat.total}</span>}
              </div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.subtitle}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}