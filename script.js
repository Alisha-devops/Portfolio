document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const themeToggle = document.getElementById('themeToggle');
  const themeLabel = document.getElementById('themeLabel');
  const langToggle = document.getElementById('langToggle');
  const langLabel = document.getElementById('langLabel');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const typingText = document.getElementById('typingText');

  let currentLang = 'en'; // 'en' or 'hn'
  let currentTheme = 'dark'; // 'dark' or 'light'

  // Mobile Menu Toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Theme Toggle (Dark / Light)
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', currentTheme);

      if (themeLabel) {
        if (currentTheme === 'light') {
          themeLabel.textContent = currentLang === 'en' ? 'Dark Mode' : 'Dark Mode';
        } else {
          themeLabel.textContent = currentLang === 'en' ? 'Light Mode' : 'Light Mode';
        }
      }
    });
  }

  // Language Switcher (English / Hinglish)
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'hn' : 'en';
      langLabel.textContent = currentLang === 'en' ? 'Hinglish' : 'English';

      // Update text across all elements with data-en and data-hn
      const elements = document.querySelectorAll('[data-en][data-hn]');
      elements.forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
      });

      // Update typing animation
      resetTypingEffect();
    });
  }

  // Typing Effect
  const phrases = {
    en: [
      "Building high-converting websites.",
      "Scaling client growth by 10x.",
      "AI Assisted Web Development.",
      "Modern & Responsive Web Apps."
    ],
    hn: [
      "High sales convert hone wali sites.",
      "Business growth ko 10x karna.",
      "Smart AI Assisted Web Apps.",
      "Mobile-friendly fast websites."
    ]
  };

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimeout;

  function typeEffect() {
    const currentPhrases = phrases[currentLang];
    const currentPhrase = currentPhrases[phraseIndex % currentPhrases.length];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      speed = 400;
    }

    typingTimeout = setTimeout(typeEffect, speed);
  }

  function resetTypingEffect() {
    clearTimeout(typingTimeout);
    charIndex = 0;
    isDeleting = false;
    typeEffect();
  }

  typeEffect();

  // Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger once on page load

  // Counter animation for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    if (animated) return;
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const rect = heroSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      statNumbers.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const increment = target / 30;

        const updateCount = () => {
          count += increment;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 40);
          } else {
            counter.innerText = target;
          }
        };

        updateCount();
      });
      animated = true;
    }
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
