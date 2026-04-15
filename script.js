// Lightbox functionality
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'block';
    lightboxImg.src = img.src;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(event) {
    if (event.target === this) {
        closeLightbox();
    }
});

// RSVP Form validation and submission
document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const attending = document.getElementById('attending').value;
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !attending) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission (in a real scenario, you'd send this to a server)
    alert(`Thank you for your RSVP, ${name}! We can't wait to see you at our wedding.`);
    
    // Reset form
    this.reset();
});

// Smooth scrolling for navigation (if you add a nav later)
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

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to event cards
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to gallery images
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Background music control
    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.getElementById('music-toggle');

    if (backgroundMusic && musicToggle) {
        let isPlaying = false;

        // Function to play music
        const playMusic = async () => {
            try {
                await backgroundMusic.play();
                isPlaying = true;
                musicToggle.textContent = '🔊';
                musicToggle.classList.add('playing');
            } catch (error) {
                console.log('Auto-play prevented by browser policy. Click the music button to enable music.');
                isPlaying = false;
                musicToggle.textContent = '🎵';
                musicToggle.classList.remove('playing');
            }
        };

        // Function to pause music
        const pauseMusic = () => {
            backgroundMusic.pause();
            isPlaying = false;
            musicToggle.textContent = '🔇';
            musicToggle.classList.remove('playing');
        };

        // Toggle music on button click
        musicToggle.addEventListener('click', () => {
            if (isPlaying) {
                pauseMusic();
            } else {
                playMusic();
            }
        });

        // Try to auto-play music immediately when page loads
        document.addEventListener('DOMContentLoaded', () => {
            playMusic();
        });

        // Fallback: try to play on any user interaction if auto-play failed
        const enableMusicOnInteraction = () => {
            if (!isPlaying) {
                playMusic();
            }
            // Remove listeners after first successful play
            document.removeEventListener('click', enableMusicOnInteraction);
            document.removeEventListener('scroll', enableMusicOnInteraction);
            document.removeEventListener('touchstart', enableMusicOnInteraction);
        };

        document.addEventListener('click', enableMusicOnInteraction);
        document.addEventListener('scroll', enableMusicOnInteraction);
        document.addEventListener('touchstart', enableMusicOnInteraction);
    }
});
