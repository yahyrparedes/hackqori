// ===================================
// Navbar Scroll Effect
// ===================================
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===================================
// Active Link on Scroll
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, suffix = '', duration = 2000) {
    let start = 0;
    const frames = Math.max(1, Math.floor(duration / 16));
    const increment = target / frames;

    element.textContent = '0' + (suffix || '');

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (suffix || '');
        }
    }, 16);
}

// Observador genérico para cualquier .stat-number en la página (hero + clientes)
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-target')) || 0;
            const suffix = el.getAttribute('data-suffix') || '';
            // Inicializar texto y lanzar animación
            el.textContent = '0' + (suffix || '');
            animateCounter(el, target, suffix);
            statObserver.unobserve(el);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px'
});

// Observar todos los elementos que tengan la clase .stat-number
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stat-number').forEach(el => {
        statObserver.observe(el);
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image-container');

    if (heroContent && heroImage && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
    }
});

// ===================================
// Floating Cards Random Movement
// ===================================
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    setInterval(() => {
        // Aplicamos sólo un movimiento relativo Y aleatorio; leer la propiedad 'top' no aporta
        // y puede dar advertencias si es 'auto'. Evitamos lecturas innecesarias.
        const moveY = randomFloat(-3, 3);
        card.style.transform = `translateY(${moveY}px)`;
    }, 2000 + (index * 500));
});

// ===================================
// Hide Scroll Indicator on Scroll
// ===================================
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', function() {
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
});

// ===================================
// Animate Elements on Scroll
// ===================================
const animateOnScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animateOnScrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe elements with animate class
document.addEventListener('DOMContentLoaded', function() {
    // Animate section titles and descriptions
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate about items
    document.querySelectorAll('.about-item').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate about values
    document.querySelectorAll('.about-values').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate certification items
    document.querySelectorAll('.certification-item').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate certifications graphic
    document.querySelectorAll('.certifications-graphic').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate benefit cards
    document.querySelectorAll('.benefit-card').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate service cards
    document.querySelectorAll('.service-card').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate ally points
    document.querySelectorAll('.ally-point').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate ally graphic
    document.querySelectorAll('.ally-graphic').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate trust badges
    document.querySelectorAll('.trust-badge').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate results graphic
    document.querySelectorAll('.results-graphic').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate result items
    document.querySelectorAll('.result-item').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate client cards
    document.querySelectorAll('.client-card').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate client stats
    document.querySelectorAll('.client-stat').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate CTA graphic
    document.querySelectorAll('.cta-graphic').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate CTA benefits
    document.querySelectorAll('.cta-benefits li').forEach((el, index) => {
        setTimeout(() => {
            animateOnScrollObserver.observe(el);
        }, index * 100);
    });
});

// ===================================
// Animate Graph Bars on Scroll
// ===================================
// Helper que anima las barras (misma lógica que el observer usaba)
function animateGraphNow(container) {
    const bars = container.querySelectorAll('.graph-bar');
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const fill = bar.querySelector('.bar-fill');
            const height = fill.getAttribute('data-height');
            // Si height no está definido, no hacemos nada
            if (height) {
                fill.style.height = height + '%';
            }
        }, index * 200);
    });
}

const graphObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateGraphNow(entry.target);
            graphObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    // rootMargin para disparar un poco antes y evitar casos donde la animación nunca se lance
    rootMargin: '0px 0px -150px 0px'
});

// Observe graph container (con fallback si ya está visible)
document.addEventListener('DOMContentLoaded', function() {
    const graphContainer = document.querySelector('.graph-container');
    if (graphContainer) {
        // Si ya está visible en viewport, animar inmediatamente
        const rect = graphContainer.getBoundingClientRect();
        const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (inViewport) {
            animateGraphNow(graphContainer);
        } else {
            graphObserver.observe(graphContainer);
        }
    }
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Trigger hero animations
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('loaded');
    }
});

// ===================================
// Navbar Mobile Menu Close on Resize
// ===================================
let windowWidth = window.innerWidth;
window.addEventListener('resize', function() {
    if (window.innerWidth !== windowWidth) {
        windowWidth = window.innerWidth;
        const navbarCollapse = document.getElementById('navbarNav');
        if (window.innerWidth > 991 && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    }
});

// ===================================
// Prevent FOUC (Flash of Unstyled Content)
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.visibility = 'visible';
});

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Validation and Submit
// ===================================
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();

        if (contactForm.checkValidity()) {
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // Disable button and show loading
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

            // Simulate API call
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');

                // Show success message
                successMessage.classList.remove('d-none');

                // Reset button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;

                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.classList.add('d-none');
                }, 5000);

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 2000);
        }

        contactForm.classList.add('was-validated');
    });
}

// ===================================
// Animate Contact Items
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    // Animate contact items
    document.querySelectorAll('.contact-item').forEach(el => {
        animateOnScrollObserver.observe(el);
    });

    // Animate contact form
    document.querySelectorAll('.contact-form').forEach(el => {
        animateOnScrollObserver.observe(el);
    });
});

// ===================================
// Smooth Scroll for Footer Links
// ===================================
document.querySelectorAll('.footer-menu a, .footer-social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.getElementById('mainNav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===================================
// Carousel Auto-play Control
// ===================================
const testimonialsCarousel = document.getElementById('testimonialsCarousel');
if (testimonialsCarousel) {
    // Inicializamos el carousel directamente sin asignar a una variable que no usamos
    new bootstrap.Carousel(testimonialsCarousel, {
        interval: 5000,
        wrap: true,
        touch: true
    });
}

// ===================================
// Enhanced Scroll Animations
// ===================================
const revealElements = document.querySelectorAll('.animate-on-scroll');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ===================================
// Dynamic Year in Footer
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const copyrightElement = document.querySelector('.footer-copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2024', currentYear);
    }
});

// ===================================
// Lazy Loading Images (if needed)
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Prevent Form Resubmission on Refresh
// ===================================
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ===================================
// Console Welcome Message
// ===================================
console.log('%c¡Bienvenido a HackQori! 🛡️', 'font-size: 20px; font-weight: bold; color: #FDD835;');
console.log('%cProtegiendo tu negocio con las mejores soluciones de ciberseguridad', 'font-size: 14px; color: #666;');
console.log('%c💼 Desarrollado con HTML5, CSS3, JavaScript y Bootstrap 5', 'font-size: 12px; color: #999;');
// ===================================
// Cookie Consent Management - RGPD/GDPR Compliance
// ===================================
