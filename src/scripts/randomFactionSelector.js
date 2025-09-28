// randomFactionSelector.js

// Variables globales
let availableFactions = [];
let selectedFactions = [];
let championsData = [];
let isInitialized = false;
let lastSelectedFactions = [];

// Callbacks para React
let onFactionsChangeCallback = null;
let onChampionsChangeCallback = null;

// DATOS DE FACCIONES CON NOMBRES FORMATEADOS
const FACTION_NAMES = {
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

// DATOS DE EJEMPLO (simplificado para prueba)
const FALLBACK_CHAMPIONS_DATA = [
    {"name": "Gangplank", "faction": "Aguas Estancadas", "image": "gangplank.webp", "title": "El Corsario"},
    {"name": "Graves", "faction": "aguasestancadas", "image": "graves.webp", "title": "El Forajido"},
    {"name": "Darius", "faction": "noxus", "image": "darius.webp", "title": "La Mano de Noxus"},
    {"name": "Katarina", "faction": "noxus", "image": "katarina.webp", "title": "La Cuchilla Siniestra"},
    {"name": "Ashe", "faction": "freljord", "image": "ashe.webp", "title": "La Arquera de Hielo"},
    {"name": "Tryndamere", "faction": "freljord", "image": "tryndamere.webp", "title": "El Rey Bárbaro"},
    {"name": "Ahri", "faction": "jonia", "image": "ahri.webp", "title": "La Mujer Zorro"},
    {"name": "Yasuo", "faction": "jonia", "image": "yasuo.webp", "title": "El Imperdonable"}
];

// Configurar callbacks para React
export function setCallbacks({ onFactionsChange, onChampionsChange }) {
    onFactionsChangeCallback = onFactionsChange;
    onChampionsChangeCallback = onChampionsChange;
}

// INICIALIZACIÓN GARANTIZADA
function guaranteeChampionsData() {
    if (!championsData || championsData.length === 0) {
        championsData = [...FALLBACK_CHAMPIONS_DATA];
    }
    
    championsData = championsData.filter(champ => 
        champ && champ.name && champ.faction
    );
    
    return championsData;
}

// NORMALIZACIÓN DE FACCIONES
function normalizeFactionId(faction) {
    return faction.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '');
}

// CARGA DE DATOS DESDE JSON - VERSIÓN MEJORADA
export async function loadChampionsData() {
    try {
        console.log('🌐 Cargando datos REALES de campeones...');
        
        // IMPORTANTE: Asegúrate de que la ruta sea correcta
        const response = await fetch('/data/champions.json');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Datos JSON recibidos:', data);
        
        if (Array.isArray(data) && data.length > 0) {
            championsData = data;
            console.log('✅ JSON REAL cargado correctamente:', championsData.length, 'campeones');
            
            // Mostrar estadísticas de las facciones cargadas
            const loadedFactions = [...new Set(data.map(champ => champ.faction))];
            console.log('🎯 Facciones encontradas en JSON:', loadedFactions);
            console.log('📊 Conteo por facción:');
            
            loadedFactions.forEach(faction => {
                const count = data.filter(champ => champ.faction === faction).length;
                console.log(`   ${faction}: ${count} campeones`);
            });
            
            return true;
        } else {
            throw new Error('JSON vacío o no es un array');
        }
        
    } catch (error) {
        console.error('❌ Error cargando JSON real:', error);
        console.log('🔄 Usando datos de fallback...');
        
        // Usar datos de fallback mínimos
        guaranteeChampionsData();
        return false;
    }
}

