// ==========================================================================
// 1. Static Starfield Canvas Background
// ==========================================================================
function initStarfield() {
  const canvas = document.getElementById("starfieldCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Generate static stars with random positions, sizes, and opacities
  const stars = Array.from({ length: 180 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.7 + 0.3,
  }));

  function render() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    });
  }

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    render();
  });

  render();
}

// ==========================================================================
// 2. Interactive Talking Avatar (Web Speech API)
// ==========================================================================
const introText =
  "Hi, I'm Anisha, a UI/UX Designer and Tech Enthusiast. Welcome to my portfolio!";

let isSpeaking = false;

function speakIntro() {
  if (!("speechSynthesis" in window)) {
    alert("Speech synthesis is not supported in your browser.");
    return;
  }

  // Stop any ongoing speech before playing new audio
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(introText);
  utterance.pitch = 1.1;
  utterance.rate = 0.95;

  // Select a clear female English voice if available
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(
    (v) =>
      v.lang.includes("en") &&
      (v.name.includes("Female") ||
        v.name.includes("Google") ||
        v.name.includes("Samantha") ||
        v.name.includes("Zira"))
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  // UI state management during speech
  const speechBtn = document.getElementById("speakBtn");
  const avatarImg = document.getElementById("avatarImg");

  utterance.onstart = () => {
    isSpeaking = true;
    if (speechBtn) {
      speechBtn.innerHTML = `<span class="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping inline-block mr-2"></span>Speaking... 🔊`;
    }
    if (avatarImg) {
      avatarImg.classList.add("animate-pulse");
    }
  };

  utterance.onend = () => {
    isSpeaking = false;
    if (speechBtn) {
      speechBtn.innerHTML = `Listen Intro 🎙️`;
    }
    if (avatarImg) {
      avatarImg.classList.remove("animate-pulse");
    }
  };

  utterance.onerror = () => {
    isSpeaking = false;
    if (speechBtn) {
      speechBtn.innerHTML = `Listen Intro 🎙️`;
    }
    if (avatarImg) {
      avatarImg.classList.remove("animate-pulse");
    }
  };

  window.speechSynthesis.speak(utterance);
}

// Ensure voices are loaded asynchronously in Chrome/Safari
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// ==========================================================================
// 3. Document Ready Initialization & Event Listeners
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Initialize starfield background
  initStarfield();

  // Attach speech event listeners to button and avatar image
  const speechBtn = document.getElementById("speakBtn");
  const avatarImg = document.getElementById("avatarImg");

  if (speechBtn) {
    speechBtn.addEventListener("click", speakIntro);
  }

  if (avatarImg) {
    avatarImg.addEventListener("click", speakIntro);
  }
});