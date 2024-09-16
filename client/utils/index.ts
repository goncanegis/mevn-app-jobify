export const focusFirstInput = (timeout: number = 100) => {
  setTimeout(() => {
    const input = document.querySelector("input");
    if (input) {
      input.focus();
    }
  }, timeout);
};
