import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroMeal from "@/assets/hero-meal.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative py-20 lg:py-32 gradient-soft overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground leading-tight">
              Eat Smart.
              <br />
              Train Hard.
              <br />
              <span className="gradient-primary bg-clip-text text-transparent inline-block">
                Track Everything.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl">
              The all-in-one platform for healthy meal delivery, AI nutrition tracking, and fitness integration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button variant="outline" size="lg">
                Explore Meals
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Meals Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Floating Cards */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-hover">
              <img
                src={heroMeal}
                alt="Healthy protein meal with grilled chicken, vegetables, and quinoa"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Floating Card 1 - Calories */}
            <div className="absolute -left-4 top-1/4 glass rounded-2xl p-4 shadow-card animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-sm text-muted-foreground font-medium mb-1">Calories</div>
              <div className="text-2xl font-heading font-bold text-foreground">520 kcal</div>
            </div>

            {/* Floating Card 2 - Protein */}
            <div className="absolute -right-4 top-1/3 glass rounded-2xl p-4 shadow-card animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-sm text-muted-foreground font-medium mb-1">Protein</div>
              <div className="text-2xl font-heading font-bold text-primary">42g</div>
            </div>

            {/* Floating Card 3 - Recommended */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 glass rounded-2xl p-4 shadow-card max-w-xs animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="text-sm font-medium text-foreground">Recommended Meal of the Day</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Hero;
