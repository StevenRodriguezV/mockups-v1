"use client"
import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  MessageCircle, 
  Bell,
  ShoppingCart
} from 'lucide-react';

const VendlyHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartItems] = useState(2);

  const theme = {
    bg: isDarkMode ? '#161626' : '#F8FAFC',
    card: isDarkMode ? '#1E1E2E' : '#FFFFFF',
    primary: '#6366F1',
    text: isDarkMode ? '#F8F9FA' : '#1A1A2E',
    textSecondary: isDarkMode ? '#94A3B8' : '#64748B',
    border: isDarkMode ? '#2D2D3D' : '#E2E8F0',
    whatsapp: '#25D366',
    success: '#10B981'
  };

  return (
    <div className="sticky top-0 z-10 border-b" 
      style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
      <div className="px-4 py-3">
        {/* Top Row: Logo + Actions */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold" 
              style={{ color: theme.primary }}>
              vendly
            </span>
            <span className="px-1.5 py-0.5 text-xs rounded-full border" 
              style={{ borderColor: theme.success, color: theme.success }}>
              PRO
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-opacity-80"
              style={{ backgroundColor: theme.card }}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" style={{ color: theme.textSecondary }} />
              ) : (
                <Moon className="w-5 h-5" style={{ color: theme.textSecondary }} />
              )}
            </button>

            {/* WhatsApp Button */}
            <button 
              className="p-2 rounded-lg relative transition-all duration-200 hover:bg-opacity-80" 
              style={{ backgroundColor: theme.card }}
            >
              <MessageCircle className="w-5 h-5" style={{ color: theme.whatsapp }} />
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white animate-pulse">
                3
              </span>
            </button>

            {/* Notifications Button */}
            <button 
              className="p-2 rounded-lg relative transition-all duration-200 hover:bg-opacity-80" 
              style={{ backgroundColor: theme.card }}
            >
              <Bell className="w-5 h-5" style={{ color: theme.textSecondary }} />
              <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white animate-pulse">
                2
              </span>
            </button>

            {/* Shopping Cart Button */}
            <button 
              className="p-2 rounded-lg relative transition-all duration-200 hover:bg-opacity-80" 
              style={{ backgroundColor: theme.card }}
            >
              <ShoppingCart 
                className="w-5 h-5" 
                style={{ 
                  color: theme.primary,
                  strokeWidth: 2 
                }} 
              />
              {cartItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-xs rounded-full bg-red-500 text-white transform transition-transform duration-200 hover:scale-110"
                >
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Row: Welcome Text */}
        <div className="flex items-center gap-3 mt-3">
          <p className="text-lg" style={{ color: theme.textSecondary }}>
            ¡Hola, Juan!
          </p>
          <div 
            className="px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-opacity-80"
            style={{ backgroundColor: theme.card, color: theme.text }}
          >
            Mi Tienda
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendlyHeader;