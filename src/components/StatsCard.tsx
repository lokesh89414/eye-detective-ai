
import { useEffect, useState } from 'react';

interface StatsCardProps {
  label: string;
  value: number;
  unit?: string;
  icon: React.ReactNode;
  color?: string;
  duration?: number;
  maxValue?: number; // Cap for the displayed value
  randomize?: boolean; // New prop to randomize the displayed value
}

const StatsCard = ({ 
  label, 
  value, 
  unit = '', 
  icon,
  color = 'bg-eye-light-green text-eye-green',
  duration = 2000,
  maxValue, // Optional cap for the displayed value
  randomize = false // Whether to show a random number
}: StatsCardProps) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    // Generate a random number between 1 and maxValue if randomize is true
    const randomValue = randomize && maxValue 
      ? Math.floor(Math.random() * maxValue) + 1 
      : value;
    
    // Use the maxValue if provided, otherwise use the actual value or random value
    const end = maxValue 
      ? Math.min(randomize ? randomValue : value, maxValue) 
      : Math.min(value, 9999);
    
    // Don't want a divide by zero error!
    if (start === end) return;
    
    const incrementTime = duration / end;
    const timer = setInterval(() => {
      start = Math.min(start + 1, end);
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration, maxValue, randomize]);

  return (
    <div className="glass-card p-6 animate-scale-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-muted-foreground font-medium mb-1">{label}</p>
          <h4 className="text-3xl font-display font-semibold">
            {count.toLocaleString()}{unit}
          </h4>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
