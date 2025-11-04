// ========================================
// Menu Page JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initializeMenu();
    initializeSearch();
    updateCopyrightYear();
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
// Initialize Search Functionality
// ========================================

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const menuSections = document.querySelectorAll('.menu-section');
    const dishCards = document.querySelectorAll('.dish-card');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Reset to current category filter
            const activeButton = document.querySelector('.tab-button.active');
            if (activeButton) {
                const category = activeButton.getAttribute('data-category');
                filterMenuSections(category, menuSections);
            }
            return;
        }
        
        // Search through all dishes
        let foundAny = false;
        
        menuSections.forEach(section => {
            let sectionHasResults = false;
            const sectionDishCards = section.querySelectorAll('.dish-card');
            
            sectionDishCards.forEach(card => {
                const dishName = card.querySelector('.dish-name').textContent.toLowerCase();
                const dishDescription = card.querySelector('.dish-description').textContent.toLowerCase();
                
                if (dishName.includes(searchTerm) || dishDescription.includes(searchTerm)) {
                    card.style.display = 'flex';
                    sectionHasResults = true;
                    foundAny = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show/hide section based on results
            if (sectionHasResults) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
        
        // Show/hide no results message
        showNoResultsMessage(!foundAny);
    });
    
    // Clear search when clicking on category tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            searchInput.value = '';
        });
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
// Print Functionality (Optional)
// ========================================

function printMenu() {
    window.print();
}

// Add print button functionality if needed
// You can add a print button in HTML and connect it to this function

