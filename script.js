// DOM elements
const themeButtons = document.querySelectorAll('.theme-button');
const themeIcon = document.getElementById('themeIcon');
const currentThemeText = document.getElementById('currentTheme');
const lastChangedText = document.getElementById('lastChanged');
const statusMessage = document.getElementById('statusMessage');
const body = document.body;

// Function to store user preferences in localStorage
function storeUserPreferences(theme) {
    // Store the theme preference and timestamp
    const preferences = {
        theme: theme,
        timestamp: new Date().toLocaleString()
    };
    
    // Save to localStorage
    localStorage.setItem('themePreferences', JSON.stringify(preferences));
    
    // Update the UI
    currentThemeText.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    lastChangedText.textContent = preferences.timestamp;
    
    // Show status message
    showStatusMessage('Theme preferences saved!');
}

// Function to retrieve user preferences from localStorage
function retrieveUserPreferences() {
    const preferences = JSON.parse(localStorage.getItem('themePreferences'));
    
    if (preferences) {
        applyTheme(preferences.theme);
        currentThemeText.textContent = preferences.theme.charAt(0).toUpperCase() + preferences.theme.slice(1);
        lastChangedText.textContent = preferences.timestamp;
    }
}

// Function to apply the selected theme
function applyTheme(theme) {
    // Remove all theme classes
    body.classList.remove('dark-mode', 'green-mode', 'purple-mode');
    
    // Apply the appropriate class based on theme
    switch(theme) {
        case 'dark':
            body.classList.add('dark-mode');
            break;
        case 'green':
            body.classList.add('green-mode');
            break;
        case 'purple':
            body.classList.add('purple-mode');
            break;
        // Blue is default, no class needed
    }
    
    // Trigger animation
    triggerAnimation();
}

// Function to trigger animations
function triggerAnimation() {
    // Clear any existing animation
    themeIcon.classList.remove('pulse');
    
    // Force a reflow before adding the animation class again
    void themeIcon.offsetWidth;
    
    // Add the pulse animation class
    themeIcon.classList.add('pulse');
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    themeIcon.appendChild(ripple);
    
    // Remove the animation classes after animation completes
    setTimeout(() => {
        themeIcon.classList.remove('pulse');
        ripple.remove();
    }, 1000);
}

// Function to show status message
function showStatusMessage(message) {
    statusMessage.textContent = message;
    statusMessage.classList.add('show');
    
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 3000);
}

// Event listeners for theme buttons
themeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const theme = this.dataset.theme;
        applyTheme(theme);
        storeUserPreferences(theme);
    });
});

// Initialize on page load - retrieve user preferences
document.addEventListener('DOMContentLoaded', function() {
    retrieveUserPreferences();
});