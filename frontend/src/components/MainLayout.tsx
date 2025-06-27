import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <main className="ml-64 p-6 flex-1 bg-gray-50">
      {children}
    </main>
  </div>
); 