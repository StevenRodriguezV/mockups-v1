"use client"
import React, { useState } from 'react';
import { 
  Package,
  Search,
  Plus,
  Home,
  ShoppingBag,
  Users,
  BarChart2,
  ArrowRight,
  LayoutGrid,
  TrendingUp,
  AlertCircle,
  Archive,
  Tags,
  Barcode,
  Upload,
  Clock,
  Sparkles,
  Zap,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import ProductCreationFlow from "./flow/product-creation-flow1"; // Ajusta la ruta según corresponda
import OptimizedFilterInventory from './inventory-list';

// Definir interfaces
interface ThemeType {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  error: string;
}

interface NavigationItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

interface QuickStat {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  color: string;
  sparkData: number[];
}

interface ActionItem {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  new?: boolean;
}

interface SmartFeature {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  new?: boolean;
  badge?: string;
}

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ElementType;
  color: string;
}

interface CardProps {
  children: React.ReactNode;
  highlight?: boolean;
  noPadding?: boolean;
}

interface ActionButtonProps {
  item: ActionItem;
  compact?: boolean;
  onClick: (id: string) => void;
  onClose: (id: string) => void;
}

const InventoryHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('inventario');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showProductCreation, setShowProductCreation] = useState<boolean>(false);
  const [ShowProduct, setShowProduct] = useState<boolean>(false);
  
  // Función para manejar acciones específicas según el ID
  const handleAction = (actionId: string): void => {
    switch(actionId) {
      case 'new-product':
        setShowProductCreation(true);
        break;
  
      case 'products': // This matches the ID in your mainActions array
        setShowProduct(true);
        break;
  
      case 'stock-control':
        console.log('Ajustar inventario');
        // Implement stock adjustment functionality
        break;
  
      case 'categories':
        console.log('Gestionar categorías');
        // Implement categories management functionality
        break;
  
      case 'movements':
        console.log('Ver movimientos de inventario');
        // Implement inventory movements history
        break;
  
      // Handle any other actions
      default:
        console.log(`Acción: ${actionId}`);
    }
  };

  const theme: ThemeType = {
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

  const navigationItems: NavigationItem[] = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'ventas', icon: ShoppingBag, label: 'Ventas' },
    { id: 'inventario', icon: Package, label: 'Inventario' },
    { id: 'clientes', icon: Users, label: 'Clientes' },
    { id: 'negocio', icon: BarChart2, label: 'Negocio' }
  ];

  const quickStats: QuickStat[] = [
    {
      icon: Package,
      label: 'Total Productos',
      value: '245',
      trend: '+12 nuevo',
      color: theme.primary,
      sparkData: [40, 35, 45, 42, 47, 42, 45]
    },
    {
      icon: AlertCircle,
      label: 'Stock Bajo',
      value: '8',
      trend: 'Crítico',
      color: theme.error,
      sparkData: [2, 4, 6, 8, 7, 8, 8]
    },
    {
      icon: Archive,
      label: 'Valor Stock',
      value: '$4.5M',
      trend: '+5%',
      color: theme.success,
      sparkData: [4.2, 4.3, 4.1, 4.4, 4.3, 4.4, 4.5]
    }
  ];

  const mainActions: ActionItem[] = [
    {
      id: 'new-product',
      icon: Plus,
      title: 'Crear Producto',
      description: 'Agregar nuevo producto',
      highlight: true
    },
    {
      id: 'products',
      icon: Package,
      title: 'Productos',
      description: 'Ver todos los productos',
      badge: '245 activos'
    },
    {
      id: 'stock-control',
      icon: Archive,
      title: 'Control de Stock',
      description: 'Ajustar inventario',
      badge: '8 pendientes'
    },
    {
      id: 'categories',
      icon: LayoutGrid,
      title: 'Categorías',
      description: 'Gestionar categorías',
      badge: '12 activas'
    },
    {
      id: 'movements',
      icon: Clock,
      title: 'Movimientos',
      description: 'Historial de cambios',
      badge: 'Hoy: 24'
    }
  ];

  const smartFeatures: SmartFeature[] = [
    {
      id: 'demand',
      icon: TrendingUp,
      title: 'Predicción de Demanda',
      description: 'IA analiza patrones de venta',
      new: true
    },
    {
      id: 'optimization',
      icon: Sparkles,
      title: 'Optimización de Stock',
      description: 'Sugerencias automáticas',
      badge: '3 alertas'
    },
    {
      id: 'pricing',
      icon: Zap,
      title: 'Precios Sugeridos',
      description: 'Basado en el mercado',
      badge: 'AI'
    }
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: 1,
      title: 'Stock Actualizado',
      description: 'Coca Cola 500ml (+24)',
      time: '5m',
      icon: Package,
      color: theme.success
    },
    {
      id: 2,
      title: 'Alerta de Stock',
      description: 'Pan Baguette (3 unidades)',
      time: '15m',
      icon: AlertCircle,
      color: theme.error
    },
    {
      id: 3,
      title: 'Categoría Creada',
      description: 'Nueva: "Bebidas Naturales"',
      time: '1h',
      icon: Tags,
      color: theme.primary
    }
  ];

  const Card: React.FC<CardProps> = ({ children, highlight = false, noPadding = false }) => (
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

  const ActionButton: React.FC<ActionButtonProps> = ({ item, compact = false, onClick }) => (
    <button 
      onClick={() => onClick(item.id)}
      className={`w-full ${compact ? 'p-3' : 'p-4'} rounded-xl flex items-center gap-4 
                 transition-all duration-200 active:scale-[0.98] hover:bg-opacity-95`}
      style={{ 
        backgroundColor: item.highlight ? theme.primary : theme.card,
        border: `1px solid ${item.highlight ? 'transparent' : theme.border}`
      }}
    >
      <div 
        className={`${compact ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl flex items-center 
                   justify-center flex-shrink-0`}
        style={{ 
          backgroundColor: item.highlight ? 'rgba(255,255,255,0.2)' : `${theme.primary}15`
        }}
      >
        <item.icon 
          className={`${compact ? 'w-5 h-5' : 'w-6 h-6'}`}
          style={{ color: item.highlight ? 'white' : theme.primary }}
        />
      </div>
      
      <div className="flex-1 text-left">
        <p className="font-medium" style={{ 
          color: item.highlight ? 'white' : theme.text 
        }}>
          {item.title}
        </p>
        <p className="text-sm" style={{ 
          color: item.highlight ? 'rgba(255,255,255,0.8)' : theme.textSecondary 
        }}>
          {item.description}
        </p>
      </div>

      {(item.badge || item.new) && (
        <span 
          className="px-2 py-0.5 text-xs rounded-full"
          style={{ 
            backgroundColor: item.new ? `${theme.primary}15` : 
                           item.highlight ? 'rgba(255,255,255,0.2)' : `${theme.primary}15`,
            color: item.highlight ? 'white' : theme.primary
          }}
        >
          {item.badge || 'Nuevo'}
        </span>
      )}

      <ArrowRight 
        className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`}
        style={{ color: item.highlight ? 'white' : theme.textSecondary }}
      />
    </button>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
      {/* Mostrar ProductCreationFlow cuando showProductCreation es true */}
        {showProductCreation && (
      <div className="fixed inset-0 z-50">
        <ProductCreationFlow />
        <button 
          className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-lg z-[60]"
          onClick={() => setShowProductCreation(false)}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    
    )}
      {ShowProduct && (
        <div className="fixed inset-0 z-50">
          <OptimizedFilterInventory onClose={() => setShowProduct(false)} />
          <button 
            className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-lg z-[60]"
            onClick={() => setShowProduct(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
      
      {/* Header Area */}
      <div className="sticky top-0 z-10 border-b" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        
        {/* Search Bar and Quick Actions */}
        <div className="px-4 py-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search 
                className="absolute left-3 top-3 w-5 h-5" 
                style={{ color: theme.textSecondary }} 
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos, categorías..."
                className="w-full pl-10 pr-4 py-3 rounded-xl"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                  color: theme.text
                }}
              />
            </div>
            <button 
              className="p-3 rounded-xl"
              style={{ backgroundColor: theme.accent }}
            >
              <Barcode className="w-6 h-6 text-white" />
            </button>
            <button 
              className="p-3 rounded-xl"
              style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
            >
              <Upload className="w-6 h-6" style={{ color: theme.textSecondary }} />
            </button>
          </div>
        </div>
      </div>

      {/* Sync Status */}
      <div className="px-4 py-2 flex items-center justify-between border-b"
        style={{ borderColor: theme.border, backgroundColor: `${theme.success}10` }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-current" style={{ color: theme.success }} />
          <span className="text-sm" style={{ color: theme.success }}>
            Inventario sincronizado
          </span>
        </div>
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          Última sync: 5m
        </span>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 pb-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, index) => (
            <Card key={`stat-${index}`}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <span 
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: `${stat.color}15`,
                      color: stat.color
                    }}
                  >
                    {stat.trend}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="text-2xl font-bold mb-1" style={{ color: theme.text }}>
                    {stat.value}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm" style={{ color: theme.textSecondary }}>
                      {stat.label}
                    </p>
                    <div className="h-8 w-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stat.sparkData.map((value, i) => ({ value, index: i }))}>
                          <Line 
                            type="monotone" 
                            dataKey="value"
                            stroke={stat.color}
                            strokeWidth={1.5}
                            dot={false}
                            isAnimationActive={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium px-1" style={{ color: theme.text }}>
            Acciones Principales
          </h2>
          {mainActions.map(action => (
            <ActionButton 
              key={action.id} 
              item={action} 
              onClick={handleAction}
              onClose={handleAction}
            />
          ))}
        </div>

        {/* Today's Movement Summary */}
        <Card noPadding={true}>
          <div className="p-4 border-b" style={{ borderColor: theme.border }}>
            <div className="flex items-center justify-between">
              <h2 className="font-medium" style={{ color: theme.text }}>
                Movimientos de Hoy
              </h2>
              <span 
                className="px-2 py-0.5 text-xs rounded-full"
                style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
              >
                24 operaciones
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x" style={{ borderColor: theme.border }}>
            {[
              { label: 'Entradas', value: '+245', trend: '+12%', color: theme.success },
              { label: 'Salidas', value: '-182', trend: '-8%', color: theme.error },
              { label: 'Ajustes', value: '12', trend: '4 pendientes', color: theme.primary }
            ].map((stat, i) => (
              <div key={`movement-${i}`} className="p-4">
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                    <p className="text-sm" style={{ color: theme.textSecondary }}>
                      {stat.label}
                    </p>
                  </div>
                  <p className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <div 
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ 
                      backgroundColor: `${stat.color}15`,
                      color: stat.color
                    }}
                  >
                    {stat.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stock Value Chart */}
        <Card>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="font-medium mb-1" style={{ color: theme.text }}>
                Valor del Inventario
              </h2>
              <p style={{ color: theme.textSecondary }}>
                Últimos 7 días
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: theme.primary }}>
                $4.5M
              </p>
              <p className="text-sm" style={{ color: theme.success }}>
                ↑ 8.2% vs semana anterior
              </p>
            </div>
          </div>
          
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { day: 'Lun', value: 4200000 },
                  { day: 'Mar', value: 4300000 },
                  { day: 'Mie', value: 4250000 },
                  { day: 'Jue', value: 4400000 },
                  { day: 'Vie', value: 4350000 },
                  { day: 'Sab', value: 4450000 },
                  { day: 'Dom', value: 4500000 }
                ]}
                margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="stockValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={theme.primary} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={theme.primary} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: theme.textSecondary,
                    fontSize: 12
                  }}
                  dy={10}
                />
                <YAxis 
                  hide={true}
                  domain={['dataMin - 100000', 'dataMax + 100000']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={theme.primary}
                  strokeWidth={2.5}
                  fill="url(#stockValue)"
                  dot={{
                    stroke: theme.primary,
                    strokeWidth: 2,
                    r: 4,
                    fill: 'white'
                  }}
                  activeDot={{
                    stroke: theme.primary,
                    strokeWidth: 2,
                    r: 6,
                    fill: 'white'
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Smart Features */}
        <Card noPadding={true}>
          <div className="p-4 border-b" style={{ borderColor: theme.border }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-medium" style={{ color: theme.text }}>
                  Smart Features
                </h2>
                <div 
                  className="px-2 py-0.5 text-xs rounded-full flex items-center gap-1"
                  style={{ 
                    backgroundColor: `${theme.success}15`, 
                    color: theme.success 
                  }}
                >
                  <div 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ 
                      backgroundColor: 'currentColor'
                    }} 
                  />
                  AI Activo
                </div>
              </div>
              <Sparkles 
                className="w-5 h-5 transition-transform hover:scale-110" 
                style={{ color: theme.primary }} 
              />
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: theme.border }}>
            {smartFeatures.map(feature => (
              <div key={feature.id} className="p-4">
                <div 
                  className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 
                         hover:bg-opacity-95 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
                  style={{ backgroundColor: `${theme.primary}08` }}
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                    style={{ backgroundColor: `${theme.primary}15` }}
                  >
                    <feature.icon className="w-6 h-6" style={{ color: theme.primary }} />
                    <div 
                      className="absolute inset-0 rounded-xl"
                      style={{ 
                        backgroundColor: theme.primary,
                        opacity: 0.3
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-medium" style={{ color: theme.text }}>
                        {feature.title}
                      </p>
                      {feature.new && (
                        <span 
                          className="px-1.5 py-0.5 text-xs rounded-full"
                          style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                        >
                          Nuevo
                        </span>
                      )}
                    </div>
                    <p className="text-sm mt-0.5" style={{ color: theme.textSecondary }}>
                      {feature.description}
                    </p>
                  </div>

                  {feature.badge && (
                    <span 
                      className="px-2 py-1 text-xs rounded-lg font-medium mr-2"
                      style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                    >
                      {feature.badge}
                    </span>
                  )}

                  <ArrowRight 
                    className="w-5 h-5 transition-transform duration-200" 
                    style={{ color: theme.textSecondary }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card noPadding={true}>
          <div className="p-4 border-b" style={{ borderColor: theme.border }}>
            <h2 className="font-medium" style={{ color: theme.text }}>
              Actividad Reciente
            </h2>
          </div>
          <div className="divide-y" style={{ borderColor: theme.border }}>
            {recentActivity.map(activity => (
              <div key={activity.id} className="p-4 flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  <activity.icon className="w-6 h-6" style={{ color: activity.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-medium" style={{ color: theme.text }}>
                      {activity.title}
                    </p>
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Footer Navigation */}
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
    </div>
  );
};

export default InventoryHub;