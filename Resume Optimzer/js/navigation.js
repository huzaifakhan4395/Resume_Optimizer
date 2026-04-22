/**
 * Navigation Manager
 * Handles page routing and active link highlighting
 * WCAG 2.1 AA Compliant
 */

const NavigationManager = (() => {
  const SESSION_STORAGE_KEY = 'resume-optimizer-current-page';

  /**
   * Initialize navigation system
   */
  function init() {
    setupNavigation();
    highlightCurrentPage();
    restorePreviousPage();
  }

  /**
   * Setup navigation link event listeners
   */
  function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, a[data-page]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const page = link.getAttribute('data-page');
        
        // If it's a local page link
        if (href && (href.startsWith('http') || href.includes('@'))) {
          // External link - allow default behavior
          return;
        }

        if (href && !href.startsWith('http')) {
          e.preventDefault();
          navigateToPage(href);
        }
      });
    });
  }

  /**
   * Navigate to a specific page
   */
  function navigateToPage(pagePath) {
    // For multi-page app: navigate to different HTML file
    window.location.href = pagePath;
  }

  /**
   * Highlight the current page in navigation
   */
  function highlightCurrentPage() {
    const currentPage = getCurrentPageName();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || link.getAttribute('data-page') || '';
      const linkPage = getPageNameFromHref(href);
      
      if (linkPage === currentPage) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  /**
   * Get current page name from URL
   */
  function getCurrentPageName() {
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop() || 'index.html';
    return filename.replace('.html', '');
  }

  /**
   * Extract page name from href
   */
  function getPageNameFromHref(href) {
    if (!href) return '';
    const filename = href.split('/').pop() || '';
    return filename.replace('.html', '');
  }

  /**
   * Restore previous page from session (optional)
   */
  function restorePreviousPage() {
    try {
      const previousPage = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (previousPage) {
        // You could handle returning to previous page here
      }
    } catch (e) {
      console.warn('sessionStorage not available:', e);
    }
  }

  /**
   * Save current page to session
   */
  function saveCurrentPage() {
    try {
      const currentPage = getCurrentPageName();
      sessionStorage.setItem(SESSION_STORAGE_KEY, currentPage);
    } catch (e) {
      console.warn('Could not save page to sessionStorage:', e);
    }
  }

  /**
   * Get all navigation links
   */
  function getNavLinks() {
    return document.querySelectorAll('.nav-link');
  }

  /**
   * Set active page programmatically
   */
  function setActivePage(pageName) {
    const navLinks = getNavLinks();
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const linkPage = getPageNameFromHref(href);
      
      if (linkPage === pageName) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  // Save current page when leaving
  window.addEventListener('beforeunload', () => {
    saveCurrentPage();
  });

  // Public API
  return {
    init,
    highlightCurrentPage,
    navigateToPage,
    getCurrentPageName,
    setActivePage,
    getNavLinks
  };
})();

// Initialize navigation on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    NavigationManager.init();
  });
} else {
  NavigationManager.init();
}
