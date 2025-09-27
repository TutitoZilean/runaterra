// Función con animación suave solo con visibility
export function toggleTextVisibility() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  
  if (!paragraphContainer) {
    console.error('No se encontró el elemento con clase "paragraph-container"');
    return;
  }
  
  if (paragraphContainer.style.visibility === 'hidden' || paragraphContainer.style.visibility === '') {
    // MOSTRAR: Cambiar a visible con animación
    paragraphContainer.style.visibility = 'visible';
    paragraphContainer.style.opacity = '1';
  } else {
    // OCULTAR: Cambiar a hidden con animación
    paragraphContainer.style.opacity = '0';
    
    // Esperar a que termine la animación para cambiar visibility
    setTimeout(() => {
      paragraphContainer.style.visibility = 'hidden';
    }, 400); // Tiempo de la transición CSS
  }
}

// Función para mostrar con animación
export function showText() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  if (paragraphContainer) {
    paragraphContainer.style.visibility = 'visible';
    paragraphContainer.style.opacity = '1';
  }
}

// Función para ocultar con animación
export function hideText() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  if (paragraphContainer) {
    paragraphContainer.style.opacity = '0';
    
    setTimeout(() => {
      paragraphContainer.style.visibility = 'hidden';
    }, 400);
  }
}