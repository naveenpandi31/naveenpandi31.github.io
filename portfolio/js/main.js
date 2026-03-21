document.addEventListener('DOMContentLoaded', () => {

  // === CURSOR ===
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  const isDesktop = window.matchMedia('(hover: hover)').matches;

  if (isDesktop && dot && ring) {
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx+'px'; dot.style.top = my+'px'; });
    function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx+'px'; ring.style.top = ry+'px'; requestAnimationFrame(animRing); }
    animRing();
    document.querySelectorAll('a,button,.session-card,.cert-row,.iov-item,.ablock,.offer-item,.who-item,.service-pill,.chip,.stat,.fsoc,.footer-nav-btn').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.classList.add('hovered'); ring.classList.add('hovered'); });
      el.addEventListener('mouseleave', () => { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
    });
  }

  // === TYPING ANIMATION ===
  const el = document.getElementById('typingText');
  const words = ['Naveenpandi', 'A Digital Marketer', 'A Freelancer', 'A Content Creator'];
  let wi = 0, ci = 0, deleting = false;
  function type() {
    const word = words[wi];
    el.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
    if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
    setTimeout(type, deleting ? 60 : 100);
  }
  if (el) setTimeout(type, 600);

  // === COUNTER ANIMATION ===
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = +el.dataset.target;
      let count = 0;
      const step = Math.ceil(target / 20);
      const timer = setInterval(() => {
        count = Math.min(count + step, target);
        el.textContent = count;
        if (count >= target) clearInterval(timer);
      }, 60);
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
    if (pageId === 'home') setTimeout(animateCounters, 400);
    closeMobileMenu();
  }

  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => showPage(el.dataset.page));
  });

  // === HAMBURGER ===
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', e => { e.stopPropagation(); hamburger.classList.toggle('open'); mobileMenu.classList.toggle('open'); });
  function closeMobileMenu() { hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); }
  document.addEventListener('click', e => { if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMobileMenu(); });
  let ty = 0;
  mobileMenu.addEventListener('touchstart', e => { ty = e.touches[0].clientY; }, { passive: true });
  mobileMenu.addEventListener('touchmove', e => { if (e.touches[0].clientY - ty > 50) closeMobileMenu(); }, { passive: true });

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 30 ? 'rgba(10,10,15,0.97)' : 'rgba(10,10,15,0.85)';
  }, { passive: true });

  // === SCROLL ANIMATIONS ===
  function triggerAnimations() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.fade-up:not(.in-view)').forEach(el => obs.observe(el));
  }

  // === SERVICE PILL HOVER ripple ===
  document.querySelectorAll('.service-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      pill.style.background = 'rgba(255,217,61,0.15)';
      pill.style.borderColor = 'rgba(255,217,61,0.5)';
      pill.style.color = 'var(--accent2)';
      setTimeout(() => { pill.style.background = ''; pill.style.borderColor = ''; pill.style.color = ''; }, 600);
    });
  });

  // === CONTACT FORM ===
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-primary');
      const orig = btn.textContent;
      btn.textContent = '✅ Message Sent!';
      btn.style.background = 'linear-gradient(135deg,#6bcb77,#4ecdc4)';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 3000);
    });
  }

  // === HERO STAGGER ===
  function animateHero() {
    document.querySelectorAll('#page-home .fade-up').forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), 100 + i * 80);
    });
    setTimeout(animateCounters, 500);
  }

  // === INIT ===
  showPage('home');
  setTimeout(animateHero, 150);

});
