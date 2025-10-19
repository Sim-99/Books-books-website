// script.js - JavaScript enhancements for Book's Books website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('show');
        });
    }

    // Testimonial carousel functionality
    initializeTestimonialCarousel();

    // Form validation
    initializeFormValidation();

    // Smooth scrolling for anchor links
    initializeSmoothScrolling();

    // Add fade-in animations to elements
    initializeAnimations();
});

// Testimonial Carousel
let currentTestimonial = 0;

function initializeTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            changeTestimonial(1);
        }, 5000);
    }
}

function changeTestimonial(direction) {
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length === 0) return;

    slides[currentTestimonial].classList.remove('active');
    
    currentTestimonial = (currentTestimonial + direction + slides.length) % slides.length;
    
    slides[currentTestimonial].classList.add('active');
}

// Lightbox functionality
function openLightbox(imageSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    lightbox.style.display = 'block';
    lightboxImage.src = imageSrc;
    lightboxCaption.textContent = caption;
    
    // Close on escape key
    document.addEventListener('keydown', function lightboxKeyHandler(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', lightboxKeyHandler);
        }
    });
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Form Validation
function initializeFormValidation() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateNewsletterForm(this);
        });
    }

    // Contact form (if exists on page)
    const contactForm = document.querySelector('.contact-card form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateContactForm(this);
        });
    }
}

function validateNewsletterForm(form) {
    const email = form.email.value;
    const messageDiv = document.getElementById('newsletterMessage');
    
    if (!isValidEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address.', 'error');
        return false;
    }
    
    // Simulate form submission
    showMessage(messageDiv, 'Thank you for subscribing to our newsletter!', 'success');
    form.reset();
    
    return false; // Prevent actual form submission for demo
}

function validateContactForm(form) {
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    let isValid = true;

    // Clear previous messages
    const existingMessage = form.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Name validation
    if (name.trim().length < 2) {
        showValidationError(form.name, 'Please enter your full name');
        isValid = false;
    } else {
        clearValidationError(form.name);
    }

    // Email validation
    if (!isValidEmail(email)) {
        showValidationError(form.email, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearValidationError(form.email);
    }

    // Message validation
    if (message.trim().length < 10) {
        showValidationError(form.message, 'Please enter a message of at least 10 characters');
        isValid = false;
    } else {
        clearValidationError(form.message);
    }

    if (isValid) {
        // Simulate successful submission
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Thank you for your message! We will get back to you soon.';
        form.appendChild(messageDiv);
        
        // Simulate AJAX submission
        simulateAjaxSubmission(form);
    }

    return false; // Prevent actual form submission for demo
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showValidationError(input, message) {
    clearValidationError(input);
    input.style.borderColor = '#e74c3c';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.style.color = '#e74c3c';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

function clearValidationError(input) {
    input.style.borderColor = '';
    const existingError = input.parentNode.querySelector('.validation-error');
    if (existingError) {
        existingError.remove();
    }
}

function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
}

function simulateAjaxSubmission(form) {
    // In a real application, this would be an actual AJAX call
    console.log('Form data would be submitted via AJAX:', new FormData(form));
    
    // Reset form after 3 seconds
    setTimeout(() => {
        form.reset();
        const message = form.querySelector('.form-message');
        if (message) {
            message.style.display = 'none';
        }
    }, 3000);
}

// Smooth Scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for anchor links
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
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback: scroll to newsletter section
        document.querySelector('.newsletter').scrollIntoView({ behavior: 'smooth' });
    }
}

// Animations
function initializeAnimations() {
    // Add fade-in animation to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.card, .news-card, section').forEach(el => {
        observer.observe(el);
    });
}

// Performance optimization: Lazy loading for images
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}
// about-script.js - Interactive features for About Us page

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeAccordion();
    initializeCounterAnimation();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Accordion functionality
function initializeAccordion() {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all accordion items
            accordionButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.nextElementSibling.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                this.classList.add('active');
                this.nextElementSibling.classList.add('active');
            }
        });
    });
}

// Animated counter for statistics
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Lower is faster

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target, speed);
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target, speed) {
    let current = 0;
    const increment = target / speed;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, 1);
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Smooth scrolling for internal links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
// news-script.js - Search, Filter, and Dynamic Loading for News Page

