import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import signupIllustration from "@/assets/signup-illustration.jpg";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

const dietaryPreferences = ["Veg", "Non-Veg", "Vegan", "Keto"];

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match!",
        variant: "destructive",
      });
      return;
    }
    if (!agreeToTerms) {
      toast({
        title: "Error",
        description: "Please agree to the Terms & Privacy Policy",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await api.post('/auth/signup', {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        dietaryPreference: selectedDiet,
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast({
        title: "Success",
        description: "Account created successfully!",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Signup failed",
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
                  src={signupIllustration}
                  alt="Meal planning and macro tracking dashboard"
                  className="w-full h-auto rounded-2xl shadow-hover"
                />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Start eating smarter.
              </h2>
              <p className="text-lg text-muted-foreground">
                Build your personalized nutrition profile.
              </p>
            </div>

            {/* Right Section - Sign Up Form */}
            <div className="w-full max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-card">
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
                    Create Your FitEats Account
                  </h1>
                  <p className="text-muted-foreground">
                    Join thousands on their fitness journey
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-foreground font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary transition-smooth"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary transition-smooth"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary transition-smooth"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="h-12 rounded-xl border-2 focus:border-primary transition-smooth"
                    />
                  </div>

                  {/* Dietary Preference */}
                  <div className="space-y-2">
                    <Label className="text-foreground font-medium">
                      Dietary Preference (Optional)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {dietaryPreferences.map((diet) => (
                        <button
                          key={diet}
                          type="button"
                          onClick={() => setSelectedDiet(diet === selectedDiet ? "" : diet)}
                          className={`px-4 py-2 rounded-xl border-2 transition-smooth font-medium ${selectedDiet === diet
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary"
                            }`}
                        >
                          {diet}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:text-primary/80 transition-smooth font-medium">
                        Terms & Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  {/* Sign Up Button */}
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                  >
                    Create Account
                  </Button>

                  {/* Login Link */}
                  <div className="text-center pt-4">
                    <p className="text-muted-foreground">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-primary hover:text-primary/80 transition-smooth font-semibold"
                      >
                        Login
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

export default SignUp;
