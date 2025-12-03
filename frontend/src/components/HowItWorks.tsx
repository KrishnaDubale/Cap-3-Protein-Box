import { Target, ShoppingBag, PieChart, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Target,
    number: "01",
    title: "Enter Fitness Goals",
    description: "Tell us about your fitness journey, dietary preferences, and target macros.",
  },
  {
    icon: ShoppingBag,
    number: "02",
    title: "Choose Meals",
    description: "Browse our curated menu of high-protein meals crafted by nutrition experts.",
  },
  {
    icon: PieChart,
    number: "03",
    title: "Track Calories & Macros",
    description: "AI automatically logs your nutrition data and syncs with your fitness apps.",
  },
  {
    icon: TrendingUp,
    number: "04",
    title: "See Progress Instantly",
    description: "Watch your health metrics improve with real-time insights and recommendations.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-32 gradient-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            How It <span className="gradient-primary bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes and transform your nutrition journey
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Connector Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-accent opacity-20 -translate-x-1/2"></div>
              )}

              <div className="bg-card rounded-3xl p-8 shadow-card hover:shadow-hover transition-smooth relative z-10">
                {/* Step Number */}
                <div className="text-6xl font-heading font-bold gradient-primary bg-clip-text text-transparent opacity-20 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="bg-primary/10 text-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                  <step.icon className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
