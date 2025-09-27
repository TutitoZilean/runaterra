// Función para filtrar elementos basado en la facción
export function filterByFaction(faction, jsonData) {
  // Ocultar todos los elementos primero
  const allElements = document.querySelectorAll('[data-faction]');
  allElements.forEach(element => {
    element.style.display = 'none';
  });
  
  // Mostrar solo los que coinciden con la facción
  const matchingElements = document.querySelectorAll(`[data-faction="${faction}"]`);
  matchingElements.forEach(element => {
    element.style.display = 'block';
  });
  
  // También puedes filtrar el JSON
  const filteredData = jsonData.filter(item => item.faction === faction);
  return filteredData;
}

// Función para mostrar todos los elementos
export function showAllElements() {
  const allElements = document.querySelectorAll('[data-faction]');
  allElements.forEach(element => {
    element.style.display = 'block';
  });
}

// Función para buscar por nombre
export function filterByName(searchTerm, jsonData) {
  const filteredData = jsonData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Ocultar todos primero
  const allElements = document.querySelectorAll('[data-character]');
  allElements.forEach(element => {
    element.style.display = 'none';
  });
  
  // Mostrar coincidencias
  filteredData.forEach(item => {
    const element = document.querySelector(`[data-character="${item.name}"]`);
    if (element) {
      element.style.display = 'block';
    }
  });
  
  return filteredData;
}