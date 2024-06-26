function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  if (systemSettingDark.matches) {
    return "dark";
  }

  return "light";
}

const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

const button = document.getElementById("button");
const buttonImg = document.getElementById("buttonImg");
const githubImg = document.getElementById("githubImg");

function updateTheme(newTheme) {
  // update the img and the aria-label
  const newCta =
    newTheme === "dark" ? "Change to light theme" : "Change to dark theme";
  buttonSrc =
    newTheme === "dark"
      ? "./img/day-and-night-icon-dark.svg"
      : "./img/day-and-night-icon-light.svg";
  buttonImg.setAttribute("src", buttonSrc);
  button.setAttribute("aria-label", newCta);

  githubSrc =
    newTheme === "dark"
      ? "./img/github-mark-white.svg"
      : "./img/github-mark.svg";
  githubImg.setAttribute("src", githubSrc);

  // update theme attribute on HTML to switch theme in CSS
  document.querySelector("html").setAttribute("data-theme", newTheme);

  // update in local storage
  localStorage.setItem("theme", newTheme);

  // update the currentThemeSetting in memory
  currentThemeSetting = newTheme;
}

button.addEventListener("click", () => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  updateTheme(newTheme);
});

window.onload = () => {
  updateTheme(currentThemeSetting);
};
