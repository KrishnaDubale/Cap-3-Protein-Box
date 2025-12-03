import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { OrderMeals } from "./pages/dashboard/OrderMeals";
import { MealPlans } from "./pages/dashboard/MealPlans";
import { DietPlan } from "./pages/dashboard/DietPlan";
import { Membership } from "./pages/dashboard/Membership";
import { PlanDetails } from "./pages/dashboard/PlanDetails";
import MembershipPayment from "./pages/MembershipPayment";
import MembershipSuccess from "./pages/MembershipSuccess";
import { AIRecommendations } from "./pages/dashboard/AIRecommendations";
import { ProgressTracker } from "./pages/dashboard/ProgressTracker";
import { Settings } from "./pages/dashboard/Settings";
import { Cart } from "./pages/dashboard/Cart";
import { Address } from "./pages/dashboard/checkout/Address";
import { Payment } from "./pages/dashboard/checkout/Payment";
import { OrderSuccess } from "./pages/dashboard/checkout/OrderSuccess";
import { OrderStatus } from "./pages/dashboard/OrderStatus";
import { OrderHistory } from "./pages/dashboard/profile/OrderHistory";
import { OrderDetails } from "./pages/dashboard/profile/OrderDetails";
import { Profile } from "./pages/dashboard/Profile";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="meals" element={<OrderMeals />} />
                <Route path="meal-plans" element={<MealPlans />} />
                <Route path="diet-plan" element={<DietPlan />} />
                <Route path="membership" element={<Membership />} />
                <Route path="membership/details" element={<PlanDetails />} />
                <Route path="membership/payment" element={<MembershipPayment />} />
                <Route path="membership/success" element={<MembershipSuccess />} />
                <Route path="ai-coach" element={<AIRecommendations />} />
                <Route path="progress" element={<ProgressTracker />} />
                <Route path="settings" element={<Settings />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout/address" element={<Address />} />
                <Route path="checkout/payment" element={<Payment />} />
                <Route path="checkout/success" element={<OrderSuccess />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="orders/:orderId" element={<OrderDetails />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
