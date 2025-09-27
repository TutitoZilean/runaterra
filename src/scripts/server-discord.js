export function initLogoHover() {
  const element = document.getElementById("header-logo");
  
  if (!element) {
    console.warn('Elemento header-logo no encontrado');
    return;
  }

  element.addEventListener("mouseenter", () => {
    element.classList.add("header-logo-altered");
  });

  element.addEventListener("mouseleave", () => {
    element.classList.remove("header-logo-altered");
  });
}

initLogoHover();