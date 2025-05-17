/**
 * Kibibit Theme Injector for Jest-stare Test Reports
 * Version 1.0.0
 *
 * This script adds configuration options and dynamic features to both
 * jest-stare test report and Istanbul coverage report.
 */

(function() {
  // Configuration options - customize these values
  const config = {
    projectName: 'kb-tests', // Project name to display in the header
    organizationLogo: null, // URL to logo image or null to use default emoji
    organizationName: 'kibibit', // Organization name for footer
    enableBackButton: false, // Add a back button to coverage report
    customColors: { // Override default theme colors
      boldTextColor: '#c0f', // Main accent color
      passColor: '#28a745',
      failColor: '#dc3545',
      pendingColor: '#ffc107',
      todoColor: '#17a2b8'
    }
  };

  /**
   * Main initialization function
   */
  function init() {
    console.log('Kibibit Theme Injector initialized');

    // Log document title for debugging
    console.log('Document title:', document.title);

    // More reliable detection for Jest-stare report
    const isJestStare =
      document.title.includes('jest-stare') ||
      document.querySelector('#navbar-title') ||
      document.querySelector('#test-suites-canvas');

    // More reliable detection for Istanbul coverage report
    const isCoverage =
      document.title.includes('coverage report') ||
      document.querySelector('.coverage-summary') ||
      document.querySelector('.status-line');

    console.log('Detection results:', { isJestStare, isCoverage });

    // Initialize appropriate theme
    if (isJestStare) {
      console.log('Detected Jest-stare report, initializing theme...');
      initJestStareReport();

      // Customize chart.js globally when it's loaded
      customizeCharts();
    } else if (isCoverage) {
      console.log('Detected Istanbul coverage report, initializing theme...');
      initCoverageReport();
    } else {
      console.warn('Could not detect report type. No theme will be applied.');
    }
  }

  /**
   * Customizes Chart.js chart defaults for better appearance
   */
  function customizeCharts() {
    // Check if Chart.js is available (usually accessible via window.Chart)
    if (typeof window.Chart !== 'undefined') {
      applyChartCustomizations();
    } else {
      // If Chart.js isn't loaded yet, wait for it
      const checkInterval = setInterval(() => {
        if (typeof window.Chart !== 'undefined') {
          clearInterval(checkInterval);
          applyChartCustomizations();
        }
      }, 100);

      // Set a timeout to clear the interval after 5 seconds if Chart.js never loads
      setTimeout(() => clearInterval(checkInterval), 5000);
    }
  }

  /**
   * Apply customizations to Chart.js defaults
   */
  function applyChartCustomizations() {
    try {
      console.log('Customizing Chart.js defaults');

      // Store a reference to Chart.js
      const Chart = window.Chart;

      // Set global defaults for all charts
      Chart.defaults.global.defaultFontColor = 'rgba(255, 255, 255, 0.8)';
      Chart.defaults.global.defaultFontFamily = '\'Comfortaa\', cursive';

      // Get all canvas charts and update them
      const canvases = document.querySelectorAll('canvas[id$="-canvas"]');
      canvases.forEach((canvas) => {
        // Try to find the chart instance for this canvas
        const chartInstance = Chart.instances[canvas.id];
        if (chartInstance) {
          // Update options
          chartInstance.options.legend = chartInstance.options.legend || {};
          chartInstance.options.legend.labels =
            chartInstance.options.legend.labels || {};
          chartInstance.options.legend.labels.fontColor =
            'rgba(255, 255, 255, 0.8)';
          chartInstance.options.legend.labels.fontFamily =
            '\'Comfortaa\', cursive';

          // Update and redraw the chart
          chartInstance.update();
        }
      });
    } catch (error) {
      console.error('Error customizing charts:', error);
    }
  }

  /**
   * Initialize Jest-stare report custom theme
   */
  function initJestStareReport() {
    // Update navbar title with project name
    const navbarTitle = document.querySelector('#navbar-title');
    if (navbarTitle) {
      navbarTitle.textContent = config.projectName;
    }

    // Add organization logo if configured
    if (config.organizationLogo) {
      addOrganizationLogo();
    }

    // Add footer with organization name
    addFooter();

    // Add custom color overrides
    addCustomColorStyles();
  }

  /**
   * Initialize Istanbul coverage report custom theme
   */
  function initCoverageReport() {
    // Update title with project name
    const titleElement = document.querySelector('title');
    if (titleElement) {
      // Keep the existing title format but add the project name
      const originalTitle = titleElement.textContent;
      const newTitle = originalTitle.replace(
        'All files',
        `${ config.projectName } - All files`
      );
      titleElement.textContent = newTitle;
    }

    // Add back button to test report if enabled
    if (config.enableBackButton) {
      addBackButton();
    }

    // Add footer with organization name
    addFooter();

    // Set project name in fixed header
    customizeCoverageHeader();

    // Add custom color overrides
    addCustomColorStyles();
  }

  /**
   * Add an organization logo to the navbar
   */
  function addOrganizationLogo() {
    // Create logo element
    const logo = document.createElement('img');
    logo.src = config.organizationLogo;
    logo.alt = config.organizationName + ' logo';
    logo.style.height = '32px';
    logo.style.marginRight = '10px';

    // Add to navbar
    const navbar = document.querySelector('.navbar-brand');
    if (navbar) {
      navbar.insertBefore(logo, navbar.firstChild);
    }
  }

  /**
   * Add a back button to the coverage report that links to the test report
   */
  function addBackButton() {
    const backButton = document.createElement('a');
    backButton.href = '../index.html';
    backButton.className = 'back-to-tests';
    backButton.innerHTML = '&larr; Back to Tests';

    // Add to document
    document.body.appendChild(backButton);
  }

  /**
   * Add a footer with organization name
   */
  function addFooter() {
    // Remove existing footer if found
    const existingFooter = document.querySelector('.footer');
    if (existingFooter) {
      existingFooter.remove();
    }
  
    // Create new footer
    const footer = document.createElement('div');
    footer.className = 'footer';
  
    const container = document.createElement('div');
    container.className = 'container';
    container.innerHTML = `
      <div class="created-by">
        <a href="https://github.com/kibibit" target="_blank">Theme</a> created by 
        <a href="https://github.com/kibibit" target="_blank">
          <div id="footer-animated-logo" class="kb-logo"><span class="letter">k</span>
  
            <div class="shape-animation shape-one to-red">
              <div class="shape shape1"></div>
              <div class="shape shape2"></div>
            </div>
  
            <div class="shape-animation shape-zero">
              <div class="shape shape1"></div>
              <div class="shape shape2"></div>
            </div>
  
            <div class="shape-animation shape-one to-blue middle">
              <div class="shape shape1"></div>
              <div class="shape shape2"></div>
            </div>
  
            <div class="shape-animation shape-zero">
              <div class="shape shape1"></div>
              <div class="shape shape2"></div>
            </div>
  
            <div class="shape-animation shape-one to-yellow">
              <div class="shape shape1"></div>
              <div class="shape shape2"></div>
            </div>
            <span class="letter">t</span>
  
            <div class="k1b1b0t-mouth-container">
              <div class="k1b1b0t-mouth">[<span class="mo-an">||||</span>]</div>
            </div>
          </div>
          opensrc
        </a>
      </div>
      <div class="contact-email">
        <a href="mailto:thatkookooguy@kibibit.io">thatkookooguy@kibibit.io</a>
      </div>
    `;
  
    footer.appendChild(container);
    document.body.appendChild(footer);
  
    // Inject Kibibit logo CSS
    if (!document.querySelector('link[href="https://kibibit.io/kibibit-logo/kb-logo.css"]')) {
      const logoStyles = document.createElement('link');
      logoStyles.rel = 'stylesheet';
      logoStyles.href = 'https://kibibit.io/kibibit-logo/kb-logo.css';
      document.head.appendChild(logoStyles);
    }
  
    // Animate logo
    window.kibibitLogoTimer = setInterval(() => {
      const logo = footer.querySelector('#footer-animated-logo');
      if (logo) {
        logo.classList.toggle('full-logo');
      }
    }, 5000);
  }

  /**
   * Customize the coverage report header
   */
  function customizeCoverageHeader() {
    const wrapper = document.querySelector('.wrapper');
    if (wrapper) {
      // Update the title in the pseudo-element
      const style = document.createElement('style');
      const content = `${ config.projectName } - Coverage Report`;
      style.textContent = `.pad1::before { content: "${ content }"; }`;
      document.head.appendChild(style);
    }
  }

  /**
   * Add CSS with custom color overrides based on config
   */
  function addCustomColorStyles() {
    if (!config.customColors) return;

    const style = document.createElement('style');
    let cssText = ':root {\n';

    if (config.customColors.boldTextColor) {
      cssText += `  --bold-text-color: ${
        config.customColors.boldTextColor
      };\n`;
    }

    if (config.customColors.passColor) {
      cssText += `  --pass-color: ${ config.customColors.passColor };\n`;
    }

    if (config.customColors.failColor) {
      cssText += `  --fail-color: ${ config.customColors.failColor };\n`;
    }

    if (config.customColors.pendingColor) {
      cssText += `  --pending-color: ${ config.customColors.pendingColor };\n`;
    }

    if (config.customColors.todoColor) {
      cssText += `  --todo-color: ${ config.customColors.todoColor };\n`;
    }

    cssText += '}';
    style.textContent = cssText;
    document.head.appendChild(style);
  }

  // Initialize on DOM content loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
