// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // Scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Event Schedule Tabs
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding tab pane
            const day = this.getAttribute('data-day');
            document.getElementById(day).classList.add('active');
        });
    });

    // Login Modal
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const closeLoginModal = loginModal.querySelector('.close-modal');
    
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeLoginModal.addEventListener('click', function() {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Register Modal
    const registerBtn = document.getElementById('registerBtn');
    const registerModal = document.getElementById('registerModal');
    const closeRegisterModal = registerModal.querySelector('.close-modal');
    
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    closeRegisterModal.addEventListener('click', function() {
        registerModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Switch between login and register forms
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });

    // Mobile login/register button
const mobileLoginBtn = document.getElementById('mobileLoginBtn');
const mobileRegisterBtn = document.getElementById('mobileRegisterBtn');

if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        navMenu.classList.remove('active'); // Tutup menu mobile
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

if (mobileRegisterBtn) {
    mobileRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        navMenu.classList.remove('active'); // Tutup menu mobile
        registerModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}


    // Ticket Modal
    const buyButtons = document.querySelectorAll('.btn-buy');
    const ticketModal = document.getElementById('ticketModal');
    const closeTicketModal = ticketModal.querySelector('.close-modal');
    const ticketDetails = document.getElementById('ticketDetails');
    const totalPrice = document.getElementById('totalPrice');
    const decreaseBtn = document.getElementById('decreaseQuantity');
    const increaseBtn = document.getElementById('increaseQuantity');
    const quantityInput = document.getElementById('ticketQuantity');
    
    let ticketPrices = {
        'regular': 6000000,
        'premium': 7000000,
        'vip': 8000000
    };
    
    let selectedTicket = '';
    let ticketPrice = 0;
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedTicket = this.getAttribute('data-ticket');
            ticketPrice = ticketPrices[selectedTicket];
            
            // Update ticket details in modal
            let ticketName = '';
            switch(selectedTicket) {
                case 'regular':
                    ticketName = 'Tiket Reguler';
                    break;
                case 'premium':
                    ticketName = 'Tiket Premium';
                    break;
                case 'vip':
                    ticketName = 'Tiket VIP';
                    break;
            }
            
            ticketDetails.innerHTML = `
                <div class="selected-ticket">
                    <h3>${ticketName}</h3>
                    <p>Harga: Rp ${formatNumber(ticketPrice)}</p>
                </div>
            `;
            
            // Reset quantity to 1 and update price
            quantityInput.value = 1;
            updateTotalPrice();
            
            // Display modal
            ticketModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeTicketModal.addEventListener('click', function() {
        ticketModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Quantity selector functionality
    function updateTotalPrice() {
        const quantity = parseInt(quantityInput.value);
        const total = ticketPrice * quantity;
        totalPrice.textContent = `Rp ${formatNumber(total)}`;
    }
    
    decreaseBtn.addEventListener('click', function() {
        const currentVal = parseInt(quantityInput.value);
        if (currentVal > 1) {
            quantityInput.value = currentVal - 1;
            updateTotalPrice();
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentVal = parseInt(quantityInput.value);
        if (currentVal < 10) {
            quantityInput.value = currentVal + 1;
            updateTotalPrice();
        }
    });
    
    quantityInput.addEventListener('change', function() {
        let val = parseInt(this.value);
        if (isNaN(val) || val < 1) {
            this.value = 1;
        } else if (val > 10) {
            this.value = 10;
        }
        updateTotalPrice();
    });

    // Success Modal
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    const bookingCode = document.getElementById('bookingCode');
    
    // Close success modal
    closeSuccessModal.addEventListener('click', function() {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Form Submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const ticketForm = document.getElementById('ticketForm');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulasi login berhasil
        alert('Login berhasil!');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validasi password
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert('Password tidak cocok!');
            return;
        }
        
        // Simulasi registrasi berhasil
        alert('Registrasi berhasil! Silakan login.');
        registerModal.style.display = 'none';
        loginModal.style.display = 'block';
    });
    
    ticketForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulasi pembelian tiket
        ticketModal.style.display = 'none';
        
        // Generate booking code
        const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
        bookingCode.textContent = `ADV25-${randomCode}`;
        
        // Show success modal
        successModal.style.display = 'block';
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pesan Anda telah terkirim. Kami akan menghubungi Anda segera!');
        this.reset();
    });
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Terima kasih telah berlangganan newsletter kami!');
        this.reset();
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === ticketModal) {
            ticketModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Testimonial slider automatic scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    
    if (testimonialItems.length > 0) {
        let currentIndex = 0;
        const intervalTime = 4000;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialItems.length;
            const scrollPosition = testimonialItems[currentIndex].offsetLeft - 
                                (testimonialSlider.offsetWidth / 2) + 
                                (testimonialItems[currentIndex].offsetWidth / 2);
            
            testimonialSlider.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }, intervalTime);
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Helper Functions
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});


