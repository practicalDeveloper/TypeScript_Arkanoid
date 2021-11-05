export {};

declare global {
  interface String {
    element(): HTMLElement;
  }
}

String.prototype.element = function (): HTMLElement {
  return document.getElementById(String(this));
};
