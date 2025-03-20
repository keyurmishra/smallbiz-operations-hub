
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export interface MobileContextType {
  isMobile: boolean
  isIOS: boolean
  isAndroid: boolean
  isStandalone: boolean
  hasTouchScreen: boolean
}

const defaultContext: MobileContextType = {
  isMobile: false,
  isIOS: false,
  isAndroid: false,
  isStandalone: false,
  hasTouchScreen: false
}

const MobileContext = React.createContext<MobileContextType>(defaultContext)

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [mobileInfo, setMobileInfo] = React.useState<MobileContextType>(defaultContext)

  React.useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const windowWidth = window.innerWidth
      const isMobile = windowWidth < MOBILE_BREAKPOINT
      
      // Detect iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
      
      // Detect Android
      const isAndroid = /Android/.test(navigator.userAgent)
      
      // Check if app is running in standalone mode (installed on home screen)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                          (window.navigator as any).standalone === true
      
      // Check for touch screen capability
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      setMobileInfo({
        isMobile,
        isIOS,
        isAndroid,
        isStandalone,
        hasTouchScreen
      })
    }

    // Initial check
    checkMobile()
    
    // Listen for resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern approach using addEventListener
    const handleChange = () => checkMobile()
    mql.addEventListener('change', handleChange)
    
    window.addEventListener('resize', checkMobile)
    
    return () => {
      mql.removeEventListener('change', handleChange)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <MobileContext.Provider value={mobileInfo}>
      {children}
    </MobileContext.Provider>
  )
}

export function useMobile(): MobileContextType {
  return React.useContext(MobileContext)
}

// For backward compatibility
export function useIsMobile(): boolean {
  const { isMobile } = useMobile()
  return isMobile
}
