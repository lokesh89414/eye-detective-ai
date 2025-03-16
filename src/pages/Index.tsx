import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, LineChart, Zap, CheckCircle, Brain, Users } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import StatsCard from '../components/StatsCard';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for stats
  const stats = [
    { label: 'Eyes Analyzed', value: 25678, icon: <Eye className="h-5 w-5" />, maxValue: 5000 },
    { label: 'Success Rate', value: 98, unit: '%', icon: <CheckCircle className="h-5 w-5" /> },
    { label: 'Medical Partners', value: 126, icon: <Users className="h-5 w-5" /> },
    { label: 'Disease Types', value: 12, icon: <LineChart className="h-5 w-5" /> }
  ];

  // Mock data for testimonials
  const testimonials = [
    {
      quote: "EyeDetect helped me identify early signs of glaucoma that I wouldn't have noticed otherwise. The early detection allowed for timely treatment.",
      author: "Michael Chen",
      role: "Patient",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
    {
      quote: "As an ophthalmologist, I find EyeDetect to be an invaluable tool for preliminary screenings. It helps my patients understand the importance of regular eye check-ups.",
      author: "Dr. Sarah Johnson",
      role: "Ophthalmologist",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-br from-eye-blue to-eye-dark-blue relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="absolute w-full h-full bg-gradient-radial from-white/5 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-block animate-fade-in">
                <div className="bg-white/10 backdrop-blur-sm py-1 px-4 rounded-full text-sm font-medium text-white/90 inline-flex items-center">
                  <span className="animate-pulse bg-white h-2 w-2 rounded-full mr-2"></span>
                  AI-Powered Eye Disease Detection
                </div>
              </div>
              
              <h1 className="hero-text animate-fade-in">
                Detect Eye Diseases <span className="text-eye-light-blue">Early</span> & <span className="text-eye-light-blue">Accurately</span>
              </h1>
              
              <p className="text-xl text-white/80 max-w-2xl animate-fade-in">
                Our AI-powered technology analyzes eye images with high precision to identify early signs of eye diseases. Fast, reliable, and easy to use.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start animate-fade-in">
                <Link to="/prediction" className="btn-primary flex items-center justify-center">
                  Start Diagnosis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/about-disease" className="btn-secondary flex items-center justify-center">
                  Learn About Eye Diseases
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-6 animate-fade-in">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-eye-blue to-eye-light-blue rounded-2xl blur-lg opacity-75 animate-pulse-subtle"></div>
                <div className="relative bg-card/80 backdrop-blur rounded-2xl overflow-hidden border border-white/20">
                  <img 
                    src="https://images.unsplash.com/photo-1559076294-ad5d4efe4178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1024&q=80" 
                    alt="AI eye scanning visualization" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">How It Works</h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Our advanced AI technology makes eye disease detection simple, accurate, and accessible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Eye}
              title="Fast Analysis"
              description="Upload your eye image and receive results in seconds, not days."
              delay={100}
            />
            <FeatureCard 
              icon={CheckCircle}
              title="High Accuracy"
              description="Our AI model has been trained on thousands of medical images for reliable results."
              delay={200}
            />
            <FeatureCard 
              icon={Brain}
              title="AI-Powered"
              description="Advanced deep learning algorithms detect patterns invisible to the human eye."
              delay={300}
            />
            <FeatureCard 
              icon={Zap}
              title="Easy to Use"
              description="Simple interface designed for everyone, no technical expertise required."
              delay={400}
            />
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-blue-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Live Stats Dashboard</h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Real-time metrics demonstrating our platform's impact on eye health worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard 
                key={index}
                label={stat.label}
                value={stat.value}
                unit={stat.unit}
                icon={stat.icon}
                duration={2000 + (index * 500)}
                maxValue={stat.maxValue}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Success Stories</h2>
            <p className="text-xl text-muted-foreground animate-fade-in">
              Hear from people who've benefited from early detection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8 card-hover animate-slide-in-right" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="flex flex-col h-full">
                  <blockquote className="text-lg text-foreground flex-grow mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-eye-light-blue"
                    />
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/prediction" className="btn-primary inline-flex items-center">
              Try It Yourself
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-eye-blue to-eye-dark-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Ready to Check Your Eye Health?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8 animate-fade-in">
            Early detection is crucial for preventing vision loss. Take the first step towards protecting your eyesight today.
          </p>
          <Link to="/prediction" className="btn-secondary inline-flex items-center animate-fade-in">
            Start Free Detection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
