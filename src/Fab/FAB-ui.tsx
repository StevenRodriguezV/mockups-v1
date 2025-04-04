"use client"
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Camera, X, ShoppingBag,
  Smartphone, Clock
} from 'lucide-react';

// Definición de la interfaz para los colores del tema
interface ThemeColors {
  fab: string;
  digital: string;
  physical: string;
  accent: string;
  bg: string;
  text: string;
  textSecondary: string;
  border: string;
}

export default function FinalOptimizedUI(){
  // Estado para controlar si el menú está abierto o cerrado
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // Estado para controlar si el componente está montado (para evitar problemas de hidratación)
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  // Configuración del tema
  const theme: ThemeColors = {
    fab: '#6366F1',        // Primary Indigo
    digital: '#2563EB',    // Digital Blue
    physical: '#0EA5E9',   // Physical Blue
    accent: '#F97316',     // Brand Orange for scan
    bg: '#F8FAFC',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0'
  };

  // Efecto para marcar el componente como montado después de la hidratación
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si el componente no está montado, renderizamos un div vacío para evitar errores de hidratación
  if (!isMounted) {
    return <div className="min-h-screen relative" style={{ backgroundColor: theme.bg }}></div>;
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: theme.bg }}>
      {/* FAB with refined animation */}
      <div className="fixed bottom-6 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95"
          style={{ 
            backgroundColor: theme.fab,
            boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
          }}
          suppressHydrationWarning
        >
          <div 
            className="transition-transform duration-300 ease-in-out"
            style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            {isOpen ? (
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-25">
                <X className="w-7 h-7 text-white" />
              </div>
            ) : (
              <Plus className="w-8 h-8 text-white" />
            )}
          </div>
        </button>
      </div>

      {/* Action Sheet with enhanced animations */}
      <div 
        className="fixed bottom-0 left-0 right-0 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] z-40"
        style={{ 
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="bg-white rounded-t-3xl max-w-lg mx-auto"
          style={{ boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.12)' }}>
          <div className="px-5 py-6 space-y-5">
            {/* Enhanced Search Area */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-12 pr-4 h-12 rounded-xl border bg-gray-50 transition-all duration-200 focus:ring-2 focus:ring-opacity-50"
                  style={{ 
                    borderColor: theme.border,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                  suppressHydrationWarning
                />
              </div>
              {/* Orange Scan Button */}
              <button 
                className="h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:shadow-lg active:scale-95"
                style={{ 
                  backgroundColor: theme.accent,
                  boxShadow: '0 2px 8px rgba(249, 115, 22, 0.25)'
                }}
                suppressHydrationWarning
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Main Actions with refined shadows */}
            <div className="grid grid-cols-2 gap-4">
              {/* Digital Sale */}
              <button 
                className="relative group overflow-hidden rounded-2xl transition-all duration-200 active:scale-95"
                style={{ 
                  backgroundColor: theme.digital,
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
                }}
                suppressHydrationWarning
              >
                <div className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-blue-300 bg-opacity-25">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg">Venta Digital</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>

              {/* Physical Sale */}
              <button 
                className="relative group overflow-hidden rounded-2xl transition-all duration-200 active:scale-95"
                style={{ 
                  backgroundColor: theme.physical,
                  boxShadow: '0 4px 12px rgba(14, 165, 233, 0.2)'
                }}
                suppressHydrationWarning
              >
                <div className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#5bc2f1] bg-opacity-25">
                      <ShoppingBag className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-white font-medium text-lg">Venta Física</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              </button>
            </div>

            {/* Optimized Recent Sales */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: theme.textSecondary }} />
                <span className="text-sm" style={{ color: theme.textSecondary }}>
                  Recientes:
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2].map((sale) => (
                  <button
                    key={sale}
                    className="px-3 py-1.5 rounded-lg transition-all duration-200 text-sm hover:shadow-sm"
                    style={{ 
                      backgroundColor: `${theme.digital}10`,
                      color: theme.digital
                    }}
                    suppressHydrationWarning
                  >
                    #{sale} • $45.000
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Overlay */}
      <div 
        className={`fixed inset-0 transition-all duration-300 z-30 backdrop-blur-sm ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}