
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import BottomNav from '../mobile/BottomNav';
import PullToRefresh from '../mobile/PullToRefresh';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Close sidebar on location change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Add pull-to-refresh functionality
  useEffect(() => {
    if (isMobile) {
      let touchStartY = 0;
      let touchEndY = 0;
      
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
      };
      
      const handleTouchMove = (e: TouchEvent) => {
        touchEndY = e.touches[0].clientY;
      };
      
      const handleTouchEnd = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const pullDistance = touchEndY - touchStartY;
        
        if (scrollTop <= 0 && pullDistance > 100) {
          // Simulate reload with animation
          setIsRefreshing(true);
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      };
      
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isMobile]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PullToRefresh isRefreshing={isRefreshing} />
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out",
            isSidebarOpen ? "md:ml-64" : "md:ml-64",
            isMobile ? "pb-20" : "" // Add bottom padding on mobile for bottom nav
          )}
        >
          <div className="container py-4 md:py-8 max-w-7xl animate-fade-in px-3 md:px-6">
            {children}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};

export default Layout;
