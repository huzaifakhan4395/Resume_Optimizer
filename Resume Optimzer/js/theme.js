/**
 * Theme Management
 * Handles dark/light mode toggle and persistence
 * WCAG 2.1 AA Compliant
 */

const ThemeManager = (() => {
  const THEME_STORAGE_KEY = 'resume-optimizer-theme';
  const DARK_CLASS = 'dark';

  /**
   * Initialize theme system
   */
  function init() {
    const savedTheme = getSavedTheme();
    const prefersDark = prefersColorScheme();
    const initialTheme = savedTheme || (prefersDark ? DARK_CLASS : 'light');
    
    setTheme(initialTheme);
    setupToggleButton();
  }

  /**
   * Get saved theme from localStorage
   */
  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {
      console.warn('localStorage not available:', e);
      return null;
    }
  }

  /**
   * Check if user prefers dark mode via system settings
   */
  function prefersColorScheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Set theme and persist to localStorage
   */
  function setTheme(theme) {
    if (theme === DARK_CLASS) {
      document.body.classList.add(DARK_CLASS);
    } else {
      document.body.classList.remove(DARK_CLASS);
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage:', e);
    }

    // Update aria-label and icon
    updateThemeToggleUI();
  }

  /**
   * Toggle between light and dark mode
   */
  function toggleTheme() {
    const isDark = document.body.classList.contains(DARK_CLASS);
    setTheme(isDark ? 'light' : DARK_CLASS);
  }

  /**
   * Setup theme toggle button event listener
   */
  function setupToggleButton() {
    const toggleBtn = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
    
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleTheme();
      });

      // Announcement for screen readers
      toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains(DARK_CLASS);
        const announcement = isDark ? 'Dark mode enabled' : 'Light mode enabled';
        announceToScreenReader(announcement);
      });

      updateThemeToggleUI();
    }
  }

  /**
   * Update theme toggle button UI and accessibility
   */
  function updateThemeToggleUI() {
    const toggleBtn = document.getElementById('themeToggle') || document.querySelector('.theme-toggle');
    
    if (toggleBtn) {
      const isDark = document.body.classList.contains(DARK_CLASS);
      
      // Update icon and aria-label
      toggleBtn.textContent = isDark ? '☀️' : '🌙';
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      toggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  /**
   * Announce message to screen readers
   */
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }

  /**
   * Get current theme
   */
  function getCurrentTheme() {
    return document.body.classList.contains(DARK_CLASS) ? DARK_CLASS : 'light';
  }

  // Public API
  return {
    init,
    toggleTheme,
    setTheme,
    getCurrentTheme,
    getSavedTheme
  };
})();

// Initialize theme on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
  });
} else {
  ThemeManager.init();
}
