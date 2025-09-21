// Main JavaScript file for Bella Vista Restaurant Website
// Simple and beginner-friendly code with clear comments

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all features
    initMobileMenu();
    initMenuFilter();
    initReservationForm();
    initSmoothScrolling();
    initScrollAnimations();
    initImageLoading();
    
    console.log('Bella Vista Restaurant website loaded successfully! 🍝');
});

// Mobile Menu Toggle
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Toggle the active class on both elements
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Menu Filter Functionality
function initMenuFilter() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const menuCategories = document.querySelectorAll('.menu-category');
        
        console.log('Filter buttons found:', filterButtons.length);
        console.log('Menu categories found:', menuCategories.length);
        
        if (filterButtons.length > 0 && menuCategories.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = this.getAttribute('data-category');
                    console.log('Filter clicked:', category);
                    
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Show/hide menu categories
                    menuCategories.forEach(categoryElement => {
                        const elementCategory = categoryElement.getAttribute('data-category');
                        
                        if (category === 'all' || elementCategory === category) {
                            categoryElement.style.display = 'block';
                            categoryElement.classList.remove('hidden');
                            categoryElement.style.opacity = '1';
                            console.log('Showing category:', elementCategory);
                        } else {
                            categoryElement.style.display = 'none';
                            categoryElement.classList.add('hidden');
                            categoryElement.style.opacity = '0';
                            console.log('Hiding category:', elementCategory);
                        }
                    });
                    
                    // Smooth scroll to menu items
                    const menuItems = document.querySelector('.menu-items');
                    if (menuItems) {
                        menuItems.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });
            });
            
            console.log('Menu filter initialized successfully!');
        } else {
            console.log('Menu filter elements not found!');
        }
    }, 100);
}

// Reservation Form Validation
function initReservationForm() {
    const reservationForm = document.getElementById('reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from submitting normally
            
            // Clear previous error messages
            clearErrorMessages();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const guests = document.getElementById('guests').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name-error', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('name-error', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate phone
            if (phone === '') {
                showError('phone-error', 'Phone number is required');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone-error', 'Please enter a valid phone number');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email-error', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email-error', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate guests
            if (guests === '') {
                showError('guests-error', 'Please select number of guests');
                isValid = false;
            }
            
            // Validate date
            if (date === '') {
                showError('date-error', 'Please select a date');
                isValid = false;
            } else if (!isValidDate(date)) {
                showError('date-error', 'Please select a future date');
                isValid = false;
            }
            
            // Validate time
            if (time === '') {
                showError('time-error', 'Please select a time');
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccessMessage();
                reservationForm.reset(); // Clear the form
            }
        });
        
        // Set minimum date to today
        const dateInput = document.getElementById('date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }
}

// Helper function to validate phone number
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate date (must be in the future)
function isValidDate(dateString) {
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
}

// Helper function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Helper function to clear all error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Helper function to show success message
function showSuccessMessage() {
    const successElement = document.getElementById('form-success');
    if (successElement) {
        successElement.style.display = 'block';
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            successElement.style.display = 'none';
        }, 5000);
    }
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Create intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.dish-card, .info-card, .testimonial-card, .menu-item, .value-card, .team-member, .gallery-item, .award-item, .faq-item');
    
    animateElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Image Loading - Ensure all images are fully visible
function initImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.filter = 'none';
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    // Add a simple loading effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Add interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to dish cards
    const dishCards = document.querySelectorAll('.dish-card, .menu-item');
    dishCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add gallery image click effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1.02)';
            }, 150);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .menu-category {
        transition: all 0.3s ease;
    }
    
    .menu-category.hidden {
        opacity: 0;
        transform: translateY(20px);
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log(`
🍝 Welcome to Bella Vista Restaurant!
📧 We'd love to hear from you
💻 Built with HTML5, CSS3, and JavaScript
🎨 Authentic Italian flavors in every pixel
`);

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile menu
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Your scroll handling code here
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add special effects for restaurant atmosphere
function initRestaurantEffects() {
    // Add subtle parallax effect to hero image
    const heroImage = document.querySelector('.hero-img');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add floating animation to dish badges
    const dishBadges = document.querySelectorAll('.dish-badge');
    dishBadges.forEach((badge, index) => {
        badge.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
    });
}

// Initialize restaurant effects when page loads
document.addEventListener('DOMContentLoaded', initRestaurantEffects);

// Add floating animation CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(floatingStyle);