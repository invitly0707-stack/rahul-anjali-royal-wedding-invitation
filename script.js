// ==========================================================================
// 1. GENERATE FLOATING LUXURY GOLD PARTICLES Dynamically
// ==========================================================================
function createGoldParticles() {
    const container = document.getElementById('particle-container');
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('gold-particle');
        
        const size = Math.random() * 5 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDelay = `${Math.random() * 12}s`;
        particle.style.animationDuration = `${Math.random() * 8 + 8}s`;
        
        container.appendChild(particle);
    }
}

// ==========================================================================
// 2. ENVELOPE OPENING STEP SEQUENCING ANIMATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    createGoldParticles();
    
    const waxSeal = document.getElementById('wax-seal');
    const envelope = document.getElementById('main-envelope');
    const cardContainer = document.getElementById('revealed-card-container');
    const btnOpenMainSite = document.getElementById('btn-open-main-site');
    const portalOverlay = document.getElementById('portal-overlay');
    const mainWebsite = document.getElementById('main-website');

    setTimeout(() => {
        envelope.classList.add('break-seal');
        
        setTimeout(() => {
            waxSeal.classList.add('broken');
            
            setTimeout(() => {
                envelope.style.opacity = '0';
                envelope.style.transition = 'opacity 0.6s ease';
                
                setTimeout(() => {
                    document.getElementById('envelope-wrapper').classList.add('hidden');
                    cardContainer.classList.remove('hidden');
                    cardContainer.offsetHeight; 
                    cardContainer.classList.add('animate-in');
                }, 400);
                
            }, 600);
        }, 500);
    }, 2000);

    btnOpenMainSite.addEventListener('click', () => {
        portalOverlay.style.transform = 'translateY(-100vh)';
        mainWebsite.classList.remove('hidden-content');
        
        initCountdownTimer();
        initScrollReveals();
    });
});

// ==========================================================================
// 3. COUNTDOWN TIMER MODULE
// ==========================================================================
function initCountdownTimer() {
    const targetDate = new Date('December 15, 2026 19:00:00').getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference < 0) {
            clearInterval(interval);
            document.getElementById('countdown-timer').innerHTML = "<h3>The Royal Festivity Begins</h3>";
            return;
        }

        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;

    }, 1000);
}

// ==========================================================================
// 4. SCROLL DETECTION INTERSECTION OBSERVER
// ==========================================================================
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================================================
// 5. LIGHTBOX FUNCTIONALITY (Now Supports Images)
// ==========================================================================
function openLightbox(imgSrc, captionText) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = imgSrc;
    lightboxCaption.innerText = captionText;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// ==========================================================================
// 6. RSVP FORM HANDLER
// ==========================================================================
function handleRSVP(event) {
    event.preventDefault();
    
    const form = document.getElementById('rsvp-form');
    const successAlert = document.getElementById('rsvp-success');
    
    form.style.opacity = '0.3';
    form.style.pointerEvents = 'none';

    setTimeout(() => {
        form.classList.add('hidden');
        successAlert.classList.remove('hidden');
    }, 1200);
}