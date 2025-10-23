// ========================================
// Main JavaScript for SmartBlog Theme
// ========================================

(function() {
    'use strict';

    // ========== Smooth Scroll for Anchor Links ==========
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ========== Active Navigation ==========
    function setActiveNav() {
        const currentLocation = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentLocation || 
                (linkPath !== '/' && currentLocation.startsWith(linkPath))) {
                link.classList.add('active');
            }
        });
    }

    // ========== Lazy Loading Images ==========
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // ========== Copy Code Button ==========
    function initCodeCopy() {
        document.querySelectorAll('pre code').forEach(block => {
            // Create copy button
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = 'Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            
            // Add click handler
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(block.textContent);
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    button.textContent = 'Error';
                }
            });
            
            // Style the pre element
            const pre = block.parentNode;
            if (pre.tagName === 'PRE') {
                pre.style.position = 'relative';
                pre.appendChild(button);
            }
        });
    }

    // ========== Scroll to Top Button ==========
    function initScrollToTop() {
        // Create button
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        scrollBtn.style.display = 'none';
        document.body.appendChild(scrollBtn);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        });

        // Scroll to top on click
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========== Reading Progress Bar ==========
    function initReadingProgress() {
        // Only on single post pages
        if (!document.querySelector('.single-post')) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ========== Mobile Menu Toggle ==========
    function initMobileMenu() {
        const header = document.querySelector('.site-header');
        const nav = document.querySelector('.main-nav');
        
        if (!header || !nav) return;

        // Create hamburger button
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-toggle';
        hamburger.innerHTML = '☰';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        header.querySelector('.container').appendChild(hamburger);

        // Toggle menu
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            hamburger.classList.toggle('active');
            hamburger.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) {
                nav.classList.remove('mobile-open');
                hamburger.classList.remove('active');
                hamburger.innerHTML = '☰';
            }
        });
    }

    // ========== External Links ==========
    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // ========== Table of Contents ==========
    function initTableOfContents() {
        const postBody = document.querySelector('.post-body');
        if (!postBody) return;

        const headings = postBody.querySelectorAll('h2, h3');
        if (headings.length < 3) return; // Only show TOC if 3+ headings

        const toc = document.createElement('div');
        toc.className = 'table-of-contents';
        toc.innerHTML = '<h4>Mục lục</h4><ul></ul>';
        const tocList = toc.querySelector('ul');

        headings.forEach((heading, index) => {
            // Add ID to heading
            const id = `heading-${index}`;
            heading.id = id;

            // Create TOC item
            const li = document.createElement('li');
            li.className = heading.tagName.toLowerCase();
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            li.appendChild(a);
            tocList.appendChild(li);
        });

        // Insert TOC after first paragraph
        const firstPara = postBody.querySelector('p');
        if (firstPara) {
            firstPara.after(toc);
        }
    }

    // ========== Dark Mode Toggle ==========
    function initDarkMode() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        darkModeToggle.innerHTML = '🌙';
        
        const header = document.querySelector('.site-header .container');
        if (header) {
            header.appendChild(darkModeToggle);
        }

        // Check saved preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }

        // Toggle dark mode
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerHTML = '☀️';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerHTML = '🌙';
            }
        });
    }

    // ========== Search Highlight ==========
    function initSearchHighlight() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('highlight');
        
        if (searchTerm) {
            const content = document.querySelector('.post-body');
            if (content) {
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                content.innerHTML = content.innerHTML.replace(
                    regex,
                    '<mark>$1</mark>'
                );
            }
        }
    }

    // ========== Image Modal ==========
    function initImageModal() {
        const images = document.querySelectorAll('.post-body img');
        
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                const modal = document.createElement('div');
                modal.className = 'image-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <span class="close-modal">&times;</span>
                        <img src="${img.src}" alt="${img.alt}">
                    </div>
                `;
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden';

                // Close modal
                const closeModal = () => {
                    modal.remove();
                    document.body.style.overflow = '';
                };

                modal.querySelector('.close-modal').addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeModal();
                });
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') closeModal();
                });
            });
        });
    }

    // ========== Initialize All ==========
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        console.log('🚀 SmartBlog theme initialized');

        // Initialize features
        initSmoothScroll();
        setActiveNav();
        initLazyLoading();
        initCodeCopy();
        initScrollToTop();
        initReadingProgress();
        initMobileMenu();
        initExternalLinks();
        initTableOfContents();
        // initDarkMode(); // Uncomment to enable dark mode
        initSearchHighlight();
        initImageModal();
    }

    // Start initialization
    init();

})();

// ========================================
// Additional Styles for JS Features
// ========================================

// Add dynamic styles
const style = document.createElement('style');
style.textContent = `
    /* Copy Button */
    .copy-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(79, 70, 229, 0.9);
        color: white;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        font-size: 0.875rem;
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .copy-button:hover {
        background: rgba(79, 70, 229, 1);
        transform: translateY(-2px);
    }
    
    .copy-button.copied {
        background: rgba(16, 185, 129, 0.9);
    }

    /* Scroll to Top Button */
    .scroll-to-top {
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    /* Reading Progress Bar */
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0%;
        z-index: 1001;
        transition: width 0.1s ease;
    }

    /* Mobile Menu Toggle */
    .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }

    /* Table of Contents */
    .table-of-contents {
        background: var(--background-secondary);
        padding: 1.5rem;
        border-radius: var(--radius-md);
        margin: 2rem 0;
        border-left: 4px solid var(--primary-color);
    }
    
    .table-of-contents h4 {
        margin: 0 0 1rem 0;
        color: var(--text-primary);
    }
    
    .table-of-contents ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .table-of-contents li {
        margin: 0.5rem 0;
    }
    
    .table-of-contents li.h3 {
        margin-left: 1.5rem;
        font-size: 0.9em;
    }
    
    .table-of-contents a {
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.3s ease;
    }
    
    .table-of-contents a:hover {
        color: var(--primary-color);
    }

    /* Image Modal */
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .image-modal .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .image-modal img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
        cursor: default;
    }
    
    .close-modal {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        background: none;
        border: none;
    }

    /* Dark Mode Toggle */
    .dark-mode-toggle {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: transform 0.3s ease;
    }
    
    .dark-mode-toggle:hover {
        transform: rotate(20deg);
    }

    /* Dark Mode Styles */
    body.dark-mode {
        --background: #1a1a1a;
        --background-secondary: #2d2d2d;
        --text-primary: #e5e5e5;
        --text-secondary: #a0a0a0;
        --border-color: #404040;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: block;
        }
        
        .main-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--background);
            flex-direction: column;
            padding: 1rem;
            box-shadow: var(--shadow-lg);
        }
        
        .main-nav.mobile-open {
            display: flex;
        }
        
        .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
        }
    }
`;
document.head.appendChild(style);