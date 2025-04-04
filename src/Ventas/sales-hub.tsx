"use client"
import React, { ReactNode } from 'react';
import { 
  Plus,
  ShoppingBag,
  Receipt,
  Clock,
  ShoppingCart,

  Sparkles,
  Percent,
  ArrowRight,

  CreditCard,

} from 'lucide-react';
import { 
 
  ResponsiveContainer,
  LineChart,
  Line,

} from 'recharts';
import SmartFeatures from './smart-features';
import DigitalServices from './Servicios Digitales';
import CategoryChart from './chart_Ventas-por-Categoría';
import SalesChart from './chart-Horas Pico';

// Definir interfaces para los props
interface CardProps {
  children: ReactNode;
  highlight?: boolean;
  noPadding?: boolean;
}

const SalesHub = () => {
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    accent: '#F97316',
    success: '#10B981',
    error: '#EF4444'
  };

  // Corregido: Añadidos tipos para los props
  const Card = ({ children, highlight = false, noPadding = false }: CardProps) => (
    <div 
      className={`rounded-xl overflow-hidden ${noPadding ? '' : 'p-4'}`}
      style={{ 
        backgroundColor: theme.card,
        border: `1px solid ${highlight ? theme.primary : theme.border}`,
        ...(highlight ? {
          boxShadow: `0 4px 20px ${theme.primary}20`
        } : {})
      }}
    >
      {children}
    </div>
  );

  const quickStats = [
    {
      icon: ShoppingCart,
      label: 'Ventas Hoy',
      value: '$458K',
      trend: '+12%',
      color: '#10B981',
      sparkData: [420, 380, 450, 420, 470, 440, 458]
    },
    {
      icon: Receipt,
      label: 'Transacciones',
      value: '24',
      trend: '↑ 8',
      color: '#6366F1',
      sparkData: [18, 16, 20, 19, 22, 21, 24]
    },
    {
      icon: Clock,
      label: 'Promedio',
      value: '$19K',
      trend: '+5%',
      color: '#F97316',
      sparkData: [17, 16, 18, 17, 19, 18, 19]
    }
  ];

  const mainActions = [
    {
      id: 'quick-sale',
      icon: ShoppingCart,
      title: 'Venta Rápida',
      description: 'Crear nueva venta',
      badge: 'Rápido'
    },
    {
      id: 'cart',
      icon: ShoppingBag,
      title: 'Carrito',
      description: 'Ver carrito actual',
      badge: '3 items'
    },
    {
      id: 'checkout',
      icon: CreditCard,
      title: 'Cobrar',
      description: 'Procesar pago',
      badge: 'Multiple pago'
    },
    {
      id: 'history',
      icon: Clock,
      title: 'Historial',
      description: 'Ventas recientes',
      badge: 'Hoy: 24'
    }
  ];

  const smartFeatures = [
    { 
      id: 'smart-suggestions',
      icon: Sparkles,
      title: 'Sugerencias Smart',
      description: 'Recomendaciones personalizadas para tus clientes',
      color: theme.primary,
      badge: 'Nuevo',
      relatedAction: 'Venta Rápida'
    },
    { 
      id: 'auto-discounts',
      icon: Percent,
      title: 'Descuentos Automáticos',
      description: 'Optimización inteligente de precios y descuentos',
      color: theme.success,
      badge: '3 activos',
      relatedAction: 'Ver descuentos'
    },
    { 
      id: 'related-products',
      icon: ShoppingCart,
      title: 'Productos Relacionados',
      description: 'Aumenta tus ventas con sugerencias inteligentes',
      color: theme.accent,
      badge: 'IA',
      relatedAction: 'Ver productos'
    }
  ];



  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
    
      <div className="p-4 space-y-4 pb-20">
        {/* Sync Status */}
        <div className="px-4 py-2 -mx-4 flex items-center justify-between border-b"
          style={{ borderColor: theme.border, backgroundColor: `${theme.success}10` }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-current" style={{ color: theme.success }} />
            <span className="text-sm" style={{ color: theme.success }}>
              Ventas sincronizadas
            </span>
          </div>
          <span className="text-sm" style={{ color: theme.textSecondary }}>
            Última sync: 5m
          </span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, index) => (
            <Card key={`stat-${index}`}>
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start ">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                       style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: stat.color }}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-2" style={{ color: theme.text }}>
                  {stat.value}
                </p>
                <p className="text-base mb-4" style={{ color: theme.textSecondary }}>
                  {stat.label}
                </p>
                <div className="h-10 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.sparkData.map((value, i) => ({ value, index: i }))}>
                      <Line 
                        type="monotone" 
                        dataKey="value"
                        stroke={stat.color}
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Acciones Rápidas */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-lg font-medium" style={{ color: theme.text }}>
              Acciones Rápidas
            </h2>
            <span className="text-sm" style={{ color: theme.textSecondary }}>
              Ver todas
            </span>
          </div>
          {mainActions.map(action => (
            <button 
              key={action.id}
              className="w-full p-4 rounded-xl flex items-center gap-4 
                       transition-all duration-200 active:scale-[0.98] hover:bg-opacity-95"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <action.icon className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
              
              <div className="flex-1 text-left">
                <p className="font-medium" style={{ color: theme.text }}>
                  {action.title}
                </p>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {action.description}
                </p>
              </div>

              {action.badge && (
                <span 
                  className="px-2 py-0.5 text-xs rounded-full"
                  style={{ 
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary
                  }}
                >
                  {action.badge}
                </span>
              )}
              
              <ArrowRight className="w-5 h-5" style={{ color: theme.textSecondary }} />
            </button>
          ))}
        </div>

        {/* Smart Features */}
        <Card noPadding={true}>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium" style={{ color: theme.text }}>
                  Smart Features
                </h2>
                <div 
                  className="px-2 py-0.5 text-xs rounded-full flex items-center gap-1"
                  style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                >
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" 
                    style={{ backgroundColor: 'currentColor' }} />
                  AI Activo
                </div>
              </div>
              <Sparkles className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
          </div>

          <div className="space-y-2">
            {smartFeatures.map((feature) => (
              <div key={feature.id} className="px-4 pb-2">
                <button 
                  className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 
                           hover:bg-opacity-95 hover:scale-[1.02] active:scale-[0.99]"
                  style={{ backgroundColor: `${theme.primary}08` }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                    <div 
                      className="absolute inset-0 rounded-xl animate-pulse"
                      style={{ 
                        backgroundColor: feature.color,
                        opacity: 0.2
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-medium" style={{ color: theme.text }}>
                        {feature.title}
                      </p>
                      {feature.badge && (
                        <span 
                          className="px-1.5 py-0.5 text-xs rounded-full"
                          style={{ backgroundColor: `${feature.color}15`, color: feature.color }}
                        >
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: theme.textSecondary }}>
                      {feature.description}
                    </p>
                    <span 
                      className="text-xs mt-2 inline-block"
                      style={{ color: feature.color }}
                    >
                      {feature.relatedAction} →
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </Card>
        <SmartFeatures/>
        <DigitalServices/>
        <CategoryChart/>
        <SalesChart/>



       
      </div>
    </div>
  );
};

export default SalesHub;