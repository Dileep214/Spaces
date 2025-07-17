// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.program-card, .facility-card, .stat-item, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Fallback: ensure all fade-in elements are visible after 2 seconds
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (!el.classList.contains('visible')) {
                el.classList.add('visible');
            }
        });
    }, 2000);
});

// Contact form handling - Simplified for Web3Forms
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Remove any existing event listeners to prevent conflicts
    contactForm.removeEventListener('submit', contactForm._submitHandler);
    
    contactForm._submitHandler = function(e) {
        // Only validate, don't prevent default
        if (!validateForm(this)) {
            e.preventDefault();
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;
        
        // Let the form submit naturally to Web3Forms
        // The form will redirect to success page after submission
        
        // Reset button after a delay
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    };
    
    contactForm.addEventListener('submit', contactForm._submitHandler);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    const backgroundColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Counter animation for statistics - DISABLED
// Numbers will remain constant as requested
function animateCounters() {
    // Animation disabled - numbers remain constant
    const counters = document.querySelectorAll('.stat-item h4');
    counters.forEach(counter => {
        // Keep the original text content without animation
        // The numbers will display as they are in the HTML
    });
}

// Stats section observer - DISABLED
// No animation will be triggered when stats section becomes visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    // Observer disabled - numbers will remain constant
    // const statsObserver = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             animateCounters();
    //             statsObserver.unobserve(entry.target);
    //         }
    //     });
    // }, { threshold: 0.5 });
    
    // statsObserver.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #1e40af !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Add hover effects for program cards
document.addEventListener('DOMContentLoaded', () => {
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = '#e5e7eb';
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    return isValid;
}

// Add form validation to contact form
if (contactForm) {
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '#e5e7eb';
            }
        });
        
        input.addEventListener('input', () => {
            if (input.style.borderColor === 'rgb(239, 68, 68)') {
                input.style.borderColor = '#e5e7eb';
            }
        });
    });
}

// Add scroll to top functionality
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #1e40af;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 5px 15px rgba(30, 64, 175, 0.3);
`;

document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.visibility = 'visible';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.visibility = 'hidden';
    }
});

// Add loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('SPACES Degree College website loaded successfully!'); 