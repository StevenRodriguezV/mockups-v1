"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home,
  ShoppingBag,
  Package,
  Users,
  BarChart2
} from 'lucide-react';

const VendlyFooterNav = () => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('inicio');
  
  // Actualiza el tab activo basado en la ruta actual
  useEffect(() => {
    if (pathname === '/home') setActiveTab('inicio');
    else if (pathname === '/ventas') setActiveTab('ventas');
    else if (pathname === '/inventario') setActiveTab('inventario');
    else if (pathname === '/clientes') setActiveTab('clientes');
    else if (pathname === '/negocio') setActiveTab('negocio');
  }, [pathname]);

  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    textSecondary: '#64748B',
    border: '#E2E8F0'
  };

  const navigationItems = [
    { id: 'inicio', icon: Home, label: 'Inicio', route: "/home" },
    { id: 'ventas', icon: ShoppingBag, label: 'Ventas', route: "/ventas" },
    { id: 'inventario', icon: Package, label: 'Inventario', route: "/inventario" },
    { id: 'clientes', icon: Users, label: 'Clientes', route: "/clientes"},
    { id: 'negocio', icon: BarChart2, label: 'Negocio', route: "/negocio" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t" 
      style={{ backgroundColor: theme.card, borderColor: theme.border }}>
      <div className="flex justify-between max-w-lg mx-auto">
        {navigationItems.map(({ id, icon: Icon, label, route }) => {
          const isActive = activeTab === id;
          return (
            <Link
              key={id}
              href={route}
              className="flex-1 flex flex-col items-center py-2 px-2"
              onClick={() => setActiveTab(id)}
              style={{ 
                backgroundColor: isActive ? `${theme.primary}15` : 'transparent',
                color: isActive ? theme.primary : theme.textSecondary,
                transition: 'all 0.2s ease',
                textDecoration: 'none'
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
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VendlyFooterNav;