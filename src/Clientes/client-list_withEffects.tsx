"use client"
import React, { useState, useEffect } from 'react';
import { 
  Search,
  MessageCircle,
  Filter,
  AlertCircle,
  ChevronRight,
  Users,
  Pencil,
  UserX2,
  Plus,
  WifiOff,
  Loader2,
  RefreshCw,
  ChevronLeft
} from 'lucide-react';
import ClientDetailView from './client-detail';

// Define Theme interface
interface Theme {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  whatsapp: string;
}

// Define Filter interface
interface FilterOption {
  id: string;
  label: string;
  icon: React.ElementType;
  count: number;
}

// Define Client interface
interface Client {
  id: number;
  name: string | null;
  cedula: string | null;
  whatsapp: string | null;
  email: string | null;
  reference?: string;
  hasCedula: boolean;
  hasWhatsapp: boolean;
  lastPurchase: string;
  totalSpent: number;
  status: 'complete' | 'whatsapp' | 'minimal' | 'anonymous';
}

// Define view states
type ViewState = 'list' | 'detail';

interface ClientListProps {
  onBack?: () => void;
}

const ClientList: React.FC<ClientListProps> = ({ onBack }) => {
  // View management state
  const [currentView, setCurrentView] = useState<ViewState>('list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Original state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [displayedClients, setDisplayedClients] = useState<Client[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const theme: Theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    whatsapp: '#25D366'
  };

  const filters: FilterOption[] = [
    { id: 'todos', label: 'Todos', icon: Users, count: 245 },
    { id: 'sin_cedula', label: 'Sin Cédula', icon: AlertCircle, count: 45 },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, count: 180 },
    { id: 'incompleto', label: 'Incompletos', icon: UserX2, count: 35 }
  ];

  // Corrección de algunos errores de typo en los datos de clientes
  const clients: Client[] = [
    {
      id: 1,
      name: 'María García',
      cedula: '123456789',
      whatsapp: '+57 321 456 7890',
      email: 'maria@gmail.com',
      hasCedula: true,
      hasWhatsapp: true,
      lastPurchase: '2h',
      totalSpent: 458000,
      status: 'complete'
    },
    {
      id: 2,
      name: null,
      whatsapp: '+57 321 555 7890',
      email: null,
      cedula: null,
      hasCedula: false,
      hasWhatsapp: true,
      lastPurchase: '1d',
      totalSpent: 245000,
      status: 'whatsapp'
    },
    {
      id: 3,
      name: null,
      email: 'pedro@outlook.com',
      cedula: '987654321',
      whatsapp: null,
      hasCedula: true,
      hasWhatsapp: false,
      lastPurchase: '15d',
      totalSpent: 890000,
      status: 'minimal'
    },
    {
      id: 4,
      name: null,
      email: null,
      cedula: null,
      whatsapp: null,
      reference: 'Cliente #4582',
      hasCedula: false,
      hasWhatsapp: false,
      lastPurchase: 'ahora',
      totalSpent: 25000,
      status: 'anonymous'
    },
    {
      id: 5,
      name: 'Juan Pérez',
      whatsapp: '+57 321 999 8888',
      email: 'juan@empresa.com',
      cedula: '456789123',
      hasCedula: true,
      hasWhatsapp: true,
      lastPurchase: '30m',
      totalSpent: 750000,
      status: 'complete'
    },
    {
      id: 6,
      name: null,
      whatsapp: '+57 321 777 6666',
      email: null,
      cedula: null,
      hasCedula: false,
      hasWhatsapp: true,
      lastPurchase: '5m',
      totalSpent: 35000,
      status: 'whatsapp'
    },
    {
      id: 7,
      name: null,
      whatsapp: null,
      email: 'ana@hotmail.com',
      cedula: null,
      hasCedula: false,
      hasWhatsapp: false,
      lastPurchase: '3h',
      totalSpent: 150000,
      status: 'minimal'
    },
    {
      id: 8,
      name: 'Carlos Ruiz',
      whatsapp: '+57 321 444 3333',
      email: null,
      cedula: '789123456',
      hasCedula: true,
      hasWhatsapp: true,
      lastPurchase: '4h',
      totalSpent: 920000,
      status: 'complete'
    },
    {
      id: 9,
      name: 'Laura Mejía',
      whatsapp: '+57 321 222 1111',
      email: 'laura@gmail.com',
      cedula: '234567890',
      hasCedula: true,
      hasWhatsapp: true,
      lastPurchase: '1h',
      totalSpent: 1250000,
      status: 'complete'
    },
    {
      id: 10,
      name: null,
      whatsapp: '+57 321 888 9999',
      email: null,
      cedula: null,
      hasCedula: false,
      hasWhatsapp: true,
      lastPurchase: '10m',
      totalSpent: 45000,
      status: 'whatsapp'
    },
    {
      id: 11,
      name: null,
      whatsapp: null,
      email: 'roberto@empresa.com',
      cedula: '345678901',
      hasCedula: true,
      hasWhatsapp: false,
      lastPurchase: '2d',
      totalSpent: 320000,
      status: 'minimal'
    },
    {
      id: 12,
      name: 'Sofia Torres',
      whatsapp: '+57 321 666 5555',
      email: 'sofia@outlook.com',
      cedula: '456789012',
      hasCedula: true,
      hasWhatsapp: true,
      lastPurchase: '45m',
      totalSpent: 680000,
      status: 'complete'
    },
    {
      id: 13,
      name: null,
      email: null,
      cedula: null,
      whatsapp: null,
      reference: 'Cliente #4583',
      hasCedula: false,
      hasWhatsapp: false,
      lastPurchase: 'ahora',
      totalSpent: 15000,
      status: 'anonymous'
    },
    {
      id: 14,
      name: null,
      whatsapp: '+57 321 333 2222',
      email: null,
      cedula: null,
      hasCedula: false,
      hasWhatsapp: true,
      lastPurchase: '20m',
      totalSpent: 85000,
      status: 'whatsapp'
    },
    {
      id: 15,
      name: 'Andrea López',
      whatsapp: '+57 321 111 0000',
      email: 'andrea@gmail.com',
      cedula: '567890123',
      hasCedula: true,
      hasWhatsapp: true,
      lastPurchase: '2h',
      totalSpent: 950000,
      status: 'complete'
    }
  ];

  // Online status monitoring
  useEffect(() => {
    const handleOnline = (): void => setIsOnline(true);
    const handleOffline = (): void => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Lazy loading with scroll
  useEffect(() => {
    // Usamos una variable para prevenir múltiples llamadas rápidas en scroll
    let scrollTimeout: NodeJS.Timeout | null = null;
    
    const handleScroll = (): void => {
      // Si ya hay un timeout pendiente, no hacer nada
      if (scrollTimeout) return;
      
      // Comprobar si estamos cerca del final y no estamos cargando
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500) {
        if (!isLoading && displayedClients.length < clients.length) {
          // Configurar un pequeño debounce para evitar múltiples llamadas
          scrollTimeout = setTimeout(() => {
            loadMoreClients();
            scrollTimeout = null;
          }, 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Limpiar el timeout si existe al desmontar
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isLoading, displayedClients.length, clients.length]);

  // Initial load
  useEffect(() => {
    // Reiniciar el estado antes de cargar para evitar duplicados
    setPage(1);
    setDisplayedClients([]);
    loadMoreClients();
  }, []);

  const loadMoreClients = async (): Promise<void> => {
    // Prevenir múltiples llamadas simultáneas
    if (isLoading) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const pageSize = 5;
    const start = (page - 1) * pageSize;
    const newClients = clients.slice(start, start + pageSize);
    
    if (newClients.length > 0) {
      // Usar un Set para prevenir duplicados basados en ID
      setDisplayedClients(prev => {
        // Obtener todos los IDs existentes
        const existingIds = new Set(prev.map(client => client.id));
        
        // Filtrar solo los clientes que no existen ya en la lista
        const uniqueNewClients = newClients.filter(client => !existingIds.has(client.id));
        
        // Verificar si realmente tenemos nuevos clientes para añadir
        if (uniqueNewClients.length === 0) {
          return prev;
        }
        
        // Devolver la lista actualizada con los nuevos clientes únicos
        return [...prev, ...uniqueNewClients];
      });
      
      setPage(prev => prev + 1);
    }
    
    setIsLoading(false);
  };

  const handleRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    setPage(1);
    setDisplayedClients([]);
    await loadMoreClients();
    setIsRefreshing(false);
  };

  const getStatusColor = (status: Client['status']): string => {
    switch(status) {
      case 'complete': return theme.success;
      case 'whatsapp': return theme.whatsapp;
      default: return theme.textSecondary;
    }
  };

  // Navegar a la vista de detalle de cliente
  const handleSelectClient = (client: Client): void => {
    setSelectedClient(client);
    setCurrentView('detail');
  };

  // Volver a la lista de clientes
  const handleBackToList = (): void => {
    setCurrentView('list');
    setSelectedClient(null);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
      {currentView === 'list' ? (
        // Vista de lista de clientes
        <>
          {/* Offline Indicator */}
          {!isOnline && (
            <div 
              className="fixed top-0 left-0 right-0 p-2 text-center text-white z-50 flex items-center justify-center gap-2"
              style={{ backgroundColor: theme.error }}
            >
              <WifiOff className="w-4 h-4" />
              <span className="text-sm font-medium">Sin conexión - datos en modo local</span>
            </div>
          )}

          {/* Header */}
          <div className="sticky top-0 z-10 border-b" 
            style={{ 
              backgroundColor: theme.bg, 
              borderColor: theme.border,
              marginTop: !isOnline ? '40px' : '0'
            }}>
            <div className="p-4">
              {/* Search and Actions */}
              <div className="flex gap-2 mb-4">
                {onBack && (
                  <button 
                    onClick={onBack}
                    className="p-3 rounded-xl"
                    style={{ 
                      backgroundColor: theme.card,
                      border: `1px solid ${theme.border}`
                    }}
                  >
                    <ChevronLeft className="w-6 h-6" style={{ color: theme.text }} />
                  </button>
                )}
                
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

                {/* Filter left */}
                <button 
                  className="p-3 rounded-xl"
                  style={{ 
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  <Filter className="w-6 h-6" style={{ color: theme.textSecondary }} />
                </button>

                {/* Add button right */}
                <button 
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Plus className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {filters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className="px-3 py-2 rounded-xl whitespace-nowrap flex items-center gap-2"
                    style={{ 
                      backgroundColor: selectedFilter === filter.id ? theme.primary : `${theme.primary}10`,
                      color: selectedFilter === filter.id ? 'white' : theme.primary
                    }}
                  >
                    <filter.icon className="w-4 h-4" />
                    <span>{filter.label}</span>
                    {filter.count && (
                      <span 
                        className="px-1.5 py-0.5 text-xs rounded-full"
                        style={{ 
                          backgroundColor: selectedFilter === filter.id ? 'white' : theme.primary,
                          color: selectedFilter === filter.id ? theme.primary : 'white'
                        }}
                      >
                        {filter.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client List */}
          <div className="p-4 space-y-3">
            {/* Refresh Indicator */}
            {isRefreshing && (
              <div className="flex items-center justify-center p-4">
                <RefreshCw className="w-6 h-6 animate-spin" style={{ color: theme.primary }} />
              </div>
            )}

            {/* Pull to refresh button */}
            <button 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="w-full p-2 rounded-xl flex items-center justify-center gap-2"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                color: theme.primary,
                opacity: isRefreshing ? 0.7 : 1
              }}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="text-sm">Actualizar lista</span>
            </button>

            {/* Client Cards */}
            {displayedClients.map(client => (
              <div
                key={client.id}
                onClick={() => handleSelectClient(client)}
                className="group p-4 rounded-xl relative cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  transform: 'translateZ(0)'
                }}
              >
                {/* Hover Effect */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ 
                    backgroundColor: `${theme.primary}05`,
                    pointerEvents: 'none'
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Status Dot */}
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(client.status) }}
                    />
                    
                    <div>
                      {/* Primary Identifier */}
                      <h3 className="font-medium" style={{ color: theme.text }}>
                        {client.name || 
                        client.whatsapp || 
                        client.email || 
                        (client.cedula && `Cédula: ${client.cedula}`) || 
                        client.reference || 
                        'Cliente sin datos'}
                      </h3>

                      {/* Secondary Info */}
                      <div className="flex items-center flex-wrap gap-2 mt-1">
                        {client.name && client.whatsapp && (
                          <span className="text-sm" style={{ color: theme.whatsapp }}>
                            {client.whatsapp}
                          </span>
                        )}
                        {client.name && !client.whatsapp && client.email && (
                          <span className="text-sm" style={{ color: theme.primary }}>
                            {client.email}
                          </span>
                        )}
                        {client.hasCedula && (
                          <span className="text-sm" style={{ color: theme.success }}>
                            Cédula OK
                          </span>
                        )}
                        {!client.hasCedula && client.status !== 'anonymous' && (
                          <span className="text-sm" style={{ color: theme.warning }}>
                            Sin cédula
                          </span>
                        )}
                        <span className="text-sm" style={{ color: theme.textSecondary }}>
                          • Hace {client.lastPurchase}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-2">
                    {client.hasWhatsapp && (
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          console.log('WhatsApp action');
                        }}
                        className="p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{ backgroundColor: `${theme.whatsapp}15` }}
                      >
                        <MessageCircle 
                          className="w-5 h-5" 
                          style={{ color: theme.whatsapp }} 
                        />
                      </button>
                    )}
                    
                    {client.status !== 'complete' && (
                      <button
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          console.log('Edit action');
                        }}
                        className="p-2 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{ backgroundColor: `${theme.warning}15` }}
                      >
                        <Pencil 
                          className="w-5 h-5" 
                          style={{ color: theme.warning }} 
                        />
                      </button>
                    )}

                    <ChevronRight 
                      className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" 
                      style={{ color: theme.textSecondary }} 
                    />
                  </div>
                </div>

                {/* Purchase Info */}
                {client.totalSpent > 0 && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: theme.border }}>
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                      Total: 
                    </span>
                    <span className="ml-1 font-medium" style={{ color: theme.primary }}>
                      ${client.totalSpent.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-6 h-6 animate-spin" style={{ color: theme.primary }} />
              </div>
            )}

            {/* End of List */}
            {displayedClients.length === clients.length && !isLoading && (
              <div className="text-center p-4" style={{ color: theme.textSecondary }}>
                No hay más clientes
              </div>
            )}
          </div>
        </>
      ) : (
        // Vista de detalle del cliente
        selectedClient && <ClientDetailView />
      )}
    </div>
  );
};

export default ClientList;