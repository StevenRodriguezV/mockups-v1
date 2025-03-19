"use client"

import React from 'react';
import { 
  TrendingUp,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  AlertCircle,
  MessageCircle,
  Building2,
  Users,
  Settings,
  Smartphone
} from 'lucide-react';

const BusinessHub = () => {
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

  const mainKpis = [
    {
      label: 'Margen',
      value: '32.4%',
      subtext: '+2.1% vs. mes anterior',
      color: theme.primary,
      icon: DollarSign
    },
    {
      label: 'Crecimiento',
      value: '18.5%',
      subtext: '+3.2% tendencia',
      color: theme.success,
      icon: TrendingUp
    }
  ];

  const sections = [
    {
      title: 'MARKETING',
      items: [
        {
          icon: DollarSign,
          title: 'Campañas & Ofertas',
          desc: '2 campañas activas',
          color: theme.primary
        },
        {
          icon: Users,
          title: 'Fidelización',
          desc: 'Programa de clientes',
          color: theme.success
        }
      ]
    },
    {
      title: 'MI NEGOCIO',
      items: [
        {
          icon: Building2,
          title: 'Datos Básicos',
          desc: 'Información del negocio',
          color: theme.primary
        },
        {
          icon: Users,
          title: 'Empleados',
          desc: '5 empleados activos',
          color: theme.success
        },
        {
          icon: Settings,
          title: 'Configuración',
          desc: 'Ajustes del sistema',
          color: theme.textSecondary
        }
      ]
    },
    {
      title: 'HERRAMIENTAS',
      items: [
        {
          icon: ShieldCheck,
          title: 'DIAN',
          desc: 'Facturación electrónica',
          color: theme.warning,
          badge: 'Pendiente'
        },
        {
          icon: MessageCircle,
          title: 'WhatsApp',
          desc: 'Integración de mensajes',
          color: theme.success
        },
        {
          icon: Smartphone,
          title: 'Servicios Digitales',
          desc: 'Recargas y pagos',
          color: theme.primary,
          badge: '9% comisión'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b px-4 py-3" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        <h1 className="text-lg font-medium" style={{ color: theme.text }}>
          Mi Negocio
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* KPIs */}
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3">
            {mainKpis.map((kpi, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl transition-all duration-200 hover:shadow-sm"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`
                }}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <span className="text-sm block mb-1.5" style={{ color: theme.textSecondary }}>
                      {kpi.label}
                    </span>
                    <p className="text-2xl font-semibold mb-1.5" style={{ color: theme.text }}>
                      {kpi.value}
                    </p>
                    <div 
                      className="inline-block px-2 py-0.5 rounded text-xs"
                      style={{ 
                        backgroundColor: `${kpi.color}08`,
                        color: kpi.color
                      }}
                    >
                      {kpi.subtext}
                    </div>
                  </div>
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${kpi.color}10` }}
                  >
                    <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIAN Status */}
        <div className="mb-6">
          <button
            className="w-full p-4 rounded-xl flex items-start gap-4"
            style={{ 
              backgroundColor: `${theme.warning}08`,
              border: `1px solid ${theme.warning}30`
            }}
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${theme.warning}15` }}
            >
              <ShieldCheck className="w-6 h-6" style={{ color: theme.warning }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" style={{ color: theme.warning }} />
                <h3 className="font-medium text-left" style={{ color: theme.text }}>
                  Documentos DIAN
                </h3>
              </div>
              <p className="text-sm text-left" style={{ color: theme.textSecondary }}>
                12 facturas pendientes
              </p>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0 mt-2" style={{ color: theme.warning }} />
          </button>
        </div>

        {/* Main Sections */}
        <div className="space-y-5">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="rounded-xl overflow-hidden border" 
                style={{ borderColor: theme.border }}>
                <div className="px-4 py-3 border-b" 
                  style={{ borderColor: theme.border, backgroundColor: theme.card }}>
                  <h2 className="font-medium" style={{ color: theme.text }}>
                    {section.title}
                  </h2>
                </div>
                <div style={{ backgroundColor: theme.card }}>
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={itemIndex}
                      className="w-full px-4 py-3.5 flex items-center gap-4 border-b last:border-b-0 
                               transition-all duration-200 hover:bg-gray-50 active:bg-gray-100"
                      style={{ borderColor: theme.border }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}10` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-left" style={{ color: theme.text }}>
                          {item.title}
                        </p>
                        <p className="text-sm text-left mt-0.5" style={{ color: theme.textSecondary }}>
                          {item.desc}
                        </p>
                      </div>
                      {item.badge && (
                        <span 
                          className="text-xs px-2 py-1 rounded-full mr-2 flex-shrink-0"
                          style={{ backgroundColor: `${item.color}08`, color: item.color }}
                        >
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight 
                        className="w-5 h-5 flex-shrink-0" 
                        style={{ color: theme.textSecondary }} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Padding */}
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default BusinessHub;