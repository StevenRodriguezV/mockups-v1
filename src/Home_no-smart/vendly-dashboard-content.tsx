import React from 'react';
import { 
  Package,
  Users,
  Receipt,
  Tag,
  DollarSign,
  Archive,
  MessageCircle,
  Check,
  CheckCheck,
  Clock,
  TrendingUp,
  BarChart2,
  ChevronRight
} from 'lucide-react';

const VendlyDashboardContent = () => {
  // Theme colors (normally would come from context/props)
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    whatsapp: '#25D366',
    success: '#10B981',
    accent: '#F97316'
  };

  // Sample data
  const quickActions = [
    { icon: Archive, label: 'Inventario', badge: '245' },
    { icon: Users, label: 'Clientes', badge: '58' },
    { icon: Receipt, label: 'Facturas', badge: 'Nuevo' },
    { icon: Tag, label: 'Ofertas', badge: '3' }
  ];

  const activities = [
    {
      title: 'Nuevo pedido',
      desc: 'Pedido #123 recibido',
      time: '5m',
      icon: Package,
      color: theme.success
    },
    {
      title: 'Stock bajo',
      desc: 'Producto #456 (3 unidades)',
      time: '1h',
      icon: Archive,
      color: theme.accent
    },
    {
      title: 'Pago recibido',
      desc: 'Factura #789',
      time: '2h',
      icon: DollarSign,
      color: theme.primary
    },
    {
      title: 'Nuevo cliente',
      desc: 'María García registrada',
      time: '3h',
      icon: Users,
      color: theme.primary
    },
    {
      title: 'Reporte semanal',
      desc: 'Ventas +15% vs semana anterior',
      time: '5h',
      icon: TrendingUp,
      color: theme.success
    }
  ];

  const weeklyData = [40, 65, 45, 80, 55, 70, 60];
  const weekDays = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  return (
   
     <div className="mb-16 bg-[#F8FAFC]">
          <div className="p-4 space-y-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl" style={{  backgroundColor: theme.card, border: `1px solid #E2E8F0` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5" style={{ color: theme.primary }} />
                          <span style={{ color: theme.textSecondary }}>Ventas Hoy</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: theme.text }}>$458.000</p>
                        <p style={{ color: theme.success }}>↑ 12% vs ayer</p>
                      </div>

                      <div className="p-4 rounded-xl" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5" style={{ color: theme.accent }} />
                          <span style={{ color: theme.textSecondary }}>Productos</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: theme.text }}>24</p>
                        <p style={{ color: theme.textSecondary }}>8 bajo stock</p>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-4 gap-3">
                      {quickActions.map((action, i) => (
                        <button key={i} className="p-3 rounded-xl" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-1" style={{ backgroundColor: `${theme.primary}15` }}>
                              <action.icon className="w-5 h-5" style={{ color: theme.primary }} />
                            </div>
                            <span className="text-xs text-center" style={{ color: theme.textSecondary }}>
                              {action.label}
                            </span>
                            {action.badge && (
                              <span className="text-xs mt-1 px-1.5 rounded-full" style={{ backgroundColor: `${theme.success}20`, color: theme.success }}>
                                {action.badge}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Messages */}
                    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                      <div className="p-4 border-b" style={{ borderColor: theme.border }}>
                        <h2 className="font-medium flex items-center justify-between" style={{ color: theme.text }}>
                          Mensajes Recientes
                          <span className="px-2 py-0.5 text-xs rounded-full"
                            style={{ backgroundColor: `${theme.whatsapp}20`, color: theme.whatsapp }}>
                            WhatsApp
                          </span>
                        </h2>
                      </div>
                      {[
                        { name: 'María G.', message: 'Gracias por la factura', time: '2m', read: true },
                        { name: 'Juan P.', message: '¿Tienen disponible...?', time: '15m', read: false },
                        { name: 'Ana R.', message: 'Perfecto, gracias!', time: '1h', read: true }
                      ].map((msg, i) => (
                        <div key={i} className="p-4 border-b last:border-b-0 flex items-center gap-3"
                          style={{ borderColor: theme.border }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${theme.whatsapp}15` }}>
                            <MessageCircle className="w-5 h-5" style={{ color: theme.whatsapp }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p style={{ color: theme.text }}>{msg.name}</p>
                              <span className="text-xs" style={{ color: theme.textSecondary }}>{msg.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <p className="text-sm" style={{ color: theme.textSecondary }}>{msg.message}</p>
                              {msg.read ? (
                                <CheckCheck className="w-4 h-4" style={{ color: theme.whatsapp }} />
                              ) : (
                                <Check className="w-4 h-4" style={{ color: theme.textSecondary }} />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Herramientas (Tools) */}
                    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                      <div className="p-4 border-b" style={{ borderColor: theme.border }}>
                        <h2 className="font-medium" style={{ color: theme.text }}>
                          Herramientas
                        </h2>
                      </div>
                      {[
                        { icon: BarChart2, title: 'Reportes', desc: 'Ver estadísticas detalladas' },
                        { icon: Receipt, title: 'Gastos', desc: 'Registrar gastos del negocio' },
                        { icon: Package, title: 'Proveedores', desc: 'Gestionar pedidos' }
                      ].map((tool, i) => (
                        <button key={i} className="w-full p-4 border-b last:border-b-0 flex items-center gap-3 hover:bg-opacity-50"
                          style={{ borderColor: theme.border }}>
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${theme.primary}15` }}>
                            <tool.icon className="w-5 h-5" style={{ color: theme.primary }} />
                          </div>
                          <div className="flex-1 text-left">
                            <p style={{ color: theme.text }}>{tool.title}</p>
                            <p className="text-sm" style={{ color: theme.textSecondary }}>{tool.desc}</p>
                          </div>
                          <ChevronRight className="w-5 h-5" style={{ color: theme.textSecondary }} />
                        </button>
                      ))}
                    </div>

                    {/* Weekly Stats */}
                    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                      <div className="p-4 border-b" style={{ borderColor: theme.border }}>
                        <h2 className="font-medium" style={{ color: theme.text }}>Estadísticas Semanales</h2>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <p style={{ color: theme.textSecondary }}>Total Ventas</p>
                            <p className="text-2xl font-bold" style={{ color: theme.primary }}>$2.458.000</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${theme.success}20`, color: theme.success }}>
                            ↑ 15%
                          </span>
                        </div>

                        <div className="h-40 flex items-end gap-2 mb-4">
                          {weeklyData.map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-t transition-all duration-300"
                              style={{ 
                                height: `${height}%`,
                                backgroundColor: height > 70 ? theme.primary : `${theme.primary}40`
                              }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between text-sm mt-4" style={{ color: theme.textSecondary }}>
                          {weekDays.map((day, i) => (
                            <span key={i}>{day}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl overflow-hidden" style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}>
                      <div className="p-4 border-b" style={{ borderColor: theme.border }}>
                        <h2 className="font-medium" style={{ color: theme.text }}>Actividad Reciente</h2>
                      </div>
                      {activities.map((activity, i) => (
                        <div key={i} className="p-4 border-b last:border-b-0 flex items-center gap-4" style={{ borderColor: theme.border }}>
                          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activity.color}20` }}>
                            <activity.icon className="w-6 h-6" style={{ color: activity.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <p className="font-medium" style={{ color: theme.text }}>{activity.title}</p>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" style={{ color: theme.textSecondary }} />
                                <span className="text-sm" style={{ color: theme.textSecondary }}>{activity.time}</span>
                              </div>
                            </div>
                            <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>{activity.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
     </div>
     


  );
};

export default VendlyDashboardContent;