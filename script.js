// Mise à jour de l'année dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

// Gestion du menu hamburger (mobile)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fermer le menu lors du clic sur un lien (mobile)
links.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Changement de style de la navigation au défilement
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Animation au défilement (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            
            // Animation spécifique pour les barres de progression
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.progress');
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 300);
            }
            
            observer.unobserve(entry.target); // Ne jouer l'animation qu'une fois
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.querySelectorAll('.fade-in, .fade-up, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Gestion des liens actifs au défilement
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});
