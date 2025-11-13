/* ============================================================
   MAIN SCRIPT – Portfolio Website
   Author: Rusira Alwis
   Purpose: Handles animations, interactions, and EmailJS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------
     SCROLL: "Learn More" Button → Scrolls to About Section
  ------------------------------------------------------------ */
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const aboutSection = document.getElementById("about");

  learnMoreBtn.addEventListener("click", () => {
    window.scrollTo({
      top: aboutSection.offsetTop,
      behavior: "smooth",
    });
  });

  /* ------------------------------------------------------------
     EMAILJS: Initialize & Handle Contact Form Submission
  ------------------------------------------------------------ */
  (function () {
    emailjs.init("Slj0gRG0YhBNd01wh"); // Replace with your own EmailJS public key
  })();

  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    emailjs
      .sendForm("service_fjbfru9", "template_suqelos", contactForm)
      .then(() => {
        alert("✅ Message sent successfully!");
        contactForm.reset();
      })
      .catch((error) => {
        console.error("❌ Message failed:", error);
        alert("❌ Failed to send message. Check console for details.");
      });
  });

  /* ------------------------------------------------------------
     CURSOR GLOW: Smooth Follow Animation
  ------------------------------------------------------------ */
  const cursor = document.querySelector(".cursor");
  let x = 0,
    y = 0,
    targetX = 0,
    targetY = 0;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  const animateCursor = () => {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  /* ------------------------------------------------------------
     MAGNETIC EFFECT: Subtle Pull in Contact Section
  ------------------------------------------------------------ */
  const magnets = document.querySelectorAll(".magnet");
  const contactSection = document.getElementById("contact");
  const strength = 0.025;

  const handleMagnet = (e, magnet) => {
    const rect = magnet.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    magnet.style.transform = `translate(${offsetX * strength}px, ${offsetY * strength}px)`;
  };

  const resetMagnet = (magnet) => {
    magnet.style.transform = "translate(0, 0)";
  };

  contactSection.addEventListener("mousemove", (e) => {
    magnets.forEach((magnet) => handleMagnet(e, magnet));
  });

  contactSection.addEventListener("mouseleave", () => {
    magnets.forEach(resetMagnet);
  });

  /* ------------------------------------------------------------
     SPARKLE EFFECT: Hover Animation on “Learn More” Button
  ------------------------------------------------------------ */
  learnMoreBtn.addEventListener("mousemove", (e) => {
    const rect = learnMoreBtn.getBoundingClientRect();
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    // Randomized sparkle color for subtle variation
    const colors = ["#ffffff", "#a0e9ff", "#ffe6ff", "#b2f5ea"];
    sparkle.style.background = `radial-gradient(circle, ${
      colors[Math.floor(Math.random() * colors.length)]
    }, transparent)`;

    sparkle.style.left = `${e.clientX - rect.left}px`;
    sparkle.style.top = `${e.clientY - rect.top}px`;

    learnMoreBtn.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  });
});
