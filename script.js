// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordion
    initFAQ();
    
    // Initialize language toggle
    initLanguageToggle();
    
    // Smooth scrolling for navigation links
    initSmoothScroll();
    
    // Add sticky header on scroll
    initStickyHeader();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Initialize FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle the active class on the clicked item
            item.classList.toggle('active');
            
            // Update the icon
            const icon = item.querySelector('.faq-toggle i');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
            
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.faq-toggle i');
                    otherIcon.classList.add('fa-plus');
                    otherIcon.classList.remove('fa-minus');
                }
            });
        });
    });
    
    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstIcon = faqItems[0].querySelector('.faq-toggle i');
        firstIcon.classList.remove('fa-plus');
        firstIcon.classList.add('fa-minus');
    }
}

// Initialize language toggle functionality
function initLanguageToggle() {
    const allLangButtons = document.querySelectorAll('.lang-btn');
    
    allLangButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Find all language buttons in both desktop and mobile menus
            const langButtons = document.querySelectorAll(`.lang-btn[data-lang="${button.dataset.lang}"]`);
            
            // Remove active class from all buttons in all menus
            allLangButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button and its counterpart in the other menu
            langButtons.forEach(btn => btn.classList.add('active'));
            
            // Redirect to the appropriate language page
            const language = button.dataset.lang;
            
            // Get current page location
            const currentPath = window.location.pathname;
            
            // If we're already on the language page or index.html, don't redirect
            if (language === 'en' && (currentPath.endsWith('index.html') || currentPath.endsWith('/'))) {
                return;
            }
            
            if (language === 'zh' && currentPath.endsWith('zh.html')) {
                return;
            }
            
            // Redirect to the appropriate page
            if (language === 'en') {
                window.location.href = 'index.html';
            } else if (language === 'zh') {
                window.location.href = 'zh.html';
            }
        });
    });
    
    // Set active language button based on current page
    const currentPath = window.location.pathname;
    if (currentPath.endsWith('zh.html')) {
        allLangButtons.forEach(btn => {
            if (btn.dataset.lang === 'zh') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    } else {
        allLangButtons.forEach(btn => {
            if (btn.dataset.lang === 'en') {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add offset for fixed header
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.getElementById('menu-toggle').querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });
}

// Sticky header on scroll
function initStickyHeader() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Initialize mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Change the hamburger icon to X when menu is open
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
    });
}

// Add animation when elements come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Utility function to format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

// Calculate savings based on trading volume (example function)
function calculateSavings(tradingVolume, standardRate, discountRate) {
    const standardFee = tradingVolume * standardRate / 100;
    const discountedFee = tradingVolume * discountRate / 100;
    return standardFee - discountedFee;
}

// Example usage of the savings calculator
/* 
// This would be called from a form event listener:
document.querySelector('#calculate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const volume = parseFloat(document.querySelector('#trading-volume').value);
    const savings = calculateSavings(volume, 0.1, 0.08);
    
    document.querySelector('#savings-result').textContent = `$${formatNumber(savings.toFixed(2))}`;
});
*/ 