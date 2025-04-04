"use client"

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Plus, 
  Minus,
  DollarSign, 
  Wallet, 
  CreditCard, 
  Building, 
  Phone, 
  CheckCircle, 
  ShoppingBag, 
  Edit, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  RefreshCcw,
  Trash2,
  AlertCircle,
  User
} from 'lucide-react';

const OptimizedPaymentScreen = () => {
  // Estado principal
  const [activeMethod, setActiveMethod] = useState(null);
  const [payments, setPayments] = useState([]);
  const [currentAmount, setCurrentAmount] = useState('');
  const [showNumpad, setShowNumpad] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [changeAmount, setChangeAmount] = useState(0);
  const [showChangeCalculator, setShowChangeCalculator] = useState(false);
  
  // Datos simulados
  const cart = [
    { id: 1, name: 'Coca Cola 500ml', price: 2500, quantity: 2 },
    { id: 2, name: 'Hamburguesa Clásica', price: 12000, quantity: 1 }
  ];
  
  const customer = {
    name: 'María García',
    phone: '+57 310 987 6543',
    isFrequent: true
  };
  
  // Cálculos
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;
  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = total - totalPaid;
  
  // Estilo y colores
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B'
  };
  
  // Métodos de pago con colores optimizados para mejorar UX
  const paymentMethods = [
    { id: 'cash', name: 'Efectivo', icon: Wallet, color: '#22C55E' },
    { id: 'card', name: 'Tarjeta', icon: CreditCard, color: '#3B82F6' },
    { id: 'transfer', name: 'Transferencia', icon: Building, color: '#8B5CF6' },
    { id: 'nequi', name: 'Nequi', icon: Phone, color: '#EC4899' }
  ];
  
  // Denominaciones de billetes para cambio
  const denominations = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50];
  
  // Formatear montos para mostrar
  const formatAmount = (amount) => parseInt(amount || 0).toLocaleString();
  
  // Añadir pago
  const handleAddPayment = (method, amount) => {
    if (!method || !amount) return;
    
    const paymentAmount = parseInt(amount);
    
    // Si el método es efectivo y el monto es mayor que el pendiente, calcular cambio
    if (method.id === 'cash' && paymentAmount > remaining && !isEditMode) {
      setChangeAmount(paymentAmount - remaining);
      setShowChangeCalculator(true);
      
      // Añadir pago por el monto exacto pendiente (el resto es cambio)
      setPayments([
        ...payments, 
        { 
          id: Date.now(),
          method,
          amount: remaining,
          originalAmount: paymentAmount
        }
      ]);
    } else {
      // Añadir pago normal
      setPayments([
        ...payments, 
        { 
          id: Date.now(),
          method,
          amount: paymentAmount
        }
      ]);
    }
    
    setActiveMethod(null);
    setCurrentAmount('');
  };
  
  // Eliminar un pago
  const handleRemovePayment = (paymentId) => {
    setPayments(payments.filter(p => p.id !== paymentId));
    setChangeAmount(0);
    setShowChangeCalculator(false);
  };
  
  // Calcular las denominaciones para el cambio
  const calculateChangeDenominations = () => {
    let change = changeAmount;
    const result = [];
    
    for (const denom of denominations) {
      const count = Math.floor(change / denom);
      if (count > 0) {
        result.push({ value: denom, count });
        change -= count * denom;
      }
    }
    
    return result;
  };
  
  // Header
  const PaymentHeader = () => {
    // Definir las etapas del flujo
    const flowStages = ['products', 'cart', 'customer', 'payment', 'receipt'];
    const currentStageIndex = 3; // payment es la cuarta etapa (índice 3)
    
    return (
      <div 
        className="sticky top-0 z-10 bg-white border-b shadow-sm"
        style={{ backgroundColor: theme.card, borderColor: theme.border }}
      >
        <div className="p-4 flex items-center justify-between">
          <button 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: theme.bg }}
          >
            <ArrowLeft className="w-5 h-5" style={{ color: theme.textSecondary }} />
          </button>
          
          <div className="flex-1 mx-3">
            <h1 
              className="font-bold text-lg"
              style={{ color: theme.text }}
            >
              Método de Pago
            </h1>
            
            {/* Indicador de progreso del flujo - igual que en otras pantallas */}
            <div className="flex items-center gap-2 mt-1">
              <div 
                className="h-1.5 rounded-full overflow-hidden flex"
                style={{ backgroundColor: `${theme.primary}15`, width: '140px' }}
              >
                {flowStages.map((stage, index) => (
                  <div
                    key={stage}
                    className="h-full transition-all duration-300"
                    style={{ 
                      backgroundColor: index <= currentStageIndex ? theme.primary : 'transparent',
                      width: '20%'
                    }}
                  />
                ))}
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
        
        {/* Información del cliente */}
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
          
          <div className="flex items-center gap-1">
            <ShoppingBag className="w-4 h-4" style={{ color: theme.textSecondary }} />
            <span style={{ color: theme.textSecondary }}>
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  // Componente de cabecera mejorado
  const PaymentSummary = () => (
    <div 
      className="p-4 rounded-xl mb-4 flex items-center gap-3"
      style={{ 
        backgroundColor: remaining <= 0 ? `${theme.success}08` : theme.card,
        border: `${remaining <= 0 ? '2px dashed' : '1px solid'} ${remaining <= 0 ? theme.success : theme.border}`
      }}
    >
      <div 
        className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
        style={{ 
          backgroundColor: remaining <= 0 ? `${theme.success}15` : `${theme.primary}15` 
        }}
      >
        {remaining <= 0 ? (
          <CheckCircle className="w-6 h-6" style={{ color: theme.success }} />
        ) : (
          <DollarSign className="w-6 h-6" style={{ color: theme.primary }} />
        )}
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
        
        {payments.length > 0 && (
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Total pagado: ${formatAmount(totalPaid)}
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-1">
          {remaining > 0 ? (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: theme.warning }} />
              <p style={{ color: theme.warning, fontWeight: "500" }}>
                Pendiente: ${formatAmount(remaining)}
              </p>
            </div>
          ) : (
            <p style={{ color: theme.success, fontWeight: "500" }}>
              ¡Pago completado!
            </p>
          )}
          
          {payments.length > 0 && !isEditMode && remaining <= 0 && (
            <button
              onClick={() => setIsEditMode(true)}
              className="text-sm px-2 py-1 rounded flex items-center gap-1"
              style={{ 
                backgroundColor: `${theme.primary}15`,
                color: theme.primary
              }}
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          )}
          
          {isEditMode && (
            <button
              onClick={() => setIsEditMode(false)}
              className="text-sm px-2 py-1 rounded flex items-center gap-1"
              style={{ 
                backgroundColor: `${theme.success}15`,
                color: theme.success
              }}
            >
              <Check className="w-3.5 h-3.5" />
              <span>Listo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
  // Banner de modo edición
  const EditModeBanner = () => {
    if (!isEditMode) return null;
    
    return (
      <div 
        className="p-3 rounded-xl mb-4 border"
        style={{ 
          backgroundColor: `${theme.primary}08`,
          borderColor: `${theme.primary}30`
        }}
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" style={{ color: theme.primary }} />
          <div className="flex-1">
            <p className="font-medium" style={{ color: theme.primary }}>
              Modo edición activado
            </p>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Ahora puedes modificar los pagos registrados
            </p>
          </div>
          <button
            onClick={() => setIsEditMode(false)}
            className="p-2 rounded-lg"
            style={{ 
              backgroundColor: `${theme.primary}15`
            }}
          >
            <X className="w-4 h-4" style={{ color: theme.primary }} />
          </button>
        </div>
      </div>
    );
  };
  
  // Componente para pagos registrados
  const RegisteredPayments = () => {
    if (payments.length === 0) return null;
    
    return (
      <div 
        className="rounded-xl overflow-hidden mb-4"
        style={{ 
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}`
        }}
      >
        <div 
          className="p-3 border-b flex justify-between items-center"
          style={{ borderColor: theme.border }}
        >
          <div>
            <h2 
              className="font-medium"
              style={{ color: theme.text }}
            >
              Pagos Registrados
            </h2>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Total pagado: ${formatAmount(totalPaid)}
            </p>
          </div>
          
          {payments.length > 0 && (
            <div className="flex gap-2">
              {isEditMode && (
                <button
                  onClick={() => setIsEditMode(false)}
                  className="p-2 rounded-lg"
                  style={{ 
                    backgroundColor: `${theme.success}15`,
                    color: theme.success
                  }}
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={() => {
                  setPayments([]);
                  setChangeAmount(0);
                  setShowChangeCalculator(false);
                  setIsEditMode(false);
                }}
                className="p-2 rounded-lg"
                style={{ 
                  backgroundColor: `${theme.error}15`,
                  color: theme.error
                }}
              >
                <RefreshCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        
        <div className="max-h-52 overflow-y-auto">
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
                <div>
                  <p className="font-medium" style={{ color: theme.text }}>
                    {payment.method.name}
                  </p>
                  
                  {payment.originalAmount && payment.originalAmount > payment.amount && (
                    <p className="text-xs" style={{ color: theme.textSecondary }}>
                      Recibido: ${formatAmount(payment.originalAmount)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span 
                  className="font-bold"
                  style={{ color: theme.text }}
                >
                  ${formatAmount(payment.amount)}
                </span>
                <button
                  onClick={() => handleRemovePayment(payment.id)}
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${theme.error}15` }}
                >
                  <Trash2 className="w-4 h-4" style={{ color: theme.error }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Calculadora de cambio/vuelto
  const ChangeCalculator = () => {
    if (!showChangeCalculator || changeAmount <= 0) return null;
    
    const changeDenominations = calculateChangeDenominations();
    
    return (
      <div 
        className="rounded-xl overflow-hidden mb-4"
        style={{ 
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}`
        }}
      >
        <div 
          className="p-3 border-b"
          style={{ 
            borderColor: theme.border,
            backgroundColor: `${theme.success}08` 
          }}
        >
          <h2 
            className="font-medium flex items-center gap-2"
            style={{ color: theme.success }}
          >
            <DollarSign className="w-5 h-5" />
            <span>Cambio a devolver: ${formatAmount(changeAmount)}</span>
          </h2>
        </div>
        
        <div className="p-3">
          <p className="mb-2 text-sm" style={{ color: theme.textSecondary }}>
            Sugerencia de billetes y monedas:
          </p>
          
          <div className="grid grid-cols-2 gap-2">
            {changeDenominations.map(denom => (
              <div 
                key={denom.value}
                className="flex justify-between p-2 rounded-lg"
                style={{ backgroundColor: theme.bg }}
              >
                <span style={{ color: theme.text }}>${formatAmount(denom.value)}</span>
                <span 
                  className="px-2 rounded-full"
                  style={{ 
                    backgroundColor: `${theme.success}15`,
                    color: theme.success
                  }}
                >
                  x{denom.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Mensaje de pago completo
  const PaymentCompleteMessage = () => {
    if (remaining > 0 || isEditMode) return null;
    
    return (
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
            <button
              onClick={() => setIsEditMode(true)}
              className="text-sm flex items-center gap-1 mt-1"
              style={{ color: theme.primary }}
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Editar pagos</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Componente de selección de método de pago
  const PaymentMethodSelection = () => {
    if (activeMethod || (remaining <= 0 && !isEditMode)) return null;
    
    return (
      <div>
        <h2 
          className="text-lg font-medium mb-3"
          style={{ color: theme.text }}
        >
          {isEditMode ? 'Selecciona un método para añadir pago' : 'Selecciona un método de pago'}
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
    );
  };
  
  // Componente para introducir monto
  const AmountInput = () => {
    if (!activeMethod) return null;
    
    const method = activeMethod;
    const maxAmount = isEditMode ? 999999999 : remaining;
    const quickAmounts = method.id === 'cash' 
      ? [5000, 10000, 20000, 50000, 100000] 
      : [remaining, Math.ceil(remaining / 1000) * 1000, 5000, 10000];
    
    return (
      <div className="space-y-4">
        <div 
          className="rounded-xl overflow-hidden"
          style={{ 
            backgroundColor: theme.card,
            border: `1px solid ${theme.border}` // Borde neutro en lugar de colorido
          }}
        >
          <div 
            className="p-3 border-b flex justify-between items-center"
            style={{ borderColor: theme.border }}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${method.color}15` }}
              >
                <method.icon 
                  className="w-5 h-5" 
                  style={{ color: method.color }} 
                />
              </div>
              <span className="font-medium" style={{ color: theme.text }}>
                {method.name}
              </span>
            </div>
            
            <button
              onClick={() => {
                setActiveMethod(null);
                setCurrentAmount('');
              }}
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${theme.error}15` }}
            >
              <X className="w-4 h-4" style={{ color: theme.error }} />
            </button>
          </div>
          
          <div 
            className="p-3 border-b flex items-center justify-center"
            style={{ borderColor: theme.border }}
          >
            <DollarSign className="w-6 h-6 mr-1" style={{ color: method.color }} />
            <span 
              className="text-3xl font-bold"
              style={{ color: theme.text }}
            >
              {currentAmount ? formatAmount(currentAmount) : '0'}
            </span>
          </div>
          
          {/* Montos rápidos - Siempre visibles */}
          <div className="p-3 border-b" style={{ borderColor: theme.border }}>
            <div className="flex gap-2 flex-wrap">
              <button
                className="flex-1 p-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: method.color }}
                onClick={() => {
                  // Usar monto exacto pendiente o total si estamos en modo edición
                  const amountToUse = isEditMode ? total : remaining;
                  setCurrentAmount(amountToUse.toString());
                }}
              >
                Monto Exacto
              </button>
              
              {quickAmounts.map(amount => {
                // No mostrar montos mayores que el pendiente si no estamos en modo edición
                if (!isEditMode && amount > maxAmount) return null;
                
                return (
                  <button
                    key={amount}
                    className="flex-1 p-2 rounded-lg text-sm font-medium"
                    style={{ 
                      backgroundColor: theme.bg,
                      color: theme.text
                    }}
                    onClick={() => setCurrentAmount(amount.toString())}
                  >
                    ${formatAmount(amount)}
                  </button>
                );
              })}
            </div>
          </div>
          
          <button
            onClick={() => {
              if (currentAmount && parseInt(currentAmount) > 0) {
                handleAddPayment(method, currentAmount);
              }
            }}
            disabled={!currentAmount || parseInt(currentAmount) <= 0 || (!isEditMode && parseInt(currentAmount) > maxAmount)}
            className="w-full p-4 text-white font-medium text-lg active:scale-98 transition-transform"
            style={{ 
              backgroundColor: method.color,
              opacity: (!currentAmount || parseInt(currentAmount) <= 0 || (!isEditMode && parseInt(currentAmount) > maxAmount)) ? 0.6 : 1
            }}
          >
            Registrar Pago
          </button>
        </div>
      </div>
    );
  };
  
  // Teclado numérico optimizado ergonómicamente
  const NumpadComponent = () => {
    if (!activeMethod) return null;
    
    return (
      <div 
        className="rounded-xl overflow-hidden mb-4"
        style={{ 
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}` // Borde neutro en lugar de color específico
        }}
      >
        <div className="grid grid-cols-3 gap-px" style={{ backgroundColor: theme.border }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <button
              key={num}
              className="p-5 flex items-center justify-center text-2xl font-medium active:scale-98 transition-transform"
              style={{ 
                backgroundColor: theme.card,
                color: theme.text,
                minHeight: '70px'
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
              minHeight: '70px'
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
              minHeight: '70px'
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
              minHeight: '70px'
            }}
            onClick={() => {
              setCurrentAmount((prev) => prev.slice(0, -1));
            }}
          >
            <span className="text-xl">←</span>
          </button>
        </div>
      </div>
    );
  };
  
  // Botón de acción principal
  const ActionButton = () => (
    <div 
      className="fixed bottom-0 left-0 right-0 p-4 border-t bg-white z-10"
      style={{ 
        borderColor: theme.border,
        paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)'
      }}
    >
      <button
        disabled={remaining > 0 || isEditMode}
        className="w-full p-4 rounded-xl text-white font-medium text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        style={{ 
          backgroundColor: remaining <= 0 ? theme.success : theme.primary,
          opacity: (remaining > 0 || isEditMode) ? 0.7 : 1
        }}
      >
        <Check className="w-6 h-6" />
        <span>Continuar al Recibo</span>
      </button>
    </div>
  );
  
  // Componentes auxiliares para interacción intuitiva
  const ChevronUp = ({ className, ...props }) => (
    <ChevronLeft className={`transform rotate-90 ${className}`} {...props} />
  );
  
  const ChevronDown = ({ className, ...props }) => (
    <ChevronRight className={`transform rotate-90 ${className}`} {...props} />
  );
  
  return (
    <div className="bg-gray-50 min-h-screen pb-24" style={{ backgroundColor: theme.bg }}>
      <PaymentHeader />
      
      <div className="p-4">
        {/* Condicional: mostrar el resumen de pago normal o el mensaje de éxito, pero no ambos */}
        {remaining <= 0 && !isEditMode ? (
          /* Mensaje de pago completo - solo cuando está pagado y no editando */
          <PaymentCompleteMessage />
        ) : (
          /* Resumen de pago - solo cuando está pendiente o editando */
          <PaymentSummary />
        )}
        
        {/* Banner de modo edición */}
        <EditModeBanner />
        
        {/* Pagos registrados con comportamiento mejorado */}
        <RegisteredPayments />
        
        {/* Calculadora de cambio/vuelto */}
        <ChangeCalculator />
        
        {/* Entrada de monto para método seleccionado */}
        <AmountInput />
        
        {/* Teclado numérico optimizado */}
        <NumpadComponent />
        
        {/* Selección de método de pago */}
        <PaymentMethodSelection />
      </div>
      
      <ActionButton />
    </div>
  );
};

export default OptimizedPaymentScreen;