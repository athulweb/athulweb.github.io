  document.addEventListener('DOMContentLoaded', () => {

            // --- Hamburger Menu Logic ---
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            const navLinks = document.querySelectorAll('.nav-link');

            hamburger.addEventListener('click', () => {
                // Toggle 'active' class on hamburger and nav menu
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // --- Typewriter Effect ---
            const typewriterElement = document.getElementById('typewriter');
            const words = ['Web Developer', 'Fullstack Developer', 'Frontend Developer' , 'Backend Developer'];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex];
                const typeSpeed = isDeleting ? 100 : 150;

                // Typing or Deleting
                if (isDeleting) {
                    typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                // Check if word is complete
                if (!isDeleting && charIndex === currentWord.length) {
                    // Pause at end of word
                    setTimeout(() => isDeleting = true, 2000);
                } 
                // Check if word is deleted
                else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length; // Move to next word
                }

                // Call next type animation
                setTimeout(type, typeSpeed);
            }

            // Start the typewriter
            type();

            // --- Custom Cursor Logic ---
            const cursor = document.querySelector('.custom-cursor');

            // Only run on devices that support hover
            if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                window.addEventListener('mousemove', e => {
                    // Use transform for smoother performance
                    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                });
            }

        });


