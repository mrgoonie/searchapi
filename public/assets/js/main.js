/**
 * Theme toggle functionality
 * Handles switching between light and dark mode
 * Persists user preference in localStorage
 */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');

  // Function to set the theme based on user preference or system preference
  const setTheme = () => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set theme on initial load
  setTheme();

  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Toggle dark class on html element
      const isDark = document.documentElement.classList.toggle('dark');

      // Save preference to localStorage
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  /**
   * Mobile menu toggle functionality
   * Shows/hides the mobile menu when the mobile menu button is clicked
   * Also closes the menu when a link inside it is clicked
   */
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && mobileMenu) {
    // Toggle mobile menu visibility when button is clicked
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');

      // Add animation classes for smooth transition
      if (!mobileMenu.classList.contains('hidden')) {
        // Menu is now visible - add slide-down animation
        mobileMenu.classList.add('animate-slideDown');
        setTimeout(() => {
          mobileMenu.classList.remove('animate-slideDown');
        }, 300); // Remove animation class after it completes
      }
    });

    // Close mobile menu when clicking on a link inside it
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target) &&
        !mobileMenuButton.contains(event.target) &&
        !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  /**
   * Smooth scrolling functionality for navigation links
   * Adds event listeners to all anchor links that point to sections on the same page
   */
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Only apply to links that point to an existing element on the page
      const targetId = this.getAttribute('href');

      // Skip if it's just '#' with no specific target
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Scroll smoothly to the target element
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without page reload (for better UX)
        history.pushState(null, null, targetId);
      }
    });
  });
});

// Get captions (example)
async function getCaptions() {
  // show loading
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("loading").classList.remove("opacity-0");
  document.getElementById("loading").classList.add("opacity-100", "fixed");

  // get caption by video url
  const url = document.getElementById("url").value;
  if (!url) {
    alert("Please enter a video URL");

    // hide loading
    document.getElementById("loading").classList.remove("opacity-100");
    document.getElementById("loading").classList.add("opacity-0");
    setTimeout(() => {
      document.getElementById("loading").classList.add("hidden");
    }, 500);

    return;
  }

  try {
    // Use the special try-now endpoint that doesn't require login
    const res = await fetch(`/api/v1/try-now/caption?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (data.status) {
      // If the user is not logged in, show a preview or prompt to sign up
      if (!document.getElementById("try-now").getAttribute("data-logged-in")) {
        // Redirect to a preview page or show a modal with limited results
        // For now, we'll just show an alert with a prompt to sign up
        alert("Get the full experience by signing up! This is a preview of our caption service.");
      }
      console.log("Caption data :>> ", data);
      if (data.data.id) {
        window.location.href = `/caption/${data.data.id}`;
        return;
      }
    } else {
      // Show error message
      alert(data.message || "Failed to get captions. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching captions:", error);
    alert("An error occurred. Please try again later.");
  }

  // hide loading
  document.getElementById("loading").classList.remove("opacity-100");
  document.getElementById("loading").classList.add("opacity-0");
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
  }, 500);
}

// Get summary of video content
async function getSummary() {
  // show loading
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("loading").classList.remove("opacity-0");
  document.getElementById("loading").classList.add("opacity-100", "fixed");

  // get summary by video url
  const url = document.getElementById("url").value;
  if (!url) {
    alert("Please enter a video URL");

    // hide loading
    document.getElementById("loading").classList.remove("opacity-100");
    document.getElementById("loading").classList.add("opacity-0");
    setTimeout(() => {
      document.getElementById("loading").classList.add("hidden");
    }, 500);

    return;
  }

  try {
    // Use the special try-now endpoint that doesn't require login
    const res = await fetch(`/api/v1/try-now/summary?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    if (data.status) {
      // If the user is not logged in, show a preview or prompt to sign up
      if (!document.getElementById("try-now").getAttribute("data-logged-in")) {
        // Show a modal with the summary preview
        alert("Get the full experience by signing up! This is a preview of our summarization service.");
      }

      console.log("Summary data :>> ", data);

      // If we have an ID, redirect to the summary page
      if (data.data && data.data.id) {
        window.location.href = `/summary/${data.data.id}`;
        return;
      } else if (data.data && data.data.summary) {
        // If we only have the summary text but no ID, show it in an alert
        alert(data.data.summary);
      } else {
        alert("Failed to generate summary. Please try again later.");
      }
    } else {
      // Show error message
      alert(data.message || "Failed to get summary. Please try again later.");
    }
  } catch (error) {
    console.error("Error fetching summary:", error);
    alert("An error occurred. Please try again later.");
  }

  // hide loading
  document.getElementById("loading").classList.remove("opacity-100");
  document.getElementById("loading").classList.add("opacity-0");
  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
  }, 500);
}