// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        // Handle both click and touch events for better mobile support
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        
        mobileMenuButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
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
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-item').forEach(el => observer.observe(el));

    // Hover handled in CSS; no JS needed

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

    // Ensure navbar is always sticky
    if (navbar) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.zIndex = '50';
    }

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (navbar) {
            if (scrollTop > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
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
    scrollToTopBtn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l-7 7h4v9h6v-9h4z" fill="#fff"/></svg>';
    scrollToTopBtn.className = 'scrolltop';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) scrollToTopBtn.classList.add('show');
        else scrollToTopBtn.classList.remove('show');
    });

    // Image enlargement functionality for promotion section
    const enlargeImageElements = document.querySelectorAll('.enlarge-image');
    enlargeImageElements.forEach(element => {
        // Handle click events
        element.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = this.getAttribute('data-image');
            enlargeImageFunction(imageSrc);
        });
        
        // Handle touch events for mobile
        element.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = this.getAttribute('data-image');
            enlargeImageFunction(imageSrc);
        });
    });

    // Image enlargement function
    function enlargeImageFunction(imageSrc) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.touchAction = 'none'; // Prevent scrolling on mobile
        
        // Close modal function
        function closeModal() {
            modal.remove();
            document.body.style.overflow = ''; // Restore scrolling
        }

        // Close on overlay click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Create enlarged image container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'modal-image-wrap';
        imageContainer.style.touchAction = 'none'; // Prevent touch events from bubbling

        // Create enlarged image
        const enlargedImage = document.createElement('img');
        enlargedImage.src = imageSrc;
        enlargedImage.className = 'modal-img';
        enlargedImage.alt = 'Enlarged promotional image';
        enlargedImage.style.touchAction = 'none'; // Prevent touch events
        
        enlargedImage.addEventListener('load', function() {
            enlargedImage.classList.add('loaded');
        });
        if (enlargedImage.complete) {
            enlargedImage.classList.add('loaded');
        }
        
        // Add touch/click to close functionality to the image itself
        enlargedImage.addEventListener('click', closeModal);
        enlargedImage.addEventListener('touchend', function(e) {
            e.preventDefault();
            closeModal();
        });

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
        closeButton.className = 'modal-close';
        closeButton.style.touchAction = 'none';
        closeButton.addEventListener('click', closeModal);
        closeButton.addEventListener('touchend', function(e) {
            e.preventDefault();
            closeModal();
        });

        // Assemble modal
        imageContainer.appendChild(enlargedImage);
        imageContainer.appendChild(closeButton);
        modal.appendChild(imageContainer);
        document.body.appendChild(modal);
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';

        // Add keyboard support for closing
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    };

    // Removed phone number ripple enhancement to match simplified markup

    // Restaurant Image Carousel (local images only)
    const restaurantImages = [
        'img/restorant01.JPG',
        'img/restorant02.JPG',
        'img/restorant03.JPG',
        'img/restorant04.JPG',
        'img/restorant05.JPG'
    ];

    const restaurantImageElement = document.querySelector('#restaurant-image');
    let currentImageIndex = 0;
    let isTransitioning = false;

    if (restaurantImageElement) {
        function changeRestaurantImage() {
            if (isTransitioning || restaurantImages.length === 0) return;

            isTransitioning = true;
            currentImageIndex = (currentImageIndex + 1) % restaurantImages.length;

            // Fade out
            restaurantImageElement.style.opacity = '0';

            setTimeout(() => {
                const nextSrc = restaurantImages[currentImageIndex];
                const probe = new Image();
                probe.onload = function() {
                    restaurantImageElement.src = nextSrc;
                    restaurantImageElement.classList.add('loaded');
                    // Fade in
                    setTimeout(() => {
                        restaurantImageElement.style.opacity = '1';
                        isTransitioning = false;
                    }, 50);
                };
                probe.onerror = function() {
                    // Skip missing image and try the next one
                    isTransitioning = false;
                    changeRestaurantImage();
                };
                probe.src = nextSrc;
            }, 800);
        }

        // Change image every 3 seconds
        setInterval(changeRestaurantImage, 3000);

        // Add smooth fade transition effect
        restaurantImageElement.style.transition = 'opacity 1s ease-in-out';
        restaurantImageElement.style.opacity = '1';
    }
});
