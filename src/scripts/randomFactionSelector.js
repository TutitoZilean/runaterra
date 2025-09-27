let availableFactions = [];
let selectedFactions = [];
let championsData = [];
let isInitialized = false;
let lastSelectedFactions = [];

// DATOS DE EJEMPLO COMPLETOS Y GARANTIZADOS
const FALLBACK_CHAMPIONS_DATA = [
    {"name": "Gangplank", "faction": "Aguas Estancadas"},
    {"name": "Graves", "faction": "aguasestancadas"},
    {"name": "Illaoi", "faction": "Aguas Estancadas"},
    {"name": "Miss Fortune", "faction": "aguasestancadas"},
    {"name": "Nautilus", "faction": "Aguas Estancadas"},
    {"name": "Nilah", "faction": "Aguas Estancadas"},
    {"name": "Pyke", "faction": "aguasestancadas"},
    {"name": "Twisted Fate", "faction": "aguasestancadas"},
    
    {"name": "Corki", "faction": "Ciudad de Bandle"},
    {"name": "Lulu", "faction": "Ciudad de Bandle"},
    {"name": "Rumble", "faction": "Ciudad de Bandle"},
    {"name": "Teemo", "faction": "ciudaddebandle"},
    {"name": "Tristana", "faction": "ciudaddebandle"},
    {"name": "Veigar", "faction": "Ciudad de Bandle"},
    {"name": "Yuumi", "faction": "Ciudad de Bandle"},
    
    {"name": "Fiora", "faction": "Demacia"},
    {"name": "Galio", "faction": "Demacia"},
    {"name": "Garen", "faction": "demacia"},
    {"name": "Jarvan IV", "faction": "Demacia"},
    {"name": "Kayle", "faction": "Demacia"},
    {"name": "Lux", "faction": "demacia"},
    {"name": "Morgana", "faction": "Demacia"},
    {"name": "Poppy", "faction": "Demacia"},
    {"name": "Quinn", "faction": "Demacia"},
    {"name": "Shyvana", "faction": "Demacia"},
    {"name": "Sona", "faction": "Demacia"},
    {"name": "Sylas", "faction": "Demacia"},
    {"name": "Vayne", "faction": "Demacia"},
    {"name": "Xin Zhao", "faction": "demacia"},
    
    {"name": "Bel'Veth", "faction": "El Vacío"},
    {"name": "Cho'Gath", "faction": "elvacio"},
    {"name": "Kai'Sa", "faction": "elvacio"},
    {"name": "Kassadin", "faction": "elvacio"},
    {"name": "Kha'Zix", "faction": "El Vacío"},
    {"name": "Kog'Maw", "faction": "El Vacío"},
    {"name": "Malzahar", "faction": "El Vacío"},
    {"name": "Rek'Sai", "faction": "El Vacío"},
    {"name": "Vel'Koz", "faction": "El Vacío"},
    
    {"name": "Anivia", "faction": "Freljord"},
    {"name": "Ashe", "faction": "Freljord"},
    {"name": "Aurora", "faction": "Freljord"},
    {"name": "Braum", "faction": "Freljord"},
    {"name": "Gnar", "faction": "Freljord"},
    {"name": "Gragas", "faction": "Freljord"},
    {"name": "Lissandra", "faction": "Freljord"},
    {"name": "Nunu y Willump", "faction": "Freljord"},
    {"name": "Olaf", "faction": "Freljord"},
    {"name": "Ornn", "faction": "Freljord"},
    {"name": "Sejuani", "faction": "Freljord"},
    {"name": "Trundle", "faction": "Freljord"},
    {"name": "Tryndamere", "faction": "Freljord"},
    {"name": "Udyr", "faction": "Freljord"},
    {"name": "Volibear", "faction": "Freljord"},
    
    {"name": "Elise", "faction": "Islas de la sombra"},
    {"name": "Gwen", "faction": "Islas de la sombra"},
    {"name": "Hecarim", "faction": "islasdelasombra"},
    {"name": "Kalista", "faction": "Islas de la sombra"},
    {"name": "Karthus", "faction": "islasdelasombra"},
    {"name": "Maokai", "faction": "Islas de la sombra"},
    {"name": "Thresh", "faction": "islasdelasombra"},
    {"name": "Vex", "faction": "Islas de la sombra"},
    {"name": "Viego", "faction": "Islas de la sombra"},
    {"name": "Yorick", "faction": "Islas de la sombra"},
    
    {"name": "Malphite", "faction": "Ixtal"},
    {"name": "Milio", "faction": "Ixtal"},
    {"name": "Neeko", "faction": "ixtal"},
    {"name": "Nidalee", "faction": "Ixtal"},
    {"name": "Qiyana", "faction": "ixtal"},
    {"name": "Rengar", "faction": "Ixtal"},
    {"name": "Skarner", "faction": "Ixtal"},
    {"name": "Zyra", "faction": "ixtal"},
    
    {"name": "Yasuo", "faction": "jonia"},
    {"name": "Ahri", "faction": "jonia"},
    {"name": "Irelia", "faction": "jonia"},
    {"name": "Zed", "faction": "jonia"},
    
    {"name": "Darius", "faction": "noxus"},
    {"name": "Katarina", "faction": "noxus"},
    {"name": "Swain", "faction": "noxus"},
    {"name": "Draven", "faction": "noxus"},
    
    {"name": "Caitlyn", "faction": "Piltover"},
    {"name": "Camille", "faction": "Piltover"},
    {"name": "Ezreal", "faction": "Piltover"},
    {"name": "Heimerdinger", "faction": "Piltover"},
    {"name": "Jayce", "faction": "piltover"},
    {"name": "Orianna", "faction": "Piltover"},
    {"name": "Seraphine", "faction": "Piltover"},
    {"name": "Vi", "faction": "piltover"},
    
    {"name": "Ryze", "faction": "runaterra"},
    {"name": "Brand", "faction": "runaterra"},
    {"name": "Aatrox", "faction": "runaterra"},
    
    {"name": "Azir", "faction": "shurima"},
    {"name": "Renekton", "faction": "shurima"},
    {"name": "Nasus", "faction": "shurima"},
    
    {"name": "Leona", "faction": "targon"},
    {"name": "Diana", "faction": "targon"},
    {"name": "Pantheon", "faction": "targon"},
    
    {"name": "Jinx", "faction": "zaun"},
    {"name": "Ekko", "faction": "zaun"},
    {"name": "Warwick", "faction": "zaun"}
];

