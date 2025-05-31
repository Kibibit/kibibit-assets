window.addEventListener("load", function () {
  const bar = document.getElementById("userbar");
  const user = bar.getAttribute("username") || "Guest";
  const initial = encodeURIComponent(user.charAt(0));
  const avatar = "https://ui-avatars.com/api/?name=" + initial + "&background=4A36AC&color=ffffff&rounded=true&size=32";

  document.getElementById("username").textContent = user;
  const avatarElement = document.getElementById("avatar");
  avatarElement.onload = () => { avatarElement.style.opacity = 1; };
  avatarElement.src = avatar;

  document.title = "kb-tts";
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", "kb-tts");

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", "Kibibit's kb-tts: A privacy-first voice generation tool.");

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute("content", "https://kibibit.io/kibibit-assets/Favicons/f5-tts-favicon/android-chrome-512x512.png");
});
