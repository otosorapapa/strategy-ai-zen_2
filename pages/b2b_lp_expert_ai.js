(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
      }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  const interactiveButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
  interactiveButtons.forEach((button) => {
    button.addEventListener('pointerenter', () => {
      if (prefersReducedMotion) return;
      button.style.transform = 'translateY(-2px)';
      button.style.opacity = '0.96';
    });
    button.addEventListener('pointerleave', () => {
      button.style.transform = '';
      button.style.opacity = '';
    });
    button.addEventListener('focus', () => {
      if (prefersReducedMotion) return;
      button.style.transform = 'translateY(-2px)';
    });
    button.addEventListener('blur', () => {
      button.style.transform = '';
    });
  });
})();
