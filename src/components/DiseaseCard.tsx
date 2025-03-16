
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DiseaseCardProps {
  title: string;
  image: string;
  description: string;
  symptoms: string[];
  treatments: string[];
}

const DiseaseCard = ({ title, image, description, symptoms, treatments }: DiseaseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="glass-card overflow-hidden card-hover">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div 
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-lg mb-2">Symptoms</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-lg mb-2">Treatments</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {treatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <button
          className="flex items-center justify-center w-full mt-4 py-2 text-eye-blue hover:text-eye-dark-blue transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
          <ChevronDown className={`ml-1 h-5 w-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default DiseaseCard;
