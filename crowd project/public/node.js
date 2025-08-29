// Enhanced JavaScript for the CrowdControl website
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btn");
  const city = document.querySelector("#city");
  const place = document.querySelector("#place");
  const date = document.querySelector("#date");
  const coordinates = document.querySelector("#coordinates");
  const result = document.querySelector(".result");
  const form = document.getElementById("crowd-form");
  const navbar = document.querySelector(".navbar");

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (city.value == "" || place.value == "" || date.value == "") {
      result.innerHTML = `
        <div class="alert alert-danger d-flex align-items-center" role="alert">
          <i class="fas fa-exclamation-circle me-2"></i>
          <div>Please fill all required fields</div>
        </div>
      `;

      // Shake animation for empty fields
      if (city.value == "") {
        city.parentElement.classList.add("shake");
        setTimeout(() => city.parentElement.classList.remove("shake"), 500);
      }
      if (place.value == "") {
        place.parentElement.classList.add("shake");
        setTimeout(() => place.parentElement.classList.remove("shake"), 500);
      }
      if (date.value == "") {
        date.parentElement.classList.add("shake");
        setTimeout(() => date.parentElement.classList.remove("shake"), 500);
      }
    } else {
      // Show loading state
      btn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Analyzing Crowd Data';
      btn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // In a real app, you would make an AJAX call here
        // For demo, we'll redirect after a delay
        window.location.href = "./chats.html";
      }, 2000);
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Auto-focus on city input when form section comes into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          city.focus();
        }
      });
    },
    { threshold: 0.5 }
  );

  const formSection = document.querySelector(".crowd-check");
  if (formSection) {
    observer.observe(formSection);
  }
});
