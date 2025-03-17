
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const previewContainer = document.getElementById('preview-container');
  const previewImage = document.getElementById('preview-image');
  const removeButton = document.getElementById('remove-button');
  const analyzeButton = document.getElementById('analyze-button');
  const buttonText = document.getElementById('button-text');
  const loadingIndicator = document.getElementById('loading-indicator');
  
  const emptyState = document.getElementById('empty-state');
  const analyzingState = document.getElementById('analyzing-state');
  const resultsState = document.getElementById('results-state');
  
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  
  const resultSummary = document.getElementById('result-summary');
  const resultDescription = document.getElementById('result-description');
  const resultRecommendation = document.getElementById('result-recommendation');
  
  const downloadButton = document.getElementById('download-button');
  const shareButton = document.getElementById('share-button');
  
  let selectedFile = null;
  
  // Initialize event listeners
  dropzone.addEventListener('click', () => fileInput.click());
  
  // File drop events
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('border-blue-500', 'bg-blue-50');
  });
  
  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('border-blue-500', 'bg-blue-50');
  });
  
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('border-blue-500', 'bg-blue-50');
    
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  });
  
  // File selection from input
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
      handleFile(fileInput.files[0]);
    }
  });
  
  // Remove image button
  removeButton.addEventListener('click', clearImage);
  
  // Analyze button
  analyzeButton.addEventListener('click', startAnalysis);
  
  // Download and share buttons
  downloadButton.addEventListener('click', handleDownload);
  shareButton.addEventListener('click', handleShare);
  
  // Functions
  function handleFile(file) {
    // Check file type
    if (!file.type.startsWith('image/')) {
      showToast('Please upload an image file', 'error');
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image size should be less than 5MB', 'error');
      return;
    }
    
    // Set selected file and preview
    selectedFile = file;
    const previewUrl = URL.createObjectURL(file);
    previewImage.src = previewUrl;
    
    // Show preview and enable analyze button
    dropzone.style.display = 'none';
    previewContainer.hidden = false;
    analyzeButton.disabled = false;
    
    showToast('Image uploaded successfully', 'success');
  }
  
  function clearImage() {
    // Reset the file input
    fileInput.value = '';
    selectedFile = null;
    
    // Hide preview and disable analyze button
    if (previewImage.src) {
      URL.revokeObjectURL(previewImage.src);
      previewImage.src = '';
    }
    
    previewContainer.hidden = true;
    dropzone.style.display = 'block';
    analyzeButton.disabled = true;
  }
  
  function startAnalysis() {
    if (!selectedFile) {
      showToast('Please upload an image to analyze', 'error');
      return;
    }
    
    // Show analyzing state
    emptyState.hidden = true;
    analyzingState.hidden = false;
    resultsState.hidden = true;
    
    // Update button
    analyzeButton.disabled = true;
    buttonText.hidden = true;
    loadingIndicator.hidden = false;
    
    // Reset progress
    let progress = 0;
    updateProgress(progress);
    
    // Simulate progress (in a real app, this would be based on API feedback)
    const interval = setInterval(() => {
      progress += 10;
      updateProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(showResults, 500); // Small delay after reaching 100%
      }
    }, 350);
  }
  
  function updateProgress(value) {
    progressFill.style.width = `${value}%`;
    progressText.textContent = `${value}%`;
  }
  
  function showResults() {
    // Reset button
    buttonText.hidden = false;
    loadingIndicator.hidden = true;
    analyzeButton.disabled = false;
    
    // Show results state
    emptyState.hidden = true;
    analyzingState.hidden = true;
    resultsState.hidden = false;
    
    // Mock result - in a real app this would come from your AI model
    const mockResult = {
      condition: 'Early-stage Glaucoma',
      confidence: 87.5,
      status: 'warning', // 'healthy', 'warning', or 'critical'
      description: 'Early signs of increased intraocular pressure and optic nerve damage detected. This condition can lead to vision loss if left untreated.',
      recommendation: 'Schedule an appointment with an ophthalmologist within the next 2 weeks for a comprehensive examination.'
    };
    
    // Populate result data
    displayResult(mockResult);
  }
  
  function displayResult(result) {
    // Create summary HTML based on status
    let summaryHTML = '';
    
    if (result.status === 'healthy') {
      resultSummary.className = 'result-summary healthy';
      summaryHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div class="result-summary-text">
          <p>${result.condition}</p>
          <div>
            <span class="confidence-badge">Confidence: ${result.confidence}%</span>
          </div>
        </div>
      `;
    } else if (result.status === 'warning') {
      resultSummary.className = 'result-summary warning';
      summaryHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <div class="result-summary-text">
          <p>${result.condition}</p>
          <div>
            <span class="confidence-badge">Confidence: ${result.confidence}%</span>
          </div>
        </div>
      `;
    } else {
      resultSummary.className = 'result-summary critical';
      summaryHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <div class="result-summary-text">
          <p>${result.condition}</p>
          <div>
            <span class="confidence-badge">Confidence: ${result.confidence}%</span>
          </div>
        </div>
      `;
    }
    
    resultSummary.innerHTML = summaryHTML;
    resultDescription.textContent = result.description;
    resultRecommendation.textContent = result.recommendation;
  }
  
  function handleDownload() {
    // In a real application, this would generate a PDF report
    showToast('Report downloaded successfully', 'success');
  }
  
  function handleShare() {
    // In a real application, this would open a share dialog
    showToast('Sharing options opened', 'success');
  }
  
  function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.hidden = false;
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        toast.hidden = true;
        toast.classList.remove('fade-out');
      }, 300);
    }, 3000);
  }

  // Add custom model interface here
  // You can modify this function to integrate your own AI model
  function predictEyeDisease(imageFile) {
    return new Promise((resolve, reject) => {
      // This is where you would call your AI model's API
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        // Mock result - replace this with your actual API call
        const result = {
          condition: 'Early-stage Glaucoma',
          confidence: 87.5,
          status: 'warning',
          description: 'Early signs of increased intraocular pressure and optic nerve damage detected. This condition can lead to vision loss if left untreated.',
          recommendation: 'Schedule an appointment with an ophthalmologist within the next 2 weeks for a comprehensive examination.'
        };
        
        resolve(result);
      }, 3000);
    });
  }
});
