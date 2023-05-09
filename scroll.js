


function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  
  function smoothScroll(element, target, duration) {
    const start = element.scrollTop;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const headerOffset = 80; // Adjust this value based on the height of your fixed header/navbar
    const targetY = target.offsetTop - headerOffset;
  
    function scroll(timestamp) {
      const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
  
      element.scrollTop = start + (targetY - start) * ease;
  
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    }
  
    requestAnimationFrame(scroll);
  }
  
  document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
  
      smoothScroll(document.documentElement, target, 600); // Adjust the duration as desired
    });
  });
  
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('load', function() {
    var scrollIcon = document.querySelector('.icon-scroll');
    var isScrollIconHidden = localStorage.getItem('isScrollIconHidden');
    var scrollThreshold = 100; // Adjust this value as needed
  });
  
  window.addEventListener('wheel', function (e) {
    e.preventDefault();
  
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    const sections = document.querySelectorAll('section');
    let currentIndex = -1;
  
    // Find the current section index
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top >= 0) {
        currentIndex = i;
        break;
      }
    }
  
    // Determine the target section index based on scroll direction
    let targetIndex;
    if (delta > 0 && currentIndex > 0) {
      targetIndex = currentIndex - 1; // Scroll up
    } else if (delta < 0 && currentIndex < sections.length - 1) {
      targetIndex = currentIndex + 1; // Scroll down
    }
  
    if (targetIndex !== undefined) {
      const targetSection = sections[targetIndex];
      smoothScroll(document.documentElement, targetSection, 600); // Adjust the duration as desired
    }
  });

