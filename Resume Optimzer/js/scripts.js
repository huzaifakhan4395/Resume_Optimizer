/**
 * Resume Optimizer - Main Application
 * Orchestrates all modules and business logic
 * WCAG 2.1 AA Compliant
 */

const ResumeOptimizer = (() => {
  const ANALYSIS_MOCK_DATA = {
    scores: {
      skills: 80,
      experience: 65,
      education: 75,
      overall: 73
    },
    keywords: {
      matched: 60,
      missing: 40
    }
  };

  /**
   * Initialize application
   */
  function init() {
    // All modules initialize themselves on page load
    // This function can be used for additional app initialization
    setupAnalyzeFunction();
    setupCTAButtons();
    setupAccessibilityFeatures();
  }

  /**
   * Setup analyze resume function
   */
  function setupAnalyzeFunction() {
    window.analyzeResume = function() {
      // Check if file has been uploaded
      const savedFile = FormHandler.getSavedFileData();
      
      if (!savedFile) {
        AccessibilityManager.announceToScreenReader('Please upload a resume file first');
        return;
      }

      // Show loading state
      showLoadingState();

      // Simulate analysis
      setTimeout(() => {
        hideLoadingState();
        renderCharts();
        navigateToResults();
        AccessibilityManager.announceToScreenReader('Analysis complete. Results are ready.');
      }, 2500);
    };
  }

  /**
   * Show loading state with accessibility
   */
  function showLoadingState() {
    const loading = document.getElementById("loading");
    const charts = document.getElementById("charts");
    
    if (loading) {
      loading.classList.remove("hidden");
      loading.setAttribute('aria-live', 'polite');
      loading.setAttribute('aria-busy', 'true');
    }
    
    if (charts) {
      charts.classList.add("hidden");
    }
  }

  /**
   * Hide loading state
   */
  function hideLoadingState() {
    const loading = document.getElementById("loading");
    const charts = document.getElementById("charts");
    
    if (loading) {
      loading.classList.add("hidden");
      loading.setAttribute('aria-busy', 'false');
    }
    
    if (charts) {
      charts.classList.remove("hidden");
    }
  }

  /**
   * Render analysis charts
   */
  function renderCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded');
      return;
    }

    const barCtx = document.getElementById("barChart");
    const pieCtx = document.getElementById("pieChart");

    // Destroy existing charts if they exist
    if (window.barChart) {
      window.barChart.destroy();
    }
    if (window.pieChart) {
      window.pieChart.destroy();
    }

    // Bar Chart - Score by Section
    if (barCtx) {
      window.barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Skills', 'Experience', 'Education', 'Overall'],
          datasets: [{
            label: 'Resume Score',
            data: [
              ANALYSIS_MOCK_DATA.scores.skills,
              ANALYSIS_MOCK_DATA.scores.experience,
              ANALYSIS_MOCK_DATA.scores.education,
              ANALYSIS_MOCK_DATA.scores.overall
            ],
            backgroundColor: [
              'rgba(79, 70, 229, 0.8)',
              'rgba(99, 102, 241, 0.8)',
              'rgba(129, 140, 248, 0.8)',
              'rgba(165, 180, 252, 0.8)'
            ],
            borderColor: [
              'rgb(79, 70, 229)',
              'rgb(99, 102, 241)',
              'rgb(129, 140, 248)',
              'rgb(165, 180, 252)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                boxWidth: 12,
                font: {
                  size: 14
                }
              }
            },
            title: {
              display: true,
              text: 'Resume Score by Section'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });

      // Add accessible data table
      createAccessibleDataTable(barCtx, ANALYSIS_MOCK_DATA.scores, 'Score by Section');
    }

    // Pie Chart - Keyword Match
    if (pieCtx) {
      window.pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['Matched Keywords', 'Missing Keywords'],
          datasets: [{
            data: [
              ANALYSIS_MOCK_DATA.keywords.matched,
              ANALYSIS_MOCK_DATA.keywords.missing
            ],
            backgroundColor: [
              'rgba(16, 185, 129, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: [
              'rgb(16, 185, 129)',
              'rgb(239, 68, 68)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                boxWidth: 12,
                font: {
                  size: 14
                }
              }
            },
            title: {
              display: true,
              text: 'Keyword Match Analysis'
            }
          }
        }
      });

      // Add accessible data table
      createAccessibleDataTable(pieCtx, ANALYSIS_MOCK_DATA.keywords, 'Keyword Match');
    }
  }

  /**
   * Create accessible data table for charts
   */
  function createAccessibleDataTable(canvasElement, data, title) {
    // Remove existing table if present
    const existingTable = canvasElement.parentElement?.querySelector('table');
    if (existingTable) {
      existingTable.remove();
    }

    // Create data table for screen readers
    const table = document.createElement('table');
    table.className = 'sr-only';
    table.setAttribute('aria-label', `${title} data table`);

    // Table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = Object.keys(data);
    
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Table body
    const tbody = document.createElement('tbody');
    const dataRow = document.createElement('tr');
    
    headers.forEach(header => {
      const td = document.createElement('td');
      td.textContent = data[header];
      dataRow.appendChild(td);
    });
    tbody.appendChild(dataRow);
    table.appendChild(tbody);

    // Insert table after canvas
    canvasElement.parentElement?.appendChild(table);
  }

  /**
   * Navigate to results page
   */
  function navigateToResults() {
    // For multi-page app
    const pathname = window.location.pathname;
    const isUploadPage = pathname.includes('upload');
    
    if (isUploadPage) {
      // We're on upload.html, navigate to results.html
      const baseUrl = pathname.substring(0, pathname.lastIndexOf('/'));
      window.location.href = baseUrl + '/results.html';
    }
  }

  /**
   * Setup CTA buttons for navigation
   */
  function setupCTAButtons() {
    // Get Started button on home page
    const getStartedBtn = document.querySelector('button[onclick*="upload"]');
    if (getStartedBtn) {
      getStartedBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'upload.html';
      });
    }

    // Analyze button on upload page
    const analyzeBtn = document.querySelector('button[onclick="analyzeResume()"]');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.analyzeResume();
      });
    }

    // Analyze Again button on results page
    const analyzeAgainBtn = document.querySelector('button[onclick*="upload"]');
    if (analyzeAgainBtn && analyzeAgainBtn !== getStartedBtn) {
      analyzeAgainBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'upload.html';
        FormHandler.clearFileSession();
      });
    }
  }

  /**
   * Setup accessibility features on page load
   */
  function setupAccessibilityFeatures() {
    // Ensure main element is focusable for skip link
    const main = document.querySelector('main');
    if (main && !main.id) {
      main.id = 'main';
    }

    // Set up aria-labels for icon buttons
    AccessibilityManager.setupAriaLabels();
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    analyzeResume: window.analyzeResume,
    ANALYSIS_MOCK_DATA
  };
})();
