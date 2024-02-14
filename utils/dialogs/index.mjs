const modals = document.querySelectorAll("dialog");

modals.forEach((m) => {
  if (!m.id) return;
  const openModalButtons = document.querySelectorAll(
    `[data-modal-open="${m.id}"]`
  );
  const closeModalButtons = document.querySelectorAll(
    `[data-modal-close="${m.id}"]`
  );
  openModalButtons.forEach((op) => {
    op.addEventListener("click", () => {
      m.showModal();
    });
  });
  closeModalButtons.forEach((op) => {
    op.addEventListener("click", () => {
      m.close();
    });
  });
});
