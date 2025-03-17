
document.addEventListener('DOMContentLoaded', () => {
  // Mock data for diseases
  const diseases = [
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
  
  // DOM elements
  const diseaseCardsContainer = document.getElementById('diseaseCards');
  const diseaseSearchInput = document.getElementById('diseaseSearch');
  const noResultsDiv = document.getElementById('noResults');
  const clearSearchButton = document.getElementById('clearSearch');
  const cardTemplate = document.getElementById('diseaseCardTemplate');
  
  // Render all disease cards initially
  renderDiseaseCards(diseases);
  
  // Event listeners
  diseaseSearchInput.addEventListener('input', handleSearch);
  clearSearchButton.addEventListener('click', clearSearch);
  
  function handleSearch() {
    const searchTerm = diseaseSearchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
      renderDiseaseCards(diseases);
      return;
    }
    
    const filteredDiseases = diseases.filter(disease => 
      disease.title.toLowerCase().includes(searchTerm) ||
      disease.description.toLowerCase().includes(searchTerm)
    );
    
    if (filteredDiseases.length === 0) {
      diseaseCardsContainer.innerHTML = '';
      noResultsDiv.classList.remove('hidden');
    } else {
      noResultsDiv.classList.add('hidden');
      renderDiseaseCards(filteredDiseases);
    }
  }
  
  function clearSearch() {
    diseaseSearchInput.value = '';
    renderDiseaseCards(diseases);
    noResultsDiv.classList.add('hidden');
  }
  
  function renderDiseaseCards(diseasesToRender) {
    diseaseCardsContainer.innerHTML = '';
    
    diseasesToRender.forEach((disease, index) => {
      const cardClone = cardTemplate.content.cloneNode(true);
      
      // Set animation delay
      const card = cardClone.querySelector('.disease-card');
      card.style.animationDelay = `${index * 0.1}s`;
      
      // Set disease details
      const img = cardClone.querySelector('.disease-image img');
      img.src = disease.image;
      img.alt = disease.title;
      
      cardClone.querySelector('.disease-title').textContent = disease.title;
      cardClone.querySelector('.disease-description').textContent = disease.description;
      
      // Add symptoms
      const symptomsList = cardClone.querySelector('.disease-symptoms .disease-list');
      disease.symptoms.forEach(symptom => {
        const li = document.createElement('li');
        li.textContent = symptom;
        symptomsList.appendChild(li);
      });
      
      // Add treatments
      const treatmentsList = cardClone.querySelector('.disease-treatments .disease-list');
      disease.treatments.forEach(treatment => {
        const li = document.createElement('li');
        li.textContent = treatment;
        treatmentsList.appendChild(li);
      });
      
      diseaseCardsContainer.appendChild(cardClone);
    });
  }
  
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
  
  // Observe elements with animations
  document.querySelectorAll('.animate-scale-up, .animate-slide-in-right, .animate-fade-in').forEach(el => {
    el.style.opacity = 0;
    observer.observe(el);
  });
});
