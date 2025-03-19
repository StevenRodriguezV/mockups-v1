"use client"
import React from 'react';
import {
  Smartphone,
  CreditCard,
  Gift,
  Calendar,
  TrendingUp,
  DollarSign,
  ArrowUp,
  Plus
} from 'lucide-react';

const DigitalServices = () => {
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981'
  };

  const services = [
    { 
      icon: Smartphone, 
      label: 'Recargas', 
      amount: 142000,
      commission: 9,
      change: 12,
      transactions: 48,
      color: theme.primary
    },
    { 
      icon: CreditCard, 
      label: 'Servicios', 
      amount: 86000,
      commission: 6,
      change: 8,
      transactions: 32,
      color: theme.success
    },
    { 
      icon: Gift, 
      label: 'Gift Cards', 
      amount: 54000,
      commission: 4,
      change: -3,
      transactions: 15,
      color: '#F97316'
    }
  ];

  const totalAmount = services.reduce((sum, service) => sum + service.amount, 0);
  const totalCommission = services.reduce((sum, service) => sum + (service.amount * service.commission / 100), 0);
  const totalTransactions = services.reduce((sum, service) => sum + service.transactions, 0);

  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: theme.border }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: theme.border }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${theme.primary}15` }}>
                <CreditCard className="w-7 h-7" style={{ color: theme.primary }} />
              </div>
              <div>
                <h2 className="text-2xs font-medium" style={{ color: theme.text }}>
                  Servicios Digitales
                </h2>
                <span className="text-base" style={{ color: theme.textSecondary }}>
                  {totalTransactions} ventas hoy
                </span>
              </div>
            </div>
            <button 
              className="flex items-center gap-1 px-2 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-200 hover:opacity-90 active:scale-95 whitespace-nowrap"
              style={{ backgroundColor: theme.primary }}
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
              <span className="text-1xs md:text-sm font-medium text-white">
                Vender Servicio
              </span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Total Sales */}
            <div className="p-4 rounded-xl" 
              style={{ 
                backgroundColor: `${theme.primary}08`,
                border: `1px solid ${theme.primary}20`
              }}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5" style={{ color: theme.primary }} />
                <span className="font-medium" style={{ color: theme.primary }}>
                  Ventas Totales
                </span>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: theme.text }}>
                ${(totalAmount/1000).toFixed(0)}K
              </div>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3" style={{ color: theme.success }} />
                <span className="text-sm" style={{ color: theme.success }}>
                  8% vs ayer
                </span>
              </div>
            </div>

            {/* Total Commissions */}
            <div className="p-4 rounded-xl" 
              style={{ 
                backgroundColor: `${theme.success}08`,
                border: `1px solid ${theme.success}20`
              }}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" style={{ color: theme.success }} />
                <span className="font-medium" style={{ color: theme.success }}>
                  Comisiones
                </span>
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: theme.text }}>
                ${(totalCommission/1000).toFixed(1)}K
              </div>
              <span className="text-sm" style={{ color: theme.success }}>
                {((totalCommission/totalAmount) * 100).toFixed(1)}% promedio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 gap-2">
          {services.map((service, index) => (
            <button 
              key={index}
              className="p-4 rounded-xl border transition-all duration-200 hover:border-primary active:scale-98"
              style={{ borderColor: theme.border }}
            >
              <div className="flex flex-col text-center items-center">
                {/* Icon und Name */}
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <span className="font-medium  mb-3" style={{ color: theme.text }}>
                  {service.label}
                </span>
                
                {/* Hauptzahlen */}
                <div className="w-full pt-3  border-t" style={{ borderColor: theme.border }}>
                  <div className="text-2xl font-bold text-center mb-3" style={{ color: theme.text }}>
                    ${(service.amount/1000).toFixed(0)}K
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <div>
                      <span style={{ color: theme.success }}>
                        ${((service.amount * service.commission / 100)/1000).toFixed(1)}K
                      </span>
                    </div>
                   
                  </div>
                    <div>
                      <p style={{ color: theme.textSecondary }}>
                        {service.transactions} ventas
                      </p>
                    </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Calendar Button & Today Stats */}
        <div className="mt-6 p-3 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between"
          style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <Calendar className="w-4 h-4" style={{ color: theme.primary }} />
            <span className="text-sm" style={{ color: theme.textSecondary }}>
              Hoy
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-sm" style={{ color: theme.success }}>
              Mejor comisión: {Math.max(...services.map(s => s.commission))}%
            </span>
            <div className="hidden sm:block h-4 w-px" style={{ backgroundColor: theme.border }} />
            <span className="text-sm" style={{ color: theme.primary }}>
              {totalTransactions} ventas totales
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalServices;