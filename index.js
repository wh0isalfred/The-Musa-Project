// Target festival date: August 20, 2025, 10:00 AM
    const festivalDate = new Date("August 20, 2026 10:00:00").getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const timeLeft = festivalDate - now;

      if (timeLeft <= 0) {
        document.querySelector(".countdown").innerHTML = "<p>🎉 The Festival Has Begun! 🎉</p>";
        clearInterval(timer);
        return;
      }

      // Convert time
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update DOM
      document.querySelector(".countdown").innerHTML = `
        <div><span>${days}</span><p>Moons</p></div>
        <div><span>${hours}</span><p>Sands</p></div>
        <div><span>${minutes}</span><p>Moments</p></div>
        <div><span>${seconds}</span><p>Drumbeats</p></div>
      `;
    }

    // Run immediately and every second
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    const toggleBtn = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    toggleBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });