function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const body = document.body;
  let isDark = localStorage.getItem("theme") === "dark";

  const applyTheme = () => {
    body.setAttribute("data-theme", isDark ? "dark" : "light");
    const icon = themeToggle.querySelector("i");
    if (icon) icon.className = isDark ? "fas fa-moon" : "fas fa-sun";
  };

  themeToggle.addEventListener("click", () => {
    isDark = !isDark;
    localStorage.setItem("theme", isDark ? "dark" : "light");
    applyTheme();
  });

  applyTheme();
}
initThemeToggle();
