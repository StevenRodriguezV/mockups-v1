"use client"

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  X, 
  Percent, 
  Package,
  AlertCircle,
  Receipt,
  User,
  MessageCircle,
  Edit,
  Check,
  DollarSign,
  ScanLine,
  Tag,
  ShoppingBag
} from 'lucide-react';

const OptimizedPOSCart = () => {
  // States
  const [cart, setCart] = useState([
    { 
      id: 1, 
      name: 'Coca Cola 500ml', 
      price: 2500, 
      originalPrice: 2500,
      quantity: 2, 
      stock: 24,
      maxPerOrder: 10,
      category: 'Bebidas',
      lowStock: false
    },
    { 
      id: 2, 
      name: 'Hamburguesa Clásica', 
      price: 12000, 
      originalPrice: 12000,
      quantity: 1, 
      stock: 8,
      maxPerOrder: 10,
      category: 'Comidas',
      lowStock: false
    },
    {
      id: 3,
      name: 'Pan Baguette',
      price: 3800,
      originalPrice: 3000,
      quantity: 1,
      stock: 3,
      maxPerOrder: 5,
      category: 'Panadería',
      lowStock: true
    }
  ]);
  
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');
  const [isRemovingItem, setIsRemovingItem] = useState(null);
  const [showQuantityEdit, setShowQuantityEdit] = useState(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [showPriceEdit, setShowPriceEdit] = useState(null);
  const [editPrice, setEditPrice] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  
  // Theme colors
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF', 
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
    accent: '#6366F1',
    priceChange: '#64748B' // Changed to gray to match textSecondary
  };
  
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalSubtotal = cart.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const hasPriceAdjustments = subtotal !== originalSubtotal;
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.19);
  const total = subtotal - discount + tax;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  // Handle quantity updates
  const handleUpdateQuantity = (itemId, change) => {
    setCart(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, Math.min(item.quantity + change, item.maxPerOrder, item.stock));
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };
  
  // Handle quantity edit save
  const handleSaveQuantity = (itemId) => {
    if (editQuantity && parseInt(editQuantity) > 0) {
      setCart(prev => prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.min(parseInt(editQuantity), item.maxPerOrder, item.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }));
    }
    setShowQuantityEdit(null);
    setEditQuantity('');
  };
  
  // Handle price edit save with 100 step increments
  const handleSavePrice = (itemId) => {
    if (editPrice && parseInt(editPrice) >= 0) {
      setCart(prev => prev.map(item => {
        if (item.id === itemId) {
          return { ...item, price: parseInt(editPrice) };
        }
        return item;
      }));
    }
    setShowPriceEdit(null);
    setEditPrice('');
  };
  
  // Handle item removal
  const handleRemoveItem = (itemId) => {
    setIsRemovingItem(itemId);
    setTimeout(() => {
      setCart(prev => prev.filter(item => item.id !== itemId));
      setIsRemovingItem(null);
    }, 300);
  };
  
  // Handle discount code validation
  const validateDiscount = () => {
    if (!discountCode) {
      setDiscountError('Ingresa un código');
      return;
    }
    
    if (discountCode.toUpperCase() !== 'VENDLY10') {
      setDiscountError('Código inválido');
      return;
    }
    
    setDiscountError('');
    setDiscountApplied(true);
  };
  
  // Handle scan for discount code
  const handleScanDiscount = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setDiscountCode('VENDLY10');
      setTimeout(() => {
        validateDiscount();
      }, 300);
    }, 1500);
  };
  
  // Component for cart item - Further optimized for compactness
  const CartItem = ({ item }) => {
    const isRemoving = isRemovingItem === item.id;
    const isEditingQty = showQuantityEdit === item.id;
    const isEditingPrice = showPriceEdit === item.id;
    const isPriceCustomized = item.price !== item.originalPrice;
    
    return (
      <div
        className={`p-2.5 rounded-lg transition-all ${isRemoving ? 'opacity-0 transform scale-95' : 'opacity-100'}`}
        style={{ 
          backgroundColor: theme.card, 
          border: `1px solid ${theme.border}`,
          transitionDuration: '300ms'
        }}
      >
        <div className="flex items-center gap-2">
          {/* Product icon - optimally sized but smaller */}
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            <Package className="w-5 h-5" style={{ color: theme.primary }} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              {/* Product name and price section - more compact */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="font-medium text-sm truncate" style={{ color: theme.text }}>
                    {item.name}
                  </h3>
                  {/* Extra small category pill */}
                  <span className="text-xs px-1.5 py-0 rounded-full bg-opacity-50 whitespace-nowrap"
                    style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
                    {item.category}
                  </span>
                </div>
                
                {/* Price section with original price comparison */}
                {isEditingPrice ? (
                  <div className="flex flex-col gap-1.5 mt-0.5">
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-xs" style={{ color: theme.textSecondary }}>$</span>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          const roundedValue = Math.round(parseInt(value || '0') / 100) * 100;
                          setEditPrice(roundedValue.toString());
                        }}
                        className="w-24 pl-6 pr-2 py-1.5 text-sm rounded-md"
                        style={{ 
                          backgroundColor: theme.bg,
                          border: `1px solid ${theme.border}`,
                          color: theme.text
                        }}
                        autoFocus
                        step="100"
                      />
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          const currentValue = parseInt(editPrice || '0');
                          setEditPrice(Math.max(0, currentValue - 100).toString());
                        }}
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          const currentValue = parseInt(editPrice || '0');
                          setEditPrice((currentValue + 100).toString());
                        }}
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleSavePrice(item.id)}
                        className="p-1.5 rounded-md ml-1"
                        style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setShowPriceEdit(null)}
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      <p 
                        className="text-sm font-medium"
                        style={{ 
                          color: isPriceCustomized ? theme.priceChange : theme.text
                        }}
                      >
                        ${item.price.toLocaleString()}
                      </p>
                      {isPriceCustomized && (
                        <p className="text-xs line-through ml-1" style={{ color: theme.textSecondary }}>
                          ${item.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                    
                    {item.lowStock && (
                      <span 
                        className="text-xs px-1.5 py-0.5 rounded-lg flex items-center gap-0.5"
                        style={{ color: theme.error, backgroundColor: `${theme.error}10` }}
                      >
                        <AlertCircle className="w-3 h-3" />
                        <span>Stock: {item.stock}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Item Total - Right Side, Compact */}
              <div className="text-right">
                <p className="font-medium text-sm" style={{ color: theme.primary }}>
                  ${(item.price * item.quantity).toLocaleString()}
                </p>
                <p className="text-xs" style={{ color: theme.textSecondary, fontSize: '10px' }}>
                  Total
                </p>
              </div>
            </div>
            
            {/* Quantity Controls and Action Buttons - More compact but still touch-friendly */}
            <div className="flex items-center justify-between mt-1.5">
              {isEditingQty ? (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value.replace(/\D/g, ''))}
                    className="w-14 p-1.5 rounded-md text-center text-sm"
                    style={{ 
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveQuantity(item.id)}
                    className="p-1.5 rounded-md"
                    style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setShowQuantityEdit(null)}
                    className="p-1.5 rounded-md"
                    style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="p-1.5 rounded-md"
                    style={{ 
                      backgroundColor: `${theme.error}15`,
                      color: theme.error,
                      opacity: item.quantity <= 1 ? 0.5 : 1
                    }}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setShowQuantityEdit(item.id);
                      setEditQuantity(item.quantity.toString());
                    }}
                    className="min-w-[28px] px-2 py-0.5 mx-1 rounded-md font-medium text-sm"
                    style={{ backgroundColor: theme.bg, color: theme.text }}
                  >
                    {item.quantity}
                  </button>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                    disabled={item.quantity >= Math.min(item.maxPerOrder, item.stock)}
                    className="p-1.5 rounded-md"
                    style={{ 
                      backgroundColor: `${theme.primary}15`,
                      color: theme.primary,
                      opacity: item.quantity >= Math.min(item.maxPerOrder, item.stock) ? 0.5 : 1
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              
              {/* Action buttons with better spacing but more compact */}
              <div className="flex items-center gap-1.5">
                {/* Adjust Price Button - In gray instead of blue */}
                <button
                  onClick={() => {
                    setShowPriceEdit(item.id);
                    setEditPrice(item.price.toString());
                  }}
                  className="py-1.5 px-2 rounded-md flex items-center gap-1"
                  style={{ 
                    backgroundColor: isPriceCustomized ? `${theme.priceChange}10` : theme.bg, 
                    color: isPriceCustomized ? theme.priceChange : theme.textSecondary,
                    border: `1px solid ${theme.border}`
                  }}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-xs">Ajustar precio</span>
                </button>
                
                {/* Delete Button - Smaller but still easily tappable */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="p-1.5 rounded-md"
                  style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Improved empty cart state
  const EmptyCart = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${theme.primary}15` }}
      >
        <Receipt className="w-10 h-10" style={{ color: theme.primary }} />
      </div>
      <h3 className="text-lg font-medium mb-2" style={{ color: theme.text }}>
        Carrito vacío
      </h3>
      <p className="text-sm mb-6 max-w-xs" style={{ color: theme.textSecondary }}>
        Agrega productos para iniciar la venta
      </p>
      <button 
        className="px-4 py-3 rounded-xl font-medium flex items-center gap-2"
        style={{ backgroundColor: theme.primary, color: 'white' }}
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        <span>Volver a Productos</span>
      </button>
    </div>
  );
  
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <div 
        className="sticky top-0 z-10 p-3 border-b"
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: theme.card }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: theme.text }} />
            </button>
            <h1 className="text-base font-semibold flex items-center gap-2" style={{ color: theme.text }}>
              <span>Carrito</span>
              {cart.length > 0 && (
                <span 
                  className="ml-1 px-1.5 py-0.5 text-xs rounded-lg"
                  style={{ backgroundColor: theme.primary, color: 'white' }}
                >
                  {itemCount}
                </span>
              )}
            </h1>
          </div>
          
          {/* Add price adjustments indicator in header - more subtle */}
          {hasPriceAdjustments && (
            <div 
              className="px-2 py-0.5 rounded-lg flex items-center gap-1"
              style={{ backgroundColor: `${theme.primary}10` }}
            >
              <DollarSign className="w-3 h-3" style={{ color: theme.primary }} />
              <span className="text-xs" style={{ color: theme.primary }}>
                Precios ajustados
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-3">
        {cart.length > 0 ? (
          <>            
            {/* Cart Items */}
            <div className="space-y-2.5 mb-3">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            {/* Add more products button with consistent rounded corners */}
            <button
              className="w-full p-3 rounded-lg mb-3 flex items-center justify-center gap-2 border"
              style={{ 
                backgroundColor: theme.bg,
                borderColor: theme.border,
                color: theme.primary
              }}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Añadir más productos</span>
            </button>
            
            {/* Discount Code Input - Consistent corners and spacing */}
            <div className="flex gap-1.5 mb-3.5">
              <div className="relative flex-1">
                <Percent className="absolute left-2.5 top-2.5 w-4 h-4" style={{ color: theme.textSecondary }} />
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => {
                    setDiscountCode(e.target.value.toUpperCase());
                    setDiscountError('');
                    setDiscountApplied(false);
                  }}
                  placeholder="Código de descuento"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg text-sm"
                  style={{ 
                    backgroundColor: theme.card,
                    border: `1px solid ${discountError ? theme.error : discountApplied ? theme.success : theme.border}`,
                    color: theme.text
                  }}
                  disabled={discountApplied}
                />
                {discountError && (
                  <p className="absolute text-xs mt-1 ml-1" style={{ color: theme.error }}>
                    {discountError}
                  </p>
                )}
                {discountApplied && (
                  <button
                    onClick={() => {
                      setDiscountApplied(false);
                      setDiscountCode('');
                    }}
                    className="absolute right-2 top-2.5"
                    style={{ color: theme.error }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={handleScanDiscount}
                className="p-2.5 rounded-lg"
                style={{ 
                  backgroundColor: `${theme.accent}15`,
                  color: theme.accent,
                  opacity: discountApplied ? 0.5 : 1
                }}
                disabled={discountApplied}
              >
                {isScanning ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ScanLine className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={discountApplied ? () => {
                  setDiscountApplied(false);
                  setDiscountCode('');
                } : validateDiscount}
                className="px-3 rounded-lg flex items-center gap-1"
                style={{ 
                  backgroundColor: discountApplied ? theme.error : theme.primary, 
                  color: 'white'
                }}
              >
                {discountApplied ? (
                  <>
                    <X className="w-3.5 h-3.5" />
                    <span className="text-sm">Quitar</span>
                  </>
                ) : (
                  'Aplicar'
                )}
              </button>
            </div>
            
            {/* Order Summary - Consistent spacing and corners */}
            <div 
              className="p-3.5 rounded-lg space-y-2.5"
              style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
            >
              <h3 className="font-semibold mb-1 text-sm" style={{ color: theme.text }}>Resumen</h3>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>Subtotal</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-lg"
                        style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
                    {cart.length} productos
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {hasPriceAdjustments && (
                    <span className="text-xs line-through" style={{ color: theme.textSecondary }}>
                      ${originalSubtotal.toLocaleString()}
                    </span>
                  )}
                  <span className="font-medium text-sm" style={{ color: theme.text }}>
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
              {hasPriceAdjustments && (
                <div className="flex justify-between">
                  <span className="text-sm font-medium" style={{ color: theme.primary }}>Ajustes de precio</span>
                  <span className="font-medium text-sm" style={{ color: theme.primary }}>
                    {subtotal > originalSubtotal ? '+' : ''}
                    ${(subtotal - originalSubtotal).toLocaleString()}
                  </span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium" style={{ color: theme.success }}>Descuento</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-lg"
                        style={{ backgroundColor: `${theme.success}15`, color: theme.success }}>
                      {discountCode} (10%)
                    </span>
                  </div>
                  <span className="font-medium text-sm" style={{ color: theme.success }}>
                    -${discount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>IVA (19%)</span>
                <span className="font-medium text-sm" style={{ color: theme.text }}>${tax.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t flex justify-between items-center" style={{ borderColor: theme.border }}>
                <span className="font-semibold" style={{ color: theme.text }}>Total</span>
                <span className="text-lg font-bold" style={{ color: theme.primary }}>
                  ${total.toLocaleString()}
                </span>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
      
      {/* Footer Action Button */}
      {cart.length > 0 && (
        <div 
          className="p-3.5 border-t"
          style={{ borderColor: theme.border, backgroundColor: theme.card }}
        >
          <button
            className="w-full p-3.5 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
            style={{ backgroundColor: theme.primary }}
          >
            <span>Continuar al Cliente</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex justify-between items-center mt-2 px-1">
            <div className="flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" style={{ color: theme.textSecondary }} />
              <span className="text-xs" style={{ color: theme.textSecondary }}>
                {cart.length} productos ({itemCount} items)
              </span>
            </div>
            <span className="text-xs font-semibold" style={{ color: theme.primary }}>
              ${total.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedPOSCart;