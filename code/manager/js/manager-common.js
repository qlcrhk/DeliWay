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