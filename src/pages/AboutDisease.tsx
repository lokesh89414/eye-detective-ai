
import { useState, useEffect } from 'react';
import { Search, Eye, ArrowRight } from 'lucide-react';
import DiseaseCard from '../components/DiseaseCard';
import { Link } from 'react-router-dom';

interface Disease {
  id: number;
  title: string;
  image: string;
  description: string;
  symptoms: string[];
  treatments: string[];
}

const AboutDisease = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for diseases
  const diseases: Disease[] = [
    {
      id: 1,
      title: 'Glaucoma',
      image: 'https://images.unsplash.com/photo-1589394547299-95ae5fb0aca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      description: 'Glaucoma is a group of eye conditions that damage the optic nerve, often caused by abnormally high pressure in the eye.',
      symptoms: [
        'Patchy blind spots in peripheral vision',
        'Tunnel vision in advanced stages',
        'Severe headache',
        'Eye pain',
        'Nausea and vomiting',
        'Blurred vision',
        'Halos around lights'
      ],
      treatments: [
        'Prescription eye drops',
        'Oral medications',
        'Laser therapy',
        'Microsurgery',
        'Regular eye check-ups for early detection'
      ]
    },
    {
      id: 2,
      title: 'Diabetic Retinopathy',
      image: 'https://images.unsplash.com/photo-1578496479531-32dd50db4b72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      description: 'Diabetic retinopathy is a diabetes complication that affects the eyes, caused by damage to the blood vessels in the retina.',
      symptoms: [
        'Floaters in vision',
        'Blurred vision',
        'Fluctuating vision',
        'Dark areas in vision',
        'Vision loss',
        'Color perception changes'
      ],
      treatments: [
        'Managing diabetes through diet and medication',
        'Focal laser treatment',
        'Anti-VEGF injections',
        'Vitrectomy surgery',
        'Regular eye screening for diabetic patients'
      ]
    },
    {
      id: 3,
      title: 'Cataracts',
      image: 'https://images.unsplash.com/photo-1585115704784-d6dc0bf699e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      description: 'A cataract is a clouding of the normally clear lens of the eye, leading to decreased vision. It develops when proteins in the lens break down and clump together.',
      symptoms: [
        'Clouded or blurred vision',
        'Difficulty seeing at night',
        'Sensitivity to light and glare',
        'Seeing halos around lights',
        'Fading or yellowing of colors',
        'Double vision in one eye'
      ],
      treatments: [
        'New glasses or contact lenses (early stages)',
        'Cataract surgery with lens replacement',
        'Lifestyle adjustments for better vision',
        'Regular eye examinations'
      ]
    },
    {
      id: 4,
      title: 'Age-related Macular Degeneration (AMD)',
      image: 'https://images.unsplash.com/photo-1551033541-7480e63a412b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      description: 'AMD is a common eye condition and a leading cause of vision loss among people age 50 and older, causing damage to the macula, the central part of the retina.',
      symptoms: [
        'Blurred or distorted central vision',
        'Dark, blurry areas in the center of vision',
        'Diminished color perception',
        'Difficulty recognizing faces',
        'Straight lines appearing wavy or distorted'
      ],
      treatments: [
        'Anti-VEGF therapy',
        'Photodynamic therapy',
        'Laser therapy',
        'Vitamin supplements (AREDS formula)',
        'Lifestyle changes: quitting smoking, healthy diet'
      ]
    }
  ];
  
  const filteredDiseases = diseases.filter(disease => 
    disease.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // FAQ data
  const faqs = [
    {
      question: 'How accurate is the AI disease detection?',
      answer: 'Our AI model has achieved an accuracy rate of approximately 90-95% in detecting common eye diseases, comparable to experienced ophthalmologists. However, it\'s designed to be a screening tool and not a replacement for professional medical diagnosis.'
    },
    {
      question: 'How often should I get my eyes checked?',
      answer: 'Most eye care professionals recommend a comprehensive eye exam every 1-2 years, depending on your age, risk factors, and whether you currently wear glasses or contact lenses. Those with existing eye conditions or diseases like diabetes may need more frequent examinations.'
    },
    {
      question: 'Can eye diseases be prevented?',
      answer: 'While not all eye diseases can be prevented, many can be detected early and managed effectively. Maintaining a healthy lifestyle, protecting your eyes from UV exposure, not smoking, and having regular eye exams are all ways to reduce your risk and catch issues early.'
    },
    {
      question: 'Is the online detection service a replacement for visiting an eye doctor?',
      answer: 'No, our AI detection service is meant to be a preliminary screening tool and should not replace regular visits to an eye care professional. Always follow up with a doctor for proper diagnosis and treatment plans.'
    },
  ];
  
  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">About Eye Diseases</h1>
          <p className="text-xl text-muted-foreground animate-fade-in">
            Learn about common eye diseases, their symptoms, causes, and treatments.
          </p>
        </div>
        
        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search for a disease..."
              className="bg-white border border-eye-light-blue/30 text-foreground rounded-full w-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-eye-blue/50"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        {/* Disease Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredDiseases.length > 0 ? (
            filteredDiseases.map((disease) => (
              <div key={disease.id} className="animate-scale-up">
                <DiseaseCard
                  title={disease.title}
                  image={disease.image}
                  description={disease.description}
                  symptoms={disease.symptoms}
                  treatments={disease.treatments}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Eye className="h-16 w-16 text-eye-blue/30 mx-auto mb-4" />
              <h3 className="text-2xl font-medium mb-2">No matching diseases found</h3>
              <p className="text-muted-foreground mb-4">
                Try searching with different keywords or clear your search.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn-primary"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
        
        {/* FAQ Section */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground animate-fade-in">
              Common questions about eye health and disease detection.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card p-6 animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                  <h3 className="text-xl font-medium mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="glass-card p-8 md:p-12 text-center animate-scale-up">
          <h2 className="text-3xl font-bold mb-4">Ready to Check Your Eye Health?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
            Early detection of eye diseases is crucial for successful treatment. Use our AI-powered service to screen for potential issues.
          </p>
          <Link to="/prediction" className="btn-primary inline-flex items-center">
            Start Free Detection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutDisease;