// Sample news data - in real application, this would come from a server
const newsData = [
    {
        id: 1,
        title: "Upcoming Book Drive Event",
        category: "events",
        date: "2024-04-01",
        image: "images/book-drive.jpg",
        excerpt: "Join us on April 1, 2024 as we collect and donate books to schools in underserved communities. Your contribution can help us build better libraries.",
        views: 1245,
        content: "Full article content would go here...",
        popular: true
    },
    {
        id: 2,
        title: "Library Transformation Success Story",
        category: "success-stories",
        date: "2024-03-15",
        image: "images/library-transformation.jpg",
        excerpt: "Thanks to our generous donors and volunteers, the Makhanda Community School library is now fully stocked and welcoming young readers.",
        views: 892,
        content: "Full article content would go here...",
        popular: true
    },
    {
        id: 3,
        title: "Volunteer Appreciation Event",
        category: "volunteer",
        date: "2024-03-10",
        image: "images/volunteer-1.jpg",
        excerpt: "We celebrated our amazing volunteers who help make Book's Books possible. Their dedication has positively impacted hundreds of students.",
        views: 567,
        content: "Full article content would go here...",
        popular: false
    },
    {
        id: 4,
        title: "New Partnership with Local Publishers",
        category: "announcements",
        date: "2024-03-01",
        image: "images/partnership.jpg",
        excerpt: "We're excited to announce new partnerships with major publishers to provide diverse books for our library programs.",
        views: 723,
        content: "Full article content would go here...",
        popular: false
    },
    {
        id: 5,
        title: "Summer Reading Program Launch",
        category: "events",
        date: "2024-02-20",
        image: "images/summer-reading.jpg",
        excerpt: "Our annual summer reading program begins next month with special events and reading challenges for children of all ages.",
        views: 934,
        content: "Full article content would go here...",
        popular: true
    },
    {
        id: 6,
        title: "Digital Library Initiative",
        category: "announcements",
        date: "2024-02-10",
        image: "images/digital-library.jpg",
        excerpt: "Expanding our reach with new digital library platforms to serve remote communities with limited physical access to books.",
        views: 645,
        content: "Full article content would go here...",
        popular: false
    }
];

let currentPage = 1;
const itemsPerPage = 4;
let filteredData = [...newsData];
let currentSearchTerm = '';
let currentCategory = 'all';
let currentSort = 'newest';

document.addEventListener('DOMContentLoaded', function() {
    initializeNewsPage();
    setupSearchHandlers();
});

function initializeNewsPage() {
    displayNews();
    updateResultsCount();
}

function setupSearchHandlers() {
    const searchInput = document.getElementById('newsSearch');
    
    // Real-time search
    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.toLowerCase();
        filterNews();
    });
    
    // Enter key search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchNews();
        }
    });
}

// Search functionality
function searchNews() {
    currentSearchTerm = document.getElementById('newsSearch').value.toLowerCase();
    filterNews();
}

