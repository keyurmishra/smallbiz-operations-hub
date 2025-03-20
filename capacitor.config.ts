
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c81f6d913575439ab909ab45083eea89',
  appName: 'smallbiz-operations-hub',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://c81f6d91-3575-439a-b909-ab45083eea89.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  // Improve platform-specific settings
  ios: {
    contentInset: "always",
    allowsLinkPreview: false,
    scrollEnabled: true,
    usesFindInteraction: false,
    limitsNavigationsToAppBoundDomains: true,
  },
  android: {
    initialFocus: false,
    allowBackForwardNavigationGestures: true,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#FFFFFF",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#FFFFFF",
      overlaysWebView: false,
      animation: "fade",
    },
  },
};

export default config;
