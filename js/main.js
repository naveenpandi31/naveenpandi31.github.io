document.addEventListener('DOMContentLoaded', () => {

  // === COUNTER ANIMATION ===
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = +el.dataset.target;
      let count = 0;
      const duration = 1200;
      const steps = 40;
      const increment = target / steps;
      const timer = setInterval(() => {
        count = Math.min(count + increment, target);
        el.textContent = Math.round(count);
        if (count >= target) clearInterval(timer);
      }, duration / steps);
    });
  }

  // === SPA NAVIGATION ===
  const pages = document.querySelectorAll('.page');
  const navBtns = document.querySelectorAll('.nav-btn');

  function showPage(pageId) {
    pages.forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    navBtns.forEach(b => b.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (!target) return;
    target.style.display = pageId === 'home' ? 'flex' : 'block';
    target.offsetHeight;
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const btn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
    if (btn) btn.classList.add('active');
    setTimeout(triggerAnimations, 80);
    if (pageId === 'home') setTimeout(animateCounters, 500);
    closeMobileMenu();
  }

  // Wire all data-page buttons
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => showPage(el.dataset.page));
  });

  // Footer nav buttons
  document.querySelectorAll('.footer-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
  });

  // === HAMBURGER ===
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMobileMenu();
  });
  let touchY = 0;
  mobileMenu.addEventListener('touchstart', e => { touchY = e.touches[0].clientY; }, { passive: true });
  mobileMenu.addEventListener('touchmove', e => { if (e.touches[0].clientY - touchY > 50) closeMobileMenu(); }, { passive: true });

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 30 ? 'rgba(10,10,15,0.97)' : 'rgba(10,10,15,0.88)';
  }, { passive: true });

  // === SCROLL ANIMATIONS ===
  function triggerAnimations() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.fade-up:not(.in-view)').forEach(el => obs.observe(el));
  }

  // === CONTACT FORM ===
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-primary');
      const orig = btn.textContent;
      btn.textContent = '✅ Sent! I\'ll reply within 24hrs';
      btn.style.background = 'linear-gradient(135deg,#6bcb77,#4ecdc4)';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 4000);
    });
  }

  // === HERO STAGGER ANIMATE ===
  function animateHero() {
    document.querySelectorAll('#page-home .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), 80 + i * 70);
    });
    setTimeout(animateCounters, 600);
  }

  // === INIT ===
  showPage('home');
  setTimeout(animateHero, 100);

});
