function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Floating Navigation System
document.addEventListener('DOMContentLoaded', function() {
  const floatingNav = document.querySelector('.floating-navbar');
  const navLinks = document.querySelectorAll('.nav-pills a');
  const sections = document.querySelectorAll('section[id]');
  const logoOrb = document.querySelector('.logo-orb');
  
  // Scroll effects
  function handleScroll() {
    if (window.scrollY > 80) {
      floatingNav.classList.add('scrolled');
    } else {
      floatingNav.classList.remove('scrolled');
    }
    
    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Smooth navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Logo click - scroll to top
  logoOrb.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Mouse parallax effect
  document.addEventListener('mousemove', function(e) {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 10;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 5;
    
    floatingNav.style.transform = `translateX(-50%) translateX(${mouseX}px) translateY(${mouseY}px)`;
  });
  
  // Initialize
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  
  // Hero Interactions
  initHeroAnimations();
});

// Hero Animation System
function initHeroAnimations() {
  const heroLogo = document.querySelector('.hero-logo');
  const contentCard = document.querySelector('.content-card');
  
  // Interactive logo hover
  if (heroLogo) {
    heroLogo.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(5deg)';
      this.style.filter = 'drop-shadow(0 12px 35px rgba(245, 124, 0, 0.6))';
    });
    
    heroLogo.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.filter = 'drop-shadow(0 8px 25px rgba(245, 124, 0, 0.4))';
    });
  }
  
  // Content card tilt effect
  if (contentCard) {
    contentCard.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    contentCard.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  }
  
  // Parallax effect on mouse move
  document.addEventListener('mousemove', function(e) {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    const floatingOrbs = document.querySelector('.hero-floating-orbs');
    const particles = document.querySelector('.hero-particles');
    
    if (floatingOrbs) {
      floatingOrbs.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
    }
    
    if (particles) {
      particles.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
    }
  });
  
  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => {
    const finalNumber = stat.textContent;
    const isPercentage = finalNumber.includes('%');
    const number = parseInt(finalNumber);
    
    let current = 0;
    const increment = number / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
    }, 20);
  });
  
  // Ensure about section is visible and functional
  setTimeout(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.style.display = 'block';
      aboutSection.style.minHeight = 'auto';
    }
    
    // Ensure all cards are visible
    const cards = document.querySelectorAll('.philosophy-card');
    cards.forEach(card => {
      card.style.display = 'block';
      card.style.opacity = '1';
    });
  }, 100);
  
  // About section interactions
  initInnovativeAboutAnimations();
}

