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
  document.body.appendChild(`
<footer style="
    content: 'Theme created by kibibit opensrc';
    display: block;
    background: #212121;
    color: white;
    padding: 1em;
    font-family: 'Comfortaa', cursive;
">
  <p>Theme created by kibibit opensrc</p>
  <p><a href="mailto:hege@example.com">hege@example.com</a></p>
</footer>
`);
}

// inject fonts used in theme
addCss('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Righteous&family=Bungee+Hairline&display=swap');
addCss('https://kibibit.io/kibibit-logo/kb-logo.css');
addMetaTag();
addThemeFooter();
