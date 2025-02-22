document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    mobileMenuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
        
        // Toggle menu icon
        const menuPath = mobileMenuBtn.querySelector('path');
        if (navLinks.classList.contains('active')) {
            menuPath.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        } else {
            menuPath.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });

    // Handle mobile dropdowns
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navLinks?.classList.remove('active');
            navActions?.classList.remove('active');
            const menuPath = mobileMenuBtn?.querySelector('path');
            menuPath?.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        }
    });
});
