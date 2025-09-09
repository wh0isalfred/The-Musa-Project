/* musa.js — interactions for The Musa Project page
   - Mobile nav toggle
   - Timeline nav buttons
   - Testimonial carousel (autoplay + manual)
*/
  // MOBILE NAV TOGGLE
   const toggleBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

  // TIMELINE NAV
  const timeline = document.querySelector('.timeline');
  const tLeft = document.querySelector('.timeline-nav.left');
  const tRight = document.querySelector('.timeline-nav.right');

  if (timeline) {
    const scrollAmount = 280;
    if (tLeft) tLeft.addEventListener('click', () => timeline.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    if (tRight) tRight.addEventListener('click', () => timeline.scrollBy({ left: scrollAmount, behavior: 'smooth' }));

    // drag to scroll (desktop touch support)
    let isDown = false, startX, scrollLeft;
    timeline.addEventListener('mousedown', (e) => {
      isDown = true;
      timeline.classList.add('active');
      startX = e.pageX - timeline.offsetLeft;
      scrollLeft = timeline.scrollLeft;
    });
    timeline.addEventListener('mouseleave', () => { isDown = false; timeline.classList.remove('active'); });
    timeline.addEventListener('mouseup', () => { isDown = false; timeline.classList.remove('active'); });
    timeline.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - timeline.offsetLeft;
      const walk = (x - startX) * 1.2;
      timeline.scrollLeft = scrollLeft - walk;
    });
  }

  // TESTIMONIAL CAROUSEL
  const slides = Array.from(document.querySelectorAll('.test-slide'));
  const prevBtn = document.querySelector('.test-nav.prev');
  const nextBtn = document.querySelector('.test-nav.next');
  let index = 0;
  let autoplay = true;
  let timer;

  function showSlide(i) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === i);
    });
  }

  function nextSlide() { index = (index + 1) % slides.length; showSlide(index); }
  function prevSlide() { index = (index - 1 + slides.length) % slides.length; showSlide(index); }

  if (slides.length) {
    showSlide(index);
    timer = setInterval(() => { if (autoplay) nextSlide(); }, 5000);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { autoplay = false; nextSlide(); clearInterval(timer); });
  if (prevBtn) prevBtn.addEventListener('click', () => { autoplay = false; prevSlide(); clearInterval(timer); });

  // make keyboard accessible (left/right for carousel)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
;
