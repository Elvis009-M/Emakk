
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // --- Optimized Mobile Menu ---
    menuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
        menuToggle.setAttribute('aria-expanded', isActive);
    });

    // Close menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('is-active');
        });
    });

    // --- High-Performance Theme Toggle ---
    const updateTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        themeBtn.innerText = theme === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('emakk-theme', theme);
    };

    themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        updateTheme(current === 'light' ? 'dark' : 'light');
    });

    // Sync initial state
    const saved = localStorage.getItem('emakk-theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    updateTheme(saved);
});


//  ---     TRUST AND ABOUT SECTIONS  
/* --- 4. SCROLL REVEAL ANIMATIONS --- */
const observerOptions = {
    threshold: 0.15 // Trigger when 15% of the element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'show' class to trigger the CSS animation
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

// Target all sections we want to animate
const revealElements = document.querySelectorAll('.trust-signals, .stat-card, .about-grid, .service-card');
revealElements.forEach(el => {
    el.classList.add('reveal-hidden'); // Set initial hidden state
    observer.observe(el);
});
/*
IntersectionObserver: Think of this as a "Sentry." Instead of the browser constantly checking "Where is the user?", this API tells the browser: "Don't do anything until the user scrolls to this specific box." This keeps your site fast and lag-free.

    threshold: 0.15: This ensures the animation doesn't start the millisecond the top pixel touches the screen. It waits until enough of the section is visible to make the "fade-in" look intentional.

    Staggered Loading (nth-child): This is a professional design trick. Instead of all 3 stat cards appearing at once, they pop up one-by-one (Left -> Middle -> Right). It creates a "flow" that guides the user's eye across your achievements.
*/



//     --------------       PROJECTS SECTION

const container = document.getElementById("projectContainer");

// Render projects
function displayProjects(data) {
  container.innerHTML = "";

  data.forEach((p, index) => {
    container.innerHTML += `
      <div class="project-card">
        <h3>${p.title}</h3>
        <img src="${p.image}" alt="${p.title}">
            <p>${p.description}</p>
            <p>${p.category}</p>

            <a class="btn-launch" href="${p.live}" target="_blank">View Live</a>

            <a class="cta" href="#Contact"> Get Yours Now! 🚀 </a>

            <button class="btn-repo" onclick="openModal(${index})">Case Study</button>
      </div>
    `;
  });
}

displayProjects(projects);

// MODAL
function openModal(i) {
  const p = projects[i];

  document.getElementById("m-title").innerText = p.title;
  document.getElementById("m-problem").innerText = p.problem;
  document.getElementById("m-solution").innerText = p.solution;
  document.getElementById("m-results").innerText = p.results;
  document.getElementById("m-tech").innerText = p.tech;
  document.getElementById("m-live").href = p.live;

  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// SEARCH FUNCTION
function searchProjects() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(value) ||
    p.description.toLowerCase().includes(value)
  );

  displayProjects(filtered);
}

// close modal on outside click
window.onclick = function(e) {
  if (e.target == document.getElementById("modal")) {
    closeModal();
  }
}

let currentCategory = "All";

// Render function
function displayProjects(data) {
  const container = document.getElementById("projectContainer");
  container.innerHTML = "";

  data.forEach((p, index) => {
    container.innerHTML += `
      <div class="project-card">
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.description}</p>

        <p><strong>Category:</strong> ${p.category}</p>

        <a href="${p.live}" target="_blank">View Live</a>
        <a class="cta" href="#contact">Get Yours Now! 🚀</a>
        <button onclick="openModal(${index})">Case Study</button>
      </div>
    `;
  });
}

// Filter function
function filterProjects(category) {
  currentCategory = category;

  let filtered = projects;

  if (category !== "All") {
    filtered = projects.filter(p => p.category === category);
  }

  displayProjects(filtered);
}

// Search + category combined
function searchProjects() {
  const value = document.getElementById("searchInput").value.toLowerCase();

  let filtered = projects.filter(p =>
    p.title.toLowerCase().includes(value) ||
    p.description.toLowerCase().includes(value)
  );

  if (currentCategory !== "All") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  displayProjects(filtered);
}

// initial load
displayProjects(projects);

// Existing Portfolio/Modal code remains above...

//*** EMAKK CONTACT ENGINE* Handles: Google Sheets Integration + Auto-Response UI*/

const contactForm = document.getElementById('emakk-contact-form');
const statusMsg = document.getElementById('form-status');
// Replace this with your Google Apps Script URL after deployment
const scriptURL = 'https://script.google.com/macros/s/AKfycbwInMvulDLrXB0lfIqS6MzfevhlMMT0duWoFaGbWYYb7NxYRTjUTv4chLrqo0qrBHaDwA/exec';

contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.main-cta');
    
    // Set UI to Loading State
    btn.innerText = "Processing Logic...";
    btn.disabled = true;

    fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
        .then(response => {
            // Success UI
            btn.innerText = "Project Received!";
            btn.style.backgroundColor = "#25D366";
            statusMsg.innerHTML = "✅ Check your inbox for confirmation.";
            statusMsg.style.color = "#25D366";
            
            contactForm.reset();
            
            // Reset Button after 5 seconds
            setTimeout(() => {
                btn.innerText = "Start Project";
                btn.disabled = false;
                btn.style.backgroundColor = "";
                statusMsg.innerHTML = "";
            }, 5000);
        })
        .catch(error => {
            // Error UI
            btn.innerText = "Connection Error";
            btn.style.backgroundColor = "#ef4444";
            statusMsg.innerHTML = "❌ Please try again or use WhatsApp.";
            statusMsg.style.color = "#ef4444";
        });
});

/**
 * EMAKK FAB ENGINE
 * Logic for Scroll Visibility and Top behavior
 */

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        // Show button after scrolling 300px
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    // Smooth Scroll to Top function
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});