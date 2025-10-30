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
        
        // Always keep navbar visible (sticky behavior)
        if (navbar) {
            navbar.style.transform = 'translateY(0)';
            
            // Add enhanced background effect when scrolled
            if (scrollTop > 50) {
                navbar.classList.add('bg-white', 'bg-opacity-95', 'backdrop-blur-md', 'shadow-xl');
                navbar.classList.remove('shadow-lg');
            } else {
                navbar.classList.remove('bg-white', 'bg-opacity-95', 'backdrop-blur-md', 'shadow-xl');
                navbar.classList.add('shadow-lg');
            }
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
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
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
        imageContainer.className = 'relative max-w-4xl max-h-screen p-2 sm:p-4';
        imageContainer.style.touchAction = 'none'; // Prevent touch events from bubbling

        // Create enlarged image
        const enlargedImage = document.createElement('img');
        enlargedImage.src = imageSrc;
        enlargedImage.className = 'w-full h-auto max-h-screen object-contain rounded-lg';
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
        closeButton.innerHTML = '<i class="fas fa-times text-white text-xl sm:text-2xl"></i>';
        closeButton.className = 'absolute top-1 right-1 sm:top-2 sm:right-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300';
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

    // Restaurant Image Carousel (local images only)
    const restaurantImages = [
        'img/r_1.jpg',
        'img/r_2.jpg',
        'img/r_3.jpg',
        'img/r_4.jpg',
        'img/r_5.jpg'
    ];

    const restaurantImageElement = document.querySelector('#restaurant-image');
    let currentImageIndex = 0;
    let isTransitioning = false;

    if (restaurantImageElement) {
        function changeRestaurantImage() {
            if (isTransitioning) return;
            
            isTransitioning = true;
            currentImageIndex = (currentImageIndex + 1) % restaurantImages.length;
            
            // Fade out
            restaurantImageElement.style.opacity = '0';
            
            setTimeout(() => {
                restaurantImageElement.src = restaurantImages[currentImageIndex];
                restaurantImageElement.classList.add('loaded');
                
                // Fade in
                setTimeout(() => {
                    restaurantImageElement.style.opacity = '1';
                    isTransitioning = false;
                }, 50);
            }, 800);
        }

        // Change image every 3 seconds
        setInterval(changeRestaurantImage, 3000);

        // Add smooth fade transition effect
        restaurantImageElement.style.transition = 'opacity 1s ease-in-out';
        restaurantImageElement.style.opacity = '1';
    }
});
