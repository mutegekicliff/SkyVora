document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
            mobileBtn.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('is-open');
        });
    }

    // Sticky Header and Back to Top
    const backToTopBtn = document.getElementById('back-to-top');
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if(header) header.classList.add('is-scrolled');
        } else {
            if(header) header.classList.remove('is-scrolled');
        }
        
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Dynamically add reveal classes to common elements to save manual HTML editing
    const autoRevealElements = document.querySelectorAll('.feature-card, .product-card, .section h2, .tech-node, .stat-card, .model-item, .client-item');
    autoRevealElements.forEach((el, index) => {
        if (!el.classList.contains('reveal-on-scroll')) {
            el.classList.add('reveal-on-scroll');
            // Add slight staggered delay based on index (0, 100, 200, 300)
            const delay = (index % 4) * 100 + 100;
            if (delay > 100) el.classList.add(`delay-${delay}`);
        }
    });

    // Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('in-view'));
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('[data-count]');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = target.getAttribute('data-count');
                const suffix = target.getAttribute('data-suffix') || '';
                
                // Parse float to handle decimals, otherwise int
                const finalValue = parseFloat(targetValue);
                const isFloat = targetValue.includes('.');
                const duration = 2000; // ms
                const start = performance.now();
                
                const step = (timestamp) => {
                    const progress = Math.min((timestamp - start) / duration, 1);
                    // easeOutQuart
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    const current = easeProgress * finalValue;
                    
                    if (isFloat) {
                        target.innerText = current.toFixed(1) + suffix;
                    } else {
                        target.innerText = Math.floor(current) + suffix;
                    }
                    
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        target.innerText = targetValue + suffix;
                    }
                };
                
                requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    };

    if ('IntersectionObserver' in window && counters.length > 0) {
        const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
        counters.forEach(counter => counterObserver.observe(counter));
    }

    // Lazy Loading Images (Intersection Observer fallback if loading="lazy" is not supported)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        let lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.removeAttribute('data-src');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(lazyImage => {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for older browsers
        lazyImages.forEach(lazyImage => {
            lazyImage.src = lazyImage.dataset.src;
        });
    }
});
