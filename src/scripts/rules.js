// Función para togglear solo la visibilidad (mantiene el espacio)
export function toggleTextVisibility() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  
  if (!paragraphContainer) {
    console.error('No se encontró el elemento con clase "paragraph-container"');
    return;
  }
  
  // Alternar solo la visibilidad (mantiene display: block)
  if (paragraphContainer.style.visibility === 'hidden' || paragraphContainer.style.visibility === '') {
    paragraphContainer.style.visibility = 'visible';
    paragraphContainer.style.opacity = '1'; // Opcional: para transiciones suaves
  } else {
    paragraphContainer.style.visibility = 'hidden';
    paragraphContainer.style.opacity = '0'; // Opcional: para transiciones suaves
  }
}

// Versión con transición CSS suave
export function toggleTextVisibilityWithTransition() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  
  if (!paragraphContainer) {
    console.error('No se encontró el elemento con clase "paragraph-container"');
    return;
  }
  
  // Agregar transición suave (opcional)
  paragraphContainer.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
  
  if (paragraphContainer.style.visibility === 'hidden' || paragraphContainer.style.visibility === '') {
    paragraphContainer.style.visibility = 'visible';
    paragraphContainer.style.opacity = '1';
  } else {
    paragraphContainer.style.visibility = 'hidden';
    paragraphContainer.style.opacity = '0';
  }
}