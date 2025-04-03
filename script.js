document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.setAttribute('data-theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.setAttribute('data-theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        darkModeToggle.addEventListener('click', function() {
            let theme = document.body.getAttribute('data-theme');
            if (theme === 'light') {
                document.body.setAttribute('data-theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Remove cursor effect code if not needed
    // (You had cursor code but commented out the cursor div in HTML)

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // Project filtering (if you have filtering enabled)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                projectCards.forEach(card => {
                    card.style.display = (filterValue === 'all' || card.getAttribute('data-category') === filterValue) 
                        ? 'block' 
                        : 'none';
                });
            });
        });
    }

    // Contact form submission (single implementation)
    const contactForm = document.getElementById('contactForm') || document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const formStatus = document.getElementById('form-status') || this.querySelector('.form-status');
            
            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
            }
            
            // Using Formspree
            fetch(this.action || "https://formspree.io/f/xdkelqwb", {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    if (formStatus) {
                        formStatus.textContent = 'Message sent successfully!';
                        formStatus.style.color = '#4CAF50';
                    } else {
                        alert('Message sent successfully!');
                    }
                    this.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            })
            .catch(error => {
                if (formStatus) {
                    formStatus.textContent = 'Error sending message. Please try again.';
                    formStatus.style.color = '#F44336';
                } else {
                    alert('Error sending message. Please try again.');
                }
                console.error('Error:', error);
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';
                }
            });
        });
    }

    // Project card click handler
    const projectCard = document.getElementById("project-one");
    if (projectCard) {
        projectCard.addEventListener("click", function() {
            window.open("https://github.com/vaibhav7899ops/AP-PROJECT", "_blank");
        });
    }

    // Resume link handler
    const resumeLink = document.getElementById("resume-link");
    if (resumeLink) {
        resumeLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.open("ASHU_KUMAR_JHA (2).pdf", "_blank");
        });
    }
});