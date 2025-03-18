"use client"
import React, { useState } from 'react';
import { 
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart2
} from 'lucide-react';

const VendlyFooterNav = () => {
  const [activeTab, setActiveTab] = useState('inicio');
  
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    textSecondary: '#64748B',
    border: '#E2E8F0'
  };

  const navigationItems = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'ventas', icon: ShoppingBag, label: 'Ventas' },
    { id: 'inventario', icon: Package, label: 'Inventario' },
    { id: 'clientes', icon: Users, label: 'Clientes' },
    { id: 'negocio', icon: BarChart2, label: 'Negocio' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t" 
      style={{ backgroundColor: theme.card, borderColor: theme.border }}>
      <div className="flex justify-between max-w-lg mx-auto">
        {navigationItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex-1 flex flex-col items-center py-2 px-2"
              style={{ 
                backgroundColor: isActive ? `${theme.primary}15` : 'transparent',
                color: isActive ? theme.primary : theme.textSecondary,
                transition: 'all 0.2s ease'
              }}
            >
              <Icon 
                className="w-6 h-6 mb-1" 
                style={{ 
                  transition: 'transform 0.2s ease',
                  transform: isActive ? 'scale(1.1)' : 'scale(1)'
                }}
              />
              <span 
                className="text-xs"
                style={{
                  transition: 'opacity 0.2s ease',
                  opacity: isActive ? 1 : 0.7
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default VendlyFooterNav;