// Filter news based on search and category
function filterNews() {
    const category = document.getElementById('categoryFilter').value;
    currentCategory = category;
    
    filteredData = newsData.filter(item => {
        const matchesSearch = !currentSearchTerm || 
            item.title.toLowerCase().includes(currentSearchTerm) ||
            item.excerpt.toLowerCase().includes(currentSearchTerm);
        
        const matchesCategory = category === 'all' || item.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    applySorting();
    currentPage = 1;
    displayNews();
    updateResultsCount();
}

// Sort news articles
function sortNews() {
    currentSort = document.getElementById('sortFilter').value;
    applySorting();
    currentPage = 1;
    displayNews();
}

function applySorting() {
    switch(currentSort) {
        case 'newest':
            filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular':
            filteredData.sort((a, b) => b.views - a.views);
            break;
    }
}

// Display news articles
function displayNews() {
    const container = document.getElementById('newsContainer');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const articlesToShow = filteredData.slice(0, endIndex);
    
    if (currentPage === 1) {
        container.innerHTML = '';
    }
    
    if (articlesToShow.length === 0) {
        showNoResults();
        return;
    }
    
    articlesToShow.forEach((article, index) => {
        if (index >= startIndex) {
            const articleElement = createNewsCard(article);
            container.appendChild(articleElement);
            
            // Add fade-in animation for new items
            setTimeout(() => {
                articleElement.classList.add('fade-in');
            }, index * 100);
        }
    });
    
    updateLoadMoreButton();
    hideLoadingIndicator();
}

function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
        <div class="news-card-image">
            <img src="${article.image}" alt="${article.title}" loading="lazy">
            <span class="news-card-category">${formatCategory(article.category)}</span>
        </div>
        <div class="news-card-content">
            <div class="news-card-date">
                <i class="far fa-calendar"></i>
                ${formatDate(article.date)}
            </div>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="news-card-stats">
                <div class="news-card-views">
                    <i class="far fa-eye"></i>
                    ${article.views.toLocaleString()} views
                </div>
                ${article.popular ? '<span class="popular-badge">🔥 Popular</span>' : ''}
            </div>
        </div>
    `;
    
    // Add click event to open article (could be modal or separate page)
    card.addEventListener('click', function() {
        openArticle(article);
    });
    
    return card;
}

function formatCategory(category) {
    const categories = {
        'events': 'Event',
        'success-stories': 'Success Story',
        'volunteer': 'Volunteer',
        'announcements': 'Announcement'
    };
    return categories[category] || category;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Load more articles
function loadMoreNews() {
    showLoadingIndicator();
    
    // Simulate loading delay
    setTimeout(() => {
        currentPage++;
        displayNews();
    }, 800);
}

function showLoadingIndicator() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading...';
    loadingIndicator.style.display = 'block';
}

function hideLoadingIndicator() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = 'Load More Articles';
    loadingIndicator.style.display = 'none';
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const remainingItems = filteredData.length - (currentPage * itemsPerPage);
    
    if (remainingItems <= 0) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

function showNoResults() {
    const container = document.getElementById('newsContainer');
    container.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>No articles found</h3>
            <p>Try adjusting your search terms or filters</p>
        </div>
    `;
    document.getElementById('loadMoreBtn').style.display = 'none';
}

function updateResultsCount() {
    const resultsDiv = document.getElementById('newsResults');
    resultsDiv.textContent = `Showing ${filteredData.length} of ${newsData.length} articles`;
}

// Simulate opening an article
function openArticle(article) {
    // In a real application, this would open a modal or navigate to article page
    console.log('Opening article:', article.title);
    
    // Simulate view count increase
    article.views++;
    
    // Show a simple alert for demo purposes
    alert(`Opening: ${article.title}\n\n${article.excerpt}\n\nFull article content would be displayed here.`);
}

// Simulate AJAX loading for newsletter form
document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    // Simulate AJAX call
    showNewsletterSuccess(email);
    this.reset();
});

function showNewsletterSuccess(email) {
    alert(`Thank you for subscribing with ${email}! You'll receive our latest updates soon.`);
}
// contact-script.js - Interactive Map, Form Validation & AJAX for Contact Page

let map;
let userLocationMarker = null;
let locations = [];

// Cape Town locations data
const locationData = [
    {
        id: 1,
        name: "Main Office & Headquarters",
        lat: -33.9249,
        lng: 18.4241,
        address: "22 Long Street, Cape Town, 8001",
        hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-2PM",
        phone: "+27 79 812 3454",
        type: "office"
    },
    {
        id: 2,
        name: "Book Donation Center - Gardens",
        lat: -33.9346,
        lng: 18.4111,
        address: "15 Kloof Street, Gardens, Cape Town",
        hours: "Mon-Sat: 9AM-4PM",
        type: "donation"
    },
    {
        id: 3,
        name: "Community Library Hub - Khayelitsha",
        lat: -34.0392,
        lng: 18.6725,
        address: "7 Ntlazane Road, Khayelitsha, Cape Town",
        hours: "Tue-Sun: 8AM-6PM",
        type: "library"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    initializeFormValidation();
    setupEventListeners();
});

// Map initialization
function initializeMap() {
    // Initialize the map centered on Cape Town
    map = L.map('map').setView([-33.9249, 18.4241], 12);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    // Add location markers
    addLocationMarkers();
    
    // Add map controls event listeners
    document.getElementById('locateMe').addEventListener('click', locateUser);
    document.getElementById('resetMap').addEventListener('click', resetMapView);
}

