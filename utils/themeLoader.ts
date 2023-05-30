import { DEFAULT_COLOR_THEME } from "../config";

type Theme = "dark" | "light";

export function getColorTheme(): Theme {
  //local storage is used to override OS theme settings
  const theme = localStorage.getItem("theme") as Theme;
  if (theme) {
    return theme;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //OS theme setting detected as dark
    return "dark";
  }

  return DEFAULT_COLOR_THEME;
}

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
export function setColorTheme(theme: Theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
