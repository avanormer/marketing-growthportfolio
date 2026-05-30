document.addEventListener('DOMContentLoaded', function () {
  const mobileToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const projectCards = Array.from(document.querySelectorAll('.project-card'));
  const revealItems = Array.from(document.querySelectorAll('.section-block, .experience-card, .project-card, .stat-card, .contact-card'));

  function toggleMobileMenu() {
    nav?.classList.toggle('active');
    const expanded = nav?.classList.contains('active');
    mobileToggle?.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  }

  mobileToggle?.addEventListener('click', toggleMobileMenu);

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;

      event.preventDefault();
      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (nav.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id');
        const navLink = document.querySelector(`.site-nav a[href="#${id}"]`);

        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          if (navLink) {
            navLinks.forEach((link) => link.classList.remove('active')); 
            navLink.classList.add('active');
          }
        }
      });
    },
    {
      threshold: 0.28,
      rootMargin: '0px 0px -22% 0px',
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0px)';
          entry.target.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(18px)';
    revealObserver.observe(item);
  });

  projectCards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * 6;
      const rotateY = ((x / rect.width) - 0.5) * -6;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      card.style.transition = 'transform 0.15s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  });
});
