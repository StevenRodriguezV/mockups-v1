"use client"
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  MessageCircle,
  Pencil,
  ShoppingBag,
  Calendar,
  TrendingUp,
  MapPin,
  Receipt,
  Phone,
  Mail,
  Package,
  ChevronRight,
  DollarSign,
  Check,
  CheckCheck,
  Clock
} from 'lucide-react';

// Define theme type
interface Theme {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error?: string;
  warning?: string;
  whatsapp: string;
}

// Define product type
interface Product {
  name: string;
  quantity: number;
  price: number;
}

// Define transaction type
interface Transaction {
  id: number;
  date: string;
  amount: number;
  items: number;
  status?: string;
  products: Product[];
}

// Define common product type
interface CommonProduct {
  id: number;
  name: string;
  count: number;
  lastPurchase: string;
}

// Define client type
interface Client {
  name: string;
  whatsapp?: string;
  email?: string;
  cedula?: string;
  address?: string;
  labels: string[];
  totalSpent?: number;
  purchaseCount?: number;
  avgPurchase?: number;
  status?: string;
  dianStatus?: string;
  commonProducts: CommonProduct[];
  recentTransactions: Transaction[];
}

// Define StatCard props
interface StatCardProps {
  icon: React.ElementType;
  value: string | number;
  label: string;
  trend: string;
  color: string;
}

// Define ContactButton props
interface ContactButtonProps {
  icon: React.ElementType;
  value: string;
  type: string;
  color: string;
}

// Define TransactionCard props
interface TransactionCardProps {
  transaction: Transaction;
}

// Define LoadMoreButton props
interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
  text: string;
}

