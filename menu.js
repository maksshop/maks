// ========================================
// Menu Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initializeMenu();
    updateCopyrightYear();
    initializeThemeToggle();
    initializeStickyMenu();
});

// ========================================
// Initialize Menu Functions
// ========================================

function initializeMenu() {
    // Get all tab buttons and menu sections
    const tabButtons = document.querySelectorAll('.tab-button');
    const menuSections = document.querySelectorAll('.menu-section');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter menu sections
            filterMenuSections(category, menuSections);
            
            // Scroll to top of menu content
            document.querySelector('.menu-content').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });
    });
}

// ========================================
// Filter Menu Sections
// ========================================

function filterMenuSections(category, menuSections) {
    menuSections.forEach(section => {
        const sectionCategory = section.getAttribute('data-category');
        
        if (category === 'all' || sectionCategory === category) {
            section.classList.remove('hidden');
            // Add fade-in animation
            section.style.animation = 'none';
            setTimeout(() => {
                section.style.animation = 'fadeIn 0.5s ease-in';
            }, 10);
        } else {
            section.classList.add('hidden');
        }
    });
    
    // Check if no sections are visible
    const visibleSections = Array.from(menuSections).filter(
        section => !section.classList.contains('hidden')
    );
    
    // Show/hide no results message
    showNoResultsMessage(visibleSections.length === 0);
}

// ========================================
// Initialize Sticky Menu
// ========================================

function initializeStickyMenu() {
    const menuTabs = document.getElementById('menuTabs');
    const menuContent = document.querySelector('.menu-content');
    
    if (!menuTabs) return;
    
    // Get the offset position of the menu tabs
    const menuTabsOffset = menuTabs.offsetTop;
    
    // Add scroll event listener
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > menuTabsOffset) {
            menuTabs.classList.add('sticky');
            if (menuContent) {
                menuContent.style.paddingTop = '100px';
            }
        } else {
            menuTabs.classList.remove('sticky');
            if (menuContent) {
                menuContent.style.paddingTop = '0';
            }
        }
    });
}

// ========================================
// Show No Results Message
// ========================================

function showNoResultsMessage(show) {
    let noResultsDiv = document.getElementById('no-results-message');
    
    if (show) {
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'no-results-message';
            noResultsDiv.className = 'no-results';
            noResultsDiv.innerHTML = `
                <i class="fas fa-search"></i>
                <p>Не са намерени ястия, отговарящи на вашето търсене.</p>
            `;
            const menuContent = document.querySelector('.menu-content');
            if (menuContent) {
                menuContent.appendChild(noResultsDiv);
            }
        }
        noResultsDiv.style.display = 'block';
    } else {
        if (noResultsDiv) {
            noResultsDiv.style.display = 'none';
        }
    }
}

// ========================================
// Update Copyright Year
// ========================================

function updateCopyrightYear() {
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// ========================================
// Smooth Scroll Enhancement
// ========================================

// Add smooth scroll behavior to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ========================================
// Keyboard Navigation Enhancement
// ========================================

// Allow Enter key to activate tab buttons
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Add focus styles for accessibility
    button.addEventListener('focus', function() {
        this.style.outline = '3px solid #ce3232';
        this.style.outlineOffset = '2px';
    });
    
    button.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ========================================
// Theme Toggle Functionality
// ========================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('menuTheme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateThemeIcon(themeToggle, true);
    }
    
    // Add click event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            
            // Save preference
            localStorage.setItem('menuTheme', isDark ? 'dark' : 'light');
            
            // Update icon
            updateThemeIcon(themeToggle, isDark);
        });
    }
}

function updateThemeIcon(button, isDark) {
    const icon = button.querySelector('i');
    if (icon) {
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

// ========================================
// Print Functionality (Optional)
// ========================================

function printMenu() {
    window.print();
}

// Add print button functionality if needed
// You can add a print button in HTML and connect it to this function

