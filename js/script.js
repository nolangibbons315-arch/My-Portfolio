// Shared JavaScript: mobile navigation, reveal animations, and demo feedback validation.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuButton.textContent = isOpen ? "✕" : "☰";
    });
  }

  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  // This demo validates form fields locally; it does not send or save submissions.
  const form = document.querySelector("#feedback-form");
  const message = document.querySelector("#form-message");
  if (form && message) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        message.textContent = "Please complete required fields with a valid email address.";
        message.classList.add("error");
        return;
      }
      const visitorName = form.elements.name.value.trim();
      message.classList.remove("error");
      message.textContent = `Thank you, ${visitorName}! The demo form was validated, but your feedback was not sent or saved.`;
      form.reset();
    });
  }

  document.querySelectorAll(".placeholder-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Replace this placeholder with your real public social profile URL before publishing.");
    });
  });
});