// INICIALIZACIÓN DE FACCIONES - VERSIÓN QUE USA EL JSON
function initializeFactions() {
    console.log('🔄 Inicializando facciones con datos reales...');
    
    // Asegurar que tenemos datos
    guaranteeChampionsData();
    
    // Obtener facciones ÚNICAS del JSON
    const uniqueFactions = [...new Set(championsData.map(champ => champ.faction))];
    console.log('🎯 Facciones únicas del JSON:', uniqueFactions);
    
    // Normalizar los nombres de facción
    const normalizedFactions = uniqueFactions
        .map(faction => normalizeFactionId(faction))
        .filter(faction => faction && typeof faction === 'string' && faction.trim() !== '');
    
    console.log('🔧 Facciones normalizadas:', normalizedFactions);
    
    // Combinar con TODAS las facciones posibles para tener un pool completo
    const allPossibleFactions = Object.keys(FACTION_NAMES);
    availableFactions = [...new Set([...normalizedFactions, ...allPossibleFactions])];
    
    console.log('✅ Pool final de facciones:', availableFactions);
    console.log('📊 Estadísticas finales:');
    console.log('   - Total de facciones:', availableFactions.length);
    console.log('   - Campeones cargados:', championsData.length);
    
    availableFactions.forEach(factionId => {
        const count = championsData.filter(champ => 
            normalizeFactionId(champ.faction) === factionId
        ).length;
        console.log(`   - ${FACTION_NAMES[factionId] || factionId}: ${count} campeones`);
    });
    
    isInitialized = true;
    return availableFactions;
}

// VERIFICACIÓN DE INICIALIZACIÓN MEJORADA
function checkInitialization() {
    if (!isInitialized || availableFactions.length === 0) {
        console.log('🔄 Forzando inicialización...');
        initializeFactions();
    }
    
    if (availableFactions.length < 2) {
        console.error('🚨 CRÍTICO: No hay suficientes facciones disponibles');
        console.log('📊 Facciones disponibles:', availableFactions);
        throw new Error(`Solo hay ${availableFactions.length} facciones disponibles (se necesitan al menos 2)`);
    }
}

// INICIALIZACIÓN PRINCIPAL
export async function initRandomSelector() {
    try {
        console.log('🚀 Inicializando selector aleatorio...');
        await loadChampionsData();
        initializeFactions();
        console.log('✅ Selector inicializado correctamente');
        return true;
    } catch (error) {
        console.error('❌ Error en inicialización:', error);
        return false;
    }
}

// OBTENER FACCIONES DISPONIBLES FORMATEADAS - VERSIÓN COMPLETA
export function getAvailableFactions() {
    checkInitialization();
    
    return availableFactions.map(factionId => {
        const championCount = championsData.filter(champ => 
            normalizeFactionId(champ.faction) === factionId
        ).length;
        
        return {
            id: factionId,
            name: FACTION_NAMES[factionId] || factionId,
            championCount: championCount,
            hasChampions: championCount > 0
        };
    });
}

// OBTENER FACCIONES SELECCIONADAS FORMATEADAS - VERSIÓN MEJORADA
export function getFormattedSelectedFactions() {
    // Asegurar que no hay duplicados
    const uniqueFactions = [...new Set(selectedFactions)];
    
    return uniqueFactions.map((factionId, index) => ({
        id: factionId,
        name: FACTION_NAMES[factionId] || factionId,
        // Agregar índice único para evitar keys duplicados en React
        uniqueKey: `${factionId}_${index}_${Date.now()}`
    }));
}

// OBTENER CAMPIONES POR FACCION - VERSIÓN MEJORADA
export function getChampionsByFaction(factionId) {
    const normalizedId = normalizeFactionId(factionId);
    const champions = championsData.filter(champ => 
        normalizeFactionId(champ.faction) === normalizedId
    );
    
    console.log(`📋 Campeones para ${factionId}:`, champions.length, 'encontrados');
    return champions;
}

// OBTENER CAMPIONES POR FACCIONES SELECCIONADAS - VERSIÓN MEJORADA
export function getChampionsBySelectedFactions() {
    const result = {};
    
    console.log('🎯 Obteniendo campeones para facciones seleccionadas:', selectedFactions);
    
    selectedFactions.forEach(factionId => {
        const factionName = FACTION_NAMES[factionId] || factionId;
        const champions = getChampionsByFaction(factionId);
        
        result[factionName] = champions;
        console.log(`   ${factionName}: ${champions.length} campeones`);
    });
    
    return result;
}

