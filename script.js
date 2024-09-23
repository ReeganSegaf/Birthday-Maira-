document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const container = document.querySelector('.container');
    const startButton = document.getElementById('startButton');
    const bgMusic = document.getElementById('bgMusic');
    const wishInput = document.getElementById('wishInput');
    const wishButton = document.getElementById('wishButton');
    const fireworks = document.getElementById('fireworks');
    const musicControl = document.getElementById('musicControl');

    // Initialize AOS library with settings
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    container.style.display = 'none';

    // Start button event
    startButton.addEventListener('click', () => {
        loading.style.display = 'none';
        container.style.display = 'block';
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        startCountdown();
        animateFireworks();
        animateElements();
        typeWriterEffect();
    });

    // Music control functionality
    musicControl.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(e => console.log("Audio play failed:", e));
            musicControl.textContent = '🔊';
        } else {
            bgMusic.pause();
            musicControl.textContent = '🔇';
        }
    });

    // Countdown function
    function startCountdown() {
        const birthday = new Date("2024-10-11T00:00:00").getTime();
        const countdownElement = document.getElementById('countdown');

        const countdownTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = birthday - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(countdownTimer);
                countdownElement.innerHTML = "Happy Birthday,Maira!<p> Today we celebrate YOU, my love, my joy, my everything!</p>";
                countdownElement.classList.add('pulse');
            }
        }, 1000);
    }

    // Fireworks animation
    function animateFireworks() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

        setInterval(() => {
            const firework = document.createElement('div');
            firework.style.position = 'absolute';
            firework.style.width = '5px';
            firework.style.height = '5px';
            firework.style.borderRadius = '50%';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.animation = 'firework 1s ease-out forwards';

            fireworks.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, 200);
    }

    // Wish submission
    wishButton.addEventListener('click', () => {
        const wish = wishInput.value.trim();
        if (wish) {
            alert('Harapan Anda telah terkirim: ' + wish);
            wishInput.value = '';
            createWishAnimation(wish);
        } else {
            alert('Silakan masukkan harapan Anda terlebih dahulu.');
        }
    });

    // Wish animation
    function createWishAnimation(wish) {
        const wishElement = document.createElement('div');
        wishElement.textContent = wish;
        wishElement.style.position = 'fixed';
        wishElement.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        wishElement.style.top = window.innerHeight + 'px';
        wishElement.style.color = getRandomColor();
        wishElement.style.fontSize = '20px';
        wishElement.style.transition = 'all 5s ease-out';

        document.body.appendChild(wishElement);

        setTimeout(() => {
            wishElement.style.top = '0px';
            wishElement.style.opacity = '0';
        }, 100);

        setTimeout(() => {
            wishElement.remove();
        }, 5000);
    }

    // Random color generator
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Animating elements (fades, slides, etc.)
    function animateElements() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .bounce-in');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }

    // Typewriter effect for the title
    function typeWriterEffect() {
        const mainTitle = document.getElementById('mainTitle');
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        mainTitle.classList.add('typewriter-text');

        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                mainTitle.classList.remove('typewriter-text');
                mainTitle.classList.add('glow-effect');
            }
        }, 100);
    }

    // Parallax scrolling for background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imgOptions = {
        threshold: 0,
        rootMargin: "0px 0px 300px 0px"
    };

    const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('fade-in');
            imgObserver.unobserve(img);
        });
    }, imgOptions);

    images.forEach(img => imgObserver.observe(img));
});
