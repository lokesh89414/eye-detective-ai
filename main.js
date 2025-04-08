
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuCloseButton = document.querySelector('.mobile-menu-close');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.add('open');
    });
  }
  
  if (mobileMenuCloseButton && mobileMenu) {
    mobileMenuCloseButton.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  }
  
  // Helper function to show toast notifications
  window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') {
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
    } else if (type === 'error') {
      icon = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    }
    
    toast.innerHTML = `
      ${icon}
      <div>${message}</div>
      <div class="toast-progress"></div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast after a small delay
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      
      // Remove from the DOM after transition completes
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };
  
  // Set the current year in the footer
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Animate numbers for stats
  function animateValue(element, start, end, duration) {
    if (!element) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Function to check if an element is in viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to handle animations on scroll
  function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-fade-in, .animate-scale-up, .animate-slide-in-left, .animate-slide-in-right');
    elements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        element.style.animationDelay = element.dataset.delay || '0ms';
        element.style.animationPlayState = 'running';
      }
    });
    
    // Animate stats when they come into view
    const statElements = document.querySelectorAll('.stat-value');
    statElements.forEach((element) => {
      if (isInViewport(element) && !element.classList.contains('animated')) {
        element.classList.add('animated');
        const value = parseInt(element.dataset.value) || 0;
        const unit = element.dataset.unit || '';
        const duration = parseInt(element.dataset.duration) || 2000;
        
        animateValue(element, 0, value, duration);
        
        // Add the unit after animation is complete
        if (unit) {
          setTimeout(() => {
            element.textContent = element.textContent + unit;
          }, duration);
        }
      }
    });
  }
  
  // Initial call to handle animations
  handleScrollAnimations();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimations);
});
