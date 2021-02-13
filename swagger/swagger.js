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
  const footer = document.createElement("FOOTER");

  footer.innerHTML = `
<div class="created-by">
  Theme created by 
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
</div>
<div class="contact-email><a href="mailto:thatkookooguy@kibibit.io">thatkookooguy@kibibit.io</a></div>
`;
  document.body.appendChild(footer);
  
  window.kibibitLogogTimer = setInterval(() => {
  footer.querySelector('#footer-animated-logo').classList.toggle("full-logo");
}, 5000);
}

// inject fonts used in theme
addCss('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Righteous&family=Bungee+Hairline&display=swap');
addCss('https://kibibit.io/kibibit-assets/swagger/swagger.css');
addCss('https://kibibit.io/kibibit-logo/kb-logo.css');
addMetaTag();

window.addEventListener('DOMContentLoaded', (event) => {
  addThemeFooter();
});

