"use client"
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ArrowRight,
  User,
  Search,
  X, 
  Phone,
  Mail,
  MapPin,
  Edit,
  Plus,
  Star,
  Clock,
  ShoppingBag,
  Calendar,
  Building,
  Save,
  UserPlus,
  FileText,
  Briefcase,
  CreditCard,
  Tag,
  CheckCircle,
  Users,
  Check
} from 'lucide-react';

const IntegratedClientScreen = () => {
  // Estados para navegación
  const [view, setView] = useState('main'); // 'main', 'details'
  const [activeOption, setActiveOption] = useState('search'); // 'search', 'new', 'final'
  const [isEditing, setIsEditing] = useState(false);
  
  // Datos iniciales del cliente
  const [clientData, setClientData] = useState({
    name: 'María García',
    phone: '+57 310 987 6543',
    email: 'maria.garcia@gmail.com',
    documentType: 'cedula',
    documentNumber: '1.089.234.567',
    company: '',
    isFrequent: true,
    address: '',
    purchases: 12,
    lastPurchase: '2 días atrás'
  });
  
  // Estado para el formulario de edición
  const [editForm, setEditForm] = useState({...clientData});
  
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
    warning: '#F59E0B'
  };
  
  // Manejar cambios en el formulario
  const handleChange = (field, value) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Guardar cambios
  const saveChanges = () => {
    setClientData({...editForm});
    setIsEditing(false);
  };
  
  // Cancelar edición
  const cancelEdit = () => {
    setEditForm({...clientData});
    setIsEditing(false);
  };
  
  // Cabecera contextual
  const Header = () => (
    <div 
      className="sticky top-0 z-10 p-3 border-b"
      style={{ backgroundColor: theme.bg, borderColor: theme.border }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              if (view === 'details') {
                if (isEditing) {
                  // Si estamos editando, cancelar la edición
                  cancelEdit();
                  setIsEditing(false);
                } else {
                  // Volver a la vista principal
                  setView('main');
                }
              }
            }}
            className="p-2 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: theme.card }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: theme.text }} />
          </button>
          <h1 className="text-base font-semibold" style={{ color: theme.text }}>
            {view === 'main' 
              ? 'Cliente' 
              : isEditing 
                ? 'Editar Cliente' 
                : 'Detalles del Cliente'}
          </h1>
        </div>
        
        {view === 'details' && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg transition-all hover:bg-opacity-80"
            style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
          >
            <Edit className="w-5 h-5" />
          </button>
        )}
        
        {view === 'details' && isEditing && (
          <div className="flex gap-2">
            <button
              onClick={cancelEdit}
              className="p-2 rounded-lg transition-all hover:bg-opacity-80"
              style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={saveChanges}
              className="p-2 rounded-lg transition-all hover:bg-opacity-80"
              style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
  
  // Vista principal con opciones de cliente
  const MainView = () => (
    <div className="p-3">
      {/* Client Selection Options - Bigger and More Visible */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-3" style={{ color: theme.text }}>
          Cliente para la venta
        </h2>
        
        {/* Three Option Tabs with big, visible icons */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={() => setActiveOption('search')}
            className={`p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300`}
            style={{ 
              backgroundColor: activeOption === 'search' ? `${theme.primary}` : theme.card,
              border: `1px solid ${activeOption === 'search' ? theme.primary : theme.border}`,
              color: activeOption === 'search' ? 'white' : theme.text,
              boxShadow: activeOption === 'search' ? '0 2px 8px rgba(99, 102, 241, 0.25)' : 'none',
              height: '100px'
            }}
          >
            <Users className="w-8 h-8" style={{ 
              color: activeOption === 'search' ? 'white' : theme.primary,
              opacity: 0.9
            }} />
            <span className="font-medium text-center">Buscar<br/>Cliente</span>
          </button>
          
          <button
            onClick={() => setActiveOption('new')}
            className={`p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300`}
            style={{ 
              backgroundColor: activeOption === 'new' ? `${theme.primary}` : theme.card,
              border: `1px solid ${activeOption === 'new' ? theme.primary : theme.border}`,
              color: activeOption === 'new' ? 'white' : theme.text,
              boxShadow: activeOption === 'new' ? '0 2px 8px rgba(99, 102, 241, 0.25)' : 'none',
              height: '100px'
            }}
          >
            <UserPlus className="w-8 h-8" style={{ 
              color: activeOption === 'new' ? 'white' : theme.primary,
              opacity: 0.9 
            }} />
            <span className="font-medium text-center">Nuevo<br/>Cliente</span>
          </button>
          
          <button
            onClick={() => setActiveOption('final')}
            className={`p-3 rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300`}
            style={{ 
              backgroundColor: activeOption === 'final' ? `${theme.primary}` : theme.card,
              border: `1px solid ${activeOption === 'final' ? theme.primary : theme.border}`,
              color: activeOption === 'final' ? 'white' : theme.text,
              boxShadow: activeOption === 'final' ? '0 2px 8px rgba(99, 102, 241, 0.25)' : 'none',
              height: '100px'
            }}
          >
            <Tag className="w-8 h-8" style={{ 
              color: activeOption === 'final' ? 'white' : theme.primary,
              opacity: 0.9
            }} />
            <span className="font-medium text-center">Cliente<br/>Final</span>
          </button>
        </div>
      </div>
      
      {/* Search Input - Always Visible with Conditional Prominence */}
      {activeOption === 'search' && (
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3.5 w-5 h-5" style={{ color: theme.primary }} />
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o cédula..."
            className="w-full pl-10 pr-4 py-3.5 rounded-xl text-base"
            style={{ 
              backgroundColor: theme.card,
              border: `2px solid ${theme.primary}40`,
              color: theme.text,
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
            autoFocus
          />
        </div>
      )}
      
      {/* New Client Form - Only visible when New Client option is active */}
      {activeOption === 'new' && (
        <div 
          className="rounded-xl overflow-hidden mb-4 transition-all duration-300 shadow-sm"
          style={{ 
            backgroundColor: theme.card,
            border: `1px solid ${theme.primary}40`,
          }}
        >
          <div className="p-3 border-b flex justify-between items-center"
               style={{ borderColor: theme.border, backgroundColor: `${theme.primary}08` }}>
            <h3 className="font-medium" style={{ color: theme.primary }}>
              Información del Cliente
            </h3>
            <CheckCircle className="w-5 h-5" style={{ color: theme.primary }} />
          </div>
          
          <div className="p-3">
            <form className="space-y-3">
              {/* Simplified Form - Most Essential Fields */}
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
                  Nombre <span style={{ color: theme.error }}>*</span>
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg"
                  style={{ 
                    backgroundColor: theme.bg,
                    border: `1px solid ${theme.border}`,
                    color: theme.text
                  }}
                  placeholder="Nombre completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
                  Teléfono <span style={{ color: theme.error }}>*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4" style={{ color: theme.textSecondary }} />
                  <input
                    type="tel"
                    className="w-full pl-10 pr-3 py-3 rounded-lg"
                    style={{ 
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    placeholder="+57 300 123 4567"
                  />
                </div>
              </div>
              
              {/* Document Selection with Size Optimization */}
              <div className="space-y-1">
                <label className="block text-sm font-medium" style={{ color: theme.text }}>
                  Documento
                </label>
                
                <div className="flex gap-2">
                  <select
                    className="w-1/3 p-2.5 rounded-lg text-sm"
                    style={{ 
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                  >
                    <option value="cedula">C.C.</option>
                    <option value="nit">NIT</option>
                    <option value="extranjeria">C.E.</option>
                    <option value="pasaporte">Pasaporte</option>
                  </select>
                  
                  <div className="relative w-2/3">
                    <CreditCard className="absolute left-3 top-2.5 w-4 h-4" style={{ color: theme.textSecondary }} />
                    <input
                      type="text"
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg text-sm"
                      style={{ 
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        color: theme.text
                      }}
                      placeholder="Número de documento"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4" style={{ color: theme.textSecondary }} />
                  <input
                    type="email"
                    className="w-full pl-10 pr-3 py-3 rounded-lg"
                    style={{ 
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>
              
              {/* Company toggle - more subtle */}
              <div className="flex items-center justify-between py-1.5">
                <div>
                  <span className="text-sm font-medium" style={{ color: theme.text }}>
                    Datos de Empresa
                  </span>
                </div>
                <button
                  type="button"
                  className="relative w-10 h-5 rounded-full transition-colors"
                  style={{ 
                    backgroundColor: `${theme.border}40`
                  }}
                >
                  <div 
                    className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Cliente Final confirmation - Only visible when that option is selected */}
      {activeOption === 'final' && (
        <div 
          className="rounded-xl overflow-hidden mb-4 p-4 text-center transition-all duration-300"
          style={{ 
            backgroundColor: `${theme.success}08`,
            border: `1px solid ${theme.success}40`,
          }}
        >
          <CheckCircle className="w-10 h-10 mx-auto mb-2" style={{ color: theme.success }} />
          <h3 className="font-medium mb-1" style={{ color: theme.success }}>
            Cliente Final Seleccionado
          </h3>
          <p className="text-sm" style={{ color: theme.textSecondary }}>
            Se utilizará un cliente genérico sin datos personales
          </p>
        </div>
      )}
      
      {/* Recent Clients - Visible when searching */}
      {activeOption === 'search' && (
        <div>
          <h3 className="text-sm font-semibold mb-2" style={{ color: theme.textSecondary }}>
            Clientes recientes
          </h3>
          <div className="space-y-2">
            {/* Client Card */}
            <button
              onClick={() => {
                setView('details');
                setIsEditing(false);
              }}
              className="w-full p-3 rounded-xl flex items-start gap-3 text-left transition-all hover:shadow-sm"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <User className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="font-medium truncate" style={{ color: theme.text }}>
                    {clientData.name}
                  </h3>
                  {clientData.isFrequent && (
                    <span 
                      className="px-1.5 py-0.5 text-xs rounded-lg"
                      style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                    >
                      Frecuente
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" style={{ color: theme.textSecondary }} />
                    <span className="text-xs truncate" style={{ color: theme.textSecondary }}>
                      {clientData.phone}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3" style={{ color: theme.textSecondary }} />
                    <span className="text-xs truncate" style={{ color: theme.textSecondary }}>
                      CC: {clientData.documentNumber}
                    </span>
                  </div>
                </div>
              </div>
            </button>
            
            {/* Business client */}
            <button
              className="w-full p-3 rounded-xl flex items-start gap-3 text-left transition-all hover:shadow-sm"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <Briefcase className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="font-medium truncate" style={{ color: theme.text }}>
                    Empresa ABC
                  </h3>
                  <span 
                    className="px-1.5 py-0.5 text-xs rounded-lg"
                    style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                  >
                    Frecuente
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3" style={{ color: theme.textSecondary }} />
                    <span className="text-xs truncate" style={{ color: theme.textSecondary }}>
                      +57 601 555 1234
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3" style={{ color: theme.textSecondary }} />
                    <span className="text-xs truncate" style={{ color: theme.textSecondary }}>
                      NIT: 901.234.567-8
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
  // Vista de detalles del cliente (visualización)
  const ClientDetailsView = () => (
    <div
      className="p-4 rounded-xl"
      style={{ 
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`
      }}
    >
      <div className="flex gap-3 mb-3">
        <div 
          className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${theme.primary}15` }}
        >
          <User className="w-8 h-8" style={{ color: theme.primary }} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xl font-semibold" style={{ color: theme.text }}>
              {clientData.name}
            </h3>
            {clientData.isFrequent && (
              <span 
                className="px-1.5 py-0.5 text-xs rounded-lg"
                style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
              >
                Cliente Frecuente
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: theme.textSecondary }}>
            <div className="flex items-center gap-0.5">
              <ShoppingBag className="w-3 h-3" />
              <span>{clientData.purchases} compras</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              <span>{clientData.lastPurchase}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact details */}
      <div className="space-y-3 border-t pt-3" style={{ borderColor: theme.border }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            <Phone className="w-5 h-5" style={{ color: theme.primary }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: theme.textSecondary }}>Teléfono</p>
            <p className="font-medium" style={{ color: theme.text }}>{clientData.phone}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${theme.primary}10` }}
          >
            <CreditCard className="w-5 h-5" style={{ color: theme.primary }} />
          </div>
          <div>
            <p className="text-xs" style={{ color: theme.textSecondary }}>
              {clientData.documentType === 'cedula' ? 'Cédula' : 
               clientData.documentType === 'nit' ? 'NIT' : 
               clientData.documentType === 'extranjeria' ? 'C. Extranjería' : 'Pasaporte'}
            </p>
            <p className="font-medium" style={{ color: theme.text }}>{clientData.documentNumber}</p>
          </div>
        </div>
        
        {clientData.email && (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${theme.primary}10` }}
            >
              <Mail className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: theme.textSecondary }}>Email</p>
              <p className="font-medium" style={{ color: theme.text }}>{clientData.email}</p>
            </div>
          </div>
        )}
        
        {clientData.company && (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${theme.primary}10` }}
            >
              <Building className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: theme.textSecondary }}>Empresa</p>
              <p className="font-medium" style={{ color: theme.text }}>{clientData.company}</p>
            </div>
          </div>
        )}
        
        {clientData.address && (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${theme.primary}10` }}
            >
              <MapPin className="w-5 h-5" style={{ color: theme.primary }} />
            </div>
            <div>
              <p className="text-xs" style={{ color: theme.textSecondary }}>Dirección</p>
              <p className="font-medium" style={{ color: theme.text }}>{clientData.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  // Formulario de edición del cliente
  const EditFormView = () => (
    <div
      className="p-4 rounded-xl"
      style={{ 
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`
      }}
    >
      <form className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
            Nombre <span style={{ color: theme.error }}>*</span>
          </label>
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full p-3 rounded-lg"
            style={{ 
              backgroundColor: theme.bg,
              border: `1px solid ${theme.border}`,
              color: theme.text
            }}
            placeholder="Nombre completo"
            required
          />
        </div>
        
        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
            Teléfono <span style={{ color: theme.error }}>*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 w-4 h-4" style={{ color: theme.textSecondary }} />
            <input
              type="tel"
              value={editForm.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg"
              style={{ 
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
              placeholder="+57 300 123 4567"
              required
            />
          </div>
        </div>
        
        {/* Documento */}
        <div className="space-y-1">
          <label className="block text-sm font-medium" style={{ color: theme.text }}>
            Documento
          </label>
          
          <div className="flex gap-2">
            <select
              value={editForm.documentType}
              onChange={(e) => handleChange('documentType', e.target.value)}
              className="w-1/3 p-3 rounded-lg"
              style={{ 
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
            >
              <option value="cedula">C.C.</option>
              <option value="nit">NIT</option>
              <option value="extranjeria">C.E.</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
            
            <div className="relative w-2/3">
              <CreditCard className="absolute left-3 top-3.5 w-4 h-4" style={{ color: theme.textSecondary }} />
              <input
                type="text"
                value={editForm.documentNumber}
                onChange={(e) => handleChange('documentNumber', e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg"
                style={{ 
                  backgroundColor: theme.bg,
                  border: `1px solid ${theme.border}`,
                  color: theme.text
                }}
                placeholder="Número de documento"
              />
            </div>
          </div>
        </div>
        
        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4" style={{ color: theme.textSecondary }} />
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-lg"
              style={{ 
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
              placeholder="ejemplo@correo.com"
            />
          </div>
        </div>
        
        {/* Toggle para Datos de Empresa */}
        <div className="pt-2 border-t" style={{ borderColor: theme.border }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-medium" style={{ color: theme.text }}>
                Datos de Empresa
              </h3>
              <p className="text-xs" style={{ color: theme.textSecondary }}>
                Opcional para clientes corporativos
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleChange('company', editForm.company ? '' : 'Nueva Empresa')}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ 
                backgroundColor: editForm.company ? theme.primary : `${theme.border}40`
              }}
            >
              <div 
                className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                style={{ left: editForm.company ? '28px' : '4px' }}
              />
            </button>
          </div>
          
          {/* Campos adicionales cuando hay empresa */}
          {editForm.company && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
                  Nombre de Empresa
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-3.5 w-4 h-4" style={{ color: theme.textSecondary }} />
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg"
                    style={{ 
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    placeholder="Nombre de la empresa"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
                  Dirección
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4" style={{ color: theme.textSecondary }} />
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-lg"
                    style={{ 
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      color: theme.text
                    }}
                    placeholder="Dirección de la empresa"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Cliente Frecuente Toggle */}
        <div className="flex items-center justify-between pt-2">
          <div>
            <span className="text-sm font-medium" style={{ color: theme.text }}>
              Cliente Frecuente
            </span>
            <p className="text-xs" style={{ color: theme.textSecondary }}>
              Para clientes recurrentes
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleChange('isFrequent', !editForm.isFrequent)}
            className="relative w-12 h-6 rounded-full transition-colors"
            style={{ 
              backgroundColor: editForm.isFrequent ? theme.success : `${theme.border}40`
            }}
          >
            <div 
              className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
              style={{ left: editForm.isFrequent ? '28px' : '4px' }}
            />
          </button>
        </div>
      </form>
    </div>
  );
  
  // Vista de historial de compras
  const PurchaseHistoryView = () => (
    <div
      className="p-4 rounded-xl"
      style={{ 
        backgroundColor: theme.card,
        border: `1px solid ${theme.border}`
      }}
    >
      <h3 className="font-semibold mb-3" style={{ color: theme.text }}>
        Historial de Compras
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${theme.primary}10` }}
        >
          <p className="text-xs" style={{ color: theme.textSecondary }}>Total de compras</p>
          <p className="text-lg font-semibold" style={{ color: theme.primary }}>
            {clientData.purchases}
          </p>
        </div>
        
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${theme.success}10` }}
        >
          <p className="text-xs" style={{ color: theme.textSecondary }}>Última compra</p>
          <p className="text-sm font-semibold" style={{ color: theme.success }}>
            {clientData.lastPurchase}
          </p>
        </div>
      </div>
    </div>
  );
  
  // Pie de página con botón de continuar
  const Footer = () => {
    if (view === 'details' && isEditing) {
      return (
        <div 
          className="p-3.5 border-t"
          style={{ borderColor: theme.border, backgroundColor: theme.card }}
        >
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={cancelEdit}
              className="p-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:bg-opacity-90"
              style={{ 
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                color: theme.textSecondary
              }}
            >
              <X className="w-5 h-5" />
              <span>Cancelar</span>
            </button>
            <button
              onClick={saveChanges}
              className="p-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:bg-opacity-90"
              style={{ backgroundColor: theme.success }}
            >
              <Save className="w-5 h-5" />
              <span>Guardar</span>
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <div 
        className="p-3.5 border-t"
        style={{ borderColor: theme.border, backgroundColor: theme.card }}
      >
        <button
          className="w-full p-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all hover:bg-opacity-90"
          style={{ backgroundColor: theme.primary }}
        >
          <span>Continuar al Pago</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: theme.bg }}>
      {/* Cabecera */}
      <Header />
      
      {/* Contenido principal */}
      <div className="flex-1 overflow-y-auto">
        {view === 'main' ? (
          <MainView />
        ) : (
          <div className="p-3 space-y-4">
            {isEditing ? <EditFormView /> : <ClientDetailsView />}
            {!isEditing && <PurchaseHistoryView />}
          </div>
        )}
      </div>
      
      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default IntegratedClientScreen;