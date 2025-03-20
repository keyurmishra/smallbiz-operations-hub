
import React, { useState, useEffect, useRef } from 'react';
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
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const lastScrollPosition = useRef(0);
  const pullDistance = useRef(0);
  const isScrolled = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);

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

  // Add pull-to-refresh functionality with more responsive feel
  useEffect(() => {
    if (isMobile && mainRef.current) {
      const main = mainRef.current;
      
      const handleTouchStart = (e: TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        lastScrollPosition.current = main.scrollTop;
        pullDistance.current = 0;
        isScrolled.current = false;
      };
      
      const handleTouchMove = (e: TouchEvent) => {
        touchEndY.current = e.touches[0].clientY;
        const scrollTop = main.scrollTop;
        
        // Only allow pull-to-refresh when at the top of the page
        if (scrollTop <= 0 && touchEndY.current > touchStartY.current) {
          const distance = touchEndY.current - touchStartY.current;
          // Add resistance to pulling
          pullDistance.current = Math.pow(distance, 0.8);
          
          // Prevent default scrolling behavior when pulling down
          if (distance > 10) {
            e.preventDefault();
          }
        } else {
          isScrolled.current = true;
        }
      };
      
      const handleTouchEnd = () => {
        // If we've pulled down enough and haven't scrolled the page
        if (pullDistance.current > 80 && !isScrolled.current) {
          setIsRefreshing(true);
          // Add haptic feedback if available
          if (navigator.vibrate) {
            navigator.vibrate([15]);
          }
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
        
        // Reset pull distance
        pullDistance.current = 0;
      };
      
      main.addEventListener('touchstart', handleTouchStart, { passive: false });
      main.addEventListener('touchmove', handleTouchMove, { passive: false });
      main.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        main.removeEventListener('touchstart', handleTouchStart);
        main.removeEventListener('touchmove', handleTouchMove);
        main.removeEventListener('touchend', handleTouchEnd);
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
          ref={mainRef}
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out",
            isSidebarOpen ? "md:ml-64" : "md:ml-64",
            isMobile ? "pb-20" : "", // Add bottom padding on mobile for bottom nav
            "overscroll-behavior-y-contain" // Prevent bounce on iOS
          )}
          style={{ WebkitOverflowScrolling: 'touch' }}
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
