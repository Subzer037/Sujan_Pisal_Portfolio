// Smooth Sliding for Sidebar Links
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Offset to account for the fixed header height
        const headerOffset = 90; 
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// Typing Effect
const typing = document.querySelector(".typing");
const text = typing.innerText;
typing.innerText = "";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        typing.innerText += text.charAt(i);
        i++;
        setTimeout(typeEffect, 30);
    }
}
typeEffect();

// MATRIX EFFECT
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array.from({ length: columns }).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ffe1";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    });
}
if (window.innerWidth > 768) {
    setInterval(drawMatrix, 50);
}

const scrollBtn = document.getElementById("scrollToTop");

// Show/Hide button based on scroll position
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Smooth scroll to top when clicked
scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// SYNC SIDEBAR HIGHLIGHT WITH SCROLL
// REFINED NAVIGATION OBSERVER
const navLinks = document.querySelectorAll(".sidebar a");
const sections = document.querySelectorAll("section");

const observerOptions = {
    root: null,
    // The negative margin ensures only the section taking up the middle 
    // of the screen is considered "active".
    rootMargin: "-25% 0px -65% 0px", 
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            
            // 1. Remove active class from ALL links first
            navLinks.forEach((link) => link.classList.remove("active-nav"));
            
            // 2. Add active class ONLY to the current section's link
            const currentLink = document.querySelector(`.sidebar a[href="#${id}"]`);
            if (currentLink) {
                currentLink.classList.add("active-nav");
            }
        }
    });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

// Specific fix for clicking: Force clean slate on click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove("active-nav"));
        link.classList.add("active-nav");
    });
});





