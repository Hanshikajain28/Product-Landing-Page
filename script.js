// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const isActive = button.classList.contains('active');
        
        // Close all others
        document.querySelectorAll('.faq-question').forEach(btn => {
            btn.classList.remove('active');
            if (btn.nextElementSibling) {
                btn.nextElementSibling.style.maxHeight = null;
            }
        });

        if (!isActive) {
            button.classList.add('active');
            const answer = button.nextElementSibling;
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation classes to specific elements that don't already have specific reveal animations
document.querySelectorAll('.glass-card, .section-title, .split-layout > div, .pricing-card').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(6, 6, 8, 0.9)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
    } else {
        nav.style.backgroundColor = 'rgba(25, 25, 35, 0.4)';
        nav.style.boxShadow = 'none';
        nav.style.borderBottom = '1px solid var(--glass-border)';
    }
});

// Smooth Scroll for Anchor Links (Handles sticky navbar height offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 80, // Offset for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Testimonial infinite scroll seamless looping
const slider = document.getElementById('testimonialSlider');
if (slider) {
    // Clone the cards inside the slider to ensure a seamless loop
    // By duplicating the content, the CSS animation can scroll through
    // both sets and then reset without a visible jump.
    const cards = Array.from(slider.children);
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        // Exclude the ID space or any unique identifiers if they existed
        slider.appendChild(clone);
    });
}