// INICIALIZACIÓN GARANTIZADA
function guaranteeChampionsData() {
    console.log('🛡️ Garantizando datos de campeones...');
    
    // Si championsData está vacío, usar datos de ejemplo
    if (!championsData || championsData.length === 0) {
        console.log('📦 Usando datos de ejemplo garantizados');
        championsData = [...FALLBACK_CHAMPIONS_DATA];
    }
    
    // Verificar que los datos tengan la estructura correcta
    championsData = championsData.filter(champ => 
        champ && champ.name && champ.faction
    );
    
    console.log('✅ Datos garantizados:', championsData.length, 'campeones válidos');
    return championsData;
}

// Cargar datos desde JSON - VERSIÓN SIMPLIFICADA
export async function loadChampionsData() {
    try {
        console.log('🌐 Intentando cargar datos de campeones...');
        
        const response = await fetch('/data/champions.json');
        
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                championsData = data;
                console.log('✅ Datos JSON cargados:', championsData.length, 'campeones');
                return;
            }
        }
        
        throw new Error('JSON vacío o inválido');
        
    } catch (error) {
        console.warn('❌ Error cargando JSON:', error.message);
        console.log('🔄 Usando datos de ejemplo...');
    }
    
    // Garantizar que siempre hay datos
    guaranteeChampionsData();
}

