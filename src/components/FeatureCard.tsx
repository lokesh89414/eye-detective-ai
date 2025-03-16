
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <div 
      className="glass-card p-6 card-hover animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-3 rounded-full bg-eye-light-green inline-flex mb-4">
        <Icon className="h-6 w-6 text-eye-green" />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
