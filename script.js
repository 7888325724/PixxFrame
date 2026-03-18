document.addEventListener('DOMContentLoaded', () => {
    // 1. 3D Parallax Effect (Desktop only for better performance)
    const container = document.querySelector('.container');
    const parallaxElements = document.querySelectorAll('.parallax-element');

    // Only apply complex 3D rotation on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        container.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 60;

            parallaxElements.forEach(el => {
                // Apply subtle 3D tilt
                el.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });
        });

        // Reset transform when mouse leaves
        container.addEventListener('mouseleave', () => {
            parallaxElements.forEach(el => {
                el.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            });
        });

        // Remove the transition during movement for snappy response
        container.addEventListener('mouseenter', () => {
            parallaxElements.forEach(el => {
                // Keep the transition short while entering
                setTimeout(() => {
                    el.style.transition = 'none';
                }, 100);
            });
        });
    }

    // 2. Floating Particles Generator
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40; // Adjust for density

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize properties
        const size = Math.random() * 4 + 1.5; // 1.5px to 5.5px
        const posX = Math.random() * 100; // 0% to 100%
        const posY = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 25 + 15; // 15s to 40s
        const delay = Math.random() * -20; // Start immediately at different animation stages
        const opacity = Math.random() * 0.4 + 0.1;
        
        // 15% chance to be a neon green particle, otherwise white
        const isNeon = Math.random() > 0.85;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.position = 'absolute';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.borderRadius = '50%';
        particle.style.opacity = opacity;
        
        if (isNeon) {
            particle.style.backgroundColor = '#24f573';
            particle.style.boxShadow = '0 0 12px #24f573';
        } else {
            particle.style.backgroundColor = '#ffffff';
            particle.style.boxShadow = '0 0 6px #ffffff';
        }
        
        // Apply animation
        particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        particlesContainer.appendChild(particle);
    }
});
