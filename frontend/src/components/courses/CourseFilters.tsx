import { Search, Filter } from 'lucide-react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { useLearningStore } from '../../stores/useLearningStore'

const categories = [
  'All',
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Data Science',
  'Languages'
]

const levels = [
  'All',
  'Beginner',
  'Intermediate',
  'Advanced'
]

export const CourseFilters = () => {
  const {
    searchQuery,
    selectedCategory,
    selectedLevel,
    setSearchQuery,
    setSelectedCategory,
    setSelectedLevel
  } = useLearningStore()

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Categories */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.toLowerCase())}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Levels */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Level</h4>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Button
                key={level}
                variant={selectedLevel === level.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLevel(level.toLowerCase())}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery) && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchQuery && (
            <Badge variant="secondary" className="gap-1">
              Search: {searchQuery}
              <button
                onClick={() => setSearchQuery('')}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory('all')}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedLevel !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedLevel}
              <button
                onClick={() => setSelectedLevel('all')}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}