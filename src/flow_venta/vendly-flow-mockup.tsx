"use client"
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Plus, Minus, Trash2, X, Check, 
  ShoppingBag, User, DollarSign, Receipt, 
  CreditCard, Phone, Building, Wallet,
  MessageCircle, Search, Package, Edit,
  CheckCircle, Send, ChevronLeft, ChevronRight,
  Mail, Printer
} from 'lucide-react';

const VendlyFlowMockup = () => {
  // Estado para el flujo actual
  const [currentFlow, setCurrentFlow] = useState('products');
  const [previousFlow, setPreviousFlow] = useState(null);
  const [animDirection, setAnimDirection] = useState('right');
  
  // Estado compartido entre pantallas
  const [cart, setCart] = useState([
    { id: 1, name: 'Coca Cola 500ml', price: 2500, quantity: 2 },
    { id: 2, name: 'Hamburguesa Clásica', price: 12000, quantity: 1 }
  ]);
  
  const [customer, setCustomer] = useState({
    name: 'María García',
    phone: '+57 310 987 6543',
    isFrequent: true
  });
  
  const [payments, setPayments] = useState([]);
  const [receiptMethod, setReceiptMethod] = useState('whatsapp');
  
  // Cálculos derivados
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = total - totalPaid;
  
  // Estilo común
  const theme = {
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
  
  // Formateo de montos
  const formatAmount = (amount) => parseInt(amount).toLocaleString();
  
  // Navegación con animación
  const navigateTo = (flow) => {
    // Determinar dirección de la animación basado en el flujo
    const flowOrder = ['products', 'cart', 'customer', 'payment', 'receipt'];
    const currentIndex = flowOrder.indexOf(currentFlow);
    const nextIndex = flowOrder.indexOf(flow);
    
    setAnimDirection(nextIndex > currentIndex ? 'right' : 'left');
    setPreviousFlow(currentFlow);
    setCurrentFlow(flow);
  };
  
  // Opciones de métodos de pago
  const paymentMethods = [
    { id: 'cash', name: 'Efectivo', icon: Wallet, color: '#22C55E' },
    { id: 'card', name: 'Tarjeta', icon: CreditCard, color: '#3B82F6' },
    { id: 'transfer', name: 'Transferencia', icon: Building, color: '#8B5CF6' },
    { id: 'nequi', name: 'Nequi', icon: Phone, color: '#EC4899' }
  ];
  
  // Componente de header consistente
  const FlowHeader = ({ title, showBackButton = true }) => (
    <div 
      className="sticky top-0 z-10 bg-white border-b shadow-sm"
      style={{ borderColor: theme.border }}
    >
      <div className="p-4 flex items-center justify-between">
        {showBackButton ? (
          <button 
            onClick={() => {
              const flowOrder = ['products', 'cart', 'customer', 'payment', 'receipt'];
              const currentIndex = flowOrder.indexOf(currentFlow);
              const prevFlow = flowOrder[currentIndex - 1];
              if (prevFlow) navigateTo(prevFlow);
            }}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: theme.bg }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: theme.textSecondary }} />
          </button>
        ) : (
          <div className="w-10"></div>
        )}
        
        <div className="flex-1 mx-3">
          <h1 
            className="font-bold text-lg"
            style={{ color: theme.text }}
          >
            {title}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <div 
              className="h-1.5 rounded-full overflow-hidden flex"
              style={{ backgroundColor: `${theme.primary}15`, width: '140px' }}
            >
              {['products', 'cart', 'customer', 'payment', 'receipt'].map((flow, index) => {
                const flowOrder = ['products', 'cart', 'customer', 'payment', 'receipt'];
                const currentIndex = flowOrder.indexOf(currentFlow);
                
                return (
                  <div
                    key={flow}
                    className="h-full transition-all duration-300"
                    style={{ 
                      backgroundColor: index <= currentIndex ? theme.primary : 'transparent',
                      width: '20%'
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        
        <div 
          className="py-2 px-3 rounded-lg font-medium"
          style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}
        >
          ${formatAmount(total)}
        </div>
      </div>
      
      {/* Cliente seleccionado - Persistente en todas las vistas después de seleccionar */}
      {customer && currentFlow !== 'products' && currentFlow !== 'cart' && (
        <div 
          className="px-4 py-2 border-t flex items-center justify-between"
          style={{ borderColor: theme.border }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${theme.primary}15` }}
            >
              <User className="w-4 h-4" style={{ color: theme.primary }} />
            </div>
            <div>
              <span style={{ color: theme.text }}>{customer.name}</span>
              {customer.isFrequent && (
                <span 
                  className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: `${theme.success}15`,
                    color: theme.success
                  }}
                >
                  Frecuente
                </span>
              )}
            </div>
          </div>
          
          {cart.length > 0 && (
            <div className="flex items-center gap-1">
              <ShoppingBag className="w-4 h-4" style={{ color: theme.textSecondary }} />
              <span style={{ color: theme.textSecondary }}>
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  // Botón de acción principal - Consistente en todas las vistas
  const ActionButton = ({
    text,
    icon: Icon,
    onClick,
    disabled = false,
    loading = false,
    color = theme.primary
  }) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full p-4 rounded-xl text-white font-medium text-lg flex items-center justify-center gap-2 active:scale-98 transition-transform"
      style={{ 
        backgroundColor: color,
        opacity: (disabled || loading) ? 0.7 : 1
      }}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : Icon && (
        <Icon className="w-6 h-6" />
      )}
      <span>{text}</span>
    </button>
  );
  
  // Footer con botón de acción - Consistente en todas las vistas
  const FlowFooter = ({ 
    buttonText, 
    buttonIcon, 
    onClick, 
    disabled = false,
    loading = false,
    color = theme.primary,
    secondaryAction = null
  }) => (
    <div 
      className="fixed bottom-0 left-0 right-0 p-4 border-t shadow-lg z-10"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.border,
        paddingBottom: '20px' // Simular safe-area-inset
      }}
    >
      <ActionButton 
        text={buttonText}
        icon={buttonIcon}
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        color={color}
      />
      
      {secondaryAction && (
        <div className="mt-3 text-center">
          <button
            onClick={secondaryAction.onClick}
            className="text-sm font-medium"
            style={{ color: theme.primary }}
          >
            {secondaryAction.text}
          </button>
        </div>
      )}
    </div>
  );
  
  // Pantalla de Lista de Productos (simplificada)
  const ProductsScreen = () => {
    return (
      <div className="bg-gray-50 min-h-screen" style={{ backgroundColor: theme.bg }}>
        <FlowHeader title="Productos" showBackButton={true} />
        
        <div className="p-4 pb-24">
          {/* Barra de búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: theme.textSecondary }} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
            />
          </div>
          
          {/* Productos frecuentes */}
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-2" style={{ color: theme.text }}>
              Productos frecuentes
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i}
                  className="p-3 rounded-xl flex items-center gap-3"
                  style={{ 
                    backgroundColor: theme.card,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme.primary}15` }}
                  >
                    <Package className="w-6 h-6" style={{ color: theme.primary }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate" style={{ color: theme.text }}>
                      Producto {i}
                    </p>
                    <p style={{ color: theme.primary }}>
                      ${(i * 5000).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Lista de productos */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div
                key={i + 4}
                className="p-3 rounded-xl flex items-center gap-3"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <Package className="w-5 h-5" style={{ color: theme.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="font-medium truncate" style={{ color: theme.text }}>
                      Producto {i + 4}
                    </p>
                    <p style={{ color: theme.primary }}>
                      ${((i + 4) * 2500).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p style={{ color: theme.textSecondary }}>
                      Stock: {(i + 4) * 3}
                    </p>
                    <button
                      className="p-1 rounded-md"
                      style={{ backgroundColor: `${theme.primary}15` }}
                    >
                      <Plus className="w-4 h-4" style={{ color: theme.primary }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <FlowFooter 
          buttonText={`Ver Carrito (${cart.length})`}
          buttonIcon={ShoppingBag}
          onClick={() => navigateTo('cart')}
          disabled={cart.length === 0}
        />
      </div>
    );
  };
  
  // Pantalla de Carrito
  const CartScreen = () => {
    return (
      <div className="bg-gray-50 min-h-screen" style={{ backgroundColor: theme.bg }}>
        <FlowHeader title="Carrito" />
        
        <div className="p-4 pb-24">
          {/* Items del carrito */}
          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${theme.primary}15` }}
                  >
                    <Package className="w-5 h-5" style={{ color: theme.primary }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="font-medium truncate" style={{ color: theme.text }}>
                        {item.name}
                      </p>
                      <p className="font-medium" style={{ color: theme.text }}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p style={{ color: theme.textSecondary }}>
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 rounded-md"
                          style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
                          onClick={() => {
                            if (item.quantity > 1) {
                              setCart(cart.map(i => 
                                i.id === item.id ? {...i, quantity: i.quantity - 1} : i
                              ));
                            }
                          }}
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-[28px] text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="p-1.5 rounded-md"
                          style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                          onClick={() => {
                            setCart(cart.map(i => 
                              i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                            ));
                          }}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          className="p-1.5 rounded-md ml-1"
                          style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
                          onClick={() => {
                            setCart(cart.filter(i => i.id !== item.id));
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Resumen de la venta */}
          <div
            className="p-4 rounded-xl mb-4"
            style={{ 
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`
            }}
          >
            <h2 
              className="font-medium mb-3 text-lg"
              style={{ color: theme.text }}
            >
              Resumen
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span style={{ color: theme.textSecondary }}>Subtotal</span>
                <span style={{ color: theme.text }}>${formatAmount(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: theme.textSecondary }}>IVA (19%)</span>
                <span style={{ color: theme.text }}>${formatAmount(tax)}</span>
              </div>
              <div className="pt-2 border-t flex justify-between" style={{ borderColor: theme.border }}>
                <span className="font-medium" style={{ color: theme.text }}>Total</span>
                <span className="font-bold" style={{ color: theme.primary }}>
                  ${formatAmount(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <FlowFooter 
          buttonText="Continuar al Cliente"
          buttonIcon={User}
          onClick={() => navigateTo('customer')}
        />
      </div>
    );
  };
  
  // Pantalla de Clientes
  const CustomerScreen = () => {
    return (
      <div className="bg-gray-50 min-h-screen" style={{ backgroundColor: theme.bg }}>
        <FlowHeader title="Cliente" />
        
        <div className="p-4 pb-24">
          {/* Opciones de clientes */}
          <div className="mb-4">
            <h2 className="text-lg font-medium mb-3" style={{ color: theme.text }}>
              Cliente para la venta
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="p-4 rounded-xl flex flex-col items-center justify-center h-24"
                style={{ 
                  backgroundColor: theme.card,
                  border: `2px solid ${theme.primary}`
                }}
              >
                <User className="w-8 h-8 mb-2" style={{ color: theme.primary }} />
                <span className="font-medium" style={{ color: theme.text }}>
                  Cliente
                </span>
                <span className="text-xs" style={{ color: theme.textSecondary }}>
                  Buscar existente
                </span>
              </button>
              
              <button
                className="p-4 rounded-xl flex flex-col items-center justify-center h-24"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`
                }}
              >
                <Plus className="w-8 h-8 mb-2" style={{ color: theme.primary }} />
                <span className="font-medium" style={{ color: theme.text }}>
                  Nuevo
                </span>
                <span className="text-xs" style={{ color: theme.textSecondary }}>
                  Crear cliente
                </span>
              </button>
            </div>
          </div>
          
          {/* Barra de búsqueda */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: theme.textSecondary }} />
            <input
              type="text"
              placeholder="Buscar por nombre o teléfono..."
              className="w-full pl-10 pr-4 py-3 rounded-xl"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
            />
          </div>
          
          {/* Cliente actual seleccionado */}
          <div 
            className="p-4 rounded-xl mb-4 border-2 border-dashed"
            style={{ 
              backgroundColor: `${theme.success}05`,
              borderColor: theme.success
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.success}15` }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: theme.success }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-medium" style={{ color: theme.text }}>
                    {customer.name}
                  </h2>
                  {customer.isFrequent && (
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${theme.success}15`,
                        color: theme.success
                      }}
                    >
                      Frecuente
                    </span>
                  )}
                </div>
                <p style={{ color: theme.textSecondary }}>
                  {customer.phone}
                </p>
                <button
                  className="mt-1 text-sm flex items-center gap-1"
                  style={{ color: theme.primary }}
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Editar cliente</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Clientes recientes */}
          <h3 className="text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>
            Clientes recientes
          </h3>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3 rounded-xl flex items-center gap-3"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <User className="w-5 h-5" style={{ color: theme.primary }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium" style={{ color: theme.text }}>
                    Cliente {i}
                  </p>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    +57 300 123 456{i}
                  </p>
                </div>
                <button
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <Check className="w-4 h-4" style={{ color: theme.primary }} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <FlowFooter 
          buttonText="Continuar al Pago"
          buttonIcon={DollarSign}
          onClick={() => navigateTo('payment')}
        />
      </div>
    );
  };
  
  // Pantalla de Pagos
  const PaymentScreen = () => {
    const [activeMethod, setActiveMethod] = useState(null);
    const [currentAmount, setCurrentAmount] = useState('');
    
    const handleAddPayment = (method, amount) => {
      if (!method || !amount) return;
      
      setPayments([
        ...payments, 
        { 
          id: Date.now(),
          method,
          amount: parseInt(amount)
        }
      ]);
      
      setActiveMethod(null);
      setCurrentAmount('');
    };
    
    return (
      <div className="bg-gray-50 min-h-screen" style={{ backgroundColor: theme.bg }}>
        <FlowHeader title="Método de Pago" />
        
        <div className="p-4 pb-24">
          {/* Resumen de la venta */}
          <div 
            className="p-4 rounded-xl mb-4 flex items-center gap-3"
            style={{ 
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`
            }}
          >
            <div 
              className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: `${theme.primary}15` }}
            >
              <ShoppingBag className="w-6 h-6" style={{ color: theme.primary }} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p style={{ color: theme.textSecondary }}>Total a pagar</p>
                <p 
                  className="font-bold text-lg"
                  style={{ color: theme.primary }}
                >
                  ${formatAmount(total)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} productos
                </p>
                {remaining > 0 ? (
                  <p style={{ color: theme.warning }}>
                    Pendiente: ${formatAmount(remaining)}
                  </p>
                ) : (
                  <p style={{ color: theme.success }}>
                    Pagado completamente
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Pagos registrados */}
          {payments.length > 0 && (
            <div 
              className="rounded-xl overflow-hidden mb-4"
              style={{ backgroundColor: theme.card }}
            >
              <div 
                className="p-3 border-b flex justify-between items-center"
                style={{ borderColor: theme.border }}
              >
                <h2 
                  className="font-medium"
                  style={{ color: theme.text }}
                >
                  Pagos Registrados
                </h2>
                <button
                  className="p-1.5 rounded-lg text-sm flex items-center gap-1"
                  style={{ 
                    backgroundColor: `${theme.error}15`,
                    color: theme.error
                  }}
                  onClick={() => setPayments([])}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Eliminar</span>
                </button>
              </div>
              
              {payments.map(payment => (
                <div 
                  key={payment.id}
                  className="p-3 border-b last:border-b-0 flex justify-between items-center"
                  style={{ borderColor: theme.border }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${payment.method.color}15` }}
                    >
                      <payment.method.icon 
                        className="w-5 h-5" 
                        style={{ color: payment.method.color }} 
                      />
                    </div>
                    <span className="font-medium" style={{ color: theme.text }}>
                      {payment.method.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span 
                      className="font-bold"
                      style={{ color: theme.text }}
                    >
                      ${formatAmount(payment.amount)}
                    </span>
                    <button
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${theme.error}15` }}
                      onClick={() => {
                        setPayments(payments.filter(p => p.id !== payment.id));
                      }}
                    >
                      <Trash2 className="w-4 h-4" style={{ color: theme.error }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {remaining <= 0 ? (
            <div 
              className="p-4 rounded-xl mb-4 border-2 border-dashed"
              style={{ 
                backgroundColor: `${theme.success}05`,
                borderColor: theme.success
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${theme.success}15` }}
                >
                  <CheckCircle className="w-6 h-6" style={{ color: theme.success }} />
                </div>
                <div>
                  <h2 
                    className="text-lg font-bold"
                    style={{ color: theme.success }}
                  >
                    ¡Pago completado!
                  </h2>
                  <p style={{ color: theme.text }}>
                    Total pagado: ${formatAmount(totalPaid)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Método de pago activo */}
              {activeMethod ? (
                <div className="mb-4">
                  <div 
                    className="rounded-xl overflow-hidden mb-3"
                    style={{ backgroundColor: theme.card }}
                  >
                    <div 
                      className="p-3 border-b flex justify-between items-center"
                      style={{ borderColor: theme.border }}
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${activeMethod.color}15` }}
                        >
                          <activeMethod.icon 
                            className="w-5 h-5" 
                            style={{ color: activeMethod.color }} 
                          />
                        </div>
                        <span className="font-medium" style={{ color: theme.text }}>
                          {activeMethod.name}
                        </span>
                      </div>
                      
                      <button
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${theme.error}15` }}
                        onClick={() => {
                          setActiveMethod(null);
                          setCurrentAmount('');
                        }}
                      >
                        <X className="w-4 h-4" style={{ color: theme.error }} />
                      </button>
                    </div>
                    
                    <div 
                      className="p-3 border-b flex items-center justify-center"
                      style={{ borderColor: theme.border }}
                    >
                      <DollarSign className="w-6 h-6 mr-1" style={{ color: activeMethod.color }} />
                      <span 
                        className="text-3xl font-bold"
                        style={{ color: theme.text }}
                      >
                        {currentAmount ? formatAmount(currentAmount) : '0'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-px" style={{ backgroundColor: theme.border }}>
                      <button
                        className="p-4 active:scale-98 transition-transform font-medium text-lg"
                        style={{ 
                          backgroundColor: theme.card,
                          color: theme.primary
                        }}
                        onClick={() => {
                          setCurrentAmount(remaining.toString());
                        }}
                      >
                        Monto Exacto
                      </button>
                      
                      <button
                        className="p-4 active:scale-98 transition-transform font-medium text-lg"
                        style={{ backgroundColor: theme.card }}
                        onClick={() => {
                          const rounded = Math.ceil(remaining / 1000) * 1000;
                          setCurrentAmount(rounded.toString());
                        }}
                      >
                        ${formatAmount(Math.ceil(remaining / 1000) * 1000)}
                      </button>
                      
                      {[10000, 20000, 50000, 100000].map(amount => (
                        <button
                          key={amount}
                          className="p-4 active:scale-98 transition-transform font-medium"
                          style={{ 
                            backgroundColor: theme.card,
                            color: amount > remaining ? theme.textSecondary : theme.text,
                            opacity: amount > remaining ? 0.6 : 1
                          }}
                          onClick={() => {
                            if (amount <= remaining) {
                              setCurrentAmount(amount.toString());
                            }
                          }}
                        >
                          ${formatAmount(amount)}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => {
                        if (currentAmount && parseInt(currentAmount) > 0) {
                          handleAddPayment(activeMethod, currentAmount);
                        }
                      }}
                      disabled={!currentAmount || parseInt(currentAmount) <= 0 || parseInt(currentAmount) > remaining}
                      className="w-full p-4 text-white font-medium text-lg active:scale-98 transition-transform"
                      style={{ 
                        backgroundColor: activeMethod.color,
                        opacity: (!currentAmount || parseInt(currentAmount) <= 0 || parseInt(currentAmount) > remaining) ? 0.6 : 1
                      }}
                    >
                      Registrar Pago
                    </button>
                  </div>
                  
                  {/* Teclado numérico */}
                  <div 
                    className="rounded-xl overflow-hidden"
                    style={{ backgroundColor: theme.card }}
                  >
                    <div className="grid grid-cols-3 gap-px" style={{ backgroundColor: theme.border }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button
                          key={num}
                          className="p-5 flex items-center justify-center text-2xl font-medium active:scale-98 transition-transform"
                          style={{ 
                            backgroundColor: theme.card,
                            color: theme.text,
                            minHeight: '64px'
                          }}
                          onClick={() => {
                            setCurrentAmount((prev) => prev + num.toString());
                          }}
                        >
                          {num}
                        </button>
                      ))}
                      <button
                        className="p-5 flex items-center justify-center font-medium active:scale-98 transition-transform"
                        style={{ 
                          backgroundColor: theme.card,
                          color: theme.error,
                          minHeight: '64px'
                        }}
                        onClick={() => {
                          setCurrentAmount('');
                        }}
                      >
                        <span className="text-xl">C</span>
                      </button>
                      <button
                        className="p-5 flex items-center justify-center text-2xl font-medium active:scale-98 transition-transform"
                        style={{ 
                          backgroundColor: theme.card,
                          color: theme.text,
                          minHeight: '64px'
                        }}
                        onClick={() => {
                          setCurrentAmount((prev) => prev + '0');
                        }}
                      >
                        0
                      </button>
                      <button
                        className="p-5 flex items-center justify-center font-medium active:scale-98 transition-transform"
                        style={{ 
                          backgroundColor: theme.card,
                          color: theme.error,
                          minHeight: '64px'
                        }}
                        onClick={() => {
                          setCurrentAmount((prev) => prev.slice(0, -1));
                        }}
                      >
                        <span className="text-xl">←</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 
                    className="text-lg font-medium mb-3"
                    style={{ color: theme.text }}
                  >
                    Selecciona un método de pago
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {paymentMethods.map(method => (
                      <button
                        key={method.id}
                        className="p-4 rounded-xl flex flex-col items-center active:scale-98 transition-transform"
                        style={{ 
                          backgroundColor: theme.card,
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          minHeight: '112px'
                        }}
                        onClick={() => {
                          setActiveMethod(method);
                          setCurrentAmount('');
                        }}
                      >
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                          style={{ backgroundColor: `${method.color}15` }}
                        >
                          <method.icon className="w-8 h-8" style={{ color: method.color }} />
                        </div>
                        <span 
                          className="text-lg font-medium"
                          style={{ color: theme.text }}
                        >
                          {method.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        
        <FlowFooter 
          buttonText="Continuar al Recibo"
          buttonIcon={Receipt}
          onClick={() => navigateTo('receipt')}
          disabled={remaining > 0}
          color={remaining <= 0 ? theme.success : theme.primary}
        />
      </div>
    );
  };
  
  // Pantalla de Recibo
  const ReceiptScreen = () => {
    return (
      <div className="bg-gray-50 min-h-screen" style={{ backgroundColor: theme.bg }}>
        <FlowHeader title="Enviar Recibo" />
        
        <div className="p-4 pb-24">
          {/* Éxito de venta */}
          <div 
            className="p-4 rounded-xl mb-4 border-2 border-dashed"
            style={{ 
              backgroundColor: `${theme.success}05`,
              borderColor: theme.success
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.success}15` }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: theme.success }} />
              </div>
              <div>
                <h2 
                  className="text-lg font-bold"
                  style={{ color: theme.success }}
                >
                  ¡Venta completada!
                </h2>
                <p style={{ color: theme.text }}>
                  ${formatAmount(total)} • {new Date().toLocaleString()}
                </p>
                <div className="flex mt-1">
                  <div className="flex items-center gap-1 mr-3">
                    <User className="w-3.5 h-3.5" style={{ color: theme.textSecondary }} />
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                      {customer.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-3.5 h-3.5" style={{ color: theme.textSecondary }} />
                    <span className="text-sm" style={{ color: theme.textSecondary }}>
                      {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Cliente */}
          <div 
            className="p-4 rounded-xl mb-4"
            style={{ 
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <User className="w-5 h-5" style={{ color: theme.primary }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p 
                    className="font-medium"
                    style={{ color: theme.text }}
                  >
                    {customer.name}
                  </p>
                  {customer.isFrequent && (
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: `${theme.success}15`,
                        color: theme.success
                      }}
                    >
                      Frecuente
                    </span>
                  )}
                </div>
                <p style={{ color: theme.textSecondary }}>
                  {customer.phone}
                </p>
              </div>
            </div>
          </div>
          
          {/* Opciones de envío */}
          <h2 
            className="text-lg font-medium mb-3"
            style={{ color: theme.text }}
          >
            Enviar factura:
          </h2>
          
          <div className="space-y-3 mb-4">
            <button
              className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
              style={{ 
                backgroundColor: receiptMethod === 'whatsapp' ? `${theme.whatsapp}08` : theme.card,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: receiptMethod === 'whatsapp' ? theme.whatsapp : theme.border
              }}
              onClick={() => setReceiptMethod('whatsapp')}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${theme.whatsapp}15`
                }}
              >
                <MessageCircle className="w-7 h-7" style={{ color: theme.whatsapp }} />
              </div>
              <div className="flex-1">
                <p 
                  className="text-lg font-medium"
                  style={{ 
                    color: receiptMethod === 'whatsapp' ? theme.whatsapp : theme.text
                  }}
                >
                  WhatsApp
                </p>
                <p 
                  className="text-base"
                  style={{ color: theme.textSecondary }}
                >
                  Enviar a {customer.phone}
                </p>
              </div>
              {receiptMethod === 'whatsapp' && (
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.whatsapp }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
            
            <button
              className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
              style={{ 
                backgroundColor: receiptMethod === 'email' ? `${theme.primary}08` : theme.card,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: receiptMethod === 'email' ? theme.primary : theme.border
              }}
              onClick={() => setReceiptMethod('email')}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${theme.primary}15`
                }}
              >
                <Mail className="w-7 h-7" style={{ color: theme.primary }} />
              </div>
              <div className="flex-1">
                <p 
                  className="text-lg font-medium"
                  style={{ 
                    color: receiptMethod === 'email' ? theme.primary : theme.text
                  }}
                >
                  Email
                </p>
                <p 
                  className="text-base"
                  style={{ color: theme.textSecondary }}
                >
                  Añadir correo electrónico
                </p>
              </div>
              {receiptMethod === 'email' && (
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
            
            <button
              className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
              style={{ 
                backgroundColor: receiptMethod === 'print' ? `${theme.primary}08` : theme.card,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: receiptMethod === 'print' ? theme.primary : theme.border
              }}
              onClick={() => setReceiptMethod('print')}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${theme.primary}15`
                }}
              >
                <Printer className="w-7 h-7" style={{ color: theme.primary }} />
              </div>
              <div className="flex-1">
                <p 
                  className="text-lg font-medium"
                  style={{ 
                    color: receiptMethod === 'print' ? theme.primary : theme.text
                  }}
                >
                  Imprimir
                </p>
                <p 
                  className="text-base"
                  style={{ color: theme.textSecondary }}
                >
                  Impresora térmica
                </p>
              </div>
              {receiptMethod === 'print' && (
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
            
            <button
              className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
              style={{ 
                backgroundColor: receiptMethod === 'none' ? `${theme.primary}08` : theme.card,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: receiptMethod === 'none' ? theme.primary : theme.border
              }}
              onClick={() => setReceiptMethod('none')}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ 
                  backgroundColor: `${theme.primary}15`
                }}
              >
                <X className="w-7 h-7" style={{ color: theme.primary }} />
              </div>
              <div className="flex-1">
                <p 
                  className="text-lg font-medium"
                  style={{ 
                    color: receiptMethod === 'none' ? theme.primary : theme.text
                  }}
                >
                  No enviar
                </p>
                <p 
                  className="text-base"
                  style={{ color: theme.textSecondary }}
                >
                  Solo completar venta
                </p>
              </div>
              {receiptMethod === 'none' && (
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.primary }}
                >
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>
        </div>
        
        <FlowFooter 
          buttonText={receiptMethod === 'none' ? 'Finalizar Venta' : 'Enviar y Finalizar'}
          buttonIcon={receiptMethod === 'none' ? Check : Send}
          onClick={() => {
            // Reset and back to products
            setCart([]);
            setPayments([]);
            navigateTo('products');
          }}
          color={theme.success}
        />
      </div>
    );
  };

  // Renderizar pantalla actual con animación
  const renderCurrentScreen = () => {
    // Mostrar cliente solo después de haberlo seleccionado
    // (después de la pantalla de customer)
    const flowOrder = ['products', 'cart', 'customer', 'payment', 'receipt'];
    const currentIndex = flowOrder.indexOf(currentFlow);
    const customerIndex = flowOrder.indexOf('customer');
    
    // Solo mostrar cliente en el header cuando ya pasamos por la pantalla de cliente
    const showCustomerInHeader = currentIndex > customerIndex;
    
    switch(currentFlow) {
      case 'products':
        return <ProductsScreen />;
      case 'cart':
        return <CartScreen />;
      case 'customer':
        return <CustomerScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'receipt':
        return <ReceiptScreen />;
      default:
        return <ProductsScreen />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {renderCurrentScreen()}
    </div>
  );
};

export default VendlyFlowMockup;