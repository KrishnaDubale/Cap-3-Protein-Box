import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    avatar: "SJ",
    rating: 5,
    text: "Protein Box completely transformed my meal prep routine. The AI tracking is incredibly accurate, and the meals are delicious!",
  },
  {
    name: "Mike Chen",
    role: "Personal Trainer",
    avatar: "MC",
    rating: 5,
    text: "I recommend this to all my clients. The nutrition insights help them stay on track and reach their goals faster.",
  },
  {
    name: "Emily Rodriguez",
    role: "Busy Professional",
    avatar: "ER",
    rating: 5,
    text: "As someone with a hectic schedule, having healthy meals delivered and tracked automatically is a game-changer.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Loved by <span className="gradient-primary bg-clip-text text-transparent">Thousands</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our community has to say about their transformation
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-3xl p-8 shadow-card hover:shadow-hover transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-heading font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-heading font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
