 /* ─── Back to Top ─── */
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 300);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ─── Carousel Dots Sync ─── */
  const bsCarousel = document.getElementById('bsCarousel');
  const dots = document.querySelectorAll('.carousel-controls button');

  bsCarousel.addEventListener('slid.bs.carousel', e => {
    dots.forEach(d => d.classList.remove('active'));
    dots[e.to].classList.add('active');
  });

  function goSlide(idx) {
    bootstrap.Carousel.getInstance(bsCarousel).to(idx);
  }

  /* ─── Donation Amount Selector ─── */
  function selectAmount(btn, amount) {
    document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('customAmount').value = '';

    const donateBtn = document.querySelector('#donate .btn-primary-custom[style*="padding:16px"]');
    if (donateBtn) donateBtn.textContent = `❤ Donate ${amount} Now`;
  }

  document.getElementById('customAmount').addEventListener('input', function () {
    if (this.value) {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('active'));
      const donateBtn = document.querySelector('#donate .btn-primary-custom[style*="padding:16px"]');
      if (donateBtn) donateBtn.textContent = `❤ Donate $${this.value} Now`;
    }
  });

  /* ─── Video Modal ─── */
  const videoModal = document.getElementById('videoModal');
  videoModal.addEventListener('show.bs.modal', () => {
    document.getElementById('ytFrame').src = 'https://www.youtube.com/embed/4AQdWf2GUBY?autoplay=1';
  });
  videoModal.addEventListener('hide.bs.modal', () => {
    document.getElementById('ytFrame').src = '';
  });

  /* ─── Number Counter ─── */
  function animateCounters() {
    document.querySelectorAll('.counter').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = Math.floor(current);
      }, 16);
    });
  }

  /* ─── Scroll Fade-up Animation ─── */
  const fadeEls = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger counters when stats section becomes visible
        if (entry.target.closest('#statsBar')) animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => observer.observe(el));

  /* ─── Smooth Navbar Scroll Highlight ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
    });
  });

  /* ─── Contact / Volunteer Form Toast Feedback ─── */
  document.querySelectorAll('button').forEach(btn => {
    const txt = btn.textContent.trim();
    if (txt.includes('Send Message') || txt.includes('Register as Volunteer') || txt.includes('Subscribe')) {
      btn.addEventListener('click', function () {
        const orig = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check me-2"></i>Success!';
        this.style.background = '#2ecc71';
        setTimeout(() => { this.innerHTML = orig; this.style.background = ''; }, 3000);
      });
    }
  });