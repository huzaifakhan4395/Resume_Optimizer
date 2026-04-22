/**
 * Accessibility Manager
 * Handles keyboard navigation, focus management, and WCAG 2.1 AA compliance
 */

const AccessibilityManager = (() => {
  /**
   * Initialize accessibility features
   */
  function init() {
    setupKeyboardNavigation();
    setupFocusManagement();
    setupSkipLink();
    announcePageLoad();
  }

  /**
   * Setup keyboard navigation
   */
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', handleKeyboardInput);
  }

  /**
   * Handle keyboard input for accessibility
   */
  function handleKeyboardInput(e) {
    // ESC key - close modals or dialogs (if any)
    if (e.key === 'Escape') {
      const modal = document.querySelector('.modal.active');
      if (modal) {
        modal.classList.remove('active');
        e.preventDefault();
      }
    }

    // ENTER key on buttons and links already handled by browser
    // Tab key navigation already handled by browser

    // Announce confirmation messages for screen readers
    if (e.key === 'Enter') {
      const target = e.target;
      
      if (target.querySelector && target.getAttribute('data-action') === 'analyze') {
        // Will be announced by the loading state
      }
    }
  }

  /**
   * Setup focus management for better visual feedback
   */
  function setupFocusManagement() {
    // Ensure all interactive elements have visible focus indicators
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    interactiveElements.forEach(element => {
      // Keyboard focus - visible
      element.addEventListener('focus', (e) => {
        e.target.classList.add('focused');
      });

      // Mouse focus - optional visual
      element.addEventListener('blur', (e) => {
        e.target.classList.remove('focused');
      });
    });

    // Restore focus after navigation
    window.addEventListener('load', () => {
      const previousFocus = sessionStorage.getItem('resume-optimizer-focus');
      if (previousFocus) {
        const element = document.querySelector(previousFocus);
        if (element) {
          setTimeout(() => element.focus(), 100);
        }
      }
    });

    // Save focus before navigation
    window.addEventListener('beforeunload', () => {
      const focused = document.activeElement;
      if (focused && focused !== document.body) {
        const selector = generateSelector(focused);
        sessionStorage.setItem('resume-optimizer-focus', selector);
      }
    });
  }

  /**
   * Generate unique selector for an element
   */
  function generateSelector(element) {
    if (element.id) {
      return `#${element.id}`;
    }

    const path = [];
    let current = element;

    while (current) {
      let selector = current.tagName.toLowerCase();

      if (current.id) {
        selector += `#${current.id}`;
        path.unshift(selector);
        break;
      } else {
        const parentChildren = current.parentElement?.children || [];
        const childIndex = Array.from(parentChildren).indexOf(current);
        if (childIndex > 0) {
          selector += `:nth-child(${childIndex + 1})`;
        }
      }

      path.unshift(selector);
      current = current.parentElement;
    }

    return path.join(' > ');
  }

  /**
   * Setup skip to main content link
   */
  function setupSkipLink() {
    const skipLink = document.querySelector('.skip-to-main');
    
    if (!skipLink) {
      // Create skip link if it doesn't exist
      const link = document.createElement('a');
      link.href = '#main';
      link.className = 'skip-to-main';
      link.textContent = 'Skip to main content';
      link.setAttribute('aria-label', 'Skip to main content');
      document.body.insertBefore(link, document.body.firstChild);

      // Ensure main has an id
      const main = document.querySelector('main');
      if (main && !main.id) {
        main.id = 'main';
      }
    }

    skipLink?.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.focus();
        main.tabIndex = -1; // Allow focus on div
        main.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /**
   * Announce page load to screen readers
   */
  function announcePageLoad() {
    const pageTitle = document.querySelector('h1');
    if (pageTitle) {
      announceToScreenReader(`Page loaded: ${pageTitle.textContent}`);
    }
  }

  /**
   * Announce message to screen readers
   */
  function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      announcement.remove();
    }, 1500);
  }

  /**
   * Trap focus inside modal (for future modal dialogs)
   */
  function trapFocusInModal(modalElement) {
    const focusableElements = modalElement.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    modalElement.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });

    firstElement?.focus();
  }

  /**
   * Set focus to element
   */
  function setFocus(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /**
   * Announce form error to screen readers
   */
  function announceFormError(fieldName, errorMessage) {
    announceToScreenReader(`Error in ${fieldName}: ${errorMessage}`);
  }

  /**
   * Set up ARIA labels for icons
   */
  function setupAriaLabels() {
    const iconsWithoutLabels = document.querySelectorAll('button:not([aria-label]) img, button:not([aria-label]) svg');
    
    iconsWithoutLabels.forEach(icon => {
      const button = icon.closest('button');
      if (button && !button.hasAttribute('aria-label')) {
        button.setAttribute('aria-label', 'Button');
      }
    });
  }

  // Initialize
  setupAriaLabels();

  // Public API
  return {
    init,
    announceToScreenReader,
    trapFocusInModal,
    setFocus,
    announceFormError,
    setupAriaLabels
  };
})();

// Initialize accessibility on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    AccessibilityManager.init();
  });
} else {
  AccessibilityManager.init();
}
