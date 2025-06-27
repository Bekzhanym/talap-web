import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  MessageSquare, 
  BarChart3,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { Badge } from '../ui/Badge'

const navigationItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    badge: null
  },
  {
    title: 'My Courses',
    href: '/courses',
    icon: BookOpen,
    badge: null
  },
  {
    title: 'Learning Path',
    href: '/learning-path',
    icon: GraduationCap,
    badge: 'New'
  },
  {
    title: 'Achievements',
    href: '/achievements',
    icon: Trophy,
    badge: null
  },
  {
    title: 'Discussions',
    href: '/discussions',
    icon: MessageSquare,
    badge: '5'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    badge: null
  },
  {
    title: 'Schedule',
    href: '/schedule',
    icon: Calendar,
    badge: null
  }
]

const bottomItems = [
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings
  },
  {
    title: 'Help & Support',
    href: '/help',
    icon: HelpCircle
  }
]

export const Sidebar = () => {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full flex-col">
        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </div>
                
                {item.badge && (
                  <Badge 
                    variant={item.badge === 'New' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {item.badge}
                  </Badge>
                )}
                
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 h-6 w-1 rounded-r-full bg-primary-foreground"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t p-4 space-y-1">
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </aside>
  )
}