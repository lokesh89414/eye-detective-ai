
import { useState, useEffect } from 'react';
import { LineChart, Download, Share, AlertTriangle, CheckCircle, Loader2, Microscope, Stethoscope } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';

interface AnalysisResult {
  condition: string;
  confidence: number;
  status: 'healthy' | 'warning' | 'critical';
  description: string;
  recommendation: string;
}

const Prediction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  
  const handleImageSelected = (imageFile: File) => {
    setSelectedImage(imageFile);
    setResult(null);
  };
  
  const startAnalysis = () => {
    if (!selectedImage) {
      toast.error('Please upload an image to analyze');
      return;
    }
    
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 350);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock result - in a real app this would come from your AI model
      const mockResult: AnalysisResult = {
        condition: 'Early-stage Glaucoma',
        confidence: 87.5,
        status: 'warning',
        description: 'Early signs of increased intraocular pressure and optic nerve damage detected. This condition can lead to vision loss if left untreated.',
        recommendation: 'Schedule an appointment with an ophthalmologist within the next 2 weeks for a comprehensive examination.'
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 3500);
  };
  
  const handleDownload = () => {
    if (!result) return;
    
    // In a real application, this would generate a PDF report
    toast.success('Report downloaded successfully');
  };
  
  const handleShare = () => {
    if (!result) return;
    
    // In a real application, this would open a share dialog
    toast.success('Sharing options opened');
  };
  
  return (
    <div className="pt-28 pb-16 bg-eye-light-beige/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <div className="inline-flex p-3 rounded-full bg-eye-light-green mb-4">
            <Microscope className="h-8 w-8 text-eye-green" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-gradient">Eye Disease Prediction</h1>
          <p className="text-xl text-muted-foreground">
            Upload an eye image to detect potential diseases with our AI-powered analysis.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-8 animate-slide-in-left">
            <Card className="bg-eye-light-beige/90 border-eye-beige/50 shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-medium text-eye-dark-green">Upload Eye Image</CardTitle>
                <CardDescription>
                  For best results, upload a clear, well-lit image of the eye. The image should focus on the retina or complete eye.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploader onImageSelected={handleImageSelected} />
                
                <button
                  className={`w-full mt-6 btn-primary flex items-center justify-center ${isAnalyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={startAnalysis}
                  disabled={isAnalyzing || !selectedImage}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spinner" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      Analyze Image
                    </>
                  )}
                </button>
              </CardContent>
            </Card>
            
            <Card className="bg-eye-light-beige/90 border-eye-beige/50 shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-medium text-eye-dark-green">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="bg-eye-light-green text-eye-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-sm font-medium flex-shrink-0">1</span>
                    <span>Upload a clear image of your eye or retina.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-eye-light-green text-eye-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-sm font-medium flex-shrink-0">2</span>
                    <span>Click the "Analyze Image" button to start the AI analysis process.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-eye-light-green text-eye-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-sm font-medium flex-shrink-0">3</span>
                    <span>Wait for a few seconds while our AI analyzes the image.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-eye-light-green text-eye-green rounded-full h-5 w-5 flex items-center justify-center mr-2 text-sm font-medium flex-shrink-0">4</span>
                    <span>Review the results and download or share the report if needed.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          {/* Results Section */}
          <div className="animate-slide-in-right">
            <Card className="h-full bg-eye-light-beige/90 border-eye-beige/50 shadow-soft">
              {!result && !isAnalyzing ? (
                <div className="h-full flex flex-col justify-center items-center p-12">
                  <Stethoscope className="h-16 w-16 text-eye-green/30 mx-auto mb-4" />
                  <h2 className="text-2xl font-medium mb-2 text-eye-dark-green">No Analysis Yet</h2>
                  <p className="text-muted-foreground text-center">
                    Upload an eye image and click "Analyze Image" to get your prediction results.
                  </p>
                </div>
              ) : isAnalyzing ? (
                <div className="h-full flex flex-col justify-center items-center p-12">
                  <div className="relative mx-auto w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-eye-light-green rounded-full animate-pulse-subtle"></div>
                    <div className="absolute inset-3 border-4 border-eye-green rounded-full animate-spinner"></div>
                  </div>
                  <h2 className="text-2xl font-medium mb-2 text-eye-dark-green">Analyzing Your Image</h2>
                  <p className="text-muted-foreground text-center mb-6">
                    Our AI is examining the eye image for potential diseases. This will take just a few seconds...
                  </p>
                  <div className="w-full max-w-md">
                    <Progress value={progress} className="h-2 bg-eye-light-green" />
                    <p className="text-right text-sm text-muted-foreground mt-1">{progress}%</p>
                  </div>
                </div>
              ) : result ? (
                <div className="p-6">
                  <h2 className="text-2xl font-medium mb-6 text-eye-dark-green">Analysis Results</h2>
                  
                  <div className="mb-8">
                    <div className={`rounded-lg p-4 flex items-center ${
                      result.status === 'healthy' 
                        ? 'bg-eye-light-green/30 text-eye-dark-green' 
                        : result.status === 'warning'
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-red-50 text-red-800'
                    }`}>
                      {result.status === 'healthy' ? (
                        <CheckCircle className="h-6 w-6 mr-3 flex-shrink-0" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 mr-3 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium">{result.condition}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-sm mr-2">Confidence:</span>
                          <Badge variant="outline" className="bg-white/50">
                            {result.confidence}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white/50 p-4 rounded-lg border border-eye-beige/30">
                      <h3 className="text-lg font-medium mb-2 text-eye-dark-green">Description</h3>
                      <p className="text-muted-foreground">{result.description}</p>
                    </div>
                    
                    <div className="bg-white/50 p-4 rounded-lg border border-eye-beige/30">
                      <h3 className="text-lg font-medium mb-2 text-eye-dark-green">Recommendation</h3>
                      <p className="text-muted-foreground">{result.recommendation}</p>
                    </div>
                    
                    <div className="pt-4">
                      <div className="text-sm text-muted-foreground mb-4 italic p-3 bg-eye-light-green/20 rounded-lg">
                        <p>Note: This analysis is for informational purposes only and does not constitute medical advice. Always consult with a healthcare professional for proper diagnosis and treatment.</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button onClick={handleDownload} className="btn-primary flex items-center justify-center">
                          <Download className="mr-2 h-5 w-5" />
                          Download Report
                        </button>
                        <button onClick={handleShare} className="btn-secondary flex items-center justify-center bg-white border-eye-green/20 text-eye-green">
                          <Share className="mr-2 h-5 w-5" />
                          Share Results
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
