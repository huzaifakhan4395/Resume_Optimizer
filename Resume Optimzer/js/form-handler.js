/**
 * Form Handler
 * Handles Resume file upload, validation, and session storage
 * WCAG 2.1 AA Compliant
 */

const FormHandler = (() => {
  const SESSION_STORAGE_KEY = 'resume-optimizer-upload';
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  /**
   * Initialize form handler
   */
  function init() {
    setupFileInput();
    setupAnalyzeButton();
    restoreSavedSession();
  }

  /**
   * Setup file input event listeners
   */
  function setupFileInput() {
    const fileInput = document.querySelector('input[type="file"]');
    const fileLabel = document.querySelector('.form-file-label');

    if (!fileInput) return;

    // File input change event
    fileInput.addEventListener('change', handleFileSelect);

    // Drag and drop
    if (fileLabel) {
      fileLabel.addEventListener('dragover', handleDragOver);
      fileLabel.addEventListener('dragleave', handleDragLeave);
      fileLabel.addEventListener('drop', handleFileDrop);
    }
  }

  /**
   * Handle file selection from input
   */
  function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
      validateAndProcessFile(file);
    }
  }

  /**
   * Handle drag over event
   */
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const fileLabel = document.querySelector('.form-file-label');
    if (fileLabel) {
      fileLabel.style.borderColor = 'var(--color-primary)';
      fileLabel.style.backgroundColor = 'rgba(79, 70, 229, 0.05)';
    }
  }

  /**
   * Handle drag leave event
   */
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const fileLabel = document.querySelector('.form-file-label');
    if (fileLabel) {
      fileLabel.style.borderColor = '';
      fileLabel.style.backgroundColor = '';
    }
  }

  /**
   * Handle file drop event
   */
  function handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const fileLabel = document.querySelector('.form-file-label');
    if (fileLabel) {
      fileLabel.style.borderColor = '';
      fileLabel.style.backgroundColor = '';
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  }

  /**
   * Validate and process file
   */
  function validateAndProcessFile(file) {
    const errors = [];

    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      errors.push('Invalid file type. Please upload a PDF, Word document, or text file.');
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`File is too large. Maximum size is ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(1)}MB.`);
    }

    if (errors.length > 0) {
      showFileError(errors.join(' '));
      return;
    }

    // File is valid
    saveFileSession(file);
    showFileSuccess(file.name);
    enableAnalyzeButton();
  }

  /**
   * Save file information to session storage
   */
  function saveFileSession(file) {
    try {
      const fileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(fileData));
    } catch (e) {
      console.warn('Could not save file to sessionStorage:', e);
    }
  }

  /**
   * Restore saved file session
   */
  function restoreSavedSession() {
    try {
      const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (savedData) {
        const fileData = JSON.parse(savedData);
        showFileSuccess(fileData.name);
        enableAnalyzeButton();
      }
    } catch (e) {
      console.warn('Could not restore file session:', e);
    }
  }

  /**
   * Show file error message
   */
  function showFileError(message) {
    clearFileMessages();
    
    const fileInput = document.querySelector('input[type="file"]');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');
    errorDiv.textContent = message;

    if (fileInput) {
      fileInput.parentElement.appendChild(errorDiv);
      fileInput.classList.add('error');
    }

    disableAnalyzeButton();
  }

  /**
   * Show file success message
   */
  function showFileSuccess(fileName) {
    clearFileMessages();
    
    const fileInput = document.querySelector('input[type="file"]');
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.setAttribute('role', 'status');
    successDiv.setAttribute('aria-live', 'polite');
    successDiv.textContent = `✓ File uploaded: ${fileName}`;

    if (fileInput) {
      fileInput.parentElement.appendChild(successDiv);
      fileInput.classList.remove('error');
    }
  }

  /**
   * Clear file messages
   */
  function clearFileMessages() {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.parentElement) {
      const messages = fileInput.parentElement.querySelectorAll('.form-error, .form-success');
      messages.forEach(msg => msg.remove());
    }
  }

  /**
   * Enable analyze button
   */
  function enableAnalyzeButton() {
    const analyzeBtn = document.querySelector('button[onclick="analyzeResume()"]') || 
                       document.querySelector('[data-action="analyze"]');
    if (analyzeBtn) {
      analyzeBtn.disabled = false;
      analyzeBtn.classList.remove('disabled');
    }
  }

  /**
   * Disable analyze button
   */
  function disableAnalyzeButton() {
    const analyzeBtn = document.querySelector('button[onclick="analyzeResume()"]') || 
                       document.querySelector('[data-action="analyze"]');
    if (analyzeBtn) {
      analyzeBtn.disabled = true;
      analyzeBtn.classList.add('disabled');
    }
  }

  /**
   * Get saved file data
   */
  function getSavedFileData() {
    try {
      const savedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : null;
    } catch (e) {
      console.warn('Could not retrieve file data:', e);
      return null;
    }
  }

  /**
   * Clear file session
   */
  function clearFileSession() {
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear file session:', e);
    }
    clearFileMessages();
    disableAnalyzeButton();
  }

  // Public API
  return {
    init,
    validateAndProcessFile,
    getSavedFileData,
    clearFileSession,
    enableAnalyzeButton,
    disableAnalyzeButton
  };
})();

// Initialize form handler on DOM content loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    FormHandler.init();
  });
} else {
  FormHandler.init();
}