function addLocationMarkers() {
    locationData.forEach(location => {
        const customIcon = L.divIcon({
            className: `custom-marker ${location.type}`,
            html: `<div class="marker-pin" style="background-color: ${getColorForType(location.type)}"></div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });
        
        const marker = L.marker([location.lat, location.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
                <div class="map-popup">
                    <h4>${location.name}</h4>
                    <p>${location.address}</p>
                    ${location.hours ? `<p><strong>Hours:</strong> ${location.hours}</p>` : ''}
                    ${location.phone ? `<p><strong>Phone:</strong> ${location.phone}</p>` : ''}
                </div>
            `);
        
        locations.push(marker);
    });
}

function getColorForType(type) {
    const colors = {
        'office': '#3498db',
        'donation': '#2ecc71', 
        'library': '#e67e22'
    };
    return colors[type] || '#3498db';
}

// Location services
function locateUser() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }
    
    const locateBtn = document.getElementById('locateMe');
    locateBtn.disabled = true;
    locateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Locating...';
    
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Remove existing user location marker
            if (userLocationMarker) {
                map.removeLayer(userLocationMarker);
            }
            
            // Add user location marker
            userLocationMarker = L.marker([userLat, userLng])
                .addTo(map)
                .bindPopup('Your current location')
                .openPopup();
            
            // Center map on user location
            map.setView([userLat, userLng], 15);
            
            locateBtn.disabled = false;
            locateBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Locate Me';
        },
        function(error) {
            alert('Unable to retrieve your location: ' + error.message);
            locateBtn.disabled = false;
            locateBtn.innerHTML = '<i class="fas fa-location-arrow"></i> Locate Me';
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}

function resetMapView() {
    map.setView([-33.9249, 18.4241], 12);
    if (userLocationMarker) {
        map.removeLayer(userLocationMarker);
        userLocationMarker = null;
    }
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const phoneInput = document.getElementById('phone');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    // Real-time phone validation for South African numbers
    phoneInput.addEventListener('input', function() {
        validatePhoneNumber(this);
    });
    
    // Character counter for message
    messageTextarea.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;
        
        if (count > 500) {
            charCount.style.color = '#e74c3c';
        } else if (count > 400) {
            charCount.style.color = '#f39c12';
        } else {
            charCount.style.color = '#7f8c8d';
        }
        
        validateMessage(this);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm(this);
    });
    
    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const errorElement = document.getElementById(fieldId + 'Error');
    
    let isValid = true;
    let errorMessage = '';
    
    switch(fieldId) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Please enter your full name (min 2 characters)';
            }
            break;
            
        case 'email':
            if (!isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
            break;
            
        case 'phone':
            if (value && !isValidSouthAfricanPhoneNumber(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid South African phone number (e.g., +27 79 123 4567)';
            }
            break;
            
        case 'subject':
            if (!value) {
                isValid = false;
                errorMessage = 'Please select a subject';
            }
            break;
            
        case 'message':
            isValid = validateMessage(field);
            break;
            
        case 'consent':
            if (!field.checked) {
                isValid = false;
                errorMessage = 'You must agree to the processing of your personal data';
            }
            break;
    }
    
    // Update field styling and error message
    if (isValid) {
        field.style.borderColor = '#2ecc71';
        errorElement.style.display = 'none';
    } else {
        field.style.borderColor = '#e74c3c';
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }
    
    return isValid;
}

function validatePhoneNumber(input) {
    const value = input.value.trim();
    const errorElement = document.getElementById('phoneError');
    
    if (value && !isValidSouthAfricanPhoneNumber(value)) {
        input.style.borderColor = '#e74c3c';
        errorElement.textContent = 'Please enter a valid South African phone number (e.g., +27 79 123 4567)';
        errorElement.style.display = 'block';
        return false;
    } else {
        input.style.borderColor = value ? '#2ecc71' : '#e1e1e1';
        errorElement.style.display = 'none';
        return true;
    }
}

