document.addEventListener('DOMContentLoaded', () => {
    // Navigation Active State Management
    const navItems = document.querySelectorAll('.nav-item a');
    
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));
            // Add active class to the clicked nav item
            this.classList.add('active');
            // Optional: Store the active page in localStorage
            localStorage.setItem('activeNavItem', this.getAttribute('href'));
        });
    });

    // Persist active navigation item on page reload
    const savedActiveNavItem = localStorage.getItem('activeNavItem');
    if (savedActiveNavItem) {
        const activeItem = document.querySelector(`.nav-item a[href="${savedActiveNavItem}"]`);
        if (activeItem) {
            navItems.forEach(item => item.classList.remove('active'));
            activeItem.classList.add('active');
        }
    }

    // Responsive Sidebar Toggle (optional)
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('sidebar-mobile-open');
            mainContent.classList.toggle('main-content-shifted');
        }
    }

    // Sidebar toggle button (you'll need to add this to your HTML)
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Close sidebar when clicking outside (on mobile)
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('sidebar-mobile-open') && 
            !sidebar.contains(event.target) && 
            event.target !== sidebarToggle) {
            sidebar.classList.remove('sidebar-mobile-open');
            mainContent.classList.remove('main-content-shifted');
        }
    });

    // Responsive design handling
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('sidebar-mobile-open');
            mainContent.classList.remove('main-content-shifted');
        }
    });

    // Form submission prevention and validation (optional)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            // Basic form validation
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('invalid');
                    isValid = false;
                } else {
                    field.classList.remove('invalid');
                }
            });

            if (!isValid) {
                event.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Optional: Add hover effects to buttons and interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .button, .nav-item a, .toggle-switch');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
});