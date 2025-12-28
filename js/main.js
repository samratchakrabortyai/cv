/* ═══════════════════════════════════════════════════════════════
   SAMRAT CHAKRABORTY - PREMIUM CV WEBSITE
   Interactive JavaScript
═══════════════════════════════════════════════════════════════ */

// Console Easter Egg
console.log('%c👋 Hello fellow developer!', 'font-size: 24px; font-weight: bold;');
console.log('%cBuilt with passion by Samrat Chakraborty', 'color: #667eea; font-size: 14px;');
console.log('%c🚀 SpacexAI Research Cohort Lead', 'color: #764ba2; font-size: 12px;');

// ===== DOM ELEMENTS =====
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const themeToggle = document.getElementById('themeToggle');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const cursorGlow = document.getElementById('cursorGlow');
const typewriter = document.getElementById('typewriter');
const particles = document.getElementById('particles');
const yearSpan = document.getElementById('year');
const pubFilters = document.querySelectorAll('.pub-filter');
const pubCards = document.querySelectorAll('.pub-card');
const statNumbers = document.querySelectorAll('.stat-number');
const focusProgress = document.querySelectorAll('.focus-progress');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initAOS();
  initParticles();
  initTypewriter();
  initYear();
  initScrollEffects();
  initNavigation();
  initPublicationFilter();
  initCounterAnimation();
  initProgressBars();
  initCursorGlow();
});

// ===== LOADER =====
function initLoader() {
  document.body.classList.add('loading');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 1500);
  });
}

// ===== THEME TOGGLE =====
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', theme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a nice transition effect
    document.body.style.transition = 'background 0.5s ease, color 0.5s ease';
  });
}

// ===== AOS INITIALIZATION =====
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
    });
  }
}

// ===== PARTICLES =====
function initParticles() {
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  // Random properties
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const delay = Math.random() * 15;
  const duration = Math.random() * 10 + 15;
  const opacity = Math.random() * 0.3 + 0.1;
  
  particle.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${left}%;
    animation-delay: ${delay}s;
    animation-duration: ${duration}s;
    opacity: ${opacity};
  `;
  
  particles.appendChild(particle);
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
  const phrases = [
    'AI & Machine Learning',
    'Computational Chemistry',
    'Space Technology',
    'Explainable AI (XAI)',
    'CubeSat Operations',
    'Quantum Computing'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(type, typingSpeed);
  }
  
  setTimeout(type, 1000);
}

// ===== YEAR =====
function initYear() {
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Header effect
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (currentScroll > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    
    // Active nav link
    updateActiveNavLink();
    
    lastScroll = currentScroll;
  });
  
  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== NAVIGATION =====
function initNavigation() {
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== PUBLICATION FILTER =====
function initPublicationFilter() {
  pubFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Update active state
      pubFilters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      
      // Filter publications
      const filterValue = filter.getAttribute('data-filter');
      
      pubCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        
        if (filterValue === 'all' || cardStatus === filterValue) {
          card.classList.remove('hidden');
          card.style.display = '';
          // Re-trigger AOS animation
          card.classList.remove('aos-animate');
          setTimeout(() => {
            card.classList.add('aos-animate');
          }, 10);
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const countTo = parseInt(target.getAttribute('data-count'));
        animateCounter(target, countTo);
        counterObserver.unobserve(target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => {
    counterObserver.observe(stat);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ===== PROGRESS BARS =====
function initProgressBars() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const progress = progressBar.getAttribute('data-progress');
        progressBar.style.width = `${progress}%`;
        progressObserver.unobserve(progressBar);
      }
    });
  }, observerOptions);
  
  focusProgress.forEach(bar => {
    progressObserver.observe(bar);
  });
}

// ===== CURSOR GLOW =====
function initCursorGlow() {
  if (window.innerWidth < 768) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
  });
  
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;
    
    requestAnimationFrame(animateGlow);
  }
  
  animateGlow();
}

// ===== SMOOTH REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('.glass-card, .highlight-card, .exp-card, .skill-card, .award-card, .pub-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // ESC to close mobile menu
  if (e.key === 'Escape') {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
  
  // T for theme toggle
  if (e.key === 't' && !e.ctrlKey && !e.metaKey) {
    const activeElement = document.activeElement;
    if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
      themeToggle.click();
    }
  }
});

// ===== PERFORMANCE: Debounce scroll events =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== PRELOAD IMAGES =====
function preloadImages() {
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    const src = img.getAttribute('src');
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
}

preloadImages();
