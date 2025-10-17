/**
 * Onedigram Website - Main JavaScript
 * Handles language toggle, navigation, animations, and form submission
 */

(function() {
    'use strict';

    // Simple scroll animation observer (replaces AOS)
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => observer.observe(el));
    }

    // Initialize animations when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }

    // Language Toggle
    const langToggle = document.getElementById('langToggle');
    const html = document.documentElement;
    let currentLang = 'ar';

    // Load saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        currentLang = savedLang;
        setLanguage(currentLang);
    }

    langToggle.addEventListener('click', function() {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(currentLang);
        localStorage.setItem('language', currentLang);
    });

    function setLanguage(lang) {
        if (lang === 'en') {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            document.querySelector('.lang-ar').classList.remove('active');
            document.querySelector('.lang-en').classList.add('active');
            
            // Update all elements with data-en attribute
            document.querySelectorAll('[data-en]').forEach(element => {
                const englishText = element.getAttribute('data-en');
                if (!element.hasAttribute('data-ar')) {
                    element.setAttribute('data-ar', element.textContent);
                }
                element.textContent = englishText;
            });
            
            // Toggle language sections for legal pages
            document.querySelectorAll('.lang-section[data-lang="en"]').forEach(el => {
                el.style.display = 'block';
            });
            document.querySelectorAll('.lang-section[data-lang="ar"]').forEach(el => {
                el.style.display = 'none';
            });
            
            // Update page title and meta description
            const pageTitle = document.title;
            if (pageTitle.includes('أنظمة ذكية')) {
                document.title = 'Onedigram - Smart Systems. Simple Growth.';
            } else if (pageTitle.includes('شروط الخدمة')) {
                document.title = 'Terms of Service - Onedigram';
            } else if (pageTitle.includes('سياسة الإلغاء')) {
                document.title = 'Refund & Cancellation Policy - Onedigram';
            } else if (pageTitle.includes('سياسة الخصوصية')) {
                document.title = 'Privacy Policy - Onedigram';
            }
            
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && metaDesc.getAttribute('content').includes('نبني')) {
                metaDesc.setAttribute('content', 'We deliver SaaS and AI results without an in-house tech team.');
            }
        } else {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            document.querySelector('.lang-ar').classList.add('active');
            document.querySelector('.lang-en').classList.remove('active');
            
            // Restore Arabic text
            document.querySelectorAll('[data-ar]').forEach(element => {
                const arabicText = element.getAttribute('data-ar');
                element.textContent = arabicText;
            });
            
            // Toggle language sections for legal pages
            document.querySelectorAll('.lang-section[data-lang="en"]').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.lang-section[data-lang="ar"]').forEach(el => {
                el.style.display = 'block';
            });
            
            // Update page title and meta description
            const pageTitle = document.title;
            if (pageTitle.includes('Smart Systems')) {
                document.title = 'Onedigram - أنظمة ذكية بنمو بسيط';
            } else if (pageTitle.includes('Terms of Service')) {
                document.title = 'شروط الخدمة - Onedigram';
            } else if (pageTitle.includes('Refund')) {
                document.title = 'سياسة الإلغاء والاسترداد - Onedigram';
            } else if (pageTitle.includes('Privacy')) {
                document.title = 'سياسة الخصوصية - Onedigram';
            }
            
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && metaDesc.getAttribute('content').includes('deliver SaaS')) {
                metaDesc.setAttribute('content', 'Onedigram - نبني أنظمة ذكية بنمو بسيط. حلول SaaS وذكاء اصطناعي بدون فريق تقني داخلي.');
            }
        }
    }

    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnToggle = mobileToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains('active')) {
            nav.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Sticky Header
    const header = document.getElementById('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 20px rgba(11, 37, 69, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(11, 37, 69, 0.08)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert(currentLang === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLang === 'ar' ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email address');
            return;
        }
        
        // Create mailto link with form data
        const subject = encodeURIComponent(currentLang === 'ar' ? 'استفسار من موقع Onedigram' : 'Inquiry from Onedigram Website');
        const body = encodeURIComponent(
            `${currentLang === 'ar' ? 'الاسم' : 'Name'}: ${name}\n` +
            `${currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email'}: ${email}\n\n` +
            `${currentLang === 'ar' ? 'الرسالة' : 'Message'}:\n${message}`
        );
        
        // Open email client
        window.location.href = `mailto:hello@onedigram.com?subject=${subject}&body=${body}`;
        
        // Show success message
        alert(currentLang === 'ar' ? 
            'شكرًا لتواصلك! سيتم فتح برنامج البريد الإلكتروني الخاص بك.' : 
            'Thank you for reaching out! Your email client will open.'
        );
        
        // Reset form
        contactForm.reset();
    });
    }

    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add active state to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);

    // Performance: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(highlightNavigation, 100));

    // Add loading animation to page
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Handle cases where user clicks on case study cards (placeholder for lightbox)
    const caseCards = document.querySelectorAll('.case-card');
    
    caseCards.forEach(card => {
        card.addEventListener('click', function() {
            // Placeholder for lightbox functionality
            // In a production environment, you might want to implement a modal/lightbox here
            console.log('Case study clicked:', this.querySelector('h3').textContent);
        });
    });

    // Add entrance animations to elements as they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .pricing-card, .why-card, .case-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', debounce(animateOnScroll, 50));
    animateOnScroll(); // Run once on load

    // Console welcome message
    console.log('%c Onedigram Website ', 'background: #FF5A7E; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
    console.log('%c Smart Systems. Simple Growth. ', 'color: #0B2545; font-size: 14px;');
    console.log('Built with ❤️ by Onedigram');

})();
