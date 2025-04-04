"use client"
import React, { useState, useRef, useEffect } from 'react';
import { 
  Sun, Moon, MessageCircle, Bell, ShoppingCart,
  Search, Camera, Plus, X, Package, Users,
  Clock, ArrowRight, ArrowLeft, Mic, Receipt,
  CreditCard
} from 'lucide-react';

const VendlyHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const searchInputRef = useRef(null);
  const [recentSearches] = useState([
    'Coca Cola 500ml',
    'María González',
    'Factura #1234'
  ]);
  const [searchResults, setSearchResults] = useState([]);

  const theme = {
    bg: isDarkMode ? '#161626' : '#F8FAFC',
    card: isDarkMode ? '#1E1E2E' : '#FFFFFF',
    primary: '#6366F1',
    text: isDarkMode ? '#F8F9FA' : '#1A1A2E',
    textSecondary: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#2D2D3D' : '#E2E8F0',
    whatsapp: '#25D366',
    success: '#10B981',
    accent: '#F97316'
  };

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    let searchTimer;

    if (searchQuery) {
      setSearchResults([]);
      // Schnellere Such-Simulation
      searchTimer = setTimeout(() => {
        setSearchResults([
          {
            id: 1,
            type: 'product',
            icon: Package,
            title: 'Coca Cola 500ml',
            subtitle: '$2.500 • 24 unidades',
            color: 'indigo'
          },
          {
            id: 2,
            type: 'client',
            icon: Users,
            title: 'María González',
            subtitle: 'Cliente Frecuente • 15 compras',
            color: 'emerald'
          },
          {
            id: 3,
            type: 'invoice',
            icon: Receipt,
            title: 'Factura #1234',
            subtitle: '$45.000 • Hace 2 días',
            color: 'amber'
          },
          {
            id: 4,
            type: 'payment',
            icon: CreditCard,
            title: 'Pago #789',
            subtitle: '$120.000 • Efectivo',
            color: 'blue'
          }
        ]);
      }, 400);
    } else {
      setSearchResults([]);
    }

    return () => {
      clearTimeout(searchTimer);
    };
  }, [searchQuery]);

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    setIsListening(false);
  };

  const handleVoiceSearchStart = () => {
    setIsListening(true);
    // Hier würde die Voice Recognition starten
  };

  const handleVoiceSearchEnd = () => {
    setIsListening(false);
    // Hier würde die Voice Recognition stoppen
  };

  const renderSearchResult = (result, index) => (
    <div
      key={result.id}
      className={`transform transition-all duration-500 ease-out${
        searchQuery ? ' translate-y-0 opacity-100' : ' translate-y-4 opacity-0'
      }`}
      style={{ 
        animation: 'slideIn 0.5s ease-out forwards',
        opacity: 0,
        transform: 'translateY(20px)'
      }}
    >
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <button
        className="w-full p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 active:scale-98"
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-${result.color}-50 flex items-center justify-center
            transition-transform duration-300 group-hover:scale-105`}>
            <result.icon className={`w-5 h-5 text-${result.color}-600`} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900 transition-colors duration-300">{result.title}</p>
            <p className="text-sm text-gray-500 transition-colors duration-300">{result.subtitle}</p>
          </div>
          <ArrowRight className={`w-5 h-5 text-${result.color}-400 transition-transform duration-300
            group-hover:translate-x-1`} />
        </div>
      </button>
    </div>
  );

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-20 border-b" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        {/* Top Bar */}
        <div className={`px-4 py-3 transition-all duration-300 ${
          isSearchActive ? 'opacity-50' : ''
        }`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold" style={{ color: theme.primary }}>
                vendly
              </span>
              <span className="px-1.5 py-0.5 text-xs rounded-full border" 
                style={{ borderColor: theme.success, color: theme.success }}>
                PRO
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: theme.card }}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5" style={{ color: theme.textSecondary }} />
                ) : (
                  <Moon className="w-5 h-5" style={{ color: theme.textSecondary }} />
                )}
              </button>
              <button className="p-2 rounded-lg relative">
                <MessageCircle className="w-5 h-5" style={{ color: theme.whatsapp }} />
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white animate-pulse">
                  3
                </span>
              </button>
              <button className="p-2 rounded-lg relative">
                <Bell className="w-5 h-5" style={{ color: theme.textSecondary }} />
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white animate-pulse">
                  2
                </span>
              </button>
              <button className="p-2 rounded-lg relative">
                <ShoppingCart className="w-5 h-5" style={{ color: theme.primary }} />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white">
                    {cartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className={`px-4 transition-all duration-300 ${
          isSearchActive ? 'pt-2 pb-4' : 'py-3 border-t'
        }`} style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              {isSearchActive ? (
                <button
                  onClick={handleSearchClose}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </button>
              ) : (
                <Search 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              )}
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder={isListening ? "Hablando..." : isSearchActive ? "¿Qué estás buscando?" : "Buscar productos, clientes..."}
                className={`w-full transition-all duration-300 ease-out rounded-xl ${
                  isSearchActive 
                    ? 'pl-14 pr-20 py-4 text-lg font-medium' 
                    : 'pl-12 pr-20 py-3 text-base'
                } ${isListening ? 'pr-32' : ''}`}
                style={{ 
                  backgroundColor: isSearchActive ? 'white' : theme.card,
                  color: theme.text,
                  border: `2px solid ${isListening ? 'rgb(239, 68, 68)' : isSearchActive ? theme.primary : theme.border}`,
                  outline: 'none',
                  boxShadow: isListening ? '0 4px 12px rgba(239, 68, 68, 0.15)' : 
                            isSearchActive ? '0 4px 12px rgba(99, 102, 241, 0.15)' : 'none'
                }}
                disabled={isListening}
              />
              {isListening && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-4 bg-red-500 rounded-full animate-pulse" />
                    <div className="w-1.5 h-6 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-4 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-red-500 font-medium">Escuchando...</span>
                </div>
              )}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && !isListening && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 active:scale-95"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
                <button
                  onMouseDown={handleVoiceSearchStart}
                  onMouseUp={handleVoiceSearchEnd}
                  onMouseLeave={handleVoiceSearchEnd}
                  onTouchStart={handleVoiceSearchStart}
                  onTouchEnd={handleVoiceSearchEnd}
                  className={`p-2 rounded-full transition-all duration-300 ease-out ${
                    isListening 
                      ? 'bg-red-100 scale-110 hover:bg-red-200' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Mic className={`w-5 h-5 transition-transform duration-300 ease-out ${
                    isListening ? 'text-red-500 scale-110' : 'text-gray-400'
                  }`} />
                  {isListening && (
                    <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Scan Button - Using original header style */}
            {!isSearchActive && (
              <button 
                className="p-3 rounded-xl transition-all duration-300 hover:opacity-90 active:scale-95" 
                style={{ backgroundColor: theme.accent }}
              >
                <Camera className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

          {!isSearchActive && (
            <button 
              className="w-full mt-3 p-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-98"
              style={{ backgroundColor: theme.primary }}
            >
              <Plus className="w-5 h-5 text-white" />
              <span className="text-lg font-medium text-white">Nueva Venta</span>
            </button>
          )}
        </div>
      </div>

      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-10 transition-all duration-300 ease-out ${
          isSearchActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.3)', 
          backdropFilter: 'blur(8px)',
          transform: isSearchActive ? 'scale(1)' : 'scale(1.1)'
        }}
        onClick={handleSearchClose}
      />

      {/* Search Results Panel */}
      <div 
        className={`fixed left-0 right-0 z-30 transition-all duration-300 ease-out transform ${
          isSearchActive ? 'translate-y-0 top-[88px]' : 'translate-y-4 -top-full opacity-0'
        }`}
        style={{
          height: 'calc(100vh - 88px)',
          background: 'white',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="h-full overflow-y-auto">
          {!searchQuery ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    Búsquedas Recientes
                  </span>
                </div>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-all duration-200">
                  Limpiar
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    onClick={() => setSearchQuery(search)}
                  >
                    <span className="text-gray-600">{search}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {searchQuery && (
                <div className={`transform transition-all duration-300 ease-out ${
                  searchResults.length === 4 ? 'opacity-70' : 'opacity-100'
                }`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`transition-all duration-300 ${
                      searchResults.length === 4 ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100 w-4'
                    }`}>
                      <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      Buscando "{searchQuery}"
                      <span className="text-gray-400 transition-opacity duration-300">
                        {searchResults.length === 4 ? '' : '...'}
                      </span>
                    </div>
                  </div>
                  {searchResults.length === 0 && (
                    <div className="h-32 flex items-center justify-center">
                      <div className="w-8 h-8 border-3 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <div
                    key={result.id}
                    className="opacity-0 translate-y-4"
                    style={{
                      animation: 'slideIn 0.4s ease-out forwards',
                      animationDelay: `${index * 120}ms`
                    }}
                  >
                    <button
                      className="w-full p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 active:scale-98"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-${result.color}-50 flex items-center justify-center
                          transition-transform duration-300`}>
                          <result.icon className={`w-5 h-5 text-${result.color}-600`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-gray-900">{result.title}</p>
                          <p className="text-sm text-gray-500">{result.subtitle}</p>
                        </div>
                        <div className={`w-8 h-8 rounded-lg bg-${result.color}-50 flex items-center justify-center`}>
                          <ArrowRight className={`w-4 h-4 text-${result.color}-600`} />
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
              <style jsx global>{`
                @keyframes slideIn {
                  0% {
                    opacity: 0;
                    transform: translateY(16px);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }

                @keyframes wave {
                  0%, 100% {
                    transform: scaleY(0.5);
                  }
                  50% {
                    transform: scaleY(1.2);
                  }
                }

                @keyframes dot {
                  0%, 100% {
                    opacity: 0.3;
                    transform: translateY(0);
                  }
                  50% {
                    opacity: 1;
                    transform: translateY(-1px);
                  }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendlyHeader;