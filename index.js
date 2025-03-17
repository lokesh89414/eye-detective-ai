
document.addEventListener('DOMContentLoaded', () => {
  // Stats counter animation
  const statsValues = document.querySelectorAll('.stats-value');
  
  statsValues.forEach(stat => {
    const targetValue = parseInt(stat.getAttribute('data-value'));
    const duration = parseInt(stat.getAttribute('data-duration'));
    
    animateCounter(stat, 0, targetValue, duration);
  });
  
  // Helper function to animate number counter
  function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      element.textContent = currentValue.toLocaleString();
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end.toLocaleString();
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Handle hero animations
  const animatedElements = document.querySelectorAll('.animate-fade-in');
  
  // Add a slight stagger to fade-in animations
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });
  
  // Add scroll observer to trigger animations when elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe elements with scale-up and slide-in animations
  document.querySelectorAll('.animate-scale-up, .animate-slide-in-right, .animate-slide-in-left').forEach(el => {
    el.style.opacity = 0;
    observer.observe(el);
  });
});
