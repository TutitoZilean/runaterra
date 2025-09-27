// Función con animación suave que termina en display: none
export function toggleTextVisibility() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  
  if (!paragraphContainer) {
    console.error('No se encontró el elemento con clase "paragraph-container"');
    return;
  }
  
  if (paragraphContainer.style.display === 'none' || paragraphContainer.style.display === '') {
    // MOSTRAR: Animación suave
    paragraphContainer.style.display = 'flex'; // Usa flex para mantener tu estilo
    paragraphContainer.style.visibility = 'visible';
    
    // Timeout muy corto para que aplique el display antes de la animación
    setTimeout(() => {
      paragraphContainer.style.opacity = '1';
    }, 10); // Solo 10ms, no 400ms
    
  } else {
    // OCULTAR: Primero animación, luego display: none
    paragraphContainer.style.opacity = '0';
    paragraphContainer.style.visibility = 'hidden';
    
    // Esperar a que termine la animación para aplicar display: none
    setTimeout(() => {
      paragraphContainer.style.display = 'none';
    }, 2000); // MISMO tiempo que la transición CSS (2 segundos)
  }
}

// Función para mostrar con animación
export function showText() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  if (paragraphContainer) {
    paragraphContainer.style.display = 'flex';
    paragraphContainer.style.visibility = 'visible';
    
    setTimeout(() => {
      paragraphContainer.style.opacity = '1';
    }, 10);
  }
}

// Función para ocultar con animación
export function hideText() {
  const paragraphContainer = document.querySelector('.paragraph-container');
  if (paragraphContainer) {
    paragraphContainer.style.opacity = '0';
    paragraphContainer.style.visibility = 'hidden';
    
    setTimeout(() => {
      paragraphContainer.style.display = 'none';
    }, 2000); // 2 segundos para coincidir con la transición
  }
}