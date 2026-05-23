/* --------------------------------------------------
   DEEPAK MAJHI PORTFOLIO - CORE INTERACTION ENGINE
   -------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Icons Initialized via CSS (Font Awesome) ---

    // --- 2. Interactive Particles Canvas ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: null, y: null, radius: 180 };

    // Update canvas bounds
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse coordinates & update dynamic background spotlight variables
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
        
        document.documentElement.style.setProperty('--mouse-x', `-500px`);
        document.documentElement.style.setProperty('--mouse-y', `-500px`);
    });

    // SDE Code Glyphs Background Objects (Replacing generic star dust particles)
    const sdeTokens = ['0', '1', '<', '>', '{', '}', '[', ']', ';', '++', '--', '&&', '||', '!=', '=='];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.char = sdeTokens[Math.floor(Math.random() * sdeTokens.length)];
            this.baseSpeedX = Math.random() * 0.4 - 0.2;
            this.baseSpeedY = Math.random() * 0.4 - 0.2;
            this.speedX = this.baseSpeedX;
            this.speedY = this.baseSpeedY;
        }

        update() {
            // Drift movement
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce on boundaries
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;

            // Reactive mouse repulsion (particles flee the cursor)
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    this.x -= (dx / distance) * force * 8.0;
                    this.y -= (dy / distance) * force * 8.0;
                }
            }
        }

        draw() {
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            ctx.fillStyle = isDark 
                ? (this.x % 2 === 0 ? 'rgba(99, 102, 241, 0.16)' : 'rgba(212, 212, 216, 0.16)')
                : 'rgba(113, 113, 122, 0.12)';
            
            ctx.font = '600 11px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.char, this.x, this.y);
        }
    }

    // Populate particles density adjusted by screen size
    function initParticles() {
        particles = [];
        const numParticles = Math.min(Math.floor((canvas.width * canvas.height) / 4500), 260);
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();
    window.addEventListener('resize', initParticles);

    // Dynamic Connections between particles
    function connectParticles() {
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const maxDist = 100;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    let alpha = (maxDist - dist) / maxDist * (isDark ? 0.03 : 0.015);
                    ctx.strokeStyle = isDark 
                        ? `rgba(99, 102, 241, ${alpha})`
                        : `rgba(9, 9, 11, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Connection to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    let alpha = (mouse.radius - dist) / mouse.radius * (isDark ? 0.04 : 0.02);
                    ctx.strokeStyle = isDark
                        ? `rgba(212, 212, 216, ${alpha})`
                        : `rgba(99, 102, 241, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    // Canvas animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();


    // --- 3. Light / Dark Theme Switcher ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Detect preferred or persisted theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('portfolio-theme', nextTheme);
        
        // Re-trigger particles redraw
        initParticles();
    });


    // --- 4. Subtitle Typing Effect ---
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Software Development Engineer",
        "SDE @ Amazon",
        "System Design Specialist",
        "B.Tech @ NIT Jaipur"
    ];
    
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTyping() {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50; // faster deletion
        } else {
            typingElement.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100; // regular speed
        }

        // Handle states transition
        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000; // hold role on screen
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typingSpeed = 500; // brief pause before next role
        }

        setTimeout(handleTyping, typingSpeed);
    }
    setTimeout(handleTyping, 1000); // Initial delay


    // --- 5. Scroll Header Behaviors ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 6. Scroll-Linked Intersection Observer (Reveal & Skills Load) ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's a skill category card, fill progress meters
                if (entry.target.classList.contains('skills-category')) {
                    const fills = entry.target.querySelectorAll('.skill-bar-fill');
                    fills.forEach(fill => {
                        const targetWidth = fill.closest('.skill-item').querySelector('.skill-percent').textContent;
                        fill.style.width = targetWidth;
                    });
                }

                // If it's the stats section, count up numbers
                if (entry.target.classList.contains('stat-card')) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    const target = parseFloat(numberEl.getAttribute('data-target'));
                    animateCountUp(numberEl, target);
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Count Up Animation
    function animateCountUp(element, target) {
        if (element.classList.contains('counted')) return;
        element.classList.add('counted');

        let current = 0;
        const duration = 2000; // ms
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;

        let count = 0;
        const timer = setInterval(() => {
            current += increment;
            count++;
            
            if (target % 1 === 0) {
                // Integer values
                element.textContent = Math.floor(current) + (target >= 100 ? 'M+' : '+');
            } else {
                // Floating values (like 99.99%)
                element.textContent = current.toFixed(2) + '%';
            }

            if (count >= steps) {
                clearInterval(timer);
                element.textContent = target % 1 === 0 
                    ? target + (target >= 100 ? 'M+' : '+')
                    : target.toFixed(2) + '%';
            }
        }, stepTime);
    }


    // --- 7. Active Scroll Section Tracker ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });


    // --- 8. Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-nav-cta');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fa-solid fa-bars';
        });
    });


    // --- 9. Secure Contact Portal & Success Modal ---
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    // out-of-the-box functional FormSubmit.co AJAX email routing for dmdeepakmajhi@gmail.com
    const FORM_ENDPOINT = "https://formsubmit.co/ajax/dmdeepakmajhi@gmail.com";

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Retrieve inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Custom high-tech visual transmission console feedback
        console.log(`%c[SYSTEM PORTAL INITIALIZING...]`, 'color: #6366f1; font-weight: bold;');
        console.log(`%cPayload encrypted: From=${name}, Email=${email}`, 'color: #d4d4d8;');
        console.log(`%cSubject: ${subject}`, 'color: #d4d4d8;');

        // If the developer has configured Formspree, send an AJAX post!
        if (FORM_ENDPOINT && !FORM_ENDPOINT.includes("YOUR_FORMSPREE_ID")) {
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const originalText = submitBtnText.textContent;
            
            // Show dynamic transmitting status
            submitBtnText.textContent = "Transmitting...";
            submitBtn.disabled = true;

            fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => {
                if (response.ok) {
                    console.log(`%cTransmission packet successfully dispatched. Status: 202 Accepted.`, 'color: #22c55e; font-weight: bold;');
                    successModal.classList.add('open');
                } else {
                    alert("Transmission failed. Please check your Formspree ID or connection.");
                }
            })
            .catch(error => {
                console.error("Transmission error:", error);
                alert("An error occurred while connecting to the transmitter portal.");
            })
            .finally(() => {
                submitBtnText.textContent = originalText;
                submitBtn.disabled = false;
            });
        } else {
            // Mock mode when Formspree is not yet registered
            console.log(`%c[MOCK MODE] Transmission dispatched successfully. To receive REAL emails:`, 'color: #eab308; font-weight: bold;');
            console.log(`%c1. Register a free account at https://formspree.io/`, 'color: #eab308;');
            console.log(`%c2. Create a form to get your form ID (e.g. "xqdvyqzd")`, 'color: #eab308;');
            console.log(`%c3. Enter your ID in script.js under FORM_ENDPOINT variable!`, 'color: #eab308;');
            
            // Display Success Modal anyway for mockup testing
            successModal.classList.add('open');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('open');
        contactForm.reset();
    });

    // Close modal on escape or clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('open');
            contactForm.reset();
        }
    });

    // --- 10. Vertical Curved Motorcycle Highway Scroll & Lean Animator ---
    const track = document.querySelector('.highway-track-container');
    const rider = document.getElementById('motorcycle-rider');
    const stations = document.querySelectorAll('.highway-station');

    // Winding path math: x offset = Math.sin(progress * Math.PI * 3.5) * amplitude
    function getRoadX(progressPercent, trackWidth) {
        const amplitude = window.innerWidth > 900 ? 120 : 0; // Curve on desktop, straight on mobile
        return (trackWidth / 2) + Math.sin(progressPercent * Math.PI * 3.5) * amplitude;
    }

    // Generate dynamic curved SVG road paths matching our winding math
    function drawCurvedRoad() {
        if (!track) return;
        const width = track.clientWidth;
        const height = track.clientHeight;
        const amplitude = window.innerWidth > 900 ? 120 : 0;
        
        let pathD = "";
        let leftD = "";
        let rightD = "";

        // Sample points along the road height
        for (let y = 0; y <= height; y += 10) {
            const p = y / height;
            const roadX = (width / 2) + Math.sin(p * Math.PI * 3.5) * amplitude;
            
            if (y === 0) {
                pathD += `M ${roadX} ${y}`;
                leftD += `M ${roadX - 33} ${y}`;
                rightD += `M ${roadX + 33} ${y}`;
            } else {
                pathD += ` L ${roadX} ${y}`;
                leftD += ` L ${roadX - 33} ${y}`;
                rightD += ` L ${roadX + 33} ${y}`;
            }
        }

        // Set attributes on the SVG paths
        const asphalt = document.querySelector('.asphalt-path');
        const leftEdge = document.querySelector('.left-edge-path');
        const rightEdge = document.querySelector('.right-edge-path');
        const centerLine = document.querySelector('.center-line-path');

        if (asphalt) asphalt.setAttribute('d', pathD);
        if (leftEdge) leftEdge.setAttribute('d', leftD);
        if (rightEdge) rightEdge.setAttribute('d', rightD);
        if (centerLine) centerLine.setAttribute('d', pathD);
    }

    function animateHighway() {
        if (!track || !rider) return;

        const trackRect = track.getBoundingClientRect();
        const viewHeight = window.innerHeight;

        // Scroll track begins when top of highway track reaches 70% of screen height,
        // and finishes when bottom of the track reaches 30% of screen height.
        const scrollStart = viewHeight * 0.7;

        // Calculate progress percentage along the track
        const totalHeight = trackRect.height;
        const trackWidth = track.clientWidth;
        const currentProgress = scrollStart - trackRect.top;
        
        let progressPercent = currentProgress / totalHeight;
        progressPercent = Math.max(0, Math.min(1, progressPercent)); // Clamp between 0 and 1

        // 1. Calculate vertical top px
        const riderTop = progressPercent * totalHeight;
        rider.style.top = `${riderTop}px`;

        // 2. Calculate horizontal left px using our sine wave road math
        const riderLeft = getRoadX(progressPercent, trackWidth);
        rider.style.left = `${riderLeft}px`;

        // 3. Add a minor, gentle bike lean/turn (max 8 degrees) as it rounds the curves
        const maxLean = 8; // gentle, highly stable maximum lean angle
        const leanAngle = Math.cos(progressPercent * Math.PI * 3.5) * maxLean;
        rider.style.transform = `translate(-50%, -50%) rotate(${leanAngle}deg)`;

        // Activate stations based on progress thresholds
        stations.forEach(station => {
            const threshold = parseFloat(station.getAttribute('data-threshold'));
            
            // Give a slight offset to activate just before the bike overlaps the hub
            if (progressPercent >= (threshold - 0.08)) {
                station.classList.add('station-active');
            } else {
                station.classList.remove('station-active');
            }
        });
    }

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                animateHighway();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Drawing road SVG and positioning rider on load & resize
    drawCurvedRoad();
    animateHighway();
    
    window.addEventListener('resize', () => {
        drawCurvedRoad();
        animateHighway();
    });

});