function ClientDetailView() {
  const theme: Theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    whatsapp: '#25D366'
  };

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [client, setClient] = useState<Client>({
    name: 'María García',
    whatsapp: '+57 321 456 7890',
    email: 'maria@gmail.com',
    cedula: '123456789',
    address: 'Calle 123 #45-67',
    labels: ['Frecuente', 'WhatsApp'],
    totalSpent: 245800,
    purchaseCount: 24,
    avgPurchase: 10240,
    status: 'active',
    dianStatus: 'verified',
    commonProducts: [
      { id: 1, name: 'Coca Cola 500ml', count: 15, lastPurchase: '2024-02-14' },
      { id: 2, name: 'Pan Baguette', count: 12, lastPurchase: '2024-02-13' },
      { id: 3, name: 'Leche Entera 1L', count: 8, lastPurchase: '2024-02-12' }
    ],
    recentTransactions: [
      { 
        id: 1, 
        date: '2024-02-14', 
        amount: 15000,
        items: 3, 
        status: 'completed',
        products: [
          { name: 'Coca Cola 500ml', quantity: 2, price: 3500 },
          { name: 'Pan Baguette', quantity: 1, price: 5000 },
          { name: 'Yogurt', quantity: 1, price: 3000 }
        ]
      },
      { 
        id: 2, 
        date: '2024-02-10', 
        amount: 28000,
        items: 5, 
        status: 'completed',
        products: [
          { name: 'Leche', quantity: 2, price: 4500 },
          { name: 'Huevos x12', quantity: 1, price: 8000 },
          { name: 'Pan', quantity: 1, price: 3000 },
          { name: 'Queso', quantity: 1, price: 5000 },
          { name: 'Jamón', quantity: 1, price: 7500 }
        ]
      },
      { 
        id: 3, 
        date: '2024-02-05', 
        amount: 12000,
        items: 2, 
        status: 'completed',
        products: [
          { name: 'Café 500g', quantity: 1, price: 8500 },
          { name: 'Galletas', quantity: 1, price: 3500 }
        ]
      }
    ]
  });

  const loadMoreTransactions = async (): Promise<void> => {
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate loading more transactions
    const newTransactions: Transaction[] = [
      { 
        id: client.recentTransactions.length + 1,
        date: '2024-02-01', 
        amount: 22000,
        items: 4, 
        status: 'completed',
        products: [
          { name: 'Producto 1', quantity: 2, price: 5000 },
          { name: 'Producto 2', quantity: 2, price: 6000 }
        ]
      }
    ];
    
    setClient(prev => ({
      ...prev,
      recentTransactions: [...prev.recentTransactions, ...newTransactions]
    }));
    setIsLoadingMore(false);
  };

  const loadMoreProducts = async (): Promise<void> => {
    setIsLoadingMore(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate loading more products
    const newProducts: CommonProduct[] = [
      { 
        id: client.commonProducts.length + 1,
        name: 'Nuevo Producto',
        count: 5,
        lastPurchase: '2024-02-01'
      }
    ];
    
    setClient(prev => ({
      ...prev,
      commonProducts: [...prev.commonProducts, ...newProducts]
    }));
    setIsLoadingMore(false);
  };

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, trend, color }) => (
    <div className="p-4 rounded-xl"
      style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
      <div className="flex items-start justify-between mb-3">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="text-xs" style={{ color }}>{trend}</span>
      </div>
      <div>
        <div className="text-xl font-medium" style={{ color: theme.text }}>
          {value}
        </div>
        <div className="text-sm" style={{ color: theme.textSecondary }}>
          {label}
        </div>
      </div>
    </div>
  );

  const ContactButton: React.FC<ContactButtonProps> = ({ icon: Icon, value, type, color }) => (
    <div className="relative">
      <div className="w-full p-3 rounded-xl flex items-center gap-3"
        style={{ backgroundColor: `${color}15` }}>
        <Icon className="w-5 h-5" style={{ color }} />
        <div className="flex-1">
          <div className="text-sm" style={{ color: theme.textSecondary }}>{type}</div>
          <div style={{ color }}>{value}</div>
        </div>
      </div>
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute right-2 top-2 p-1.5 rounded-lg"
        style={{ backgroundColor: `${theme.primary}15` }}>
        <Pencil className="w-4 h-4" style={{ color: theme.primary }} />
      </button>
    </div>
  );

  const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const total = transaction.products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    const subtotal = Math.round(total / 1.19);
    const iva = total - subtotal;

    const handleTransactionClick = (): void => {
      console.log('Navigate to invoice:', transaction.id);
    };

    return (
      <div className="p-4 rounded-xl" 
        style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
        <div className="flex items-start justify-between">
          <div 
            onClick={handleTransactionClick}
            className="flex-1 flex items-center gap-3 cursor-pointer hover:opacity-90"
          >
            <DollarSign className="w-5 h-5" style={{ color: theme.success }} />
            <div className="flex-1">
              <div className="font-medium" style={{ color: theme.text }}>
                ${transaction.amount.toLocaleString()}
              </div>
              <div className="text-sm" style={{ color: theme.textSecondary }}>
                {transaction.items} productos
              </div>
            </div>
            <Receipt className="w-5 h-5" style={{ color: theme.primary }} />
          </div>
          <div className="flex items-center gap-2 ml-3">
            <div className="text-right">
              <div className="text-sm" style={{ color: theme.textSecondary }}>
                {transaction.date}
              </div>
              <div className="text-xs mt-0.5" style={{ color: theme.success }}>
                {transaction.status === 'completed' ? 'Completado' : 'Pendiente'}
              </div>
            </div>
            <button 
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded-lg hover:bg-gray-50"
            >
              <ChevronRight 
                className="w-5 h-5 transition-transform duration-200"
                style={{ 
                  color: theme.textSecondary,
                  transform: `rotate(${isExpanded ? '90deg' : '0deg'})`
                }}
              />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-3 pt-3 border-t" style={{ borderColor: theme.border }}>
            <div className="space-y-2 mb-4">
              {transaction.products.map((product, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg"
                  style={{ backgroundColor: theme.bg }}>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" style={{ color: theme.primary }} />
                    <span style={{ color: theme.text }}>{product.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                      {product.quantity}x
                    </span>
                    <div className="text-right">
                      <div className="text-sm font-medium" style={{ color: theme.text }}>
                        ${(product.price * product.quantity).toLocaleString()}
                      </div>
                      <div className="text-xs" style={{ color: theme.textSecondary }}>
                        ${product.price.toLocaleString()} c/u
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total section with invoice status and actions */}
            <div className="p-3 rounded-lg space-y-3" 
              style={{ backgroundColor: theme.bg }}>
              {/* Amounts */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span style={{ color: theme.textSecondary }}>Subtotal</span>
                  <span style={{ color: theme.text }}>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: theme.textSecondary }}>IVA (19%)</span>
                  <span style={{ color: theme.text }}>${iva.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t" 
                  style={{ borderColor: theme.border }}>
                  <span className="font-medium" style={{ color: theme.text }}>Total</span>
                  <span className="font-medium" style={{ color: theme.success }}>
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Invoice Status */}
              <div className="flex items-center gap-2 p-2 rounded-lg text-sm"
                style={{ backgroundColor: `${theme.success}15` }}>
                <CheckCheck className="w-4 h-4" style={{ color: theme.success }} />
                <span style={{ color: theme.success }}>Factura enviada por WhatsApp</span>
                <Clock className="w-3 h-3 ml-1" style={{ color: theme.success }} />
                <span className="text-xs" style={{ color: theme.success }}>2h</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleTransactionClick}
                  className="flex-1 p-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ 
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary
                  }}
                >
                  <Receipt className="w-4 h-4" />
                  <span className="text-sm font-medium">Ver factura</span>
                </button>
                <button
                  onClick={() => console.log('Send via WhatsApp')}
                  className="flex-1 p-2 rounded-lg flex items-center justify-center gap-2 hover:opacity-90"
                  style={{ 
                    backgroundColor: `${theme.whatsapp}15`,
                    color: theme.whatsapp
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Reenviar</span>
                </button>
              </div>

              {/* Last Message */}
              <div className="flex items-center justify-between text-xs p-2 rounded-lg"
                style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}` }}>
                <div className="flex items-center gap-2">
                  <CheckCheck className="w-3 h-3" style={{ color: theme.success }} />
                  <span style={{ color: theme.textSecondary }}>
                    Vista por cliente • Hace 2h
                  </span>
                </div>
                <button 
                  className="px-2 py-1 rounded hover:bg-gray-50"
                  style={{ color: theme.primary }}
                >
                  Ver chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, isLoading, text }) => (
    <button 
      onClick={onClick}
      disabled={isLoading}
      className="w-full p-4 rounded-xl flex items-center justify-center gap-2"
      style={{ 
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`,
        color: theme.primary,
        opacity: isLoading ? 0.7 : 1
      }}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : text}
    </button>
  );

  return (
    <div className="min-h-screen pb-20" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b p-4" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg"
              style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
              <ChevronLeft className="w-6 h-6" style={{ color: theme.text }} />
            </button>
            <div>
              <h1 className="text-lg font-medium" style={{ color: theme.text }}>
                {client.name}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                {client.labels.map((label, index) => (
                  <span 
                    key={index}
                    className="px-2 py-0.5 rounded-full text-xs text-white"
                    style={{ backgroundColor: theme.primary }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <button className="p-2 rounded-lg" 
            style={{ backgroundColor: `${theme.whatsapp}15` }}>
            <MessageCircle className="w-5 h-5" style={{ color: theme.whatsapp }} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats */}
        {client.totalSpent && client.purchaseCount && client.avgPurchase && (
          <div className="grid grid-cols-3 gap-3">
            <StatCard
              icon={ShoppingBag}
              label="Total Ventas"
              value={`$${client.totalSpent.toLocaleString()}`}
              trend="+12% vs mes ant."
              color={theme.primary}
            />
            <StatCard
              icon={Calendar}
              label="Compras"
              value={client.purchaseCount}
              trend="2.4 / semana"
              color={theme.success}
            />
            <StatCard
              icon={TrendingUp}
              label="Promedio"
              value={`$${client.avgPurchase.toLocaleString()}`}
              trend="+5% vs promedio"
              color={theme.warning || '#F59E0B'}
            />
          </div>
        )}

        {/* Contact Info */}
        {(client.whatsapp || client.email || client.address) && (
          <div className="space-y-3">
            <h2 className="text-lg font-medium px-1" style={{ color: theme.text }}>
              Contacto
            </h2>
            <div className="grid gap-3">
              {client.whatsapp && (
                <ContactButton
                  icon={Phone}
                  type="WhatsApp"
                  value={client.whatsapp}
                  color={theme.whatsapp}
                />
              )}
              {client.email && (
                <ContactButton
                  icon={Mail}
                  type="Email"
                  value={client.email}
                  color={theme.primary}
                />
              )}
              {client.address && (
                <ContactButton
                  icon={MapPin}
                  type="Dirección"
                  value={client.address}
                  color={theme.success}
                />
              )}

              {/* Document Info */}
              {client.cedula && (
                <div className="relative p-4 rounded-xl" style={{ backgroundColor: theme.card }}>
                  <div className="flex items-center gap-2">
                    <Receipt className="w-5 h-5" 
                      style={{ color: client.dianStatus === 'verified' ? theme.success : theme.warning || '#F59E0B' }} 
                    />
                    <div>
                      <p className="font-medium" style={{ color: theme.text }}>
                        Cédula: {client.cedula}
                      </p>
                      <p className="text-sm" style={{ color: theme.textSecondary }}>
                        {client.dianStatus === 'verified' ? 'Verificado DIAN' : 'Pendiente verificación'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="absolute right-2 top-2 p-1.5 rounded-lg"
                    style={{ backgroundColor: `${theme.primary}15` }}>
                    <Pencil className="w-4 h-4" style={{ color: theme.primary }} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transactions */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium px-1" style={{ color: theme.text }}>
            Últimas Transacciones
          </h2>
          <div className="space-y-3">
            {client.recentTransactions.map(tx => (
              <TransactionCard key={tx.id} transaction={tx} />
            ))}
            <LoadMoreButton 
              onClick={loadMoreTransactions}
              isLoading={isLoadingMore}
              text="Ver más transacciones"
            />
          </div>
        </div>

        {/* Products */}
        <div className="space-y-3">
          <h2 className="text-lg font-medium px-1" style={{ color: theme.text }}>
            Productos Frecuentes
          </h2>
          <div className="space-y-3">
            {client.commonProducts.map(product => (
              <div 
                key={product.id}
                className="p-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}15` }}>
                  <Package className="w-5 h-5" style={{ color: theme.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate" style={{ color: theme.text }}>
                    {product.name}
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: theme.textSecondary }}>
                      {product.count} veces
                    </span>
                    <span style={{ color: theme.textSecondary }}>•</span>
                    <span style={{ color: theme.textSecondary }}>
                      Última: {product.lastPurchase}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: theme.textSecondary }} />
              </div>
            ))}
            <LoadMoreButton 
              onClick={loadMoreProducts}
              isLoading={isLoadingMore}
              text="Ver más productos"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailView;