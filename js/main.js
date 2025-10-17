// Simple interactivity
document.addEventListener('DOMContentLoaded', () => {
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  learnMoreBtn.addEventListener('click', () => {
    window.scrollTo({
      top: document.getElementById('about').offsetTop,
      behavior: 'smooth'
    });
  });

  // ✅ Initialize EmailJS with your Public Key
  (function() {
    emailjs.init("Slj0gRG0YhBNd01wh"); // Example: "Yy4FfABCDE12345"
  })();

  // ✅ Handle the form submission
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Stop normal form submission

    emailjs.sendForm("service_fjbfru9", "template_suqelos", this)
      .then(() => {
        alert("✅ Message sent successfully!");
        this.reset(); // clear the form
      })
      .catch((error) => {
        console.error("❌ Failed to send message:", error);
        alert("❌ Message failed. Check console for details.");
      });
  });

  // Cursor Glow (smooth follow)
  const cursor = document.querySelector(".cursor"); 

  let x = 0, y = 0;
  let targetX = 0, targetY = 0;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animate() {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
    requestAnimationFrame(animate);
  }
  animate();
});

// ✨ Sparkles stay above the button even while scrolling
const learnMoreBtn = document.getElementById("learnMoreBtn");

learnMoreBtn.addEventListener("mousemove", (e) => {
  const rect = learnMoreBtn.getBoundingClientRect();
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");

  // random color for variation
  const colors = ["#ffffff", "#a0e9ff", "#ffe6ff", "#b2f5ea"];
  sparkle.style.background = `radial-gradient(circle, ${
    colors[Math.floor(Math.random() * colors.length)]
  }, transparent)`;

  // position sparkle relative to button
  sparkle.style.left = e.clientX - rect.left + "px";
  sparkle.style.top = e.clientY - rect.top + "px";

  learnMoreBtn.appendChild(sparkle);

  // cleanup after fade
  setTimeout(() => sparkle.remove(), 800);
});


// 🧲 Magnetic Effect — only in contact/footer
const magnets = document.querySelectorAll(".magnet");
const contactSection = document.getElementById("contact");

function handleMagnet(e, magnet) {
  const rect = magnet.getBoundingClientRect();
  const strength = 0.025; // smaller = softer pull

  const x = e.clientX - (rect.left + rect.width / 2);
  const y = e.clientY - (rect.top + rect.height / 2);

  magnet.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
}

function resetMagnet(magnet) {
  magnet.style.transform = "translate(0, 0)";
}

// activate only when inside the contact/footer section
function activateMagnet(area) {
  area.addEventListener("mousemove", (e) => {
    magnets.forEach((magnet) => handleMagnet(e, magnet));
  });
  area.addEventListener("mouseleave", () => {
    magnets.forEach(resetMagnet);
  });
}

activateMagnet(contactSection);