// INICIALIZACIÓN DE FACCIONES - VERSIÓN ROBUSTA
function initializeFactions() {
    console.log('🔄 Inicializando facciones...');
    
    // Garantizar datos primero
    guaranteeChampionsData();
    
    // Extraer facciones únicas
    const uniqueFactions = [...new Set(championsData.map(champ => champ.faction))];
    availableFactions = uniqueFactions.filter(faction => 
        faction && typeof faction === 'string' && faction.trim() !== ''
    );
    
    if (availableFactions.length === 0) {
        console.error('🚨 CRÍTICO: No se pudieron extraer facciones de los datos');
        console.log('📊 Datos disponibles:', championsData);
        
        // Forzar facciones manualmente como último recurso
        availableFactions = [
            'aguasestancadas', 'ciudaddebandle', 'demacia', 'elvacio', 
            'freljord', 'islasdelasombra', 'ixtal', 'jonia', 
            'noxus', 'piltover', 'runaterra', 'shurima', 'targon', 'zaun'
        ];
        console.log('🆘 Facciones forzadas manualmente');
    }
    
    console.log('✅ Facciones inicializadas:', availableFactions);
    console.log('✅ Total de facciones disponibles:', availableFactions.length);
    
    isInitialized = true;
    return availableFactions;
}

// VERIFICACIÓN DE INICIALIZACIÓN - VERSIÓN MÁS ROBUSTA
function checkInitialization() {
    console.log('🔍 Verificando inicialización...');
    
    if (!isInitialized || availableFactions.length === 0) {
        console.warn('⚠️ Sistema no inicializado, forzando inicialización...');
        initializeFactions();
    }
    
    // Verificación final
    if (availableFactions.length === 0) {
        console.error('🚨 ERROR CRÍTICO: No hay facciones disponibles después de la inicialización');
        throw new Error('No se pudieron inicializar las facciones');
    }
    
    console.log('✅ Sistema verificado correctamente');
}

// SELECCIÓN ALEATORIA - VERSIÓN CON MANEJO DE ERRORES MEJORADO
export function selectRandomFactions() {
    try {
        console.log('🎲 Iniciando selección aleatoria...');
        
        // Verificación robusta
        checkInitialization();
        
        console.log('🔍 Facciones disponibles:', availableFactions);
        console.log('📝 Última selección:', lastSelectedFactions);
        
        if (availableFactions.length < 2) {
            throw new Error(`Solo hay ${availableFactions.length} facciones disponibles, se necesitan al menos 2`);
        }
        
        // Reiniciar selección anterior
        resetSelection();
        
        // Algoritmo de selección mejorado
        selectedFactions = getRotatingRandomFactions();
        
        // Guardar para la próxima vez
        lastSelectedFactions = [...selectedFactions];
        
        console.log('🎯 Facciones seleccionadas:', selectedFactions);
        
        // Mostrar en la interfaz
        displaySelectedFactions();
        showSequentialChampions();
        
    } catch (error) {
        console.error('🚨 Error en selectRandomFactions:', error);
        showErrorToUser(error.message);
    }
}

// MOSTRAR ERROR AL USUARIO
function showErrorToUser(message) {
    const statusElement = document.querySelector('#selection-status');
    if (statusElement) {
        statusElement.textContent = `Error: ${message}`;
        statusElement.style.color = '#ff4444';
    }
}

// ALGORITMO DE SELECCIÓN MEJORADO
function getRotatingRandomFactions() {
    let factionsPool = [...availableFactions];
    
    // Evitar repetición de la selección anterior
    if (lastSelectedFactions.length > 0) {
        console.log('🔄 Evitando facciones anteriores:', lastSelectedFactions);
        factionsPool = factionsPool.filter(faction => !lastSelectedFactions.includes(faction));
    }
    
    // Si el pool filtrado es muy pequeño, usar todas las disponibles
    if (factionsPool.length < 2) {
        console.warn('⚠️ Pool muy pequeño después de filtrar, usando todas las facciones');
        factionsPool = [...availableFactions];
    }
    
    // Selección aleatoria
    const shuffled = [...factionsPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);
    
    console.log('🔄 Facciones seleccionadas (rotación):', selected);
    return selected;
}