// ALGORITMO DE SELECCIÓN ALEATORIA MEJORADO
function getRandomFactions() {
    console.log('🔄 Iniciando selección aleatoria...');
    console.log('📊 Facciones disponibles:', availableFactions);
    console.log('📝 Última selección:', lastSelectedFactions);
    
    let factionsPool = [...availableFactions];
    
    // 1. Evitar repetición de la selección anterior
    if (lastSelectedFactions.length > 0) {
        factionsPool = factionsPool.filter(faction => !lastSelectedFactions.includes(faction));
        console.log('🎯 Facciones después de filtrar anteriores:', factionsPool);
    }
    
    // 2. Si el pool filtrado es muy pequeño, usar todas las disponibles
    if (factionsPool.length < 2) {
        console.log('⚠️ Pool pequeño, usando todas las facciones');
        factionsPool = [...availableFactions];
    }
    
    // 3. Selección aleatoria GARANTIZANDO que no se repitan
    const shuffled = [...factionsPool].sort(() => 0.5 - Math.random());
    const selected = [];
    
    // Tomar la primera facción
    if (shuffled.length > 0) {
        selected.push(shuffled[0]);
    }
    
    // Tomar la segunda facción, asegurando que sea diferente
    if (shuffled.length > 1) {
        // Buscar una facción diferente a la primera
        const remainingFactions = shuffled.filter(faction => faction !== selected[0]);
        if (remainingFactions.length > 0) {
            selected.push(remainingFactions[0]);
        } else {
            // Fallback: si no hay facciones diferentes, usar cualquier otra
            const allOtherFactions = availableFactions.filter(faction => faction !== selected[0]);
            if (allOtherFactions.length > 0) {
                selected.push(allOtherFactions[Math.floor(Math.random() * allOtherFactions.length)]);
            }
        }
    }
    
    console.log('✅ Facciones seleccionadas (únicas):', selected);
    return selected;
}

// SELECCIÓN ALEATORIA PRINCIPAL - VERSIÓN MEJORADA
export function selectRandomFactions() {
    try {
        console.log('🎲 Iniciando selección aleatoria...');
        
        checkInitialization();
        
        if (availableFactions.length < 2) {
            throw new Error(`Solo hay ${availableFactions.length} facciones disponibles (se necesitan al menos 2)`);
        }
        
        // Obtener nuevas facciones aleatorias (únicas)
        selectedFactions = getRandomFactions();
        
        // Verificar que las facciones sean únicas
        if (selectedFactions.length === 2 && selectedFactions[0] === selectedFactions[1]) {
            console.error('🚨 ERROR: Se seleccionaron facciones duplicadas:', selectedFactions);
            // Forzar selección de facciones diferentes
            const uniqueFactions = [...new Set(availableFactions)];
            if (uniqueFactions.length >= 2) {
                const shuffled = [...uniqueFactions].sort(() => 0.5 - Math.random());
                selectedFactions = shuffled.slice(0, 2);
                console.log('🔄 Facciones corregidas:', selectedFactions);
            } else {
                throw new Error('No hay suficientes facciones únicas disponibles');
            }
        }
        
        lastSelectedFactions = [...selectedFactions];
        
        console.log('🎯 Facciones finales seleccionadas:', selectedFactions);
        
        // Notificar a React sobre el cambio
        if (onFactionsChangeCallback) {
            onFactionsChangeCallback(getFormattedSelectedFactions());
        }
        
        return getFormattedSelectedFactions();
        
    } catch (error) {
        console.error('🚨 Error en selectRandomFactions:', error);
        throw error;
    }
}

// RESET DE SELECCIÓN
export function resetSelection() {
    selectedFactions = [];
    lastSelectedFactions = [];
    
    // Notificar a React sobre el reset
    if (onFactionsChangeCallback) {
        onFactionsChangeCallback([]);
    }
    
    console.log('🔄 Selección reiniciada');
}

// FUNCIÓN DE DEBUG MEJORADA
export function getSystemStatus() {
    const availableFactionsList = getAvailableFactions();
    
    return {
        isInitialized,
        championsDataLength: championsData.length,
        availableFactions: availableFactionsList,
        selectedFactions: getFormattedSelectedFactions(),
        lastSelectedFactions,
        // Información de debug expandida
        totalFactions: availableFactions.length,
        factionsWithChampions: availableFactionsList.filter(f => f.hasChampions).length,
        factionsWithoutChampions: availableFactionsList.filter(f => !f.hasChampions).length,
        allFactionNames: availableFactionsList.map(f => f.name)
    };
}