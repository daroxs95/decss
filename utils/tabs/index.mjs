const allTabButtons = document.querySelectorAll(".tab-button");

function openTab(tab) {
  const tabButtons = tab.parentNode.querySelectorAll(".tab-button");
  tabButtons.forEach((button) => {
    button.classList.remove("active");
    if (button === tab) {
      button.classList.add("active");
    }
  });

  const tabContents =
    tab.parentNode.parentNode.querySelectorAll(".tab-content");

  tabContents.forEach((content) => {
    content.classList.remove("active");
    if (content.id === tab.dataset.tab) {
      content.classList.add("active");
    }
  });
}

allTabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openTab(button);
  });
});
