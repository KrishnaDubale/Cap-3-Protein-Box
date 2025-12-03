import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import loginIllustration from "@/assets/login-illustration.jpg";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast({
        title: "Success",
        description: "Logged in successfully!",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Login failed",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Section - Illustration */}
            <div className="hidden lg:flex flex-col justify-center gradient-soft rounded-3xl p-12 animate-fade-in">
              <div className="mb-8">
                <img
                  src={loginIllustration}
                  alt="Healthy meal bowls and fitness tracking"
                  className="w-full h-auto rounded-2xl shadow-hover"
                />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Welcome back!
              </h2>
              <p className="text-lg text-muted-foreground">
                Fuel your fitness journey with smarter eating.
              </p>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-card">
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                    Login to Your Account
                  </h1>
                  <p className="text-muted-foreground">
                    Continue your wellness journey
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary transition-smooth"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary transition-smooth"
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                  >
                    Login
                  </Button>

                  {/* Sign Up Link */}
                  <div className="text-center pt-4">
                    <p className="text-muted-foreground">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:text-primary/80 transition-smooth font-semibold"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
