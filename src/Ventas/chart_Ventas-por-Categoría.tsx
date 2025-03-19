"use client"
import React from 'react';
import { 
  BarChart, 
  Bar, 
  Cell, 
  XAxis, 
  YAxis, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUp
} from 'lucide-react';

const CategoryChart = () => {
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981'
  };

  const colors = {
    main: '#6366F1',    
    second: '#10B981',  
    third: '#F97316',   
    fourth: '#64748B'   
  };

  const categoryData = [
    { 
      name: 'Bebidas', 
      sales: 320000, 
      color: colors.main,
      change: 12,
      avgTicket: 15000
    },
    { 
      name: 'Snacks', 
      sales: 250000, 
      color: colors.second,
      change: 8,
      avgTicket: 12000
    },
    { 
      name: 'Lácteos', 
      sales: 180000, 
      color: colors.third,
      change: -3,
      avgTicket: 18000
    },
    { 
      name: 'Pan', 
      sales: 150000, 
      color: colors.fourth,
      change: 5,
      avgTicket: 8000
    }
  ];

  const totalSales = categoryData.reduce((sum, cat) => sum + cat.sales, 0);
  const topCategory = categoryData[0];
  const topPercentage = ((topCategory.sales/totalSales) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: theme.border }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: theme.border }}>
        <div className="p-4">
          {/* Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${theme.primary}15` }}>
                <ShoppingBag className="w-7 h-7" style={{ color: theme.primary }} />
              </div>
              <div>
                <h2 className="text-xl font-medium" style={{ color: theme.text }}>
                  Ventas por Categoría
                </h2>
                <span className="text-base" style={{ color: theme.textSecondary }}>
                  Top 4 categorías
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

          {/* Top Category Info */}
          <div className="p-4 rounded-xl" 
            style={{ 
              backgroundColor: `${theme.primary}08`,
              border: `1px solid ${theme.primary}20`
            }}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <DollarSign className="w-5 h-5" style={{ color: colors.main }} />
                    <span className="font-medium" style={{ color: colors.main }}>
                      {topCategory.name} • Más Vendida
                    </span>
                    <span className="flex items-center gap-1 text-sm px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${theme.success}15`, color: theme.success }}>
                      <ArrowUp className="w-3 h-3" />
                      {topCategory.change}%
                    </span>
                  </div>
                  <span className="text-3xl font-bold" style={{ color: theme.text }}>
                    ${(topCategory.sales/1000).toFixed(0)}K
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <TrendingUp className="w-4 h-4" style={{ color: theme.textSecondary }} />
                    <span style={{ color: theme.textSecondary }}>Del Total</span>
                  </div>
                  <span className="text-2xl font-bold" style={{ color: colors.main }}>
                    {topPercentage}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t" 
                style={{ borderColor: `${theme.border}50` }}>
                <span style={{ color: theme.textSecondary }}>
                  Ticket Promedio:
                </span>
                <span className="text-lg font-medium" style={{ color: theme.primary }}>
                  ${(topCategory.avgTicket/1000).toFixed(1)}K
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
            <BarChart
              data={categoryData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barSize={40}
            >
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ 
                  fill: theme.textSecondary, 
                  fontSize: 13,
                  fontWeight: 500 
                }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: theme.textSecondary, fontSize: 13 }}
                tickFormatter={(value) => `$${value/1000}K`}
                width={50}
              />
              <Tooltip
                cursor={{ 
                  fill: 'rgba(0,0,0,0.05)',
                  radius: 4
                }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0].payload;
                  const percentage = ((data.sales/totalSales) * 100).toFixed(1);
                  
                  return (
                    <div className="bg-white p-3 rounded-lg shadow-lg border-2 transition-all duration-200"
                      style={{ borderColor: data.color }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: data.color }} />
                        <span className="font-medium" style={{ color: theme.text }}>
                          {data.name}
                        </span>
                        {data.change > 0 && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full"
                            style={{ backgroundColor: `${theme.success}15`, color: theme.success }}>
                            +{data.change}%
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-bold mb-2" style={{ color: data.color }}>
                        ${(data.sales/1000).toFixed(0)}K
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: theme.textSecondary }}>
                          {percentage}% del total
                        </span>
                        <span style={{ color: theme.primary }}>
                          ${(data.avgTicket/1000).toFixed(1)}K/ticket
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
              <Bar 
                dataKey="sales" 
                radius={[6, 6, 0, 0]}
              >
                {categoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-200 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Summary */}
        <div className="mt-6 p-3 rounded-lg border grid grid-cols-2 gap-4"
          style={{ borderColor: theme.border }}>
          {categoryData.map((category, index) => {
            const percentage = ((category.sales/totalSales) * 100).toFixed(1);
            return (
              <div key={`category-${index}`} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm font-medium" style={{ color: theme.text }}>
                    {category.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium" style={{ color: category.color }}>
                    {percentage}%
                  </span>
                  <span className="text-sm" style={{ color: theme.textSecondary }}>
                    ${(category.sales/1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;