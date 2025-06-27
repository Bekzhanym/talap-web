import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { EmailVerificationPage } from './components/EmailVerificationPage';
import { ResetPasswordPage } from './components/ResetPasswordPage';
import { Sidebar } from './components/Sidebar';
import './App.css';

const noSidebarRoutes = ['/login', '/register', '/verify-email', '/reset-password'];

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideSidebar = noSidebarRoutes.includes(location.pathname);
  return (
    <div className="App flex">
      {!hideSidebar && <Sidebar />}
      <div className={hideSidebar ? 'w-full' : 'flex-1 ml-64 min-h-screen'}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/login" element={<AuthForm mode="login" />} />
            <Route path="/register" element={<AuthForm mode="register" />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