function validateMessage(textarea) {
    const value = textarea.value.trim();
    const errorElement = document.getElementById('messageError');
    
    if (value.length < 10) {
        errorElement.textContent = 'Please enter a message of at least 10 characters';
        errorElement.style.display = 'block';
        return false;
    } else if (value.length > 500) {
        errorElement.textContent = 'Message must be 500 characters or less';
        errorElement.style.display = 'block';
        return false;
    } else {
        errorElement.style.display = 'none';
        return true;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidSouthAfricanPhoneNumber(phone) {
    // South African phone number regex: +27 followed by 2 digits and 7 digits
    const saPhoneRegex = /^[\+]27[\s]?\d{2}[\s]?\d{3}[\s]?\d{4}$/;
    const cleaned = phone.replace(/[\s\-]/g, '');
    return saPhoneRegex.test(cleaned);
}

// Form Submission with AJAX - ALWAYS SUCCESS
async function submitForm(form) {
    const submitBtn = document.getElementById('submitBtn');
    const buttonText = submitBtn.querySelector('.button-text');
    const buttonSpinner = submitBtn.querySelector('.button-spinner');
    const formMessage = document.getElementById('formMessage');
    
    // Validate all fields
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showFormMessage('Please correct the errors above', 'error');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    buttonText.textContent = 'Sending...';
    buttonSpinner.style.display = 'block';
    formMessage.style.display = 'none';
    
    try {
        // Simulate AJAX call - ALWAYS SUCCESS
        const formData = new FormData(form);
        const response = await simulateAjaxCall(formData);
        
        if (response.success) {
            showFormMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            form.reset();
            document.getElementById('charCount').textContent = '0';
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        showFormMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        buttonText.textContent = 'Send Message';
        buttonSpinner.style.display = 'none';
    }
}

function simulateAjaxCall(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Log the form data that would be sent
            const formObject = {};
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            console.log('Form submission successful! Data:', formObject);
            
            resolve({
                success: true,
                message: 'Form submitted successfully'
            });
        }, 1500);
    });
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll to message
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Quick Answers Modal
function showQuickAnswer(type) {
    const modal = document.getElementById('quickAnswerModal');
    const modalContent = document.getElementById('modalContent');
    
    const answers = {
        'donation': `
            <h3>Book Donations</h3>
            <p>We accept new and gently used books for all age groups. Here's what you need to know:</p>
            <ul>
                <li><strong>Accepted:</strong> Children's books, young adult fiction, educational materials, recent bestsellers</li>
                <li><strong>Not Accepted:</strong> Damaged books, outdated textbooks, encyclopedia sets</li>
                <li><strong>Drop-off:</strong> Visit any of our donation centers during business hours</li>
                <li><strong>Large Donations:</strong> Contact us for pickup arrangements (50+ books)</li>
            </ul>
            <p>All donated books are sorted, cleaned, and distributed to schools and communities in need across South Africa.</p>
        `,
        'volunteer': `
            <h3>Volunteer Opportunities</h3>
            <p>Join our team of dedicated volunteers and make a difference in your community:</p>
            <ul>
                <li><strong>Book Sorting:</strong> Help organize and categorize donated books</li>
                <li><strong>Library Setup:</strong> Assist in setting up new school libraries</li>
                <li><strong>Reading Mentor:</strong> Work with children to improve literacy skills</li>
                <li><strong>Event Support:</strong> Help with book drives and community events</li>
            </ul>
            <p>No experience necessary - we provide all the training you need!</p>
        `,
        'library': `
            <h3>Library Support</h3>
            <p>We help schools and communities across South Africa create and maintain vibrant libraries:</p>
            <ul>
                <li><strong>Library Setup:</strong> Complete library design and installation</li>
                <li><strong>Book Collections:</strong> Curated book sets for different age groups</li>
                <li><strong>Training:</strong> Librarian and volunteer training programs</li>
                <li><strong>Maintenance:</strong> Ongoing support and book replenishment</li>
            </ul>
            <p>Contact us to schedule a consultation for your library needs.</p>
        `,
        'events': `
            <h3>Events & Book Drives</h3>
            <p>Join our upcoming events and help spread the joy of reading:</p>
            <ul>
                <li><strong>Monthly Book Drives:</strong> Community collection events across Cape Town</li>
                <li><strong>Reading Workshops:</strong> Literacy programs for all ages</li>
                <li><strong>Library Openings:</strong> Celebrate new library installations</li>
                <li><strong>Volunteer Appreciation:</strong> Events to thank our supporters</li>
            </ul>
            <p>Check our News page for upcoming event dates and locations.</p>
        `
    };
    
    modalContent.innerHTML = answers[type] || '<p>Information not available.</p>';
    modal.style.display = 'block';
}

function closeQuickAnswer() {
    document.getElementById('quickAnswerModal').style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('quickAnswerModal');
    if (event.target === modal) {
        closeQuickAnswer();
    }
});

// Additional event listeners
function setupEventListeners() {
    // Add some custom styling for map markers
    const style = document.createElement('style');
    style.textContent = `
        .custom-marker { position: relative; }
        .marker-pin {
            width: 30px;
            height: 30px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            position: absolute;
            left: 50%;
            top: 50%;
            margin: -15px 0 0 -15px;
        }
        .marker-pin::after {
            content: '';
            width: 24px;
            height: 24px;
            margin: 3px 0 0 3px;
            background: white;
            position: absolute;
            border-radius: 50%;
        }
        .map-popup { min-width: 200px; }
        .map-popup h4 { margin: 0 0 0.5rem 0; color: #2c3e50; }
        .map-popup p { margin: 0.25rem 0; color: #555; }
    `;
    document.head.appendChild(style);
}
// services-script.js - Filtering and Interactive Features for Services Page

