async function annotateSwaggerWithCoverage() {
  const coverageUrl = '/api/swagger-coverage-report';
  let report;

  try {
    const res = await fetch(coverageUrl);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    report = await res.json();
  } catch (err) {
    console.warn('Swagger coverage report unavailable:', err);
    return;
  }

  function injectCoverageSummary(report) {
    const coverageText = `${report.coverage?.toFixed(2) ?? 0}% (${report.tested ?? 0}/${report.total ?? 0})`;
    const headerElement = document.body.querySelector('.swagger-ui .topbar .topbar-wrapper');
  
    if (headerElement) {
      headerElement.setAttribute('data-coverage', coverageText);
    } else {
      console.warn('Swagger topbar-wrapper not found');
    }
  }

  function injectCoverageSummaryOld(report) {
    const summary = document.createElement('div');
    summary.style.background = '#222';
    summary.style.color = '#fff';
    summary.style.padding = '10px';
    summary.style.fontFamily = 'monospace';
    summary.style.fontSize = '14px';
    summary.style.textAlign = 'center';
    summary.textContent = `API Test Coverage: ${report.coverage?.toFixed(2) ?? 0}% (${report.tested ?? 0}/${report.total ?? 0})`;
    document.body.insertBefore(summary, document.body.firstChild);
  }

  function annotateBlocks() {
    const blocks = document.querySelectorAll('.opblock');
    blocks.forEach((block) => {
      const pathEl = block.querySelector('.opblock-summary-path');
      const methodEl = block.querySelector('.opblock-summary-method');
      if (!pathEl || !methodEl) return;
  
      const path = pathEl.textContent.trim();
      const method = methodEl.textContent.trim().toLowerCase();
      const methodCoverage = report.paths?.[path]?.[method];
      if (!methodCoverage) return;
  
      // ======= METHOD-LEVEL BADGE =======
      if (!block.querySelector('.coverage-badge')) {
        const badge = document.createElement('span');
        badge.classList.add('coverage-badge');
  
        let label = '';
        let color = 'gray';
  
        if (methodCoverage.status === 'full') {
          label = '🟢 Covered';
          color = 'hsl(141, 53%, 53%)';
        } else if (methodCoverage.status === 'partial') {
          label = `🟠 Partial (${methodCoverage.percentage}%)`;
          color = 'orange';
        } else {
          label = '❌ Not Covered';
          color = 'hsl(348, 100%, 61%)';
        }
  
        badge.textContent = label;
        badge.style.marginLeft = '8px';
        badge.style.fontSize = '0.75rem';
        badge.style.fontWeight = 'bold';
        badge.style.color = color;
        badge.title = `
  Expected: ${methodCoverage.expectedResponses.join(', ')}
  Seen: ${methodCoverage.seenResponses.join(', ')}
  Unexpected: ${methodCoverage.unexpectedResponses?.join(', ') || 'None'}`.trim();
  
        pathEl.parentNode.appendChild(badge);
      }
  
      // ======= RESPONSE-LEVEL BADGES =======
      const responseRows = block.querySelectorAll('.responses-wrapper .response');
      responseRows.forEach((row) => {
        const codeEl = row.querySelector('.response-col_status');
        if (!codeEl) return;
      
        const statusCode = codeEl.textContent.trim();
        if (row.querySelector('.response-coverage-badge')) return;
      
        const badge = document.createElement('div');
        badge.classList.add('response-coverage-badge');
        badge.style.fontSize = '0.75rem';
        badge.style.fontWeight = 'bold';
        badge.style.marginTop = '4px';
      
        if (methodCoverage.seenResponses?.includes(Number(statusCode))) {
          badge.textContent = '🟢 Covered';
          badge.style.color = 'hsl(141, 53%, 53%)';
        } else {
          badge.textContent = '❌ Not Covered';
          badge.style.color = 'hsl(348, 100%, 61%)';
        }
      
        // Insert right after the status code element
        // codeEl.parentNode?.insertBefore(badge, codeEl.nextSibling);
        codeEl.appendChild(badge);
      });
  
      // ======= UNDOCUMENTED RESPONSES =======
      if (methodCoverage.unexpectedResponses?.length && !block.querySelector('.undocumented-response-warning')) {
        const undocumentedContainer = document.createElement('div');
        undocumentedContainer.classList.add('undocumented-response-warning');
        undocumentedContainer.style.marginTop = '10px';
        undocumentedContainer.style.fontSize = '0.8rem';
        undocumentedContainer.style.color = 'red';
        undocumentedContainer.style.fontWeight = 'bold';
        undocumentedContainer.textContent =
          '❗ Undocumented responses seen: ' + methodCoverage.unexpectedResponses.join(', ');
  
        const wrapper = block.querySelector('.responses-wrapper');
        if (wrapper) {
          wrapper.appendChild(undocumentedContainer);
        }
      }
    });
  }

  // Observe for DOM changes (e.g. when expanding endpoints)
  const observer = new MutationObserver(() => {
    injectCoverageSummary(report);
    annotateBlocks();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  injectCoverageSummary(report);
  annotateBlocks(); // Initial run
}

function addCss(fileName) {

  var head = document.head;
  var link = document.createElement("link");

  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = fileName;

  head.appendChild(link);
}

function addMetaTag() {
  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

function addThemeFooter() {
  const spacer = document.createElement('DIV');
  const footer = document.createElement("FOOTER");
  
  spacer.classList.add('kb-flex-spacer');

  footer.innerHTML = `
<div class="created-by">
  <a href="https://github.com/kibibit/announce-it" target="_blank">Theme</a> created by 
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
  document.body.appendChild(spacer);
  document.body.appendChild(footer);
  
  window.kibibitLogogTimer = setInterval(() => {
  footer.querySelector('#footer-animated-logo').classList.toggle("full-logo");
}, 5000);
}

// inject fonts used in theme
addCss('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Righteous&family=Bungee+Hairline&display=swap');
addCss('https://cdn.jsdelivr.net/npm/hack-font@3.3.0/build/web/hack.css')
addCss('https://kibibit.io/kibibit-assets/swagger/swagger.css');
addCss('https://kibibit.io/kibibit-logo/kb-logo.css');
addMetaTag();

window.addEventListener('DOMContentLoaded', (event) => {
  addThemeFooter();
  annotateSwaggerWithCoverage();
});

