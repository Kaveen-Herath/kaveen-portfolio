const cards = document.querySelectorAll(".work-card");

cards.forEach(card => {
  const shine = document.createElement("div");
  shine.classList.add("shine");
  card.appendChild(shine);

  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 3;
    const midY = rect.height / 3;

    const rotateX = ((y - midY) / midY) * 25;
    const rotateY = ((x - midX) / midX) * 25;

    // bring card to front while hovered
    card.style.zIndex = "50";
    card.style.transform = `scale(1.4) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;

    shine.style.opacity = 0;
    shine.style.transform = `translateX(${(x - midX) / 20}px) translateY(${(y - midY) / 20}px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.zIndex = "1"; // reset when mouse leaves
    card.style.transform = "scale(0.95) rotateX(0deg) rotateY(0deg)";
    shine.style.opacity = 0;
  });
});



// optional: disable tilt on touch devices
if ("ontouchstart" in window) {
  cards.forEach(card => {
    card.style.transform = "scale(1)";
  });
}

// parallax background that reacts to cursor
document.addEventListener("mousemove", (e) => {
  const { innerWidth, innerHeight } = window;

  // get values between -0.5 and 0.5
  const xNorm = e.clientX / innerWidth - 0.5;
  const yNorm = e.clientY / innerHeight - 0.5;

  // scale movement (tweak 25px to be more/less intense)
  const moveX = xNorm * 10;
  const moveY = yNorm * 10;

  document.body.style.backgroundPosition = `${50 - moveX}% ${50 - moveY}%`;
});


// script.js
const albumCapsule = document.getElementById("albumCapsule");

if (albumCapsule) {
  window.addEventListener("scroll", () => {
    const rect = albumCapsule.getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight;

    // progress: 0 when capsule is at bottom edge, 1 when it reaches top edge
    let progress = 1 - rect.top / h;
    progress = Math.max(0, Math.min(1, progress)); // clamp 0–1

    const maxShift = 220; // how far it travels, in px

    // start on the RIGHT (positive), end on the LEFT (negative)
    const offset = maxShift - progress * 4 * maxShift;

    // if your CSS has left:50% translateX(-50%), keep that centering:
    albumCapsule.style.transform = `translateX(calc(-50% + ${offset}px))`;
  });
}



const heroCapsule = document.getElementById("heroCapsule");

if (heroCapsule) {
  window.addEventListener("scroll", () => {
    const rect = heroCapsule.getBoundingClientRect();
    const h = window.innerHeight || document.documentElement.clientHeight;

    let progress = 1 - rect.top / h;
    progress = Math.max(0, Math.min(1, progress)); // 0–1

    const maxShift = 200;              // how far it moves

    const offsetY = maxShift - progress * 2 * maxShift;

    heroCapsule.style.transform = `translate(-50%, ${offsetY}px)`;
  });
}

// CHAT

document.addEventListener('DOMContentLoaded', function() {
  const socialFab = document.getElementById('socialFab');
  const socialFabIcon = document.getElementById('socialFabIcon');
  const socialDropup = document.getElementById('socialDropup');
  
  if (!socialFab || !socialFabIcon || !socialDropup) return;

  let menuOpen = false;

  // Click main button: toggle dropup (don't navigate)
  socialFab.addEventListener('click', (e) => {
    e.preventDefault();
    menuOpen = !menuOpen;
    socialDropup.classList.toggle('show');
  });

  // Click outside: hide menu
  document.addEventListener('click', (e) => {
    if (!socialFab.contains(e.target) && !socialDropup.contains(e.target)) {
      socialDropup.classList.remove('show');
      menuOpen = false;
    }
  });

const socialStates = [
  { name: "whatsapp", href: "https://wa.me/94767347799", icon: "assets/images/logos/wa.webp", bg: "#25d366" },
  { name: "instagram", href: "https://www.instagram.com/__kaveen_herath__/", icon: "assets/images/logos/ig.webp", bg: "#DD2A7B" },
  { name: "linkedin", href: "https://www.linkedin.com/in/kaveen-herath/", icon: "assets/images/logos/linkedin.webp", bg: "#0A66C2" }
];

const container = document.getElementById('socialDropup');

socialStates.forEach(social => {
  const a = document.createElement('a');
  a.href = social.href;
  a.target = "_blank";
  a.className = `dropup-icon ${social.name}`;
  a.style.background = social.bg;

  const img = document.createElement('img');
  img.src = social.icon;     // relative path
  img.alt = social.name;
  img.loading = "lazy";      // explicitly set on the <img>
  
  a.appendChild(img);
  container.querySelector('.dropup-container').appendChild(a);
});

  let socialIndex = 0;
  function applySocialState(idx) {
    const s = socialStates[idx];
    socialFab.href = s.href;  // Still updates link for direct clicks when menu closed
    socialFab.style.background = s.bg;
    socialFabIcon.src = s.icon;
    socialFabIcon.alt = s.name;
  }

  applySocialState(socialIndex);
  setInterval(() => {
    socialIndex = (socialIndex + 1) % socialStates.length;
    applySocialState(socialIndex);
  }, 5000);
});


document.addEventListener('DOMContentLoaded', function () {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  // show button after scrolling 300px down
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // smooth scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.hero-name');
  if (!el) return;

  const finalText = el.textContent;       // "Edward Kaveen"
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&?';
  let frame = 0;
  const totalFrames = 20;                 // how long it "scrambles" overall
  const revealSpeed = 2;                  // lower = faster reveal

  const chars = finalText.split('');

  const interval = setInterval(() => {
    let output = '';

    for (let i = 0; i < chars.length; i++) {
      const progress = frame - i * revealSpeed;

      if (chars[i] === ' ') {
        output += ' ';
        continue;
      }

      if (progress > totalFrames / 2) {
        // this letter is fully revealed
        output += chars[i];
      } else if (progress > 0) {
        // scrambling phase for this position
        const randomChar = letters[Math.floor(Math.random() * letters.length)];
        output += randomChar;
      } else {
        // not started yet, keep empty or original
        output += letters[Math.floor(Math.random() * letters.length)];
      }
    }

    el.textContent = output;
    frame++;

    if (frame > totalFrames + chars.length * revealSpeed) {
      el.textContent = finalText;  // ensure final result is correct
      clearInterval(interval);
    }
  }, 50); // speed of updates in ms (50 = smooth, ~20fps)
});


document.addEventListener('DOMContentLoaded', () => {
  const postersSection = document.querySelector('.album-block');
  const toggleBtn = document.getElementById('togglePostersBtn');

  if (!postersSection || !toggleBtn) {
    console.log('Posters section or toggle button not found');
    return;
  }

  toggleBtn.addEventListener('click', () => {
    const isExpanded = postersSection.classList.toggle('expanded');
    toggleBtn.textContent = isExpanded ? 'Show less' : 'Show more';
  });
});


  document.querySelectorAll('.artwork-card img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
  });

    // All external contact links
  document.querySelectorAll('.cv-contact-value[href^="http"]').forEach(a => {
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
  });