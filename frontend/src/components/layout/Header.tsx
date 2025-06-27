import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  BookOpen,
  Menu,
  X
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useUserStore } from '../../stores/useUserStore'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Badge } from '../ui/Badge'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { profile } = useUserStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Talap</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses, lessons..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 px-2"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar} />
                <AvatarFallback>
                  {profile ? getInitials(`${profile.firstName} ${profile.lastName}`) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:block text-sm font-medium">
                {profile ? `${profile.firstName} ${profile.lastName}` : user?.email}
              </span>
            </Button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 rounded-md border bg-popover p-1 shadow-md"
              >
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">{profile?.firstName} {profile?.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 text-sm hover:bg-accent rounded-sm"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                
                <Link
                  to="/settings"
                  className="flex items-center px-3 py-2 text-sm hover:bg-accent rounded-sm"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
                
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent rounded-sm text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t bg-background"
        >
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search courses..." className="pl-10" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 text-sm hover:bg-accent rounded-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
              
              <Link
                to="/settings"
                className="flex items-center px-3 py-2 text-sm hover:bg-accent rounded-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
              
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-3 py-2 text-sm hover:bg-accent rounded-sm text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}