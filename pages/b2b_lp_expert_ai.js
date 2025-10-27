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

  const consultForm = document.getElementById('consult-form');
  if (consultForm) {
    const steps = Array.from(consultForm.querySelectorAll('.form-step'));
    const progress = Array.from(consultForm.querySelectorAll('.form-progress li'));
    let currentStep = 0;

    const updateStep = (nextStep) => {
      steps.forEach((step, index) => {
        step.classList.toggle('is-active', index === nextStep);
      });
      progress.forEach((item, index) => {
        item.classList.toggle('is-active', index === nextStep);
      });
      currentStep = nextStep;
    };

    consultForm.querySelectorAll('[data-action="next"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const requiredFields = steps[currentStep].querySelectorAll('[required]');
        const isValid = Array.from(requiredFields).every((field) => {
          if (!field.reportValidity()) {
            field.focus();
            return false;
          }
          return true;
        });
        if (!isValid) return;
        if (currentStep < steps.length - 1) {
          updateStep(currentStep + 1);
        }
      });
    });

    consultForm.querySelectorAll('[data-action="back"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (currentStep > 0) {
          updateStep(currentStep - 1);
        }
      });
    });
  }
})();