document.addEventListener('DOMContentLoaded', function() {
    initializeServicesPage();
    setupFilterHandlers();
});

function initializeServicesPage() {
    // Add fade-in animations to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

function setupFilterHandlers() {
    const searchInput = document.getElementById('servicesSearch');
    const serviceTypeFilter = document.getElementById('serviceTypeFilter');
    const audienceFilter = document.getElementById('audienceFilter');
    
    // Real-time search filtering
    searchInput.addEventListener('input', function() {
        filterServices();
    });
    
    // Filter change handlers
    serviceTypeFilter.addEventListener('change', filterServices);
    audienceFilter.addEventListener('change', filterServices);
}

function filterServices() {
    const searchTerm = document.getElementById('servicesSearch').value.toLowerCase();
    const serviceType = document.getElementById('serviceTypeFilter').value;
    const audience = document.getElementById('audienceFilter').value;
    
    const serviceCards = document.querySelectorAll('.service-card');
    let visibleCount = 0;
    
    serviceCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        const cardAudience = card.getAttribute('data-audience');
        const cardText = card.textContent.toLowerCase();
        
        const matchesSearch = !searchTerm || cardText.includes(searchTerm);
        const matchesType = serviceType === 'all' || cardType === serviceType;
        const matchesAudience = audience === 'all' || cardAudience.includes(audience);
        
        if (matchesSearch && matchesType && matchesAudience) {
            card.style.display = 'block';
            visibleCount++;
            // Re-trigger animation
            card.classList.remove('fade-in');
            void card.offsetWidth; // Trigger reflow
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide category sections based on visible cards
    const categories = document.querySelectorAll('.service-category');
    categories.forEach(category => {
        const categoryCards = category.querySelectorAll('.service-card');
        const visibleCategoryCards = Array.from(categoryCards).filter(card => 
            card.style.display !== 'none'
        );
        
        if (visibleCategoryCards.length > 0) {
            category.style.display = 'block';
        } else {
            category.style.display = 'none';
        }
    });
    
    updateResultsCount(visibleCount);
}

function updateResultsCount(count) {
    // You can add a results counter if needed
    console.log(`${count} services found`);
}

function showInquiryModal(serviceName) {
    const modal = document.getElementById('inquiryModal');
    const serviceInput = document.getElementById('inquiryService');
    
    serviceInput.value = serviceName;
    modal.style.display = 'block';
}

function closeInquiryModal() {
    document.getElementById('inquiryModal').style.display = 'none';
    document.getElementById('inquiryForm').reset();
}


document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        service: document.getElementById('inquiryService').value,
        name: document.getElementById('inquiryName').value,
        email: document.getElementById('inquiryEmail').value,
        phone: document.getElementById('inquiryPhone').value,
        organization: document.getElementById('inquiryOrganization').value,
        message: document.getElementById('inquiryMessage').value
    };
    
 
    console.log('Service inquiry submitted:', formData);
    alert('Thank you for your inquiry! We will contact you within 24 hours.');
    
    closeInquiryModal();
});


window.addEventListener('click', function(event) {
    const modal = document.getElementById('inquiryModal');
    if (event.target === modal) {
        closeInquiryModal();
    }
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInquiryModal();
    }
});

function showInquiryModal(serviceName) {
    const modal = document.getElementById('inquiryModal');
    const serviceInput = document.getElementById('inquiryService');
    
    serviceInput.value = serviceName;
    modal.style.display = 'block';
    
    
    document.body.style.overflow = 'hidden';
}

function closeInquiryModal() {
    const modal = document.getElementById('inquiryModal');
    modal.style.display = 'none';
    
  
    document.body.style.overflow = 'auto';
}


window.onclick = function(event) {
    const modal = document.getElementById('inquiryModal');
    if (event.target === modal) {
        closeInquiryModal();
    }
}


document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const name = document.getElementById('inquiryName').value;
    const email = document.getElementById('inquiryEmail').value;
    
    if (!name || !email) {
        alert('Please fill in all required fields.');
        return;
    }
    
    /
    alert('Thank you for your inquiry! We will get back to you soon.');
    closeInquiryModal();
    this.reset();
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeInquiryModal();
    }
});