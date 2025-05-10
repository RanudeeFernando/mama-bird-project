const reasons = [
  "You’re the kindest soul I know, always gentle, always warm.",
  "You put our comfort before your own every single time.",
  "Your love is the softest place to land when life feels hard.",
  "Your presence alone can calm any storm inside me.",
  "You sense when I need you, even before I say a word.",
  "You give without ever expecting anything back.",
  "You listen to every joy, every tear, every little thought I have.",
  "You always know the right words, even when I don’t.",
  "You’re my anchor when I’m overwhelmed and my wings when I need to fly.",
  "You make our house feel like home just by being in it.",
  "You’re my safest place in laughter, in sadness, in everything.",
  "Your hugs feel like home no matter where we are.",
  "I tell you everything because you’re the only one who really gets it.",
  "You make me feel understood even when I don’t understand myself.",
  "Because no matter how grown I get, you still make me feel like your little girl — safe, loved, and protected in a way no one else ever can.",
  "You just know when I’m tired, when I’m hurting, when I need you.",
  "You’re my calm in the chaos and my warmth in the cold.",
  "When I’m happy, you double it. When I’m sad, you carry it with me.",
  "Even in silence, I feel your love speaking to me.",
  "You’re not just my mom, you’re my heart’s home.",
  "You never make me feel like a burden, only like I’m loved.",
  "You celebrate every little win like it’s the biggest thing in the world.",
  "You give the kind of advice that stays with me forever.",
  "You’ve taught me what strength looks like in the gentlest way.",
  "You love me in all my moods, even the hard ones.",
  "You remember the small things that matter most.",
  "You laugh with me when I need joy and sit with me when I need quiet.",
  "You’ve shaped who I am in the most beautiful ways.",
  "You’re the voice in my head that reminds me I’m enough.",
  "You’re the reason I know what unconditional love truly means.",
  "Because you care so deeply, so completely, and so quietly — it’s the kind of love that never asks for anything back.",
  "Because you’re selfless in the most genuine way, always giving more of yourself than anyone even sees.",
  "Because your strength is quiet and steady, the kind that holds a family together without needing applause.",
  "Because even when you’re tired or hurting, you still show up for everyone else with love.",
  "Because you carry so much on your shoulders, yet still make space for everyone else’s pain and joy.",
  "Because you put others before yourself without hesitation — and somehow still give with joy.",
  "Because you lead with your heart, even when life doesn’t make it easy.",
  "Because your heart is forever young, and your childlike wonder makes life feel magical.",
  "Because you love fiercely, protect gently, and never stop caring no matter what."
];

let currentHeart = null;
let heartTimeout = null;


function showReason() {
  const reason = reasons[Math.floor(Math.random() * reasons.length)];
  const overlay = document.getElementById("popupHeartOverlay");

  // If a heart is already visible, fade it out before showing a new one
  if (currentHeart) {
    currentHeart.classList.add("fade-out");

    setTimeout(() => {
      if (currentHeart) {
        overlay.removeChild(currentHeart);
        currentHeart = null;
        clearTimeout(heartTimeout);
        showNewHeart(reason); // ← Show new heart after old one is removed
      }
    }, 600); // match fade-out duration
  } else {
    showNewHeart(reason); // No heart present, show immediately
  }
}

function showNewHeart(reason) {
  const overlay = document.getElementById("popupHeartOverlay");

  const wrapper = document.createElement("div");
  wrapper.classList.add("popup-heart-wrapper");

  const img = document.createElement("img");
  img.src = "assets/svg/7.svg";

  const text = document.createElement("div");
  text.classList.add("popup-heart-text");
  text.textContent = reason;

  wrapper.appendChild(img);
  wrapper.appendChild(text);
  overlay.appendChild(wrapper);

  currentHeart = wrapper;

  heartTimeout = setTimeout(() => {
    if (currentHeart && !currentHeart.classList.contains("fade-out")) {
      overlay.removeChild(currentHeart);
      currentHeart = null;
    }
  }, 5000);
}


function goToSlide(n) {
  document.getElementById("slide" + n).scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("DOMContentLoaded", () => {
  // Try auto-starting music on load 
  const music = document.getElementById("bgMusic");
  if (music) {
    music.play().catch(() => {
      // autoplay failed, wait for interaction
    });
  }

  // Existing slideshow and toggle logic
  let slideIndex = 0;
  const images = document.querySelectorAll(".slide-img");
  if (images.length) {
    images[0].classList.add("active");
    setInterval(() => {
      images[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % images.length;
      images[slideIndex].classList.add("active");
    }, 3000);
  }

  const toggleBtn = document.getElementById("musicToggle");
  if (music && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        toggleBtn.textContent = "🔈";
      } else {
        music.pause();
        toggleBtn.textContent = "🔇";
      }
    });
  }
});


// Slide observer to remove heart smoothly
let currentSlide = 1;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id.startsWith("slide")) {
      const newSlide = parseInt(entry.target.id.replace("slide", ""));
      if (newSlide !== currentSlide) {
        currentSlide = newSlide;

        if (currentHeart) {
          const overlay = document.getElementById("popupHeartOverlay");
          currentHeart.classList.add("fade-out");

          setTimeout(() => {
            if (currentHeart) {
              overlay.removeChild(currentHeart);
              currentHeart = null;
              clearTimeout(heartTimeout);
            }
          }, 600); // match fade-out animation time
        }
      }
    }
  });
}, {
  threshold: 0.6
});

document.querySelectorAll(".slide").forEach(slide => observer.observe(slide));