// EL RESTO DE FUNCIONES SE MANTIENEN IGUAL...
function displaySelectedFactions() {
    document.querySelectorAll('.faction-icon').forEach(icon => {
        icon.classList.remove('selected', 'first-selected', 'second-selected');
    });
    
    selectedFactions.forEach((factionId, index) => {
        const icon = document.querySelector(`#${factionId}`);
        if (icon) {
            if (index === 0) {
                icon.classList.add('selected', 'first-selected');
            } else {
                icon.classList.add('selected', 'second-selected');
            }
        }
    });
    
    updateStatusText();
}

function showSequentialChampions() {
    if (selectedFactions.length !== 2) return;
    
    const [firstFaction, secondFaction] = selectedFactions;
    
    hideAllChampions();
    
    setTimeout(() => {
        showFactionChampions(firstFaction);
        
        setTimeout(() => {
            showFactionChampions(secondFaction);
        }, 1500);
    }, 500);
}

function showFactionChampions(factionId) {
    const container = document.querySelector(`#${factionId}-champions`);
    if (!container) {
        console.warn('⚠️ No se encontró el contenedor para:', factionId);
        return;
    }
    
    const factionChampions = championsData.filter(champ => champ.faction === factionId);
    renderChampions(container, factionChampions);
    
    container.style.display = 'block';
    container.style.opacity = '0';
    
    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 10);
}

function renderChampions(container, champions) {
    const championsGrid = container.querySelector('.champions-grid');
    if (!championsGrid) return;
    
    championsGrid.innerHTML = champions.map(champion => `
        <div class="champion-card" data-champion="${champion.name}">
            <span class="champion-name">${champion.name}</span>
        </div>
    `).join('');
}

function hideAllChampions() {
    document.querySelectorAll('.faction-champions').forEach(container => {
        container.style.opacity = '0';
        container.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            container.style.display = 'none';
        }, 300);
    });
}

function updateStatusText() {
    const statusElement = document.querySelector('#selection-status');
    if (!statusElement) return;
    
    if (selectedFactions.length === 2) {
        const firstFaction = getFactionName(selectedFactions[0]);
        const secondFaction = getFactionName(selectedFactions[1]);
        statusElement.textContent = `Facciones seleccionadas: ${firstFaction} y ${secondFaction}`;
        statusElement.style.color = '#c8aa6e';
    } else {
        statusElement.textContent = 'Haz clic en "Seleccionar Facciones" para comenzar';
    }
}

function getFactionName(factionId) {
    const names = {
        'aguasestancadas': 'Aguas Estancadas',
        'ciudaddebandle': 'Ciudad de Bandle',
        'demacia': 'Demacia',
        'elvacio': 'El Vacío',
        'freljord': 'Freljord',
        'islasdelasombra': 'Islas de la Sombra',
        'ixtal': 'Ixtal',
        'jonia': 'Jonia',
        'noxus': 'Noxus',
        'piltover': 'Piltover',
        'runaterra': 'Runaterra',
        'shurima': 'Shurima',
        'targon': 'Targon',
        'zaun': 'Zaun'
    };
    
    return names[factionId] || factionId;
}

export function resetSelection() {
    selectedFactions = [];
    hideAllChampions();
    updateStatusText();
    
    document.querySelectorAll('.faction-icon').forEach(icon => {
        icon.classList.remove('selected', 'first-selected', 'second-selected');
    });
}

export async function initRandomSelector() {
    console.log('🚀 Inicializando selector aleatorio...');
    try {
        await loadChampionsData();
        initializeFactions();
        updateStatusText();
        console.log('✅ Selector inicializado correctamente');
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
    }
}

// FUNCIÓN DE DEBUG
export function debugSystem() {
    console.log('=== DEBUG DEL SISTEMA ===');
    console.log('isInitialized:', isInitialized);
    console.log('championsData length:', championsData.length);
    console.log('availableFactions:', availableFactions);
    console.log('availableFactions length:', availableFactions.length);
    console.log('selectedFactions:', selectedFactions);
    console.log('lastSelectedFactions:', lastSelectedFactions);
    console.log('========================');
}