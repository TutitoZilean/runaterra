// hooks/useRegionViewMode.js
import { useState, useEffect } from 'react';

// Estado global del modo de vista
let globalViewMode = 'full'; // 'full' | 'icons-only'
const listeners = new Set();

export const useRegionViewMode = () => {
    const [viewMode, setViewMode] = useState(globalViewMode);

    useEffect(() => {
        listeners.add(setViewMode);
        
        return () => {
            listeners.delete(setViewMode);
        };
    }, []);

    const setGlobalViewMode = (mode) => {
        globalViewMode = mode;
        listeners.forEach(listener => listener(mode));
    };

    const toggleViewMode = () => {
        const newMode = globalViewMode === 'full' ? 'icons-only' : 'full';
        setGlobalViewMode(newMode);
    };

    return {
        viewMode,
        setViewMode: setGlobalViewMode,
        toggleViewMode
    };
};