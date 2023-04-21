export const focusContainer = function (id: string) {
  document.getElementById(id)?.classList.add("input-container-focus");
};

export const deFocusContainer = function (id: string) {
  document.getElementById(id)?.classList.remove("input-container-focus");
};
