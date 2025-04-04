"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importar router de Next.js
import { 
  Search, 
  Plus,
  Users,
  Star,
  MessageCircle,
  UserPlus,
  ChevronRight,
  Gift,
  Send,
  Layers,
  Trophy,
  Clock,
  RefreshCw,
  ArrowRight,
  BarChart2,
  ShoppingBag,
  Home,
  Package,
  Sparkles
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
// Importamos ClientList condicionalmente para evitar errores de importación
// También podríamos usar dynamic import aquí si fuera necesario

// Define theme type
interface Theme {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  whatsapp: string;
}

// Define QuickStat type
interface QuickStat {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  color: string;
  sparkData?: number[];
}

// Define ActionItem type
interface ActionItem {
  icon: React.ElementType;
  title: string;
  description?: string;
  desc?: string;
  badge?: string;
  color: string;
  highlight?: boolean;
  urgent?: boolean;
}

// Define Section type
interface Section {
  title: string;
  items: ActionItem[];
}

// Define MainNavItem type
interface MainNavItem {
  id: string;
  icon: React.ElementType;
  label: string;
}

// Define Card props
interface CardProps {
  children: React.ReactNode;
  highlight?: boolean;
  noPadding?: boolean;
}

// Define ActionButton props
interface ActionButtonProps {
  item: ActionItem;
  onClick?: () => void;
}

const ClientesHub: React.FC = () => {
  const router = useRouter(); // Usar el router de Next.js
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMainNav, setActiveMainNav] = useState<string>('clientes');
  
  // Eliminamos el estado que controla las vistas para usar el enrutamiento adecuado

  const theme: Theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    whatsapp: '#25D366'
  };

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

  const quickStats: QuickStat[] = [
    {
      icon: Users,
      label: 'Total Clientes',
      value: '245',
      trend: '+12% vs mes ant.',
      color: theme.primary,
      sparkData: [220, 228, 235, 230, 238, 242, 245]
    },
    {
      icon: UserPlus,
      label: 'Nuevos',
      value: '12',
      trend: 'esta semana',
      color: theme.success,
      sparkData: [8, 7, 9, 11, 10, 9, 12]
    },
    {
      icon: Clock,
      label: 'Por Contactar',
      value: '8',
      trend: 'pendientes',
      color: theme.warning,
      sparkData: [5, 7, 6, 8, 7, 8, 8]
    }
  ];

  const mainActions: ActionItem[] = [
    {
      icon: Users,
      title: 'Clientes & Ventas',
      description: 'Ver todos los clientes y su historial',
      badge: '245 activos',
      color: theme.primary
    },
    {
      icon: MessageCircle,
      title: 'Comunicación',
      description: 'WhatsApp y campañas',
      badge: '8 pendientes',
      color: theme.whatsapp
    }
  ];

  // Modificamos las funciones para usar el router en lugar del estado interno
  const handleOpenClientList = (): void => {
    router.push('/clientes/lista'); // Navegamos a la ruta específica
  };

  const sections: Section[] = [
    {
      title: 'Gestión de clientes',
      items: [
        {
          icon: Layers,
          title: 'Lista de Clientes',
          description: 'Ver y gestionar clientes',
          desc: '245 clientes activos',
          badge: '245 activos',
          color: theme.primary,
          highlight: true
        },
        {
          icon: Users,
          title: 'Grupos & Segmentos',
          description: 'Organizar clientes',
          desc: '5 grupos creados',
          badge: '5 grupos',
          color: theme.success
        }
      ]
    },
    {
      title: 'Comunicación & marketing',
      items: [
        {
          icon: MessageCircle,
          title: 'WhatsApp Business',
          description: 'Centro de comunicación',
          desc: 'Centro de comunicación',
          badge: '8 pendientes',
          color: theme.whatsapp,
          urgent: true
        },
        {
          icon: Send,
          title: 'Campañas & Ofertas',
          description: 'Gestionar campañas',
          desc: '2 campañas activas',
          badge: '2 activas',
          color: theme.primary
        }
      ]
    },
    {
      title: 'Programa de fidelización',
      items: [
        {
          icon: Gift,
          title: 'Sistema de Puntos',
          description: 'Gestionar programa',
          desc: '2.850 puntos activos',
          badge: '2.850 puntos',
          color: theme.success
        },
        {
          icon: Star,
          title: 'Club VIP',
          description: 'Clientes especiales',
          desc: '28 clientes VIP',
          badge: '28 VIP',
          color: theme.text
        },
        {
          icon: Trophy,
          title: 'Beneficios',
          description: 'Ofertas exclusivas',
          desc: '5 beneficios activos',
          badge: '5 activos',
          color: theme.primary
        }
      ]
    }
  ];

  const mainNavItems: MainNavItem[] = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'ventas', icon: ShoppingBag, label: 'Ventas' },
    { id: 'inventario', icon: Package, label: 'Inventario' },
    { id: 'clientes', icon: Users, label: 'Clientes' },
    { id: 'negocio', icon: BarChart2, label: 'Negocio' }
  ];

  const ActionButton: React.FC<ActionButtonProps> = ({ item, onClick }) => (
    <button
      onClick={onClick}
      className="w-full p-4 rounded-xl flex items-center gap-4 
                 transition-all duration-200 active:scale-98 hover:bg-opacity-95"
      style={{ 
        backgroundColor: item.highlight ? theme.primary : theme.card,
        border: `1px solid ${item.highlight ? 'transparent' : theme.border}`
      }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ 
          backgroundColor: item.highlight ? 'rgba(255,255,255,0.2)' : `${item.color}15`
        }}
      >
        <item.icon 
          className="w-6 h-6" 
          style={{ color: item.highlight ? 'white' : item.color }} 
        />
      </div>
      
      <div className="flex-1 text-left">
        <p className="font-medium" style={{ 
          color: item.highlight ? 'white' : theme.text 
        }}>
          {item.title}
        </p>
        <p className="text-sm mt-0.5" style={{ 
          color: item.highlight ? 'rgba(255,255,255,0.8)' : theme.textSecondary 
        }}>
          {item.description || item.desc}
        </p>
      </div>

      {item.badge && (
        <span 
          className="px-2 py-0.5 text-xs rounded-full whitespace-nowrap mr-2"
          style={{ 
            backgroundColor: item.highlight ? 'rgba(255,255,255,0.2)' : 
                           item.urgent ? `${theme.warning}15` :
                           `${item.color}15`,
            color: item.highlight ? 'white' : 
                   item.urgent ? theme.warning :
                   item.color
          }}
        >
          {item.badge}
        </span>
      )}
      
      <ChevronRight 
        className="w-5 h-5" 
        style={{ color: item.highlight ? 'white' : theme.textSecondary }} 
      />
    </button>
  );

  // Ahora solo mostramos la vista hub, las otras vistas se manejarán por rutas
  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b p-4" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search 
              className="absolute left-3 top-3 w-5 h-5" 
              style={{ color: theme.textSecondary }} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              placeholder="Buscar clientes..."
              className="w-full pl-10 pr-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
            />
          </div>
          <button 
            className="p-3 rounded-xl flex items-center gap-2"
            style={{ backgroundColor: theme.primary }}
          >
            <Plus className="w-6 h-6 text-white" />
            <span className="text-white font-medium pr-2">Nuevo</span>
          </button>
        </div>
      </div>

      {/* Sync Status */}
      <div className="px-4 py-2 flex items-center justify-between border-b"
        style={{ borderColor: theme.border, backgroundColor: `${theme.success}10` }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-current" style={{ color: theme.success }} />
          <span className="text-sm" style={{ color: theme.success }}>
            Clientes sincronizados
          </span>
        </div>
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          Última sync: 5m
        </span>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <div className="flex flex-col h-full p-2">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                       style={{ backgroundColor: `${stat.color}15` }}>
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: stat.color }}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-3xl font-bold mb-2" style={{ color: theme.text }}>
                  {stat.value}
                </p>
                <p className="text-base mb-4" style={{ color: theme.textSecondary }}>
                  {stat.label}
                </p>
                {stat.sparkData && (
                  <div className="h-10 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stat.sparkData.map((value, i) => ({ value }))}>
                        <Line 
                          type="monotone" 
                          dataKey="value"
                          stroke={stat.color}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-2 gap-3">
          {mainActions.map((action, index) => (
            <button
              key={index}
              className="p-4 rounded-xl transition-all duration-200 hover:shadow-sm active:scale-98"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <action.icon className="w-6 h-6" style={{ color: action.color }} />
                  </div>
                  {action.badge && (
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${action.color}15`,
                        color: action.color
                      }}
                    >
                      {action.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium mb-1" style={{ color: theme.text }}>
                    {action.title}
                  </h3>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Sections with Action Cards */}
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-lg font-medium" style={{ color: theme.text }}>
                {section.title}
              </h2>
              <span className="text-sm" style={{ color: theme.textSecondary }}>
                Ver todos
              </span>
            </div>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => {
                // Agregar evento onClick para "Lista de Clientes"
                if (sectionIndex === 0 && itemIndex === 0) {
                  return <ActionButton key={itemIndex} item={item} onClick={handleOpenClientList} />;
                }
                return <ActionButton key={itemIndex} item={item} />;
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t z-40" 
        style={{ backgroundColor: theme.card, borderColor: theme.border }}>
        <div className="flex justify-between max-w-lg mx-auto">
          {mainNavItems.map(({ id, icon: Icon, label }) => {
            const isActive = activeMainNav === id;
            // Modificamos los handlers de navegación para usar router
            const handleNavClick = () => {
              setActiveMainNav(id);
              // Navegamos a la ruta correspondiente
              router.push(`/${id}`);
            };
            
            return (
              <button
                key={id}
                onClick={handleNavClick}
                className="flex-1 flex flex-col items-center py-2 px-2"
                style={{ 
                  backgroundColor: isActive ? `${theme.primary}15` : 'transparent',
                  color: isActive ? theme.primary : theme.textSecondary
                }}
              >
                <Icon 
                  className="w-6 h-6 mb-1" 
                  style={{ 
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.2s ease'
                  }}
                />
                <span 
                  className="text-xs"
                  style={{
                    opacity: isActive ? 1 : 0.7,
                    transition: 'opacity 0.2s ease'
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

export default ClientesHub;