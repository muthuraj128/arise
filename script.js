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
  initAboutAnimations();
}

// About Section Animation System
function initAboutAnimations() {
  const philosophyCards = document.querySelectorAll('.philosophy-card');
  const valueItems = document.querySelectorAll('.value-item');
  
  // Philosophy card hover effects
  philosophyCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
    
    // 3D tilt effect
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
  
  // Value items interaction
  valueItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.value-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.background = 'rgba(245, 124, 0, 0.4)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.value-icon');
      if (icon) {
        icon.style.transform = '';
        icon.style.background = 'rgba(245, 124, 0, 0.2)';
      }
    });
  });
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  document.querySelectorAll('.philosophy-card, .title-line, .about-intro').forEach(el => {
    observer.observe(el);
  });
}
