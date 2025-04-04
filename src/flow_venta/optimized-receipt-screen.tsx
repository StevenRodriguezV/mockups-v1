"use client"

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Printer, 
  Phone, 
  Mail, 
  Check, 
  X, 
  CheckCheck, 
  Receipt, 
  User, 
  Send,
  Wifi, 
  Edit, 
  Save,
  Download,
  Eye,
  MessageCircle,
  FileText,
  ShoppingBag,
  CheckCircle,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const OptimizedReceiptScreen = () => {
  // Estados de la pantalla
  const [selectedOption, setSelectedOption] = useState('whatsapp');
  const [sendingStatus, setSendingStatus] = useState(null); // null, 'sending', 'success'
  const [isCompletingTransaction, setIsCompletingTransaction] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [showReceiptPreview, setShowReceiptPreview] = useState(false);
  const [dianValidationStatus, setDianValidationStatus] = useState('validated'); // 'validating', 'validated', 'error'
  
  // Datos simulados
  const customer = {
    name: 'María García',
    phone: '+57 310 987 6543',
    email: 'maria.garcia@gmail.com',
    isFrequent: true
  };
  
  const cart = [
    { id: 1, name: 'Coca Cola 500ml', price: 2500, quantity: 2 },
    { id: 2, name: 'Hamburguesa Clásica', price: 12000, quantity: 1 }
  ];
  
  // Cálculos derivados
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.19);
  const total = subtotal + tax;
  
  // Información de la factura
  const invoice = {
    number: 'FACT-2025-0387',
    date: new Date(),
    dianCode: 'CUFE-287A45BC90D1234EF',
    qrCodeUrl: '/api/placeholder/120/120',
    emissionDate: new Date(),
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 días después
    paymentMethods: [
      { method: 'Efectivo', amount: 10000 },
      { method: 'Tarjeta', amount: 9770 }
    ]
  };
  
  // Tema y estilos
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
    whatsapp: '#25D366',
    dian: '#0064D2'
  };
  
  // Formateo de montos
  const formatAmount = (amount) => {
    return parseInt(amount).toLocaleString();
  };
  
  // Formateo de fechas
  const formatDate = (date) => {
    return date.toLocaleDateString('es-CO', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Funciones para envío de factura
  const handleSendReceipt = () => {
    if (selectedOption === 'none') {
      // Saltar directamente a finalización
      handleCompleteTransaction();
      return;
    }
    
    // Validar que la opción seleccionada tenga la información necesaria
    if (selectedOption === 'email' && !customer.email) {
      alert('Por favor agrega un correo electrónico para enviar la factura.');
      setIsEditingCustomer(true);
      return;
    }
    
    // Simular envío
    setSendingStatus('sending');
    
    // Simular tiempo de envío
    setTimeout(() => {
      setSendingStatus('success');
      
      // Mostrar confirmación brevemente, luego continuar
      setShowConfirmation(true);
      setTimeout(() => {
        setShowConfirmation(false);
        handleCompleteTransaction();
      }, 1500);
    }, 1500);
  };
  
  const handleCompleteTransaction = () => {
    setIsCompletingTransaction(true);
    
    // Simular finalización
    setTimeout(() => {
      setIsCompletingTransaction(false);
      // Aquí normalmente navegaríamos a la siguiente pantalla o reiniciaríamos
      alert('¡Venta completada exitosamente!');
    }, 1500);
  };
  
  const startEditingCustomer = () => {
    setEditingCustomer({
      name: customer.name,
      phone: customer.phone,
      email: customer.email || ''
    });
    setIsEditingCustomer(true);
  };
  
  // Estado para edición de cliente
  const [editingCustomer, setEditingCustomer] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const saveCustomerChanges = () => {
    // En una implementación real, aquí actualizaríamos el cliente en la base de datos
    // Para este ejemplo, simularemos la actualización
    setCustomer({
      ...customer,
      name: editingCustomer.name,
      phone: editingCustomer.phone,
      email: editingCustomer.email
    });
    setIsEditingCustomer(false);
  };
  
  // Simulación de validación DIAN
  useEffect(() => {
    if (dianValidationStatus === 'validating') {
      // Simular validación
      const timer = setTimeout(() => {
        setDianValidationStatus('validated');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [dianValidationStatus]);
  
  // Header consistente con el resto del flujo
  const ReceiptHeader = () => {
    // Definir las etapas del flujo
    const flowStages = ['products', 'cart', 'customer', 'payment', 'receipt'];
    const currentStageIndex = 4; // receipt es la quinta etapa (índice 4)
    
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
              Enviar Factura
            </h1>
            
            {/* Indicador de progreso del flujo */}
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
  
  // Componente para mensajes de éxito
  const SuccessMessage = () => (
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
            ${formatAmount(total)} • {formatDate(new Date())}
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
  );
  
  // Componente para información de factura DIAN
  const DianInvoiceStatus = () => (
    <div 
      className="p-4 rounded-xl mb-4 border"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.border
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" style={{ color: theme.dian }} />
          <h3 className="font-medium" style={{ color: theme.text }}>
            Factura Electrónica DIAN
          </h3>
        </div>
        <div 
          className="px-2 py-1 rounded text-xs font-medium flex items-center gap-1"
          style={{ 
            backgroundColor: `${theme.dian}15`,
            color: theme.dian
          }}
        >
          {dianValidationStatus === 'validating' ? (
            <>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: theme.dian }} />
              <span>Validando</span>
            </>
          ) : dianValidationStatus === 'validated' ? (
            <>
              <Check className="w-3 h-3" />
              <span>Validada</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3 h-3" />
              <span>Error</span>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs" style={{ color: theme.textSecondary }}>
            Número de Factura
          </p>
          <p className="font-medium" style={{ color: theme.text }}>
            {invoice.number}
          </p>
        </div>
        <div>
          <p className="text-xs" style={{ color: theme.textSecondary }}>
            Fecha de Emisión
          </p>
          <p className="font-medium" style={{ color: theme.text }}>
            {formatDate(invoice.emissionDate).split(',')[0]}
          </p>
        </div>
      </div>
      
      <div className="border-t pt-2" style={{ borderColor: theme.border }}>
        <button 
          onClick={() => setShowReceiptPreview(true)}
          className="w-full p-2.5 rounded-lg flex items-center justify-center gap-2"
          style={{ 
            backgroundColor: `${theme.dian}10`,
            color: theme.dian
          }}
        >
          <Eye className="w-5 h-5" />
          <span className="font-medium">Previsualizar Factura</span>
        </button>
      </div>
    </div>
  );
  
  // Componente para información del cliente
  const CustomerInfo = () => {
    if (isEditingCustomer) {
      return (
        <div 
          className="p-4 rounded-xl mb-4 border"
          style={{ 
            backgroundColor: theme.card,
            borderColor: theme.border
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 
              className="font-medium"
              style={{ color: theme.text }}
            >
              Editar Cliente
            </h3>
            <button
              onClick={() => setIsEditingCustomer(false)}
              className="p-2 rounded-lg"
              style={{ backgroundColor: theme.bg }}
            >
              <X className="w-5 h-5" style={{ color: theme.textSecondary }} />
            </button>
          </div>
          
          <div className="space-y-3">
            {/* Nombre */}
            <div>
              <label 
                className="block text-sm mb-1"
                style={{ color: theme.textSecondary }}
              >
                Nombre
              </label>
              <input
                type="text"
                value={editingCustomer.name}
                onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                className="w-full p-3 rounded-lg text-base"
                style={{ 
                  backgroundColor: theme.bg,
                  border: `1px solid ${theme.border}`,
                  color: theme.text
                }}
              />
            </div>
            
            {/* Teléfono */}
            <div>
              <label 
                className="block text-sm mb-1"
                style={{ color: theme.textSecondary }}
              >
                Teléfono
              </label>
              <div className="flex items-center">
                <div 
                  className="flex items-center gap-1 px-2"
                  style={{ color: theme.textSecondary }}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                  className="w-full p-3 rounded-lg text-base"
                  style={{ 
                    backgroundColor: theme.bg,
                    border: `1px solid ${theme.border}`,
                    color: theme.text
                  }}
                />
              </div>
            </div>
            
            {/* Email */}
            <div>
              <label 
                className="block text-sm mb-1"
                style={{ color: theme.textSecondary }}
              >
                Email
              </label>
              <div className="flex items-center">
                <div 
                  className="flex items-center gap-1 px-2"
                  style={{ color: theme.textSecondary }}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                  className="w-full p-3 rounded-lg text-base"
                  style={{ 
                    backgroundColor: theme.bg,
                    border: `1px solid ${theme.border}`,
                    color: theme.text
                  }}
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
            
            {/* Botón guardar */}
            <button
              onClick={saveCustomerChanges}
              className="w-full p-3 rounded-lg text-white font-medium flex items-center justify-center gap-2"
              style={{ backgroundColor: theme.primary }}
            >
              <Save className="w-5 h-5" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className="p-4 rounded-xl mb-4 border"
        style={{ 
          backgroundColor: theme.card,
          borderColor: theme.border
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
            <div className="flex items-center justify-between">
              <div>
                <p 
                  className="font-medium"
                  style={{ color: theme.text }}
                >
                  {customer.name}
                </p>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {customer.phone}
                </p>
                {customer.email && (
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {customer.email}
                  </p>
                )}
              </div>
              <button
                onClick={startEditingCustomer}
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <Edit className="w-5 h-5" style={{ color: theme.primary }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Componente para opciones de envío
  const ReceiptOptions = () => (
    <div className="mb-4">
      <h2 
        className="px-1 mb-3 text-base font-medium"
        style={{ color: theme.text }}
      >
        Enviar factura:
      </h2>
      
      <div className="space-y-3">
        {/* Opción WhatsApp */}
        <button
          onClick={() => setSelectedOption('whatsapp')}
          className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
          style={{ 
            backgroundColor: selectedOption === 'whatsapp' ? `${theme.whatsapp}08` : theme.card,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: selectedOption === 'whatsapp' ? theme.whatsapp : theme.border
          }}
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
                color: selectedOption === 'whatsapp' ? theme.whatsapp : theme.text
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
          {selectedOption === 'whatsapp' && (
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.whatsapp }}
            >
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
        
        {/* Opción Email */}
        <button
          onClick={() => {
            setSelectedOption('email');
            if (!customer.email) {
              setIsEditingCustomer(true);
            }
          }}
          className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
          style={{ 
            backgroundColor: selectedOption === 'email' ? `${theme.primary}08` : theme.card,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: selectedOption === 'email' ? theme.primary : theme.border
          }}
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
                color: selectedOption === 'email' ? theme.primary : theme.text
              }}
            >
              Email
            </p>
            <p 
              className="text-base"
              style={{ color: theme.textSecondary }}
            >
              {customer.email || "Agregar correo electrónico"}
            </p>
            {!customer.email && selectedOption === 'email' && (
              <p 
                className="text-sm"
                style={{ color: theme.error }}
              >
                * Requiere email
              </p>
            )}
          </div>
          {selectedOption === 'email' && (
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
        
        {/* Opción Imprimir */}
        <button
          onClick={() => setSelectedOption('print')}
          className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
          style={{ 
            backgroundColor: selectedOption === 'print' ? `${theme.primary}08` : theme.card,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: selectedOption === 'print' ? theme.primary : theme.border
          }}
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
                color: selectedOption === 'print' ? theme.primary : theme.text
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
          {selectedOption === 'print' && (
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: theme.primary }}
            >
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </button>
        
        {/* Opción No enviar */}
        <button
          onClick={() => setSelectedOption('none')}
          className="w-full p-4 rounded-xl flex items-center gap-4 active:scale-98 transition-transform"
          style={{ 
            backgroundColor: selectedOption === 'none' ? `${theme.primary}08` : theme.card,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: selectedOption === 'none' ? theme.primary : theme.border
          }}
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
                color: selectedOption === 'none' ? theme.primary : theme.text
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
          {selectedOption === 'none' && (
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
  );
  
  // Modal de previsualización de factura
  const ReceiptPreviewModal = () => {
    if (!showReceiptPreview) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div 
          className="w-11/12 max-w-md bg-white rounded-xl shadow-xl max-h-90vh overflow-y-auto"
          style={{ backgroundColor: theme.card }}
        >
          {/* Header del modal */}
          <div 
            className="p-4 border-b flex justify-between items-center sticky top-0 bg-white"
            style={{ borderColor: theme.border }}
          >
            <h3 className="font-medium" style={{ color: theme.text }}>
              Previsualización de Factura
            </h3>
            <button
              onClick={() => setShowReceiptPreview(false)}
              className="p-2 rounded-lg"
              style={{ backgroundColor: theme.bg }}
            >
              <X className="w-5 h-5" style={{ color: theme.textSecondary }} />
            </button>
          </div>
          
          {/* Contenido de factura */}
          <div className="p-4">
            {/* Logo y encabezado */}
            <div className="text-center mb-4">
              <h2 
                className="text-xl font-bold mb-1"
                style={{ color: theme.primary }}
              >
                Vendly
              </h2>
              <p style={{ color: theme.text }}>
                Factura Electrónica de Venta
              </p>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                NIT: 901.234.567-8
              </p>
            </div>
            
            {/* Información de factura */}
            <div 
              className="p-3 rounded-lg mb-4"
              style={{ backgroundColor: theme.bg }}
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    Factura No.
                  </p>
                  <p className="font-medium" style={{ color: theme.text }}>
                    {invoice.number}
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    Fecha de Emisión
                  </p>
                  <p className="font-medium" style={{ color: theme.text }}>
                    {formatDate(invoice.emissionDate).split(',')[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    Fecha de Vencimiento
                  </p>
                  <p className="font-medium" style={{ color: theme.text }}>
                    {formatDate(invoice.expirationDate).split(',')[0]}
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: theme.textSecondary }}>
                    Código DIAN
                  </p>
                  <p className="font-medium text-xs" style={{ color: theme.dian }}>
                    {invoice.dianCode}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Información del cliente */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-1" style={{ color: theme.text }}>
                Cliente
              </p>
              <p className="font-medium" style={{ color: theme.text }}>
                {customer.name}
              </p>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                Teléfono: {customer.phone}
              </p>
              {customer.email && (
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  Email: {customer.email}
                </p>
              )}
            </div>
            
            {/* Items */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: theme.text }}>
                Productos
              </p>
              <div 
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: theme.border }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: theme.bg }}>
                      <th className="py-2 px-2 text-left" style={{ color: theme.textSecondary }}>Producto</th>
                      <th className="py-2 px-2 text-center" style={{ color: theme.textSecondary }}>Cant.</th>
                      <th className="py-2 px-2 text-right" style={{ color: theme.textSecondary }}>Precio</th>
                      <th className="py-2 px-2 text-right" style={{ color: theme.textSecondary }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr 
                        key={item.id}
                        className="border-t"
                        style={{ borderColor: theme.border }}
                      >
                        <td className="py-2 px-2" style={{ color: theme.text }}>
                          {item.name}
                        </td>
                        <td className="py-2 px-2 text-center" style={{ color: theme.text }}>
                          {item.quantity}
                        </td>
                        <td className="py-2 px-2 text-right" style={{ color: theme.text }}>
                          ${formatAmount(item.price)}
                        </td>
                        <td className="py-2 px-2 text-right" style={{ color: theme.text }}>
                          ${formatAmount(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Resumen */}
            <div 
              className="p-3 rounded-lg mb-4"
              style={{ backgroundColor: theme.bg }}
            >
              <div className="flex justify-between mb-1">
                <span style={{ color: theme.textSecondary }}>Subtotal</span>
                <span style={{ color: theme.text }}>${formatAmount(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span style={{ color: theme.textSecondary }}>IVA (19%)</span>
                <span style={{ color: theme.text }}>${formatAmount(tax)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: theme.border }}>
                <span className="font-medium" style={{ color: theme.text }}>Total</span>
                <span className="font-bold" style={{ color: theme.primary }}>
                  ${formatAmount(total)}
                </span>
              </div>
            </div>
            
            {/* Método de pago */}
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: theme.text }}>
                Método de Pago
              </p>
              <div className="space-y-2">
                {invoice.paymentMethods.map((payment, index) => (
                  <div 
                    key={index}
                    className="flex justify-between p-2 rounded-lg"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <span style={{ color: theme.text }}>{payment.method}</span>
                    <span className="font-medium" style={{ color: theme.text }}>
                      ${formatAmount(payment.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Código QR y validación DIAN */}
            <div className="flex flex-col items-center mb-4">
              <div 
                className="w-24 h-24 bg-gray-200 rounded-lg mb-2 flex items-center justify-center"
                style={{ backgroundColor: theme.bg }}
              >
                <img src={invoice.qrCodeUrl} alt="QR Code" className="w-20 h-20" />
              </div>
              <div 
                className="px-3 py-1 rounded-full text-xs flex items-center gap-1 mb-1"
                style={{ 
                  backgroundColor: `${theme.dian}15`,
                  color: theme.dian
                }}
              >
                <Check className="w-3 h-3" />
                <span>Validada por DIAN</span>
              </div>
              <p className="text-xs text-center" style={{ color: theme.textSecondary }}>
                Consulte en www.dian.gov.co
              </p>
            </div>
            
            {/* Botones de acción */}
            <div className="flex gap-2">
              <button
                className="flex-1 p-3 rounded-lg flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: theme.bg,
                  color: theme.textSecondary
                }}
                onClick={() => setShowReceiptPreview(false)}
              >
                <X className="w-4 h-4" />
                <span>Cerrar</span>
              </button>
              <button
                className="flex-1 p-3 rounded-lg flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: theme.primary,
                  color: 'white'
                }}
              >
                <Download className="w-4 h-4" />
                <span>Descargar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Overlay de envío - simplificado
  const SendingOverlay = () => {
    if (sendingStatus !== 'sending') return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" 
           style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div 
          className="bg-white p-6 rounded-xl flex flex-col items-center"
          style={{ 
            backgroundColor: theme.card,
            maxWidth: '80%' 
          }}
        >
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mb-4"
               style={{ borderColor: `${theme.primary}30`, borderTopColor: theme.primary }} />
          <p 
            className="text-lg font-medium"
            style={{ color: theme.text }}
          >
            Enviando...
          </p>
        </div>
      </div>
    );
  };

  // Confirmación de éxito - simplificada
  const ConfirmationOverlay = () => {
    if (!showConfirmation) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" 
           style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div 
          className="bg-white p-6 rounded-xl flex flex-col items-center"
          style={{ 
            backgroundColor: theme.card,
            maxWidth: '80%' 
          }}
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: `${theme.success}15` }}
          >
            <Check className="w-8 h-8" style={{ color: theme.success }} />
          </div>
          <p 
            className="text-xl font-medium"
            style={{ color: theme.success }}
          >
            ¡Enviado!
          </p>
        </div>
      </div>
    );
  };

  // Overlay de transacción completando - simplificado
  const CompletingTransactionOverlay = () => {
    if (!isCompletingTransaction) return null;
    
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50" 
           style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <div 
          className="bg-white p-6 rounded-xl flex flex-col items-center"
          style={{ 
            backgroundColor: theme.card,
            maxWidth: '80%' 
          }}
        >
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin mb-4"
               style={{ borderColor: `${theme.success}30`, borderTopColor: theme.success }} />
          <p 
            className="text-lg font-medium"
            style={{ color: theme.text }}
          >
            Finalizando...
          </p>
        </div>
      </div>
    );
  };

  // Botón de acción principal
  const ActionButton = () => (
    <div 
      className="fixed bottom-0 left-0 right-0 p-4 border-t shadow-lg z-10"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.border,
        paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)'
      }}
    >
      <button
        onClick={handleSendReceipt}
        disabled={sendingStatus === 'sending' || (selectedOption === 'email' && !customer.email)}
        className="w-full p-4 rounded-xl text-white font-medium text-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        style={{ 
          backgroundColor: selectedOption === 'whatsapp' ? theme.whatsapp : theme.primary,
          opacity: (sendingStatus === 'sending' || (selectedOption === 'email' && !customer.email)) ? 0.7 : 1
        }}
      >
        {selectedOption === 'none' ? (
          <>
            <Check className="w-6 h-6" />
            <span>Completar Venta</span>
          </>
        ) : (
          <>
            <Send className="w-6 h-6" />
            <span>
              {selectedOption === 'whatsapp' ? 'Enviar por WhatsApp' :
               selectedOption === 'email' ? 'Enviar por Email' :
               selectedOption === 'print' ? 'Imprimir Factura' : 'Completar'}
            </span>
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen" style={{ backgroundColor: theme.bg }}>
      <ReceiptHeader />
      
      <div className="p-4 pb-32">
        {/* Mensaje de éxito */}
        <SuccessMessage />
        
        {/* Estado de validación DIAN */}
        <DianInvoiceStatus />
        
        {/* Información del cliente */}
        <CustomerInfo />
        
        {/* Opciones de envío */}
        <ReceiptOptions />
      </div>
      
      <ActionButton />
      
      {/* Modales y overlays */}
      <ReceiptPreviewModal />
      <SendingOverlay />
      <ConfirmationOverlay />
      <CompletingTransactionOverlay />
    </div>
  );
};

export default OptimizedReceiptScreen;