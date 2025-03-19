"use client"
import React from 'react';
import { 
  Clock,
  Target,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip,
  ReferenceLine
} from 'recharts';

// Importaciones de tipos para Recharts
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// Definir interfaces para los tipos
interface ThemeType {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
}

interface HourlyDataType {
  hour: string;
  sales: number;
  customers: number;
  time: string;
  period: 'morning' | 'peak' | 'afternoon';
  isPeak?: boolean;
  isMax?: boolean;
}

// Tipos para los props de componentes de Recharts
type CustomTooltipProps = TooltipProps<ValueType, NameType>;

const SalesChart: React.FC = () => {
  const theme: ThemeType = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981'
  };

  const hourlyData: HourlyDataType[] = [
    { hour: '09', sales: 120000, customers: 12, time: '9:00', period: 'morning' },
    { hour: '10', sales: 180000, customers: 15, time: '10:00', period: 'morning' },
    { hour: '11', sales: 160000, customers: 14, time: '11:00', period: 'morning' },
    { hour: '12', sales: 220000, customers: 20, time: '12:00', isPeak: true, period: 'peak' },
    { hour: '13', sales: 280000, customers: 25, time: '13:00', isPeak: true, isMax: true, period: 'peak' },
    { hour: '14', sales: 240000, customers: 22, time: '14:00', isPeak: true, period: 'peak' },
    { hour: '15', sales: 180000, customers: 16, time: '15:00', period: 'afternoon' },
    { hour: '16', sales: 160000, customers: 15, time: '16:00', period: 'afternoon' }
  ];

  // Encontrar las horas pico y el valor máximo de forma segura
  const peakHours: HourlyDataType[] = hourlyData.filter(d => d.isPeak);
  
  // Encuentra la hora con la venta máxima (de forma segura)
  // Si no hay ningún elemento con isMax, toma el que tenga mayor venta
  const maxHour: HourlyDataType = hourlyData.find(d => d.isMax) || 
                 hourlyData.reduce((max, current) => 
                   (current.sales > max.sales) ? current : max, 
                   { hour: '', sales: 0, customers: 0, time: "N/A", period: 'morning' });
  
  const totalPeakSales: number = peakHours.reduce((acc, curr) => acc + curr.sales, 0);
  const totalPeakCustomers: number = peakHours.reduce((acc, curr) => acc + curr.customers, 0);
  
  // Calcular el ticket promedio solo si hay clientes para evitar división por cero
  const averageTicket: number = totalPeakCustomers > 0 ? 
                        Math.round(totalPeakSales / totalPeakCustomers) : 0;
  
  const averageSales: number = hourlyData.length > 0 ? 
                      (hourlyData.reduce((acc, curr) => acc + curr.sales, 0) / hourlyData.length) : 0;

  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: theme.border }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: theme.border }}>
        <div className="p-4">
          {/* Titel */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${theme.success}15` }}>
                <Target className="w-7 h-7" style={{ color: theme.success }} />
              </div>
              <div>
                <h2 className="text-xl font-medium" style={{ color: theme.text }}>
                  Horas Pico
                </h2>
                <span className="text-base" style={{ color: theme.textSecondary }}>
                  12:00 - 14:00
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
              style={{ borderColor: theme.border }}>
              <Calendar className="w-4 h-4" style={{ color: theme.primary }} />
              <span className="text-sm" style={{ color: theme.primary }}>
                Hoy
              </span>
            </div>
          </div>

          {/* Max Sales Card */}
          <div className="p-4 rounded-xl" style={{ backgroundColor: `${theme.success}08` }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <DollarSign className="w-5 h-5" style={{ color: theme.success }} />
                    <span className="font-medium" style={{ color: theme.success }}>
                      Venta Máxima • {maxHour.time}
                    </span>
                  </div>
                  <span className="text-3xl font-bold" style={{ color: theme.text }}>
                    ${(maxHour.sales/1000).toFixed(0)}K
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <Users className="w-4 h-4" style={{ color: theme.textSecondary }} />
                    <span style={{ color: theme.textSecondary }}>Clientes</span>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: theme.text }}>
                    {maxHour.customers}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t" style={{ borderColor: `${theme.border}50` }}>
                <Clock className="w-4 h-4" style={{ color: theme.primary }} />
                <span style={{ color: theme.textSecondary }}>
                  Ticket Promedio:
                </span>
                <span className="text-lg font-medium" style={{ color: theme.primary }}>
                  ${(averageTicket/1000).toFixed(1)}K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 pt-6 pb-4">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={hourlyData}
              margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.primary} stopOpacity={0.1}/>
                  <stop offset="95%" stopColor={theme.primary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={(props) => {
                  if (!props || typeof props.x === 'undefined' || typeof props.y === 'undefined' || !props.payload || !props.payload.value) {
                    // Devolvemos un elemento vacío en lugar de null
                    return <g></g>;
                  }
                  
                  const { x, y, payload } = props;
                  const data = hourlyData.find(d => d.time === payload.value);
                  if (!data) {
                    // Devolvemos un elemento vacío en lugar de null
                    return <g></g>;
                  }
                  
                  const isPeak = data.period === 'peak';
                  return (
                    <g>
                      <text
                        x={x}
                        y={y + 12}
                        textAnchor="middle"
                        fontSize={13}
                        fill={isPeak ? theme.success : theme.textSecondary}
                        fontWeight={isPeak ? '600' : '400'}
                      >
                        {payload.value}
                      </text>
                      {isPeak && (
                        <circle 
                          cx={x} 
                          cy={y - 15} 
                          r={2.5} 
                          fill={theme.success}
                        />
                      )}
                    </g>
                  );
                }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme.textSecondary, fontSize: 13 }}
                tickFormatter={(value) => `$${value/1000}K`}
                width={50}
              />
              <ReferenceLine 
                y={averageSales} 
                stroke={theme.textSecondary}
                strokeDasharray="3 3"
                strokeWidth={1.5}
              />
              <Tooltip
                content={(props: CustomTooltipProps) => {
                  const { active, payload } = props || {};
                  if (!active || !payload?.length) {
                    // Devolvemos un elemento vacío en lugar de null
                    return <div></div>;
                  }
                  
                  const data = payload[0].payload as HourlyDataType;
                  const isPeak = data.period === 'peak';
                  
                  return (
                    <div className="bg-white p-3 rounded-xl shadow-lg border"
                      style={{ 
                        borderColor: isPeak ? theme.success : theme.border,
                        borderWidth: isPeak ? 2 : 1
                      }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" style={{ color: isPeak ? theme.success : theme.textSecondary }} />
                        <span className="font-medium" style={{ color: theme.text }}>
                          {data.time}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-1" style={{ color: isPeak ? theme.success : theme.text }}>
                        ${(data.sales/1000).toFixed(0)}K
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" style={{ color: theme.textSecondary }} />
                        <span className="text-sm" style={{ color: theme.textSecondary }}>
                          {data.customers} clientes
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke={theme.primary}
                strokeWidth={2}
                fill="url(#salesGradient)"
                dot={(props) => {
                  if (!props || !props.payload || !props.cx || !props.cy) {
                    // Devolvemos un elemento vacío en lugar de null
                    return <circle key="empty-dot" cx={0} cy={0} r={0} fill="none" />;
                  }
                  
                  const isPeak = (props.payload as HourlyDataType).period === 'peak';
                  if (!isPeak) {
                    // Devolvemos un elemento vacío en lugar de null
                    return <circle key={`dot-${props.payload.time}`} cx={0} cy={0} r={0} fill="none" />;
                  }
                  
                  return (
                    <circle
                      key={`dot-${props.payload.time}`}
                      cx={props.cx}
                      cy={props.cy}
                      r={7}
                      stroke={(props.payload as HourlyDataType).isMax ? theme.success : theme.primary}
                      strokeWidth={2.5}
                      fill={theme.card}
                      className="transition-transform duration-200 hover:scale-125"
                    />
                  );
                }}
                activeDot={(props) => {
                  if (!props || !props.payload || !props.cx || !props.cy) {
                    return <circle key="empty-active-dot" cx={0} cy={0} r={0} fill="none" />;
                  }

                  return (
                    <circle
                      key={`active-dot-${props.payload.time}`}
                      cx={props.cx}
                      cy={props.cy}
                      r={9}
                      stroke={theme.primary}
                      strokeWidth={2}
                      fill={theme.card}
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="mt-6 p-3 rounded-lg border flex items-center justify-between"
          style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.success }} />
              <span className="text-sm font-medium" style={{ color: theme.success }}>
                Horas Pico
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.textSecondary }} />
              <span className="text-sm" style={{ color: theme.textSecondary }}>
                Promedio: ${(averageSales/1000).toFixed(0)}K
              </span>
            </div>
          </div>
          <div className="text-sm" style={{ color: theme.textSecondary }}>
            Total: ${(totalPeakSales/1000000).toFixed(1)}M
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;