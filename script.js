// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);

    // Add animation classes to elements (exclude promotion images)
    const animateElements = document.querySelectorAll('.grid.md\\:grid-cols-3 > div, .grid.md\\:grid-cols-4 > div:not(.enlarge-image), .grid.md\\:grid-cols-2 > div');
    animateElements.forEach(element => {
        element.classList.add('opacity-0', 'transform', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(element);
    });

    // Add CSS for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Product card hover effects
    const productCards = document.querySelectorAll('.grid.md\\:grid-cols-4 > div');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Form validation and submission
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const firstName = this.querySelector('input[type="text"]').value;
            const lastName = this.querySelectorAll('input[type="text"]')[1].value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (!firstName || !lastName || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Navbar sticky behavior on scroll
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    let isScrolling = false;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always keep navbar visible (sticky behavior)
        navbar.style.transform = 'translateY(0)';
        
        // Add enhanced background effect when scrolled
        if (scrollTop > 50) {
            navbar.classList.add('bg-white', 'bg-opacity-95', 'backdrop-blur-md', 'shadow-xl');
            navbar.classList.remove('shadow-lg');
        } else {
            navbar.classList.remove('bg-white', 'bg-opacity-95', 'backdrop-blur-md', 'shadow-xl');
            navbar.classList.add('shadow-lg');
        }

        lastScrollTop = scrollTop;
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });

        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Add CSS for image loading
    const imageStyle = document.createElement('style');
    imageStyle.textContent = `
        img {
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        img.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(imageStyle);

    // Button ripple effect
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'fixed bottom-8 right-8 bg-supermax-red text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-50';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
            setTimeout(() => {
                scrollToTopBtn.classList.remove('opacity-0');
                scrollToTopBtn.classList.add('opacity-100');
            }, 10);
        } else {
            scrollToTopBtn.classList.remove('opacity-100');
            scrollToTopBtn.classList.add('opacity-0');
            setTimeout(() => {
                scrollToTopBtn.style.display = 'none';
            }, 300);
        }
    });

    // Image enlargement functionality for promotion section
    const enlargeImageElements = document.querySelectorAll('.enlarge-image');
    enlargeImageElements.forEach(element => {
        element.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            enlargeImageFunction(imageSrc);
        });
    });

    // Image enlargement function
    function enlargeImageFunction(imageSrc) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        };

        // Create enlarged image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'relative max-w-4xl max-h-screen p-4';

        // Create enlarged image
        const enlargedImage = document.createElement('img');
        enlargedImage.src = imageSrc;
        enlargedImage.className = 'w-full h-auto max-h-screen object-contain rounded-lg cursor-pointer';
        enlargedImage.alt = 'Enlarged promotional image';
        enlargedImage.addEventListener('load', function() {
            enlargedImage.classList.add('loaded');
        });
        if (enlargedImage.complete) {
            enlargedImage.classList.add('loaded');
        }
        
        // Add click to close functionality to the image itself
        enlargedImage.addEventListener('click', function() {
            modal.remove();
        });

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fas fa-times text-white text-2xl"></i>';
        closeButton.className = 'absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300';
        closeButton.onclick = function() {
            modal.remove();
        };

        // Assemble modal
        imageContainer.appendChild(enlargedImage);
        imageContainer.appendChild(closeButton);
        modal.appendChild(imageContainer);
        document.body.appendChild(modal);

        // Add keyboard support for closing
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    };

    // Phone Number Click Enhancement
    const phoneNumberLink = document.querySelector('a[href^="tel:"]');
    
    if (phoneNumberLink) {
        phoneNumberLink.addEventListener('click', function(e) {
            // Add ripple effect to the phone number button
            const phoneButton = this.querySelector('div');
            const ripple = document.createElement('span');
            const rect = phoneButton.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(220, 38, 38, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            phoneButton.style.position = 'relative';
            phoneButton.style.overflow = 'hidden';
            phoneButton.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Optional: Add a small delay to show the ripple effect before calling
            setTimeout(() => {
                // The phone call will be initiated by the href="tel:" attribute
                console.log('Initiating phone call to delivery service');
            }, 300);
        });
    }
});
