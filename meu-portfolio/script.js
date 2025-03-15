// Apply the theme before loading content
(function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.add('dark');
    }
})();

// Load theme state when page loads
window.addEventListener('load', () => {
    const chk = document.getElementById('chk');
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        document.body.classList.add('light');
        chk.checked = true;
    }

    // Save theme state when changing checkbox
    chk.addEventListener('change', () => {
        if (chk.checked) {
            document.body.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        }
    });
});