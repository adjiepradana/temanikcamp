// Data modul
const modulData = {
    education: [
        {
            id: 'ed1',
            title: 'Metode Pembelajaran Efektif',
            description: 'Panduan lengkap tentang metode pembelajaran modern',
            size: '2.4 MB',
            filename: 'metode-pembelajaran-efektif.pdf'
        },
        {
            id: 'ed2',
            title: 'Kurikulum Merdeka',
            description: 'Penjelasan dan implementasi kurikulum merdeka',
            size: '3.8 MB',
            filename: 'kurikulum-merdeka.pdf'
        },
        {
            id: 'ed3',
            title: 'Strategi Asesmen Otentik',
            description: 'Cara menilai kemampuan siswa dengan pendekatan autentik',
            size: '1.7 MB',
            filename: 'asesmen-autentik.pdf'
        }
    ],
    leadership: [
        {
            id: 'ld1',
            title: 'Kepemimpinan Transformasional',
            description: 'Panduan menjadi pemimpin yang mengubah organisasi',
            size: '4.2 MB',
            filename: 'kepemimpinan-transformasional.pdf'
        },
        {
            id: 'ld2',
            title: 'Manajemen Tim Efektif',
            description: 'Strategi mengelola tim untuk hasil maksimal',
            size: '2.9 MB',
            filename: 'manajemen-tim.pdf'
        },
        {
            id: 'ld3',
            title: 'Pengambilan Keputusan Strategis',
            description: 'Metode pengambilan keputusan dalam situasi kompleks',
            size: '3.1 MB',
            filename: 'pengambilan-keputusan.pdf'
        }
    ],
    psikologi: [
        {
            id: 'ps1',
            title: 'Psikologi Positif',
            description: 'Penerapan psikologi positif dalam kehidupan sehari-hari',
            size: '2.8 MB',
            filename: 'psikologi-positif.pdf'
        },
        {
            id: 'ps2',
            title: 'Manajemen Stres',
            description: 'Teknik mengelola stres dan meningkatkan kesejahteraan mental',
            size: '3.5 MB',
            filename: 'manajemen-stres.pdf'
        },
        {
            id: 'ps3',
            title: 'Psikologi Perkembangan Anak',
            description: 'Tahapan perkembangan psikologis anak',
            size: '4.6 MB',
            filename: 'psikologi-perkembangan-anak.pdf'
        }
    ]
};

// DOM Elements
const cardContainer = document.getElementById('card-container');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const moduleList = document.getElementById('module-list');
const closeBtn = document.querySelector('.close-btn');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to each card
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            openModal(category);
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Hamburger menu toggle
    hamburgerMenu.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger-menu')) {
            toggleMenu();
        }
    });
});

// Functions
function toggleMenu() {
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => bar.classList.toggle('change'));
    
    if (navLinks.classList.contains('active')) {
        // Add animation to menu items
        document.querySelectorAll('.nav-links li').forEach((item, index) => {
            item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        
        // Change hamburger animation
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        // Remove animation from menu items
        document.querySelectorAll('.nav-links li').forEach(item => {
            item.style.animation = '';
        });
        
        // Reset hamburger
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
}

function openModal(category) {
    // Set modal title
    const categoryTitles = {
        'education': 'Modul Education',
        'leadership': 'Modul Leadership',
        'psikologi': 'Modul Psikologi'
    };
    
    modalTitle.textContent = categoryTitles[category];
    
    // Clear previous module list
    moduleList.innerHTML = '';
    
    // Populate module list
    const modules = modulData[category];
    modules.forEach(module => {
        const moduleItem = document.createElement('div');
        moduleItem.className = 'module-item';
        
        moduleItem.innerHTML = `
            <div class="module-info">
                <h3>${module.title}</h3>
                <p>${module.description}</p>
                <small>Ukuran: ${module.size}</small>
            </div>
            <button class="download-btn" data-filename="${module.filename}">Download</button>
        `;
        
        moduleList.appendChild(moduleItem);
    });
    
    // Add event listeners to download buttons
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const filename = this.getAttribute('data-filename');
            downloadFile(filename);
        });
    });
    
    // Show modal with animation
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Function to download file
function downloadFile(filename) {
    // Tampilkan konfirmasi download
    Swal.fire({
        title: 'Mengunduh Modul',
        text: `File "${filename}" akan segera diunduh.`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });

    // Mulai download file
    const link = document.createElement('a');
    link.href = `files/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


// Add animation effects to cards
const animateCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * index);
    });
};

// Add scroll effect for the header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0';
    }
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for cards (for animation)
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation after a small delay
    setTimeout(animateCards, 200);
    
    // Add CSS animation for nav links
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes navLinkFade {
                from {
                    opacity: 0;
                    transform: translateX(50px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        </style>
    `);
});