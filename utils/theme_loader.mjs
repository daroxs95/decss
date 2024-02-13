export const DEFAULT_COLOR_THEME = "light";

export function getColorTheme() {
  //local storage is used to override OS theme settings
  const theme = localStorage.getItem("theme");
  if (theme) {
    return theme;
  }
  if (window?.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    //OS theme setting detected as dark
    return "dark";
  }

  return DEFAULT_COLOR_THEME;
}

//

/**
 * Function that changes the theme,
 * and sets a localStorage variable to track the theme between page loads
 * @param {('light'|'dark')} theme
 */
export function setColorTheme(theme) {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}
