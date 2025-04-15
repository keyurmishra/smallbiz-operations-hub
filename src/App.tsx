
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MobileProvider } from "./hooks/use-mobile";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Inventory from "./pages/Inventory";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import SalesAnalytics from "./pages/analytics/SalesAnalytics";
import InventoryAnalytics from "./pages/analytics/InventoryAnalytics";
import CustomerAnalytics from "./pages/analytics/CustomerAnalytics";
import Employees from "./pages/Employees";
import EmployeeDetails from "./pages/employees/EmployeeDetails";
import Billing from "./pages/Billing";
import InventoryItem from "./pages/inventory/InventoryItem";
import InventoryCategories from "./pages/inventory/InventoryCategories";
import InventoryAdjustments from "./pages/inventory/InventoryAdjustments";
import More from "./pages/More";
import Products from "./pages/Products";
import POS from "./pages/POS";
import CustomerManagement from "./pages/CustomerManagement";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/profile/ProfilePage";
import DiscordLayout from "./components/layout/DiscordLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MobileProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Discord-style layout for authenticated routes */}
            <Route path="/" element={<DiscordLayout />}>
              <Route index element={<Index />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory/item/:id" element={<InventoryItem />} />
              <Route path="inventory/categories" element={<InventoryCategories />} />
              <Route path="inventory/adjustments" element={<InventoryAdjustments />} />
              <Route path="products" element={<Products />} />
              <Route path="sales" element={<Sales />} />
              <Route path="pos" element={<POS />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customer-management" element={<CustomerManagement />} />
              <Route path="employees" element={<Employees />} />
              <Route path="employees/:id" element={<EmployeeDetails />} />
              <Route path="billing" element={<Billing />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="analytics/sales" element={<SalesAnalytics />} />
              <Route path="analytics/inventory" element={<InventoryAnalytics />} />
              <Route path="analytics/customers" element={<CustomerAnalytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="more" element={<More />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MobileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
