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
});
