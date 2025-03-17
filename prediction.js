
document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const previewContainer = document.getElementById('previewContainer');
  const previewImage = document.getElementById('previewImage');
  const removeImageButton = document.getElementById('removeImageButton');
  const analyzeButton = document.getElementById('analyzeButton');
  const analyzeButtonText = document.getElementById('analyzeButtonText');
  const analyzeSpinner = document.getElementById('analyzeSpinner');
  
  const noAnalysisSection = document.getElementById('noAnalysis');
  const analyzingSection = document.getElementById('analyzing');
  const resultsSection = document.getElementById('results');
  
  const resultDescription = document.getElementById('resultDescription');
  const resultRecommendation = document.getElementById('resultRecommendation');
  
  const downloadButton = document.getElementById('downloadReport');
  const shareButton = document.getElementById('shareResults');
  
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  let selectedImage = null;
  
  // Event Listeners
  dropzone.addEventListener('click', () => fileInput.click());
  
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('active');
  });
  
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('active');
  });
  
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('active');
    
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  });
  
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFile(fileInput.files[0]);
    }
  });
  
  removeImageButton.addEventListener('click', clearImage);
  
  analyzeButton.addEventListener('click', startAnalysis);
  
  downloadButton.addEventListener('click', handleDownload);
  shareButton.addEventListener('click', handleShare);
  
  // Functions
  function handleFile(file) {
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      showToast('Please upload a JPG or PNG image');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB');
      return;
    }
    
    selectedImage = file;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      dropzone.style.display = 'none';
      previewContainer.style.display = 'block';
      analyzeButton.disabled = false;
    };
    reader.readAsDataURL(file);
  }
  
  function clearImage() {
    selectedImage = null;
    previewImage.src = '';
    dropzone.style.display = 'block';
    previewContainer.style.display = 'none';
    analyzeButton.disabled = true;
    
    // Reset results
    showSection('noAnalysis');
  }
  
  function startAnalysis() {
    if (!selectedImage) {
      showToast('Please upload an image to analyze');
      return;
    }
    
    // Show analyzing UI
    showSection('analyzing');
    analyzeButton.disabled = true;
    analyzeButtonText.textContent = 'Analyzing...';
    analyzeSpinner.classList.remove('hidden');
    
    // This is where you would integrate with your actual prediction model
    // For now, we'll simulate a delay and return mock data
    setTimeout(() => {
      const result = predictEyeDisease(selectedImage);
      displayResults(result);
      
      analyzeButton.disabled = false;
      analyzeButtonText.textContent = 'Analyze Image';
      analyzeSpinner.classList.add('hidden');
    }, 3000);
  }
  
  function showSection(sectionId) {
    noAnalysisSection.classList.add('hidden');
    analyzingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    
    document.getElementById(sectionId).classList.remove('hidden');
  }
  
  function predictEyeDisease(imageFile) {
    // This is a placeholder function where you would integrate your AI model
    // In a real implementation, you might:
    // 1. Send the image to a backend API
    // 2. Process it with TensorFlow.js in the browser
    // 3. Use a pre-trained model loaded in the browser
    
    // For demonstration, we'll return mock data
    // You can replace this with your actual prediction logic
    
    // Mock conditions (randomly select one)
    const conditions = [
      {
        condition: 'Early-stage Glaucoma',
        confidence: 87.5,
        status: 'warning',
        description: 'Early signs of increased intraocular pressure and optic nerve damage detected. This condition can lead to vision loss if left untreated.',
        recommendation: 'Schedule an appointment with an ophthalmologist within the next 2 weeks for a comprehensive examination.'
      },
      {
        condition: 'Diabetic Retinopathy',
        confidence: 92.3,
        status: 'critical',
        description: 'Blood vessel damage in the retina detected, likely due to diabetes. This condition can cause vision problems and potentially lead to blindness if not treated.',
        recommendation: 'Seek immediate consultation with an ophthalmologist who specializes in diabetic eye care. Controlling blood sugar levels is also crucial.'
      },
      {
        condition: 'Healthy Eye',
        confidence: 96.8,
        status: 'healthy',
        description: 'No significant abnormalities detected in the eye. The retina, optic nerve, and blood vessels appear to be in normal condition.',
        recommendation: 'Continue with regular eye check-ups every 1-2 years to maintain eye health. Protect your eyes from UV exposure and practice the 20-20-20 rule when using digital screens.'
      }
    ];
    
    // Return a random condition (in a real app, this would be the actual prediction)
    return conditions[Math.floor(Math.random() * conditions.length)];
  }
  
  function displayResults(result) {
    // Show results section
    showSection('results');
    
    // Create status element
    const statusElement = document.createElement('div');
    statusElement.className = `result-status ${result.status}`;
    
    let iconSvg;
    if (result.status === 'healthy') {
      iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else {
      iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>';
    }
    
    statusElement.innerHTML = `
      ${iconSvg}
      <div>
        <p style="font-weight: 500;">${result.condition}</p>
        <p style="font-size: 0.875rem; opacity: 0.8;">Confidence: ${result.confidence}%</p>
      </div>
    `;
    
    // Clear previous status and append new one
    const resultStatusContainer = document.querySelector('.result-status');
    resultStatusContainer.innerHTML = '';
    resultStatusContainer.appendChild(statusElement);
    
    // Update description and recommendation
    resultDescription.textContent = result.description;
    resultRecommendation.textContent = result.recommendation;
  }
  
  function handleDownload() {
    // In a real application, this would generate a PDF report
    showToast('Report downloaded successfully');
  }
  
  function handleShare() {
    // In a real application, this would open a share dialog
    showToast('Sharing options opened');
  }
  
  function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.classList.add('hidden'), 300);
    }, 3000);
  }
});