// Event image preview on hover



// Hero Slideshow
const slides = document.querySelectorAll('.hero-slideshow .slide');
const nextSlideBtn = document.querySelector('.slide-next');
const prevSlideBtn = document.querySelector('.slide-prev');
let currentSlide = 0;
let slideInterval;

// Show slide by index
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

// Next Slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Prev Slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Start Auto Slide
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000); // ganti setiap 5 detik
}

// Stop Auto Slide
function stopSlideShow() {
    clearInterval(slideInterval);
}

if (nextSlideBtn && prevSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    prevSlideBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    startSlideShow();
}


// Guest Star Slider
const guestSlider = document.querySelector('.guest-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (guestSlider && prevBtn && nextBtn) {
    const guestCards = document.querySelectorAll('.guest-card');
    const cardWidth = guestCards[0].offsetWidth + 25; // Width + gap
    let currentPosition = 0;
    
    // Fungsi untuk menghitung jumlah card yang terlihat berdasarkan lebar layar
    function getVisibleCards() {
        const sliderWidth = guestSlider.offsetWidth;
        return Math.floor(sliderWidth / cardWidth);
    }
    
    // Fungsi untuk scroll ke card sebelumnya
    prevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            const scrollAmount = currentPosition * cardWidth;
            guestSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        } else {
            // Scroll ke akhir jika di awal
            currentPosition = guestCards.length - getVisibleCards();
            const scrollAmount = currentPosition * cardWidth;
            guestSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    });
    
    // Fungsi untuk scroll ke card selanjutnya
    nextBtn.addEventListener('click', () => {
        if (currentPosition < guestCards.length - getVisibleCards()) {
            currentPosition++;
            const scrollAmount = currentPosition * cardWidth;
            guestSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        } else {
            // Scroll ke awal jika di akhir
            currentPosition = 0;
            guestSlider.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // Carousel otomatis
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentPosition < guestCards.length - getVisibleCards()) {
                currentPosition++;
            } else {
                currentPosition = 0;
            }
            const scrollAmount = currentPosition * cardWidth;
            guestSlider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, 4000); // Scroll setiap 4 detik
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Mulai auto scroll
    startAutoScroll();
    
    // Hentikan auto scroll saat hover di slider
    guestSlider.addEventListener('mouseenter', stopAutoScroll);
    guestSlider.addEventListener('mouseleave', startAutoScroll);
    
    // Hentikan auto scroll saat klik tombol navigasi
    prevBtn.addEventListener('mouseenter', stopAutoScroll);
    nextBtn.addEventListener('mouseenter', stopAutoScroll);
    prevBtn.addEventListener('mouseleave', startAutoScroll);
    nextBtn.addEventListener('mouseleave', startAutoScroll);
    
    // Ubah posisi card sesuai scroll
    guestSlider.addEventListener('scroll', () => {
        currentPosition = Math.round(guestSlider.scrollLeft / cardWidth);
    });
    
    // Resize handling
    window.addEventListener('resize', () => {
        // Recalculate card width on resize
        const newCardWidth = guestCards[0].offsetWidth + 25;
        // Adjust scroll position
        guestSlider.scrollTo({
            left: currentPosition * newCardWidth,
            behavior: 'auto'
        });
    });
}

