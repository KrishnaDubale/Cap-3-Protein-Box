import { UtensilsCrossed, Brain, Activity, Sparkles } from "lucide-react";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Healthy Meal Delivery",
    description: "Curated high-protein meals delivered fresh to your door. Chef-crafted recipes designed for your fitness goals.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "AI Nutrition Tracking",
    description: "Scan meals and auto-log macros with our intelligent AI. Get instant nutritional insights for every meal.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Activity,
    title: "Fitness Integration",
    description: "Seamlessly sync with Fitbit, Apple Health, and Google Fit. Track workouts and adjust nutrition automatically.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sparkles,
    title: "Smart Meal Recommendations",
    description: "AI suggests personalized meals based on your goals, preferences, and activity level. Never guess what to eat.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Why Choose <span className="gradient-primary bg-clip-text text-transparent">Protein Box</span>?
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to achieve your fitness goals in one powerful platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-3xl p-8 shadow-card hover:shadow-hover transition-smooth group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`${feature.bgColor} ${feature.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-smooth`}>
                <feature.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
