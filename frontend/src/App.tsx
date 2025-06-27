import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { AuthForm } from './components/AuthForm'
import { Dashboard } from './pages/Dashboard'
import { Courses } from './pages/Courses'
import { ProtectedRoute } from './components/ProtectedRoute'
import { EmailVerificationPage } from './components/EmailVerificationPage'
import { ResetPasswordPage } from './components/ResetPasswordPage'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<AuthForm mode="login" />} />
              <Route path="/register" element={<AuthForm mode="register" />} />
              <Route path="/verify-email" element={<EmailVerificationPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/courses" 
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/learning-path" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Learning Path</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/achievements" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Achievements</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/discussions" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Discussions</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Analytics</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/schedule" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Schedule</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Profile</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Settings</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/help" 
                element={
                  <ProtectedRoute>
                    <div className="p-8 text-center">
                      <h1 className="text-2xl font-bold">Help & Support</h1>
                      <p className="text-muted-foreground mt-2">Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App