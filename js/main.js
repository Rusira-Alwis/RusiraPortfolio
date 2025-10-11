// Simple interactivity
document.addEventListener('DOMContentLoaded', () => {
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  learnMoreBtn.addEventListener('click', () => {
    window.scrollTo({
      top: document.getElementById('about').offsetTop,
      behavior: 'smooth'
    });
  });

  // Contact form submit
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for your message! I will reply soon.');
    form.reset();
  });
});