// Innovative About Section Animation System
function initInnovativeAboutAnimations() {
  // Animated Counter for Metrics
  const metricNumbers = document.querySelectorAll('.metric-number');
  
  const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      
      element.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  // Interactive Modern Philosophy Cards
  const modernCards = document.querySelectorAll('.modern-card');
  const logoHexagon = document.querySelector('.logo-hexagon');
  
  modernCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const cardType = this.getAttribute('data-card');
      
      // Animate the hexagon logo based on card type
      if (logoHexagon) {
        switch(cardType) {
          case 'mission':
            logoHexagon.style.transform = 'scale(1.1) rotate(120deg)';
            logoHexagon.style.background = 'linear-gradient(135deg, #F57C00 0%, #FF9800 100%)';
            break;
          case 'vision':
            logoHexagon.style.transform = 'scale(1.1) rotate(240deg)';
            logoHexagon.style.background = 'linear-gradient(135deg, #F57C00 0%, #FF5722 100%)';
            break;
          case 'values':
            logoHexagon.style.transform = 'scale(1.1) rotate(360deg)';
            logoHexagon.style.background = 'linear-gradient(135deg, #F57C00 0%, #FFC107 100%)';
            break;
        }
        logoHexagon.style.boxShadow = '0 20px 40px rgba(245, 124, 0, 0.4)';
      }
      
      // Add ripple effect
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(245, 124, 0, 0.3)';
      ripple.style.borderRadius = '50%';
      ripple.style.top = '50%';
      ripple.style.left = '0';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'rippleExpand 0.6s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
    
    card.addEventListener('mouseleave', function() {
      // Reset hexagon logo
      if (logoHexagon) {
        logoHexagon.style.transform = '';
        logoHexagon.style.background = 'linear-gradient(135deg, #F57C00 0%, rgba(245, 124, 0, 0.8) 100%)';
        logoHexagon.style.boxShadow = '';
      }
    });
  });
  
  // Add CSS for ripple animation
  const rippleStyles = `
    @keyframes rippleExpand {
      0% {
        width: 20px;
        height: 20px;
        opacity: 1;
      }
      100% {
        width: 200px;
        height: 200px;
        opacity: 0;
      }
    }
  `;
  
  const rippleStyleSheet = document.createElement('style');
  rippleStyleSheet.textContent = rippleStyles;
  document.head.appendChild(rippleStyleSheet);
  
  // Quote Slider Functionality
  const quoteSlides = document.querySelectorAll('.quote-slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlide = 0;
  
  const showSlide = (index) => {
    quoteSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  };
  
  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % quoteSlides.length;
    showSlide(currentSlide);
  };
  
  // Auto-rotate quotes
  let quoteInterval = setInterval(nextSlide, 4000);
  
  // Manual navigation
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      
      // Reset auto-rotation
      clearInterval(quoteInterval);
      quoteInterval = setInterval(nextSlide, 4000);
    });
  });
  
  // Parallax Effects
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
      const aboutTop = aboutSection.offsetTop;
      const aboutHeight = aboutSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      if (scrolled > aboutTop - windowHeight && scrolled < aboutTop + aboutHeight) {
        const scrollProgress = (scrolled - aboutTop + windowHeight) / (aboutHeight + windowHeight);
        
        // Parallax for morphing shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
          const speed = 0.3 + (index * 0.1);
          const yOffset = scrollProgress * 50 * speed;
          shape.style.transform += ` translateY(${yOffset}px)`;
        });
        
        // Animate hexagon logo based on scroll
        const logoHexagon = document.querySelector('.logo-hexagon');
        if (logoHexagon) {
          const rotation = scrollProgress * 180;
          logoHexagon.style.transform = `rotate(${rotation}deg)`;
        }
      }
    }
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate metrics when visible
        if (entry.target.classList.contains('story-metrics')) {
          metricNumbers.forEach(metric => {
            animateCounter(metric);
          });
        }
        
        // Trigger other animations
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  document.querySelectorAll('.story-content, .story-metrics, .philosophy-wheel-container, .quote-container').forEach(el => {
    observer.observe(el);
  });
  
  // Enhanced mouse tracking for 3D effects
  document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    // Central logo tilt effect
    const logoCore = document.querySelector('.logo-core');
    if (logoCore) {
      logoCore.style.transform += ` perspective(1000px) rotateY(${mouseX * 5}deg) rotateX(${mouseY * -5}deg)`;
    }
    
    // Morphing shapes parallax
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.2);
      const x = mouseX * 10 * speed;
      const y = mouseY * 10 * speed;
      shape.style.transform += ` translate(${x}px, ${y}px)`;
    });
  });
}

// Modern Services Section Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Services Cards Interactive Effects
  const serviceCards = document.querySelectorAll('.service-card-modern');
  
  serviceCards.forEach(card => {
    // Ripple effect on click
    card.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('div');
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(245, 124, 0, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: serviceRipple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    });
    
    // Parallax effect for service patterns
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const pattern = this.querySelector('.service-pattern');
      if (pattern) {
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        pattern.style.transform = `translate(${moveX}px, ${moveY}px) rotate(2deg)`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const pattern = this.querySelector('.service-pattern');
      if (pattern) {
        pattern.style.transform = 'translate(0, 0) rotate(0deg)';
      }
    });
  });
  
  // Timeline Items Animation Observer
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        
        // Add counter animation to timeline markers
        const marker = entry.target.querySelector('.timeline-marker');
        if (marker) {
          const step = entry.target.getAttribute('data-step');
          if (step) {
            let count = 0;
            const target = parseInt(step);
            const counter = setInterval(() => {
              count++;
              marker.textContent = count;
              if (count >= target) {
                clearInterval(counter);
              }
            }, 100);
          }
        }
      }
    });
  }, {
    threshold: 0.5
  });
  
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
  
  // Floating Elements Animation
  const floatingElements = document.querySelectorAll('.element');
  
  floatingElements.forEach((element, index) => {
    // Add random movement
    setInterval(() => {
      const randomX = (Math.random() - 0.5) * 50;
      const randomY = (Math.random() - 0.5) * 50;
      const randomRotate = (Math.random() - 0.5) * 60;
      
      element.style.transform += ` translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
    }, 3000 + (index * 1000));
  });
  
  // Services Header Parallax
  const servicesHeader = document.querySelector('.services-header');
  
  if (servicesHeader) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      
      const floatingElements = servicesHeader.querySelectorAll('.element');
      floatingElements.forEach((element, index) => {
        const speed = 0.3 + (index * 0.1);
        element.style.transform = `translateY(${parallax * speed}px)`;
      });
    });
  }
});

// Add CSS for service ripple animation
const serviceRippleStyle = document.createElement('style');
serviceRippleStyle.textContent = `
  @keyframes serviceRipple {
    0% {
      transform: scale(0);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
document.head.appendChild(serviceRippleStyle);
