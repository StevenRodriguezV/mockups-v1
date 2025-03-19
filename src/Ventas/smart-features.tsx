import React from 'react';
import {
  Sparkles,
  Clock,
  Package,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const SmartFeatures = () => {
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    warning: '#F59E0B'
  };

  const nextSales = [
    { name: 'Café', time: 'En 30 min', quantity: '12 unid.' },
    { name: 'Bebidas', time: 'En 2 horas', quantity: '20+ unid.' }
  ];

  const relatedProducts = [
    { main: 'Café', related: 'Pan', frequency: '78%' },
    { main: 'Hamburguesa', related: 'Bebida', frequency: '92%' }
  ];

  const stockAlerts = [
    { product: 'Agua 500ml', units: 5, urgent: true },
    { product: 'Pan', units: 8, urgent: false }
  ];

  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: theme.border }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: theme.border }}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${theme.primary}15` }}>
                <Sparkles className="w-7 h-7" style={{ color: theme.primary }} />
              </div>
              <div>
                <h2 className="text-xl font-medium" style={{ color: theme.text }}>
                  Smart Ayuda
                </h2>
                <span className="text-base" style={{ color: theme.textSecondary }}>
                  Basado en ventas actuales
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Stock Alerts - Now First */}
        {stockAlerts.length > 0 && (
          <div className="p-4 rounded-xl" 
            style={{ 
              backgroundColor: `${theme.warning}08`,
              border: `1px solid ${theme.warning}30`
            }}>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5" style={{ color: theme.warning }} />
              <h3 className="text-lg font-medium" style={{ color: theme.text }}>
                Revisar Stock
              </h3>
            </div>

            <div className="space-y-2">
              {stockAlerts.map((alert, index) => (
                <div key={index} 
                  className="flex items-center justify-between p-2 rounded-lg bg-white border"
                  style={{ borderColor: alert.urgent ? theme.warning : theme.border }}>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: alert.urgent ? theme.warning : theme.textSecondary }} />
                    <span className="font-medium" style={{ color: theme.text }}>
                      {alert.product}
                    </span>
                    <span style={{ color: theme.textSecondary }}>
                      ({alert.units} unid.)
                    </span>
                  </div>
                  <button 
                    className="text-sm px-3 py-1 rounded-lg"
                    style={{ 
                      backgroundColor: alert.urgent ? theme.warning : `${theme.warning}15`,
                      color: alert.urgent ? 'white' : theme.warning
                    }}>
                    Revisar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Próximas Ventas - More Compact */}
        <div className="p-4 rounded-xl border" style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5" style={{ color: theme.primary }} />
            <h3 className="text-lg font-medium" style={{ color: theme.text }}>
              Preparar Ahora
            </h3>
          </div>
          
          <div className="space-y-2">
            {nextSales.map((sale, index) => (
              <div key={index} 
                className="flex items-center justify-between py-2 px-3 rounded-lg"
                style={{ backgroundColor: `${theme.primary}05` }}>
                <div className="flex items-center gap-2">
                  <span className="font-medium" style={{ color: theme.text }}>
                    {sale.name}
                  </span>
                  <span className="text-sm" style={{ color: theme.textSecondary }}>
                    • {sale.quantity}
                  </span>
                </div>
                <span className="text-sm" style={{ color: theme.primary }}>
                  {sale.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Productos Relacionados - With Frequency */}
        <div className="p-4 rounded-xl border" style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-2 mb-3">
            <Package className="w-5 h-5" style={{ color: theme.primary }} />
            <h3 className="text-lg font-medium" style={{ color: theme.text }}>
              Sugerencias
            </h3>
          </div>

          <div className="space-y-2">
            {relatedProducts.map((item, index) => (
              <div key={index} 
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: `${theme.primary}05` }}>
                <div className="flex items-center gap-2">
                  <span className="font-medium" style={{ color: theme.text }}>
                    {item.main}
                  </span>
                  <ArrowRight className="w-4 h-4" style={{ color: theme.textSecondary }} />
                  <span style={{ color: theme.text }}>
                    {item.related}
                  </span>
                </div>
                <span className="text-sm font-medium" style={{ color: theme.primary }}>
                  {item.frequency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartFeatures;