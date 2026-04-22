document.addEventListener("DOMContentLoaded", () => {

  // Navigation
  window.showSection = function(sectionId) {
    const sections = document.querySelectorAll("main section");

    sections.forEach(sec => {
      sec.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
  };

  // Theme Toggle
  const toggleBtn = document.getElementById("themeToggle");

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Analyze Function
  window.analyzeResume = function() {
    const loading = document.getElementById("loading");
    const charts = document.getElementById("charts");

    loading.classList.remove("hidden");
    charts.classList.add("hidden");

    setTimeout(() => {
      loading.classList.add("hidden");
      charts.classList.remove("hidden");
      renderCharts();
    }, 2000);
  };

  function renderCharts() {
    const barCtx = document.getElementById("barChart");
    const pieCtx = document.getElementById("pieChart");

    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Skills', 'Experience', 'Education'],
        datasets: [{
          label: 'Resume Score',
          data: [80, 65, 75]
        }]
      }
    });

    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Matched Keywords', 'Missing Keywords'],
        datasets: [{
          data: [60, 40]
        }]
      }
    });
  }

});